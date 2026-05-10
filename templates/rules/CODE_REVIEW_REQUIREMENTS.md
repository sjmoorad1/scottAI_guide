# Code Review & Refactor Requirements

## The Problem This Solves

Claude repeatedly claims thoroughness but misses basic bugs. Prior "refactors" missed duplicate queries, data loss on form edits, overcounting in analytics, and missing fields on UI forms. The pattern: Claude reads a few key files, extrapolates, says "looks good," then real users find the bugs.

---

## The Rules

### 1. Read Every Line. Literally.

Not "scan for patterns." Not "check the key files." Open every file, read every line, top to bottom. Track what you've read:

```
Files read: ✓ / ✗
app/__init__.py ✓ (29 lines)
app/routes/main.py ✓ (367 lines)
app/templates/index.html ✓ (121 lines)
app/templates/partials/list.html ✗ ← NOT DONE
```

If you haven't read a file, you cannot make claims about it. **Include partials, page templates, JS files, CSS, and migration files** — not just Python source.

### 2. Never Say "Looks Clean" Without Evidence

Bad: "Clean. No bugs."
Good: "Read lines 1-367. No bugs found. Specifically checked: all SQL parameterized (no f-string injection), all form fields match route handler expectations, all dynamic endpoints return proper responses, all queries include proper scoping."

### 3. Trace Complete Data Flows, Not Individual Files

A bug often lives in the gap between files. For every form/interaction, produce a written trace:

```
FLOW: Create [Entity]
  Template sends: field_a, field_b, field_c, [hidden: field_d, field_e]
  Route reads:    all of the above ✓
  DB INSERT:      table_1(N cols) ✓, table_2(M cols) ✓
  Response:       success template (field_a, field_b) ✓
  Data loss?      None found — hidden fields preserve all DB columns
```

If field X exists in the DB but the form doesn't send it on save, that's a data loss bug. You will NOT find this by reading files in isolation.

### 4. Think As Every User Role

**Define the roles for your project**, then for every screen ask as each role:
- What do they need to accomplish on this screen?
- Can they complete their workflow end-to-end?
- Are the numbers/data they see accurate?
- What happens if they make a mistake?

Example roles to define: Admin, End User, Manager, Viewer, API Consumer. Tailor to your project's actual user personas.

If you can't walk through the complete workflow for each role, you haven't reviewed the UI.

### 5. Check List View, New Form, AND Edit Form Separately

Every entity has up to three surfaces:
1. **List/table view** — what columns are shown? Do they match the DB fields?
2. **New/add form** — what fields can the user enter? Are any missing vs the schema?
3. **Edit form** — does it populate ALL existing values? Does saving preserve fields the user didn't change?
4. **Detail view** (if applicable) — does it show ALL relevant data? Can user take actions?

The most common bug: a field exists in the DB but isn't shown or editable, or saving a form nulls fields not included in the submission. Check EVERY field on EVERY edit form against the DB schema.

### 6. Cross-Reference Every Query Against the Schema

For every database query, produce a written check:

```
QUERY: get_filtered_items (main.py:330-354)
  Tables: items i, categories c
  JOIN: i.category_id = c.id ✓
  Columns referenced: i.id, i.name, i.status, c.label ...
  All exist in schema? ✓
  Row multiplication? No — proper grouping ✓
  NULL handling? NULLS handled ✓
  Access scoping? Proper user/tenant filter ✓
```

Check specifically:
- Are all referenced columns actually in the table (check migration files or schema)?
- Are JOINs correct (not causing row multiplication)?
- Is aggregation correct (SUM of what? Per-row or per-join)?
- Are filters consistent with other queries for the same data? (SSOT)
- Does it handle NULLs?
- **Is every query properly scoped?** (user isolation, tenant isolation, soft-delete filtering — whatever your app requires)

### 7. Don't Fix While Reviewing

Read everything first. Log every bug. THEN fix. If you fix as you go, you'll stop reading after the first few bugs because you feel productive. You'll miss the deeper issues.

