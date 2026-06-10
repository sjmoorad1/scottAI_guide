# Changelog

User-facing changes to the Agentic AI Setup Guide. Internal fixes (typos, CSS tweaks) are not logged.

## 2026-06-10

### Fixed
- [Phase 2] !"Default model and effort commands updated — `claude config set` no longer exists; use `/model sonnet` and `/effort high` inside a Claude session (they now save as your default)" Replaced `claude config set model sonnet` and `claude config set effortLevel high` (removed subcommand, silently swallowed as a chat prompt in v2.1.170) with in-session `/model` and `/effort` slash commands, which persist as defaults since v2.1.153. Code labels changed from "Terminal" to "Inside Claude" and added a note about the interactive `/model` picker.

### Added
- [Phase 2] !"New troubleshooting note for Mac: installed Claude with Homebrew? It can't auto-update — here's how to switch to the native installer" Accordion in Step 2.2 (Mac block) explaining Homebrew casks can't self-update and `claude-code` lags ~1 week, with a one-line migration command (uninstall both casks, run native installer) and a warning not to use `brew upgrade` afterward.

### Changed
- [Phase 2] !"Recommended default model is now Opus — use Sonnet only if you're watching your quota" Flipped the model recommendation from Sonnet-default/Opus-when-needed to Opus-default/Sonnet-for-routine-tasks. Updated the Phase 2 model section, the "When to use" callout (now Sonnet-focused), and both `"model"` values in the Tips tab settings.json example.

## 2026-06-09

### Fixed
- [Phase 3] !"Windows commands now work in PowerShell — replaced `&&` (unsupported in the built-in Windows PowerShell) with `;`, and fixed `%USERPROFILE%` to `$env:USERPROFILE`" The guide directs Windows users to PowerShell, but Windows PowerShell 5.1 (shipped with Windows 10/11) does not support `&&`. Fixed the `&&` in the create-project-folder and `mkdir .claude` variants, added proper PowerShell variants to both git command blocks (git init/add/commit and git add/commit/push), corrected `%USERPROFILE%` to `$env:USERPROFILE` in the projects-folder and switch-project commands, and updated the && explanation note. (The `%USERPROFILE%` in the PATH/Environment-Variables GUI step is left as-is — correct for that dialog.)

## 2026-05-25

### Added
- [Level 2] !"New topic: Keeping Long Sessions Sharp — why Claude drifts in long sessions and when to start a fresh one" New advanced-session-hygiene content block under Working Smarter, placed between Teaching Claude About Your Project and Debugging with Claude. Covers context rot, drift symptoms, when-to-start-fresh trigger table, what carries between sessions vs. what doesn't.
- [Tips] !"New section: Catching Claude's Shortcuts — six shortcut patterns, warning phrases to listen for, and a 60-second pre-commit audit" Added between Code Reviews & Quality Checks and Safety Basics. Six principle cards, warning-phrase translation table, and a copy-pasteable pre-commit audit prompt.
- [Level 3] !"Testing & Mechanical Guards: added Tier 5 — git hooks that catch mistakes at commit time, before CI" New Tier 5 accordion in level3-guards covering pre-commit (diff-only audit) and commit-msg (plan-item reference) hooks, with install_hooks.sh symlink pattern and Ask-Claude prompt.

## 2026-05-16

### Changed
- [Level 3] !"Mechanical Guards expanded into a full 'Testing & Mechanical Guards' section with four tiers: smoke tests, functional tests, mechanical guards, and CI quality gates" Restructured level3-guards block: kept original SSOT/security/framework guard content as Tier 3, added Tier 1 (import/route/page smoke), Tier 2 (unit/integration/form validation/data round-trip/lifecycle/browser/edge case/regression/P0-P1-P2), and Tier 4 (style/format, type checks, security scans, schema drift, resource lifecycle, env guards, test quality meta). Each tier follows the existing What it is / Why / list / Ask Claude pattern — no new CSS introduced.
- [Level 3] Renamed topic-index link from "Mechanical Guards" to "Testing & Mechanical Guards"
- [Level 3] Wrapped the four testing tiers in collapsible accordions (reusing existing troubleshoot-accordion pattern) so readers get a one-line overview per tier and can expand only what they need. Tier 1 open by default.

## 2026-05-11

### Added
- [Level 3] !"New topic: Mechanical Guards — pytest tests that scan your codebase on every push and fail when Claude reintroduces a banned pattern (SSOT, security, framework rules)" New level3-guards content block between CI/CD and Modern UI Patterns, with three grouped categories of guards, AST example, and Ask-Claude prompt
- [Level 3] Added `pytest` step to the CI/CD GitHub Actions YAML example so the guard suite runs on every push

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
