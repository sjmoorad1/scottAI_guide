# Agentic AI Setup Guide - Claude Guidelines

## Project Overview
Interactive HTML tutorial for AscendNxt clients to set up Claude CLI. Single-page app with:
- OS-specific instructions (Mac/Windows toggle)
- Light/dark theme support
- Progress tracking with localStorage
- Password gate for access control

## Tech Stack
- Pure HTML/CSS/JavaScript (no frameworks)
- GitHub Pages hosting
- No build process required

## File Structure
```
Agentic AI Setup/
├── index.html          # Main tutorial content
├── styles.css          # All styling including themes
├── script.js           # Interactivity, progress tracking, auth
├── images/             # Logos and icons
│   ├── AscendNxt Logo Blue.png
│   ├── AscendNxt Logo White_no background.png
│   ├── claude-icon.svg
│   └── github-icon.svg
└── .claude/            # Claude guidelines
    ├── CLAUDE.md       # This file
    └── SESSION_LOG.md  # Session history
```

## Key Design Decisions

### Icons
- All icons are **flat/filled SVG** style (not stroke/outline)
- Use `fill="currentColor"` for theme adaptation
- Match the style of Apple/Windows OS selector icons

### Theme Toggle
- Light mode: Blue logo + moon icon (click to go dark)
- Dark mode: White logo + sun icon (click to go light)
- CSS handles visibility via `[data-theme="dark"]` selectors

### Password Gate
- Password: `Time2ElevateMyAIGame#1`
- Stored in localStorage after first successful entry
- Modal appears on page load if not authenticated

## Common Issues

### CSS Conflicts
- Avoid multiple rules setting `display` on the same elements
- Be explicit: set both show AND hide states for theme-dependent elements
- Don't use generic selectors (like `.logo img`) that override specific ones

### GitHub Pages Caching
- Changes may take a few minutes to appear
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check Network tab to confirm new files loaded

## Session Start
Before any work, skim the latest entry in `.claude/SESSION_LOG.md` for recent context.

## End of Session
Append a dated entry to `.claude/SESSION_LOG.md` with:
- What was done
- Key decisions
- Gotchas encountered
- Next steps
