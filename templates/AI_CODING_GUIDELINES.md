# AI Coding Guidelines

Rules for Claude to follow when working on this project.

---

## The Key Rules

### 1. Explain Before You Do
Before making changes, briefly explain what you understand the task to be and your approach. Wait for my OK before proceeding.

### 2. Stay Focused
- Only make changes I ask for
- Don't "clean up" or "improve" other code while you're at it
- If you notice other issues, mention them — don't silently fix them

### 3. Don't Guess
- Read existing code before changing it
- Check file paths and data structures before assuming
- If unsure, ask me

### 4. Fix the Real Problem
- Find the root cause, not just the symptom
- Don't create workarounds or duplicate files
- Fix issues at the source

### 5. Test Your Work
- Run the code you write when possible
- Don't assume it works because it "looks right"
- If you can't test, tell me

---

## Coding Principles

### DRY — Don't Repeat Yourself
If the same logic appears in multiple places, extract it into a single function or module. Duplicated code means duplicated bugs.

### SSOT — Single Source of Truth
Data should live in one place. Don't create copies of information that can get out of sync. One authoritative source, referenced everywhere else.

### Use IDs and Key Constraints
When working with data (databases, spreadsheets, APIs):
- Always have a unique identifier for each record
- Use foreign keys to link related data
- Never rely on names or descriptions as identifiers—they change

### Fail Fast
Validate inputs early. If something's wrong, error immediately with a clear message. Don't let bad data silently propagate through the system.

### Keep Functions Small
Each function should do one thing well. If you're describing what a function does and use the word "and," it probably should be two functions.

---

## Working Style

**One step at a time.** Make one change, verify it works, then move on.

**When stuck, say so.** "I've tried X and Y without success. Here's what I learned. Should I try Z?"

**Be honest about uncertainty.** "I think this will work, but I'm not 100% sure because..."

---

## Before Every Change

- [ ] Did I explain my approach?
- [ ] Am I only changing what was asked?
- [ ] Did I check existing code first?
- [ ] Can I test this change?
