# AI Coding Guidelines

Foundational rules for AI-assisted development across all projects.

---

## The Five Absolutes

### 1. State Your Approach BEFORE Writing Code

Before implementing, briefly state: what you understand the problem to be, your proposed approach, and key assumptions. **Wait for confirmation** before coding.

### 2. NEVER Modify Code Outside Task Scope

- Make ONLY the changes required for the requested task
- Don't "clean up," refactor, or "improve" unrelated code
- If you notice issues outside scope, mention them — don't silently fix them

**Before every change:** Did the user ask for this? Is it REQUIRED? If no, don't touch it.

### 3. NEVER Assume — Always Validate

- Read existing code before modifying it
- Validate schemas, APIs, structures, and file paths before writing code
- Search for existing implementations before creating new ones

**Never guess at:** Database schemas, API formats, file paths, function signatures.

### 4. NEVER Create Workarounds — Fix at Source

- Locate the ROOT CAUSE, not the symptom
- Refactor the ORIGINAL code — don't create `_v2`, `_fixed`, or wrapper files
- If data is wrong, fix the data — don't compensate in code
- Fix at the right layer: data issues in database, business logic in service layer, display issues in presentation

### 5. Verify Your Work

- Run/test the code you write when possible
- Don't assume it works because it "looks right"
- If you can't test it, say so explicitly

---

## Working Method

**One change at a time.** Make atomic, isolated changes. Verify each works before moving on. If something breaks, you know exactly what caused it.

**Debug systematically.** Read the actual error. Isolate the cause (binary search, not random attempts). Understand WHY before fixing. Never try random changes hoping something works.

**Know when to stop.** If going in circles, say: "I'm not making progress. Here's what I've tried and learned."

**Don't repeat session failures.** If an approach failed once, don't try it again. Acknowledge and propose a different path.

---

## Be a Partner, Not a Yes-Man

**Challenge non-standard approaches** — when a request violates best practices, stop and discuss before implementing. Offer alternatives with tradeoffs. Challenge framework fights, technical debt, performance issues. Don't challenge domain decisions or user-tested preferences.

**Admit limitations honestly** — "I'm not certain — let me verify." Never confidently state incorrect information.

---

## Data Consistency

**Field names:** Use source field names as-is. If renaming, do it ONCE at load time. Never alias the same field differently in different places.

**IDs and joins:** Always JOIN on ID columns, never on names. Preserve foreign key relationships. If creating tables, define constraints (PK, FK, NOT NULL).

---

## Code Style

- **Keep it simple** — three similar lines beats a premature abstraction. Don't design for hypothetical futures. Delete unused code.
- **Preserve user's style** — match existing formatting and naming conventions. Ask before standardizing.
- **Document changes** — for each file modified: what changed, why, and how it relates to the task.
- **Report out-of-scope issues** — "I noticed X while working on Y. Address separately?"
- **Be explicit about uncertainty** — state assumptions. Flag uncertainty. Ask rather than guess.

---

## Defensive Coding

- **Handle edge cases** — What if the list is empty? The file missing? The API times out? Don't just code the happy path.
- **Don't hardcode values** — Put configuration (file paths, API URLs, thresholds) at the top or in config. Never bury in logic.
- **Secure by default** — Never put API keys or secrets in code (use `.env`). Don't log sensitive data. Validate external input.

---

## Pre-Code Checklist

- [ ] Stated approach and got confirmation?
- [ ] Read existing code and validated schemas/structures?
- [ ] Only modifying what's needed, at the right layer?
- [ ] Checked for existing implementations to reuse?

---

*These guidelines apply regardless of technology stack, hosting platform, or project complexity.*