### 8. Build the Component Map

Before any refactor, produce this map (update it after changes):

```
ROUTE MAP:
  GET  /              → main.index → index.html (items, filters)
  GET  /items         → main.items_partial → partials/item_list.html
  POST /items/new     → main.create_item → redirect
  POST /items/<id>    → main.update_item → redirect
  ...

SERVICE/QUERY SSOT:
  service.py: get_items(), create_item(), update_item()
  helpers.py: shared utilities, formatters
  ...
```

This map is how future sessions avoid re-discovering the same issues.

### 9. Check Frontend/Backend Interaction Consistency

For every dynamic UI interaction (HTMX, Alpine.js, React, AJAX, etc.):
- What triggers the request? (click, submit, change event)
- What endpoint does it hit?
- What does the response look like? (JSON, HTML partial, redirect)
- **Does the response match what the client expects?**
- **Do form field names match what the backend handler reads?**

Common bugs:
- Client sends field names the backend doesn't read
- Backend returns a format the client doesn't handle
- Edit/update handler misses fields → nulled on save

### 10. Check Access Control & Data Isolation

**Define your app's access model**, then verify every route enforces it:
- Multi-tenant: Every query scoped by tenant/org ID?
- Role-based: Every route checks permissions?
- Ownership: Users can only access their own data?

For each route, verify: "If I manipulate the URL or request, can I access data I shouldn't?"

### 11. Check for Inconsistencies Across Similar Surfaces

When the same concept appears in multiple places, verify consistency:
- **Dropdown options**: Are values the same in add form vs edit form?
- **Field names/labels**: Is the same field called the same thing everywhere?
- **Status badges/colors**: Same styling for same statuses across all pages?
- **Sort/filter behavior**: Consistent across similar views?
- **Error handling**: Do all similar routes handle errors the same way?

### 12. Check Resource Lifecycle (Connections, Files, Memory)

For every database connection, file handle, or external resource:
- Is cleanup guaranteed on ALL paths (success, exception, early return)?
- Use try/finally or context managers — not just try/except that renders a template
- Are transactions committed/rolled back properly?

### 13. DRY Violations

Flag duplicate code patterns:
- Same query pattern repeated with slight variations
- Same helper function in multiple files
- Same HTML/template structure repeated across partials

Don't fix during review — just log with locations. Propose consolidation only after the full review.

### 14. Verify Fixes With Real Data

Don't just check that the code runs. Test against actual data in the real database. Compare old output vs new output. If you fixed a counting bug, show the before/after numbers. If you can't connect to the DB, state this explicitly rather than claiming the fix works.

### 15. Simplest Solution First

Before building a complex solution, ask: is there a simpler way? Don't introduce new libraries or patterns when the existing stack handles it. Three lines of repeated code is better than a premature abstraction.

---

## UI/UX Review Checklist

**Define your app's primary context** (mobile-first? Desktop? Tablet on factory floor?) then review accordingly:

### Usability
- **Touch/click targets**: Are interactive elements large enough for the context?
- **Input fields**: Do they trigger the right keyboard type? Are labels clear?
- **Viewport**: No unexpected overflow or scroll issues?
- **Responsiveness**: Does the layout work at the target screen sizes?

### Loading & Error States
- **Slow operations**: What does the user see during async calls?
  - Spinner/indicator visible? Submit button disabled to prevent double-submit?
- **Error responses**: When something fails, does the user get a clear, actionable message?
  - Not a blank screen, not a raw exception, not a generic "Something went wrong"
- **Empty states**: What shows when there's no data?
  - Helpful message, not a blank void

### Navigation & Flow
- **Back navigation**: Can the user always get back?
- **Dead ends**: After completing an action, where does the user go next?
- **Current location**: Is it always clear which page/section the user is on?
- **State preservation**: If the user refreshes, do they lose work?

