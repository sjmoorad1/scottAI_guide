# Agentic AI Setup Guide - Interactive Web Tutorial Plan

## Research Summary

### Best-in-Class Tutorials Studied
- **Stripe Docs**: Three-column layout, live code execution, comprehensive coverage
- **Twilio Docs**: Interactive code snippets, embedded tutorials, TwilioQuest gamification
- **Canva Onboarding**: Personalized paths, progress indicators, interactive walkthroughs
- **Toggl**: User-controlled onboarding, milestones, optional guidance

### Key Design Patterns to Implement
1. **Clean, minimal layout** with bold typography
2. **Progress tracking** visible throughout
3. **Copy-to-clipboard** for all commands
4. **Collapsible/expandable sections** for deeper dives
5. **OS toggle** (Mac/Windows) that persists
6. **Visual hierarchy** with color-coded sections
7. **Mobile-responsive** design
8. **Dark/light mode** option

### Resources for Embedded Media
- **Anthropic Courses**: "Claude Code in Action" course available at anthropic.skilljar.com
- **Claude Code Docs**: Official documentation at code.claude.com/docs
- **GitHub CLI Quickstart**: docs.github.com/en/github-cli/github-cli/quickstart
- **VS Code Docs**: code.visualstudio.com/docs

---

## Tutorial Structure

### Header Section
- **Title**: "Agentic AI Setup Guide"
- **Subtitle**: "Get started with Claude CLI for analysis, automation & development"
- **OS Selector**: Large, prominent toggle - "I'm using: [Mac] [Windows]"
- **Progress Bar**: Visual indicator showing completion across all phases
- **Time Estimate**: "Total setup time: ~90 minutes (split across sessions)"

### Navigation (Sticky Sidebar or Top Nav)
| Section | Subsections |
|---------|-------------|
| Overview | What is Agentic AI?, What You Can Do, How It Works |
| Phase 1: Foundation | VS Code, Python, Git, Projects Folder |
| Phase 2: Claude CLI | Node.js, Claude CLI, Authentication, First Session |
| Phase 3: Project Setup | Virtual Environments, .claude Folder, Configuration |
| Phase 4: GitHub | Account, GitHub CLI, Version Control |
| Daily Workflow | Starting Sessions, Working with Claude, Saving Work |
| Reference | Commands, Glossary, Troubleshooting, Resources |

---

## Detailed Section Design

### 1. Overview Section

**What is Agentic AI?**
- Brief explanation (2-3 paragraphs)
- Key differentiator: "AI that doesn't just know—it DOES"
- Embedded: Short video or animated GIF showing Claude in action

**What You Can Do** (Interactive cards)
| Card | Examples | Icon |
|------|----------|------|
| Data Analysis | Read Excel, calculate summaries, find patterns | 📊 |
| Automation | Batch process files, rename, organize | ⚙️ |
| Document Processing | Parse PDFs, extract tables, convert formats | 📄 |
| Code Development | Build scripts, connect APIs, create tools | 💻 |
| Research | Gather info, compare sources, generate reports | 🔍 |
| Problem Solving | Debug issues, optimize processes | 🔧 |

**How It Works** (Visual flow diagram)
```
[You describe task] → [Claude reads files] → [Claude writes code] → [Claude runs it] → [You review results] → [Refine if needed]
```

---

### 2. Phase 1: Foundation Setup

**Step 1.1: Install VS Code**
- Numbered steps with screenshots
- Download button/link
- "What you'll see" preview image
- Checkbox: "I've completed this step"

**Step 1.2: VS Code Orientation** (Interactive)
- Labeled screenshot with clickable hotspots
- Click each area to learn what it does
- Mini quiz: "Where would you type commands?" → highlight Terminal

**Step 1.3: Install Package Manager**
- Mac: Homebrew instructions
- Windows: Direct downloads (no package manager needed for basics)
- Command block with copy button
- "Expected output" preview
- Troubleshooting accordion

