// Usage stats, removed in this fork: nothing is ever sent. The functions stay,
// doing nothing, so the call sites match upstream and merges stay small. The
// local debug log is diagnostics.ts, which never leaves the computer either.
import type { EngineInterface } from 'claude-code'

// A button press, by name only. False, so it chains: act('save') || keep().
export const act = (action: string): false => {
  track('action', { action })
  return false
}

export type Props = Record<string, string | number | boolean | null | undefined | Record<string, string | number | boolean | undefined>>
export type Event = { event: string; properties: Props; timestamp: string }

// A made-up name for an install, the same every time for one id, so profiles
// read as "Swift Otter" rather than a UUID. Nothing in it comes from the person.
const ADJECTIVES = ['Swift', 'Quiet', 'Brave', 'Clever', 'Sunny', 'Lucky', 'Bold', 'Calm', 'Eager', 'Gentle', 'Happy', 'Jolly', 'Keen', 'Lively', 'Mellow', 'Nimble', 'Plucky', 'Rapid', 'Snappy', 'Tidy', 'Witty', 'Zesty', 'Cosmic', 'Fuzzy']
const ANIMALS = ['Otter', 'Falcon', 'Panda', 'Fox', 'Koala', 'Lynx', 'Heron', 'Badger', 'Gecko', 'Owl', 'Puffin', 'Raccoon', 'Seal', 'Tiger', 'Wombat', 'Yak', 'Bison', 'Crane', 'Dolphin', 'Ferret', 'Hedgehog', 'Lemur', 'Moose', 'Quokka']
export function nicknameOf(id: string): string {
  let hash = 0
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  const n = Math.floor(hash / ADJECTIVES.length) % 1000

  return `${ADJECTIVES[hash % ADJECTIVES.length]} ${ANIMALS[Math.floor(hash / 1000) % ANIMALS.length]} ${n}`
}

// An installed copy runs from Claude Code's plugin cache. One loaded from a
// folder (--plugin-dir) is someone working on the plugin.
export const isInstalledCopy = (root: string) => /\/plugins\/cache\//.test(root)

// Kept for upstream's tests; nothing reads it, since nothing is ever sent.
export const isStatsBlocked = (optOut?: string, dnt?: string, quiet?: string) =>
  /^(0|false|off|no)$/i.test(optOut ?? '') || /^(1|true)$/i.test(dnt ?? '') || !!quiet

// Removed in this fork: no install id, no queue, no timer, no network.
export async function startTelemetry(_$: EngineInterface, _context: Props) {}

export function track(_event: string, _properties: Props = {}) {}

export async function flush(_$: EngineInterface) {}