### Visual Consistency
- **Typography hierarchy**: Consistent heading/body sizes across pages
- **Color usage**: Status colors mean the same thing everywhere
- **Spacing**: Consistent padding/margins between similar elements
- **Component patterns**: Cards, buttons, inputs look the same in all contexts

### Produce the UI/UX Audit

For each screen, write:
```
SCREEN: [Page Name] (/route)
  Usability:       ✓ / ⚠ [notes]
  Loading state:   ✓ / ⚠ [notes]
  Empty state:     ✓ / ⚠ [notes]
  Error state:     ✓ / ⚠ [notes]
  Navigation:      ✓ / ⚠ [notes]
  Consistency:     ✓ / ⚠ [notes]
  Issues found:    None / [list with severity]
```

---

## Refactoring Best Practices

When moving from review to refactor:

### Fix Priority Order
1. **Data correctness** — bugs that produce wrong numbers, lose data, or corrupt state
2. **Security/isolation** — access control leaks, injection vectors, auth bypasses
3. **Data loss on edit** — forms that null fields not shown in the edit UI
4. **Broken interactions** — buttons that don't work, forms that silently fail
5. **UX inconsistencies** — mismatched options, wrong labels, stale names
6. **Performance** — redundant queries, N+1 patterns, unnecessary subqueries
7. **DRY/cleanup** — duplicate helpers, dead code (lowest priority)

### One Change at a Time
- Make one fix, verify it works, then move to the next
- If a fix touches multiple files, group them as one logical change
- Don't bundle unrelated fixes — they mask each other's breakage

### Preserve Existing Behavior
- Before refactoring a query, understand what it currently returns
- Before consolidating duplicates, verify they're truly identical (not subtly different)
- Before changing HTML/template structure, verify all dynamic bindings still work

### Don't Over-Engineer the Fix
- If a bug is "missing access check", add it — don't restructure the entire route
- If a dropdown is inconsistent, make them match — don't build a config system
- If a connection leaks, add try/finally — don't rewrite the DB layer

---

## Reference Files

During any review, also check code against these project rules:

- **`.claude/rules/AI_CODING_GUIDELINES.md`** — The Five Absolutes (state approach first, never modify outside scope, never assume, never create workarounds, verify your work), defensive coding, data consistency, code style
- **`.claude/CLAUDE.md`** — Project overview, architecture, key design decisions
- **`.claude/SESSION_LOG.md`** — Recent session history and decisions

Every bug found should be checked against the AI Coding Guidelines to determine if a guideline was violated and how to prevent recurrence.

---

## GCP / Cloud Run Deployment Review

When the project deploys to GCP Cloud Run, verify these on every review:

### Dockerfile
- **Non-root user**: Dockerfile creates and switches to a non-root user (`RUN adduser --disabled-password appuser && USER appuser`). Running as root in a container is a security violation.
- **Multi-stage build**: Build dependencies (gcc, build-essential) are in a builder stage only. The runtime image should contain only the app, its dependencies, and the runtime. If the final image has a compiler installed, that's a finding.
- **No secrets in image**: No `.env` files, credentials, tokens, or API keys copied into the image. Check every `COPY` line. Secrets go in Secret Manager or environment variables injected at deploy time.
- **Pinned base image**: `FROM python:3.13-slim` not `FROM python:latest`. Unpinned tags cause non-reproducible builds.
- **Health check**: A `/health` or `/healthz` endpoint exists and returns 200 with a body that confirms DB connectivity (not just `return "ok"` — actually test the connection).

### Cloud Run Config
- **Concurrency**: Set explicitly (`--concurrency=80` or in `service.yaml`). Default of 80 is usually fine. If the app holds DB connections per request, concurrency must not exceed the connection pool size.
- **Min instances**: For production, `--min-instances=1` avoids cold starts. For dev/staging, 0 is fine.
- **Memory**: At least 512Mi for Python apps with pandas/openpyxl. 256Mi will cause OOM on data processing.
- **Timeout**: Set to match the longest expected request (e.g., 120s for report generation). Default 300s is too generous — it hides slow requests.
- **CPU allocation**: `--cpu-throttling` (default) vs `--no-cpu-throttling`. Background tasks (schedulers, email sends) need `--no-cpu-throttling` or they stall between requests.