**Step 1.4: Install Python**
- Platform-specific instructions
- Version verification command
- Common issues accordion

**Step 1.5: Install Git**
- Installation steps
- Configuration commands
- Verification

**Step 1.6: Create Projects Folder**
- Command with explanation
- Folder structure preview

**Phase 1 Checkpoint**
- Interactive checklist
- "Test your setup" commands
- Celebration animation on completion

---

### 3. Phase 2: Claude CLI Setup

**Step 2.1: Install Node.js**
- Platform-specific steps
- Verification command

**Step 2.2: Install Claude CLI**
- Updated installation command (from official docs):
  - Mac/Linux: `curl -fsSL https://claude.ai/install.sh | bash`
  - Windows: `irm https://claude.ai/install.ps1 | iex`
- Alternative: `npm install -g @anthropic-ai/claude-code`

**Step 2.3: Create Anthropic Account**
- Link to console.anthropic.com
- Pricing note (API credits)
- Screenshot of console

**Step 2.4: Authenticate**
- `claude` command
- Browser authentication flow
- What to expect

**Step 2.5: First Session** (Interactive Demo)
- Embedded terminal simulation or GIF
- Example prompts to try
- Expected output preview

**Phase 2 Checkpoint**
- Verification steps
- Troubleshooting accordion

---

### 4. Phase 3: Project Setup

**Step 3.1: Virtual Environments**
- Why they matter (visual metaphor: separate toolboxes)
- Create command
- Activate command (platform-specific)
- Visual indicator of activated state

**Step 3.2: The .claude Folder**
- Purpose explanation
- File structure diagram
- What each file does

**Step 3.3-3.5: Create Configuration Files**
- Have Claude create them (meta!)
- Template previews (expandable)
- Customization tips

**Phase 3 Checkpoint**
- Folder structure verification
- File content preview

---

### 5. Phase 4: GitHub Integration

**Step 4.1: GitHub Account**
- Link to github.com
- Username tips

**Step 4.2: Install GitHub CLI**
- Platform-specific
- Authentication flow

**Step 4.3-4.6: Git Workflow**
- Initialize repository
- .gitignore (expandable template)
- First commit
- Push to GitHub
- Verification (see it on GitHub)

**Phase 4 Checkpoint**
- Link to verify repository
- Celebration!

---

### 6. Daily Workflow Section

