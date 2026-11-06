import { expect, test } from 'claude-code/testing'

import { SETTINGS } from '../hooks/state'
import { act, flush, startTelemetry, track } from '../hooks/telemetry'
import { installUpdate } from '../hooks/updater'

// A stand-in for the engine that records every request and command.
function engine() {
  const fetched: string[] = []
  const runs: string[][] = []
  const $ = {
    plugin: { root: '/home/x/.claude/plugins/cache/bennouli/show-your-work/1.1.0' },
    env: { get: async () => undefined },
    clock: { now: async () => 0, every: () => undefined },
    store: { get: async () => undefined, set: async () => undefined },
    http: { fetch: async (url: string) => {
      fetched.push(url)
      return { ok: true, status: 200, headers: {}, text: '{}' }
    } },
    process: { run: async (argv: string[]) => {
      runs.push(argv)
      return { exitCode: 0, stdout: '', stderr: '' }
    } },
  }
  return { $: $ as never, fetched, runs }
}

test('this fork sends no usage data, even from an installed copy', async () => {
  const e = engine()
  await startTelemetry(e.$, { plugin_version: '1.1.0' })
  track('image_shown', { ext: 'png' })
  act('save')
  await flush(e.$)
  expect(e.fetched).toEqual([])
  expect(e.runs).toEqual([])
})

test('this fork never installs an update', async () => {
  const e = engine()
  const isDone = await installUpdate(e.$, { kind: 'update', latest: '9.9.9', scope: 'user' }, '1.1.0')
  expect(isDone).toBe(false)
  expect(e.fetched).toEqual([])
  expect(e.runs).toEqual([])
})

test('the settings offer picture size only: no update or usage data switch', () => {
  expect(SETTINGS.map(s => s.field)).toEqual(['standard_size'])
})
