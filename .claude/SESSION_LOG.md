# Agentic AI Setup Guide - Session Log

## 2026-04-10: Major restructure — Level 2/3 split, nav redesign, content expansion
- **What was done:** Added 3-level structure (L1: Setup, L2: Skills, L3: Apps). Created 3 new L2 topics (CLAUDE.md/Memory, APIs, Prompt Engineering) and 6 full L3 topics (Web App, Databases, Cloud Deploy, Auth, CI/CD, Modern UI). Added "Choose Your Tool" comparison table, "Where This Goes" showcase, graduation hooks. Merged Tips into Reference tab. Restructured nav with visual divider. Fixed DOM order to match nav order. Updated model refs to 4.6.
- **Key decisions:** CLI-first teaching path (not Desktop) because terminal literacy is needed for L2-L3. Tips duplicated in-context AND in Reference tab (training reinforcement, not DRY violation — documented in CLAUDE.md). L3 is full content not teasers.
- **Gotchas:** DOM reorder of Reference section was complex — orphaned content from partial edits required sed cleanup. Screenshot of Reference showed Tips tab missing during mid-edit state (expected, fixed by completing the move).
- **Next steps:** Add 3 showcase screenshots (dashboard, inventory, analytics). Review multi-role findings and consider addressing lower-priority items (hidden dot-folders note, context window management topic).

## 2026-02-16: Trainee feedback fixes, walkthroughs, command explanations
- Fixed `code` command issue - replaced with File → Open Folder instructions
- Added restart terminal after Homebrew + Claude CLI installs with PATH troubleshooting
- Clarified Claude vs terminal: added callout box, Part A/B/C structure, consistent labels
- Improved Homebrew explanation ("like an app store for developer tools")
- Added command syntax notes for mkdir, cd, &&, git commands throughout
- Added phase completion logging to Google Sheets
- Completed novice + expert walkthroughs - all technically verified

## 2026-02-14: Icons, email logging, PRD content
- Replaced all emoji with flat filled SVG icons; fixed CSS conflicts causing double icons/logos
- Added email capture + Google Sheets logging (success/failed/return visits)
- Added PRD section to principles, glossary, and new Reference tab
