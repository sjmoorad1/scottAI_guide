# Changelog

User-facing changes to the Agentic AI Setup Guide. Internal fixes (typos, CSS tweaks) are not logged.

## 2026-04-10

### Added
- [Overview] "Claude's Tools — Which One Is Right?" comparison table — CLI, Desktop App, Web, Chat, IDE, Excel
- [Overview] "Where This Goes" showcase section with screenshot placeholders showing real apps built with Claude
- [Level 2] Three new topics: Teaching Claude About Your Project (CLAUDE.md & Memory), Working with APIs, Prompt Engineering for Better Results
- [Level 3] New "Building Real Apps" section with 6 full topics: First Web App, Databases Beyond SQLite, Deploying to the Cloud, Authentication & Security, CI/CD with GitHub Actions, Modern UI Patterns
- [Level 1] Graduation hook at end of Phase 5 — "What's Next → Level 2"
- [Level 2] Graduation hook — "Ready to Build? → Level 3"
- [Level 2] Prerequisite self-assessment callout
- [Level 3] Prerequisite self-assessment callout

### Changed
- [Nav] Restructured with visual divider separating setup path (Phases 1-5) from advanced content (Level 2, Level 3, Reference)
- [Nav] Removed standalone Tips nav item — Tips merged into Reference as first tab
- [Nav] Added Level 3 nav item with "Apps" subtitle
- [Level 2] Renamed from "Advanced Topics" to "Leveling Up" with "Skills" subtitle
- [Reference] Tips & Best Practices now first tab in Reference section (tips remain duplicated in-context within phases for reinforcement)
- [Phase 2] Updated model references: Sonnet 4.5 → 4.6, Opus 4.5 → 4.6, simplified model IDs (no date suffix)
- [Footer] Copyright updated to 2025-2026

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