### Secret Manager
- Every secret referenced in code has a corresponding Secret Manager entry (or env var in Cloud Run config). Grep for `os.environ`, `os.getenv`, `app.config` — each one must be sourced from Secret Manager or Cloud Run env vars, never hardcoded.
- Secret versions: If the code references a specific version (`/versions/latest`), verify that `latest` is the intended version, not a stale one.

### CI/CD
- **Workload Identity Federation**: GitHub Actions should use keyless auth (WIF), not stored service account keys. Look for `google-github-actions/auth` with `workload_identity_provider`. If you see a `credentials_json` secret, that's a finding.
- **Deployment target**: The workflow deploys to the correct project, region, and service name. Typos here deploy to the wrong service silently.
- **Build triggers**: Verify the `paths` filter (e.g., `KFToolbox/**`) matches the actual project directory. A missing filter deploys on every push to any file.

---

## Database Query Performance Review

For every database query in the codebase:

### N+1 Detection
- **Any query inside a `for` loop is a red flag.** Trace the call: does the function hit the DB? Does the loop call it per-item? Example: `for store in stores: get_sales(store.id)` — that's N+1.
- **Fix pattern**: Load all data in 1-2 batch queries with `WHERE id IN (...)` or a single unfiltered query, then filter/group in Python. The cost of transferring extra rows is almost always less than N round trips.

### Batch Query Patterns
- Every page/endpoint should hit the DB at most 2-3 times total. Count the distinct DB calls in each route handler. If you count more than 5, something should be batched or pre-computed.
- Settings/config values: Load ALL settings in one query at the start of the request. Never call `get_setting('key')` inside a loop or per-store.

### Missing Indexes
- For every `WHERE`, `JOIN ON`, and `ORDER BY` column: does an index exist? Check the migration files or schema. If the query filters on `store_id + period_date` and there's no composite index, that's a finding.
- **Covering indexes**: For queries that only need a few columns, a covering index avoids table lookups entirely.

### Connection Management
- One connection per request, reused across all queries in that request. Not one connection per query.
- Connection pooling configured if the framework supports it. For Cloud SQL with Unix sockets, pool size should match Cloud Run concurrency.
- Connections closed on ALL paths (success, error, early return). Use `try/finally` or context managers.

### Parameterized Queries
- **Every query must use parameterized placeholders** (`%s` for MySQL/pymysql, `$1` for Postgres, `?` for SQLite). Never f-strings, never string concatenation, never `.format()`.
- **LIKE clauses**: The `%` wildcard must be in the parameter value, not in the SQL string. `WHERE key LIKE %s` with parameter `'payroll_%'` — not `WHERE key LIKE 'payroll_%'`. The latter crashes pymysql because `%` is a format placeholder.
- Check every occurrence of `cursor.execute()` and `db.execute()`. If the SQL string contains any variable interpolation, that's an injection vector.

### EXPLAIN Analysis
- Any query that joins 3+ tables or scans more than 10,000 rows should have been tested with `EXPLAIN` (or `EXPLAIN ANALYZE` for Postgres). If you're reviewing a slow route, ask for the query plan.

---

## Database Migration Review

For every migration file or schema change:

