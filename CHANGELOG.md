# Changelog

User-facing changes to the Agentic AI Setup Guide. Internal fixes (typos, CSS tweaks) are not logged.

## 2026-04-11

### Added
- [Level 2] New "Accessing Claude from Anywhere" topic — Remote Control, Channels (Telegram/Discord/iMessage), and Desktop App dispatch
- [Level 2] Topic index with anchor links grouped by category (Working Smarter, Working with Data, Working Remotely)
- [Level 3] Topic index with anchor links for all six topics
- [Overview] "What This Guide Sets Up" recommendation block — tells readers exactly what Phases 1–5 install and what comes later

### Changed
- [Overview] Tool comparison table restructured into two tiers: "Claude Code — Same Engine, Different Interfaces" and "Other Claude Tools"
- [Level 2] Topics reorganized into three groups: Working Smarter (prompts, project config, debugging), Working with Data (SQLite, SQL Server, large files, APIs, keys), Working Remotely (new)
- [Overview] Removed VS Code/JetBrains from tool comparison — this guide teaches CLI, not IDE extensions
- [Overview] Claude Code Web marked as preview

## 2026-04-10

### Added
- [Overview] "Which Claude Tool Is Right?" comparison table — CLI, Desktop App, Web, Chat, IDE, Excel side-by-side
- [Overview] "Where This Goes" showcase — see real apps people have built with Claude
- [Level 2] New topics: Teaching Claude About Your Project, Working with APIs, Prompt Engineering
- [Level 3] New "Building Real Apps" section — Web Apps, Databases, Cloud Deployment, Auth, CI/CD, Modern UI

### Changed
- [Nav] Reorganized navigation — setup phases, skill-building, and reference are now clearly separated
- [Phase 2] Updated to latest Claude model versions (Sonnet 4.6, Opus 4.6)

## 2025-02-23

### Added
- [Overview] Node.js added as 5th component — now visible upfront so users can request IT approval for all tools at once
- [Phase 5] "Switching Projects" section — steps for changing projects mid-session (deactivate venv, cd, reactivate)

## 2025-02-21

### Added
- [Level 2] New "Advanced Topics" section: SQLite basics, SQL Server connections, API key management, working with large files, debugging with Claude
- [Tips] "Paste Images Liberally" tip — explains Ctrl+V for images on Mac
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
