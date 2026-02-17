# Project Guidelines

> **Claude — READ THIS FIRST:** This is your primary instruction file for this project. Follow these rules every session.

## What This Is
Brief description of the project. *(Fill this in when setting up.)*

## Key Facts
- **Venv:** `source venv/bin/activate`
- **Run:** *(Fill in: e.g., `python main.py`, `streamlit run app.py`)*
- **Gotchas:** *(Fill in: any quirks or things that will bite you)*

---

## Auto-Loaded Context

The following files in `.claude/rules/` are **automatically loaded** into your context at session start:
- `PROJECT.md` — Business scope, goals, constraints
- `ARCHITECTURE.md` — Technical specs, stack, patterns
- `AI_CODING_GUIDELINES.md` — Coding standards and principles

You do NOT need to manually read these files — they're already in your context.

---

## Session Start Checklist

**Before executing any task, you MUST:**
1. Skim the last 2-3 entries in `SESSION_LOG.md` for recent context
2. Confirm you understand the task scope — ask if unclear

Do not skip these steps. Do not assume.

---

## Session End Checklist

**Before the session closes, you MUST:**
1. Update `rules/PROJECT.md` if scope, goals, or features changed
2. Update `rules/ARCHITECTURE.md` if tech decisions or patterns changed
3. Offer to push changes to GitHub if any code was written
4. Add a dated entry to `SESSION_LOG.md` (2-4 bullets max)

---

## File Structure

```
.claude/
├── CLAUDE.md              ← This file (auto-loaded)
├── SESSION_LOG.md         ← Session history (read on demand)
└── rules/                 ← Everything here is auto-loaded
    ├── PROJECT.md
    ├── ARCHITECTURE.md
    └── AI_CODING_GUIDELINES.md
```