### Backwards Compatibility
- **Can the old code still run during deployment?** If you rename a column, old code will crash until the new code deploys. For zero-downtime deploys: add the new column first, deploy code that writes to both, then drop the old column in a later migration.
- **Default values**: New NOT NULL columns must have a DEFAULT or a backfill. Otherwise the INSERT from old code (which doesn't know about the new column) will fail.

### Data Backfill Strategy
- `UPDATE ... SET new_col = computed_value WHERE condition` — does the WHERE correctly target only the rows that need it? A missing WHERE updates every row.
- For large tables (100K+ rows): batch the UPDATE (`LIMIT 1000` in a loop) to avoid locking the entire table.
- Verify with a SELECT count before and after.

### Rollback Plan
- `DROP COLUMN` is irreversible — data is gone. If the migration adds AND drops columns, the drop should be in a separate, later migration.
- `DROP TABLE` — only after confirming no code references it. Grep the entire codebase for the table name.

### Constraints
- Unique constraints: Will the INSERT fail for existing duplicate data? Check with `SELECT col, COUNT(*) GROUP BY col HAVING COUNT(*) > 1` before adding the constraint.
- Foreign keys with CASCADE: Does `ON DELETE CASCADE` on a parent table delete child rows the user expects to keep? Cascade behavior must be explicit and intentional.

### Index Creation
- On tables with 100K+ rows, `CREATE INDEX` locks the table (MySQL) or is concurrent-safe (Postgres `CREATE INDEX CONCURRENTLY`). Know which DB you're on and use the appropriate approach.

---

## Accessibility Review (WCAG 2.1 Minimum Bar)

### Semantic HTML
- `<button>` for clickable actions, not `<div onclick>` or `<a href="#">`. Divs are not focusable or keyboard-accessible.
- `<table>` for tabular data, not a grid of `<div>`s. Tables get free screen reader row/column announcements.
- `<nav>` for navigation, `<main>` for primary content, `<aside>` for sidebars. Screen readers use these landmarks.
- Headings (`<h1>`–`<h6>`) in order. No skipping levels (h1 → h3). One `<h1>` per page.

### Form Labels
- Every `<input>`, `<select>`, and `<textarea>` must have a `<label>` with a matching `for` attribute, or be wrapped in a `<label>`. Placeholder text is NOT a label — it disappears on focus.
- Icon-only buttons (e.g., a gear icon for settings) must have `aria-label="Settings"`.

### Color Independence
- Color alone must never be the sole indicator of meaning. Traffic light red/yellow/green must also include text labels ("Over Target", "At Target", "Under Target") or icons.
- Minimum contrast ratios: 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold). Use a contrast checker tool.

### Keyboard Navigation
- Tab order follows visual order. Use `tabindex="0"` to make custom elements focusable, never positive tabindex values.
- Focus states visible — every interactive element must show a visible focus ring (`:focus-visible` outline). Never `outline: none` without a replacement.
- Modals/sheets trap focus — Tab cycles within the modal, not behind it. Escape closes the modal.

### Screen Reader Compatibility
- `aria-label` on icon-only buttons and links.
- `aria-live="polite"` on regions that update dynamically (HTMX swap targets, toast messages).
- `role="alert"` on error messages so screen readers announce them immediately.
- `aria-hidden="true"` on decorative icons/images that add no information.

---

## Mobile Responsiveness Review

### Viewport
- `<meta name="viewport" content="width=device-width, initial-scale=1">` in the `<head>`. Without this, mobile browsers render at desktop width and scale down.

### Touch Targets
- All interactive elements (buttons, links, inputs) at least 44x44px. This is Apple's HIG minimum. 48px is better for factory/warehouse contexts.
- Adequate spacing between touch targets — at least 8px gap so adjacent taps don't misfire.

### Breakpoints
- Test at three widths: 375px (iPhone SE), 768px (iPad), 1024px (laptop). No horizontal scroll at any width.
- Tables wider than the viewport: wrap in a horizontal scroll container (`overflow-x: auto`) with a visible scroll indicator.
- Sidebar navigation: collapses to hamburger menu or bottom nav on mobile.

### Typography
- Body text minimum 16px on mobile. Smaller text (12-14px) is acceptable only for secondary metadata.
- iOS auto-zoom on input focus: any `<input>` or `<select>` with `font-size < 16px` triggers iOS zoom. Set input font-size to at least 16px.