**Starting a Session** (Checklist format)
1. Open VS Code
2. Open project folder
3. Open Terminal (Ctrl+`)
4. Activate venv
5. Start Claude
6. Describe your task

**Example Tasks** (Tabbed interface)
| Tab | Example Prompt | What Happens |
|-----|----------------|--------------|
| Analysis | "Analyze sales.xlsx..." | Description |
| Automation | "Rename all files..." | Description |
| Development | "Create a script that..." | Description |
| Debugging | "This error occurred..." | Description |

**Ending a Session**
- Update session log
- Git commit workflow
- Quick command reference

---

### 7. Reference Section

**Quick Commands** (Searchable table)
- Copy button for each
- Categorized: Navigation, Python, Claude, Git

**Glossary** (Expandable definitions)
- Click term to expand
- Search/filter

**Troubleshooting** (Accordion)
- Common issues with solutions
- "Still stuck?" contact info

**Resources** (Link cards)
- Official documentation
- Video tutorials
- Community

---

## Interactive Features

### 1. OS Toggle
```
┌─────────────────────────────────┐
│  I'm setting up on:             │
│  ┌─────────┐    ┌─────────────┐ │
│  │   Mac   │    │   Windows   │ │
│  └─────────┘    └─────────────┘ │
└─────────────────────────────────┘
```
- Selection persists via localStorage
- All commands/screenshots swap accordingly
- Smooth transition animation

### 2. Progress Tracker
- Horizontal bar at top showing overall progress
- Checkboxes save state to localStorage
- Visual celebration at phase completion

### 3. Copy-to-Clipboard
- One-click copy for all command blocks
- "Copied!" feedback animation
- Syntax highlighting for code

### 4. Expandable Content
- "Learn more" accordions for deeper dives
- "Show example" expanders
- "Troubleshooting" collapsibles

### 5. Interactive Elements
- Clickable VS Code screenshot with tooltips
- Step completion checkboxes
- "Mark phase complete" buttons

### 6. Search
- Quick search in Reference section
- Jump to any section

---

## Visual Design

### Color Palette
| Element | Color | Usage |
|---------|-------|-------|
| Primary | #6366f1 (Indigo) | Headers, buttons, links |
| Success | #22c55e (Green) | Completed items, success messages |
| Warning | #f59e0b (Amber) | Tips, warnings |
| Error | #ef4444 (Red) | Error messages |
| Background | #ffffff / #0f172a | Light/dark mode |
| Text | #1e293b / #f1f5f9 | Light/dark mode |

### Typography
- Headers: Inter or system-ui (clean, modern)
- Body: 16px base, 1.6 line-height
- Code: JetBrains Mono or monospace

### Layout
- Max-width: 1200px centered
- Sticky navigation
- Responsive breakpoints: 768px, 1024px

---

## File Structure

```
Agentic AI Setup/
├── index.html              # Single-page application
├── styles.css              # All styles
├── script.js               # Interactivity
├── images/
│   ├── vscode-layout.png   # Annotated VS Code screenshot
│   ├── terminal-example.png
│   ├── github-repo.png
│   └── icons/              # Section icons
└── README.md               # GitHub Pages deployment instructions
```

---

## Embedded Media Plan

### Screenshots to Create/Source
1. VS Code welcome screen (Mac & Windows)
2. VS Code layout with labeled areas
3. Terminal with (venv) activated
4. Claude CLI in action
5. GitHub repository view
6. Anthropic console

### Videos/GIFs to Consider
1. Terminal commands being typed (GIF)
2. Claude creating a file (GIF)
3. Link to Anthropic's "Claude Code in Action" course

### External Embeds
- Link to Anthropic Skilljar course
- Link to official Claude Code docs
- Link to GitHub CLI quickstart

---

## Deployment

### GitHub Pages (Recommended)
1. Create repository: `agentic-ai-setup-guide`
2. Push HTML/CSS/JS files
3. Enable GitHub Pages in Settings
4. Access at: `yourusername.github.io/agentic-ai-setup-guide`

### Custom Domain (Optional)
- Buy domain (~$12/year)
- Configure DNS to point to GitHub Pages
- Add CNAME file

---

## Development Phases

### Phase A: HTML Structure (2 hours)
- Semantic HTML for all sections
- Placeholder content
- Navigation structure

### Phase B: Styling (2 hours)
- CSS layout and typography
- Color scheme
- Responsive design
- Dark/light mode

### Phase C: Interactivity (2 hours)
- OS toggle functionality
- Progress tracking with localStorage
- Copy-to-clipboard
- Accordion/expand functionality
- Smooth scrolling navigation

### Phase D: Content (3 hours)
- Write all instructional content
- Platform-specific variations
- Create/source screenshots
- Add code blocks

### Phase E: Polish (1 hour)
- Test on multiple browsers
- Mobile testing
- Accessibility check
- Final review

---

## Success Criteria

- [ ] User can toggle between Mac/Windows and see relevant instructions
- [ ] All commands have working copy-to-clipboard
- [ ] Progress saves between sessions
- [ ] Loads fast (<2 seconds)
- [ ] Mobile-friendly
- [ ] Accessible (keyboard navigation, screen reader friendly)
- [ ] Professional appearance matching Stripe/Twilio quality
- [ ] Clear, concise instructions a non-coder can follow

---

## Questions for Review

1. Should we include video embeds or keep it lightweight with GIFs/screenshots?
2. Do you want a "Request Help" button that emails you?
3. Should the guide include your contact info or stay generic for clients to white-label?
4. Any specific branding (logo, colors) to incorporate?
