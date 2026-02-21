# Changelog

User-facing changes to the Agentic AI Setup Guide. Internal fixes (typos, CSS tweaks) are not logged.

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