### Layout
- Flexbox/grid layouts that reflow to single-column on narrow screens. No fixed-width containers wider than 375px.
- Images: `max-width: 100%` and `height: auto` to prevent overflow.
- Long text: `word-break: break-word` or `overflow-wrap: break-word` on containers that might receive user-generated content.

---

## Print Stylesheet Review

### @media print Rules
- A `@media print` block exists in the main stylesheet (or a separate `print.css`). If there's no print styling at all, that's a finding.

### Hidden Elements
- Navigation, header bars, footers, toolbars, filters, and floating action buttons are hidden in print (`display: none`).
- Sidebar collapsed/hidden. Only the main content area prints.

### Backgrounds and Colors
- `-webkit-print-color-adjust: exact; print-color-adjust: exact;` on elements where background color carries meaning (traffic lights, status badges, KPI cards).
- Without this, browsers strip backgrounds and the output is meaningless white cells.

### Page Breaks
- `break-inside: avoid` on table rows, cards, and chart containers. Tables should not split a row across pages.
- `break-before: page` on major sections if the document has natural page boundaries (e.g., per-store reports).

### Monochrome Safety
- Colors that are distinguishable in color must also be distinguishable in grayscale. Red vs green traffic lights print as identical gray without text labels.
- Test: print to PDF, convert to grayscale, verify all information is still readable.

### Page Size
- Set a default with `@page { size: letter; margin: 0.5in; }` (or `A4` for non-US). Without this, browsers use their default which varies.

---

## Email HTML Rendering Review

If the project sends HTML emails:

### All Styles Inline
- **No `<style>` blocks** — Gmail strips them on mobile, Outlook ignores many of them. Every style must be an inline `style=""` attribute on the element.
- **No CSS classes** — email clients don't process `<link>` or `<style>`. Class names do nothing.
- **No shorthand properties** in Outlook — use `padding-top: 10px; padding-right: 10px;` not `padding: 10px`.

### Table-Based Layout
- Use `<table>` for layout, not `<div>` with flexbox/grid. Outlook uses Word's HTML renderer which doesn't support modern CSS layout.
- Nested tables for columns. `<td>` for each column. `width` attributes on `<td>`, not CSS width.
- `cellpadding="0" cellspacing="0" border="0"` on all layout tables.

### Images
- `alt` text on every `<img>`. Many clients block images by default — the alt text is what the user sees.
- Explicit `width` and `height` attributes (not just CSS). Outlook needs these to size images correctly.
- Images hosted at absolute URLs (not relative paths). `src="https://..."` not `src="/static/logo.png"`.

### Links
- All `href` values are absolute URLs. `href="/payroll/store/1"` won't work in email — needs `href="https://app.example.com/payroll/store/1"`.

### Width and Mobile
- `max-width: 600px` on the outermost container. Email clients have narrow viewports.
- For mobile: the email should be readable without horizontal scroll at 375px. Test in a mobile email client.

### Dark Mode
- Background colors must be set explicitly on every `<td>` and `<table>`. If you rely on default white, dark mode email clients will invert your text to white-on-white.
- Use both `background-color` and `background` for maximum compatibility.

### Testing
- Test in Gmail (web + mobile), Outlook (desktop + web), and Apple Mail. These are the three rendering engines that cover 90%+ of email clients.

---

## Error Logging & Observability Review

### Log Levels
- `logger.info()` for business events: user login, data import completed, report generated, email sent. These are the "what happened" breadcrumbs.
- `logger.warning()` for recoverable issues: missing optional data, fallback used, deprecated feature accessed.
- `logger.error()` for exceptions and failures: DB connection failed, email send failed, external API error. Always include the stack trace (`logger.error("msg", exc_info=True)` or `logger.exception("msg")`).
- `logger.debug()` for development-only detail: query parameters, intermediate calculations, timing.

