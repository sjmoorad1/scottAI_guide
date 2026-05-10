# Changelog

User-facing changes to the Agentic AI Setup Guide. Internal fixes (typos, CSS tweaks) are not logged.

## 2026-05-10

### Added
- [Phase 2] !"New setup step: set your effort level — controls how deeply Claude reasons before responding" Effort level configuration with table of levels and mid-session switching guidance
- [Tips] !"New section: Tuning Claude's Quality — effort levels, extended thinking, and permission settings" Three tip cards covering effort, thinking, and reducing permission prompts, plus a copyable settings.json example
- [Commands] Added `/effort max` to Claude CLI commands table

### Changed
- [Phase 2] !"Model setup updated — use aliases (sonnet, opus) so you always get the latest version" Model config now uses aliases instead of pinned version numbers
- [Phase 1] Fixed Python version success text — was listing unreleased version
- [Level 2] Updated Channels minimum version requirement and removed stale "research preview" label
- [Phase 2] Added current-pricing link to plan comparison

## 2026-04-20

### Added
- [Phase 3] !"New template: Code Review Requirements — teaches Claude a disciplined review process so it catches bugs instead of saying 'looks good'" Added CODE_REVIEW_REQUIREMENTS.md to rules templates and download table
- [Tips] Code Reviews & Quality Checks section in Tips & Best Practices with guidance on when and how to trigger reviews

## 2026-04-11

### Added
- [Phase 2] !"New optional step: enable audio notifications so you never miss a Claude prompt" Audio notification setup with platform-specific instructions (Mac: afplay, Windows: PowerShell SystemSounds)
- [Tips] Audio notification tip card in Tips & Best Practices
- [Level 2] !"New topic: Access Claude from anywhere — Remote Control, Channels (Telegram/Discord/iMessage), and phone dispatch" New "Accessing Claude from Anywhere" topic covering Remote Control, Channels, and Desktop App dispatch
- [Level 2] !"Level 2 topics now grouped with a clickable index — find what you need faster" Topic index with anchor links grouped by category (Working Smarter, Working with Data, Working Remotely)
- [Level 3] Topic index with anchor links for all six topics
- [Overview] !"Clearer tool overview — what this guide sets up and what comes later" Added "What This Guide Sets Up" recommendation block

### Changed
- [Overview] !"Claude tool comparison redesigned — interfaces vs companion tools" Tool comparison table restructured into two tiers
- [Level 2] Topics reorganized into three groups: Working Smarter, Working with Data, Working Remotely
- [Overview] Removed VS Code/JetBrains from tool comparison — this guide teaches CLI, not IDE extensions
- [Overview] Claude Code Web marked as preview

## 2026-04-10

### Added
- [Overview] !"See all Claude tools compared side-by-side" Added tool comparison table
- [Overview] !"New showcase: see real apps people have built with Claude" Added "Where This Goes" section
- [Level 2] !"New topics: Teaching Claude About Your Project, Working with APIs, Prompt Engineering" Three new Level 2 skill topics
- [Level 3] !"New Level 3: Building Real Apps — web apps, databases, cloud deployment, auth, CI/CD, modern UI" Full Level 3 section added

### Changed
- [Nav] Reorganized navigation — setup phases, skill-building, and reference are now clearly separated
- [Phase 2] Updated to latest Claude model versions (Sonnet 4.6, Opus 4.6)

## 2025-02-23

### Added
- [Overview] !"Node.js added to setup list — request IT approval for all tools at once" Node.js now listed as 5th component
- [Phase 5] !"New section: how to switch between projects mid-session" Added Switching Projects steps

## 2025-02-21

### Added
- [Level 2] !"New Advanced Topics section: databases, API keys, large files, debugging" SQLite, SQL Server, API key management, large files, debugging with Claude
- [Tips] !"New tip: paste screenshots directly into Claude with Ctrl+V" Paste Images Liberally tip added
- [Phase 2] Model configuration step — default to Sonnet 4.5 to save tokens, with guidance on when to use Opus
- [Phase 2] PATH fix warning for Mac users after Claude CLI install
- [Phase 1] Troubleshooting for Mac Python version mismatch (old 3.9/3.10 showing instead of Homebrew version)
- [Phase 1] Tip about avoiding spaces in folder/project names
- [Phase 3] Note explaining why project root .gitignore is needed even though venv creates its own
- [All] "What's New" changelog popup for returning users

### Changed
- [Phase 4] Git config moved here from Phase 1 — now happens after GitHub account creation so users know which email to use
- [Phase 1] Updated version checks: Homebrew 5.x, Node v22+, Python 3.12-3.14
- [Phase 3] mkdir command now creates .claude and rules folder in one step
- [Nav] Renamed "Phase 1: VS Code" to "Installs", "Phase 3: Python" to "Project Setup"
- [All] Standardized terminal restart instructions to use `exit` command (clearer than "close tab")

### Fixed
- [Phase 2] Added PowerShell vs Command Prompt explanation for Windows users
