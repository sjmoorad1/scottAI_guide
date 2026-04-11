# Agentic AI Setup Guide - Session Log

## 2026-04-10: Major restructure + multi-role review polish
- **What was done:** 3-level structure (L1 Setup, L2 Skills, L3 Apps). 9 new content sections. Nav redesign with divider. Tips merged into Reference. "Choose Your Tool" table. Showcase section with placeholders. Model refs → 4.6. Templates → Five Absolutes. Multi-role review fixes: glossary (+10 terms), hidden files note, banner manual dismiss, info-table mobile fix, /model + /compact commands, model docs link. "From Theory to Reality" duplicated into Tips tab + cross-linked from L2. Graduation block colors → warm gold.
- **Key decisions:** CLI-first (not Desktop) for terminal literacy. Tips duplicated intentionally (documented in CLAUDE.md). L3 full content not teasers. Graduation blocks: gold for L1/L2, green for L3 summit.
- **Gotchas:** DOM reorder required sed cleanup. info-table vs command-table CSS split needed for L2/L3 content tables. Graduation block color took 3 iterations (purple → rust → gold) to get contrast + warmth right. h3 needed `!important` white override due to global orange heading style.
- **Next steps:** Add 3 showcase screenshots (BHM BOT dashboard, Katz Roast inventory, ALH analytics). Consider: context window management L2 topic, scheduled scripts topic, Streamlit intermediate step before L3 Flask.

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