### Sensitive Data
- Never log: passwords, tokens, API keys, session IDs, PII (email, phone, SSN), credit card numbers.
- Grep for `logger.*password`, `logger.*token`, `logger.*key`, `logger.*secret`. Any match is a finding.
- Request bodies logged? Make sure to redact sensitive fields.

### Structured Logging
- For Cloud Run: JSON-formatted logs so Cloud Logging can parse fields. Use `python-json-logger` or format as `{"severity": "INFO", "message": "...", "trace": "..."}`.
- Include a request ID or trace ID so logs from the same request can be correlated.

### Health Check Endpoint
- `GET /health` returns 200 with a JSON body: `{"status": "healthy", "db": "connected"}`.
- The endpoint must actually test the DB connection (run `SELECT 1`), not just return a static response.
- If the DB is unreachable, return 503 with `{"status": "unhealthy", "db": "error: ..."}`.

---

## Caching & Materialized Table Review

### Identify Cacheable Data
- Data that changes less frequently than it's read is a caching candidate. Weekly payroll data read hundreds of times per week? Materialize it. Real-time sales data? Don't cache.
- **Question to ask**: "If this data were 5 minutes stale, would anyone notice or care?" If no → cache it.

### Materialized Table Pattern
- Compute-heavy aggregations written to a dedicated table on a schedule (e.g., `fact_payroll_scorecard`).
- Refresh triggered by: (1) Cloud Scheduler cron, (2) manual refresh button in admin, (3) data load pipeline.
- Page reads do a simple `SELECT * FROM materialized_table WHERE ...` — no aggregation, no joins.
- The materialized table has a `last_refreshed` timestamp column or a row in `dim_app_settings`.

### Cache Invalidation
- **Time-based**: Refresh on a fixed schedule (e.g., daily at 2am, weekly after payroll closes).
- **Event-based**: Refresh when source data changes (e.g., after a data import endpoint is called).
- **Manual**: Admin button that triggers a refresh. Always available as a fallback.
- **Never compute on page load** for data that takes more than 2 seconds to compute. That's a materialize candidate.

### Stale Data Warning
- If the user is viewing materialized data, show when it was last refreshed: "Data as of 2026-04-23 2:00 AM CT".
- If the data is more than [threshold] old, show a warning: "Data may be stale — last refreshed 3 days ago."

---

## Data Visualization Accessibility Review

### Color Blindness Safety
- **Never use red-green as the sole differentiator.** 8% of males have red-green color blindness.
- **Protan-safe palette**: Use blue/teal/slate instead of red for elements that contrast against dark backgrounds (charcoal, black). Red on charcoal is invisible to protan users.
- **Pattern differentiation**: In addition to color, use patterns (hatching, dots), line styles (solid, dashed, dotted), or marker shapes (circle, square, triangle) to distinguish data series.
- Traffic light indicators: pair color with text ("Over", "At", "Under") or icons (arrow up, dash, arrow down).

### Chart Tooltips
- Every chart must have tooltips that show exact values on hover/tap. Users should not need to estimate values from axis position alone.
- Tooltip content: the data label, the exact value, and the unit (e.g., "Store 001: $45,230 Sales").

### Data Table Alternative
- For charts showing critical business data, provide a "View as table" option or a data table below the chart. Screen readers cannot interpret canvas-based charts.
- The table should contain the same data the chart visualizes, with sortable columns.

### Axis Labels
- Both axes labeled with units. "Sales ($)" not just "Sales". "Week Ending" not just a date.
- Y-axis formatted to match the data type: currency with `$` and commas, percentages with `%`, counts as integers.

---

## Shared Component Compliance Review

### CSS Design System
- All colors referenced via CSS custom properties (`var(--color-primary)`, `var(--color-surface)`), never hardcoded hex values in templates or inline styles.
- All spacing via custom properties or a consistent scale (`var(--space-sm)`, `var(--space-md)`).
- All typography via font-family custom properties and a size scale.

