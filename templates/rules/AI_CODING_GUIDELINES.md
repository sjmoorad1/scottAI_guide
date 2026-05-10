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

## Azure Deployment — GitHub Actions Setup

When deploying a Flask app to Azure App Service with GitHub Actions CI/CD, there are **manual Portal steps** that cannot be automated via CLI. These are routinely missed and cause failed deployments.

**After creating the App Service and workflow file, complete these steps:**

1. **Enable SCM basic auth** (CLI — do this first):
   ```bash
   az resource update --resource-group <rg> --name scm \
     --namespace Microsoft.Web --resource-type basicPublishingCredentialsPolicies \
     --parent sites/<app-name> --set properties.allow=true
   az resource update --resource-group <rg> --name ftp \
     --namespace Microsoft.Web --resource-type basicPublishingCredentialsPolicies \
     --parent sites/<app-name> --set properties.allow=true
   ```

2. **Download publish profile** (Portal — cannot be done via CLI, it redacts credentials):
   - Azure Portal → App Services → `<app-name>` → toolbar → **"Get publish profile"**
   - Downloads a `.PublishSettings` XML file to your Downloads folder

3. **Add as GitHub secret** (GitHub — must be done in browser):
   - Open the downloaded `.PublishSettings` file in a **text editor**
   - **Select All** (Cmd+A / Ctrl+A) → **Copy** (Cmd+C / Ctrl+C) — it's XML, copy the full content
   - Go to: `https://github.com/<owner>/<repo>/settings/secrets/actions/new`
   - Name: `AZUREAPPSERVICE_PUBLISHPROFILE_<APPNAME>` (uppercase, underscores, no hyphens)
   - Secret: **paste** the full XML content
   - Click **"Add secret"**

4. **Trigger first deploy**:
   - Go to the repo's **Actions** tab → select the workflow → click **"Run workflow"** → confirm
   - Or: `gh workflow run "<workflow name>" --repo <owner>/<repo> --ref main`
   - Or: push a change to `main` that touches a watched path

**Critical App Service setting for first deploy:**
```bash
az webapp config appsettings set --name <app-name> --resource-group <rg> \
  --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true
```
Without this, the publish profile deploy copies files directly but **skips the Oryx build** — meaning `requirements.txt` is never installed and the app crashes with `ModuleNotFoundError`. This setting tells Azure to run `pip install -r requirements.txt` and build the `antenv` venv during deployment.

**Do NOT attempt zip deploy, `az webapp up`, or other CLI-based deployment shortcuts.** These routinely fail due to file size, connection timeouts, or missing exclusions. Let GitHub Actions handle deployment — it's the proven pattern.

---

## Pre-Code Checklist

- [ ] Stated approach and got confirmation?
- [ ] Read existing code and validated schemas/structures?
- [ ] Only modifying what's needed, at the right layer?
- [ ] Checked for existing implementations to reuse?

---

*These guidelines apply regardless of technology stack, hosting platform, or project complexity.*
