# Privacy

This fork of show-your-work runs on your computer and sends nothing anywhere. The pictures and videos Claude shows you, your files and your conversations stay on your machine.

## What it sends

Nothing. Upstream's anonymous usage counts (PostHog) and its daily version check (`raw.githubusercontent.com`) are removed from this fork. It never updates itself: a new version runs only after you run `claude plugin update show-your-work@bennouli` yourself.

The one exception is a page you ask it to show: an HTML page is rendered in a hidden Chrome with a throwaway profile, and Chrome loads whatever that page links to, as it would if you opened the page yourself.

## What it keeps on your computer

- Video frames and converted pictures, in a temp folder. Anything older than a week is deleted.
- A copy of each file Claude shows you, in `.show-your-work/` in your project, for version history. Delete the folder any time.
- Your settings, in Claude Code's storage for the plugin.
- Only if you start Claude Code with `SHOW_YOUR_WORK_DEBUG=1`: a debug log (`debug.log` in the temp folder) of what the plugin did, including file paths and window sizes, for bug reports. It stays on your computer unless you attach it to an issue yourself.

## Questions

Open an issue at [github.com/bennouli/claude-show-your-work/issues](https://github.com/bennouli/claude-show-your-work/issues).