### Component Classes
- Shared component classes defined ONCE in the main stylesheet: KPI cards, data grids, toolbars, stat cards, comparison tables, chart containers.
- Every page uses the shared class. If a page has an inline style that duplicates a shared class property, that's a DRY violation.
- **Audit**: for every inline `style=""` attribute in templates, check if a shared class already covers it. If yes, remove the inline style and use the class.

### JavaScript Utilities
- Shared functions in a single JS file: sort handlers, color gradient functions, number formatters, date formatters.
- No duplicate utility logic across page-specific `<script>` blocks. If two pages format currency the same way, extract to the shared JS.

### New Pages
- Every new page must start from an existing page as a template. Copy the structure, swap the content. Don't invent a new layout.
- Check: does the new page's toolbar match the existing pattern? Same class names, same structure, same filter placement?
- Check: does the new page's data table use the same shared class as other tables? Same header styling, same sort behavior, same responsive behavior?

---

## Testing Review

### Manual Testing Checklist
- Every route hit at least once. Not "the main routes" — every single route, including API endpoints, admin pages, and error pages.
- Every user role tested end-to-end. Login as each role, walk through their complete workflow.
- Edge cases tested: empty data, zero values, null fields, single-item lists, maximum-length text, special characters in input.

### SQL Testing
- Every new or modified query tested against real data before deploying. Not "it looks right" — run it and verify the output.
- Compare query results against a known-good source (e.g., an Excel report, a manual calculation). If the numbers don't match, the query is wrong until proven otherwise.
- Test with boundary data: the first day of the month, the last day of the year, a store with no data, a period with no sales.

### UI Testing
- Tested on an actual mobile device (not just browser resize). Browser DevTools mobile mode misses: touch event behavior, iOS input zoom, scroll momentum, safe areas.
- Print tested with Cmd+P / Ctrl+P. The output should be clean, readable, and contain only the content (no nav, no toolbars).
- Tested in the target browsers: Chrome, Safari, Firefox at minimum. Edge if Outlook users are expected.

### Regression Testing
- After any fix, re-test the pages/features that were working before. Especially: if you changed shared CSS or shared JS, test EVERY page that uses those shared resources.

---

## Architecture Quick Reference

**Define your project's architecture here.** Example format:

| Layer | Technology | Key Files |
|-------|-----------|-----------|
| Backend | [Framework + DB driver] | `app/__init__.py`, `app/db.py` |
| Routes | [Routing pattern] | `app/routes/*.py` |
| Services | [Business logic layer] | `app/services/*.py` |
| Frontend | [Template/UI framework] | `app/templates/*.html` |
| Database | [DB type + hosting] | Schema: `migrations/*.sql` |
| Auth | [Auth approach] | `app/auth.py` |
| Hosting | [Platform] | Deployment config files |

**Fill this in for your project.** The specifics matter — this table tells Claude what to look at and where.

---

## How to Apply

Before starting any code review or refactor:

1. Read this file AND `AI_CODING_GUIDELINES.md`
2. Build the **file checklist** (all source, all templates, all partials, all JS, all migrations)
3. Read every file, mark each as done with line count
4. Build the **component map** (routes, templates, dynamic interactions, query patterns)
5. **Trace data flows** for each form/interaction — produce written flow traces
6. **Cross-reference queries** against schema — produce written column checks
7. **Check frontend/backend consistency** — does the client match the server contract?
8. **Check access control** — every read/write properly scoped?
9. **Run UI/UX audit** — walk through each screen using the checklist above, produce per-screen written audit
10. Walk through as **each defined user role** — end-to-end workflows, not just individual pages
11. Log ALL bugs with `file:line` references and severity (High/Medium/Low)
12. Check findings against AI Coding Guidelines
13. **Report the full bug list** (code + UI/UX) — do NOT start fixing yet
14. Get user confirmation on what to fix and in what order
15. Fix in priority order, one logical change at a time
16. Test fixes against real data (or state explicitly that you cannot)
17. Report what was fixed and what was verified
