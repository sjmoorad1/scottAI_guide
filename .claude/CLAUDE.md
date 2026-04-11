# Agentic AI Setup Guide

## What This Is
HTML tutorial for AscendNxt clients to set up Claude CLI. Pure HTML/CSS/JS, hosted on GitHub Pages.

## Key Facts
- **Icons**: Flat filled SVGs with `fill="currentColor"` (not stroke style)
- **Themes**: Light (blue logo, moon icon) / Dark (white logo, sun icon)
- **Password**: `Time2ElevateMyAIGame#1` (stored in localStorage)
- **CSS gotcha**: Don't layer conflicting `display` rules - be explicit per theme

## IMPORTANT: Changelog Rule

**When making user-facing changes to `index.html`, you MUST update `CHANGELOG.md`.**

What to log:
- New sections, features, tips
- Changed workflows or instructions
- Fixed broken/confusing steps
- Removed content

What NOT to log:
- Typo fixes, rewording
- CSS/style tweaks
- Internal refactoring

### Popup Flag System

The "What's New" popup only shows entries marked with `!`. This separates developer notes from user-facing notifications.

**Format options:**

```markdown
# User-facing (shows in popup) — quote the user-friendly text, put technical note after
- [Section] !"User-friendly summary" Technical description for developer tracking

# User-facing (simple) — no quotes, entire text shows in popup
- [Section] !Brief description that works for both audiences

# Developer-only (no popup) — no ! flag
- [Section] Internal restructuring or technical detail
```

**Rules:**
- Add `!` only when the user benefits from knowing about the change
- Quoted text after `!` is what appears in the popup — write it for a non-technical reader
- Text after the closing quote is developer context — never shown to users
- No `!` = developer-only entry, invisible in popup

**Example:**
```markdown
## 2026-04-11

### Added
- [Level 2] !"New topic: access Claude from your phone via Telegram or iMessage" Added remote access topic with Channels, Remote Control, and Dispatch
- [Level 2] Topic index with anchor links grouped by category
```

In this example, only the first line shows in the popup (with the quoted text). The second line is developer-only.

## Tips Duplication Policy

Tips appear in TWO places by design (training reinforcement, not a DRY violation):
1. **In-context** within the relevant Phase (where they're actionable during setup)
2. **In the Tips tab** within Reference (where they're browsable later)

**When updating a tip, update BOTH locations.** Search for the tip text to find both instances.

## Session Log
`SESSION_LOG.md` prevents amnesia between sessions. **Keep entries brief** - 2-4 bullet points max. Just enough to resume context, not documentation.
