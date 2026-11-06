// Updates, removed in this fork: it never checks GitHub and never installs
// anything by itself. Update it by hand after reviewing what changed:
//   claude plugin marketplace update bennouli
//   claude plugin update show-your-work@bennouli
// What is left is what the rest of the plugin still reads.
import type { EngineInterface } from 'claude-code'

export const PLUGIN = 'show-your-work'
type Branch = 'releases' | 'latest'

// A version folder from before 0.6.0 in the plugin cache: this install was
// used before 0.6.0's welcome, so it was updated past it without seeing it.
export const hadVersionBefore06 = (names: string[]) => names.some(name => /^\d+\.\d+\.\d+$/.test(name) && isNewer('0.6.0', name))

// 1.10.0 is newer than 1.9.3; anything after a dash is ignored.
export function isNewer(latest: string, current: string): boolean {
  const parts = (v: string) => (v.split('-')[0] ?? '').split('.').map(n => Number(n) || 0)
  const a = parts(latest), b = parts(current)
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) > (b[i] ?? 0)
  }

  return false
}

// The result of checking for an update:
//   update   a newer version is on the channel's branch
//   move     the install follows a different branch than the chosen channel
//   current  already on the newest version
//   pending  the newest version is installed but runs from the next session
//   folder   loaded from a local folder (development), so it never updates
//   pinned   installed from a fixed tag such as #v0.5.14, so it never updates
//   offline  GitHub couldn't be reached
//   no_cli   Claude Code's CLI couldn't be found or didn't answer
export type Found =
  | { kind: 'update'; latest: string; scope: string }
  | { kind: 'move'; latest: string; branch: Branch; market: { url?: string; ref?: string } }
  | { kind: 'current'; latest: string }
  | { kind: 'pending'; latest: string }
  | { kind: 'folder' }
  | { kind: 'busy' }
  | { kind: 'pinned'; ref: string }
  | { kind: 'offline' }
  | { kind: 'no_cli' }

// Never reached in this fork (nothing finds an update), and does nothing.
export async function installUpdate(_$: EngineInterface, _found: Extract<Found, { kind: 'update' | 'move' }>, _current: string) {
  return false
}
