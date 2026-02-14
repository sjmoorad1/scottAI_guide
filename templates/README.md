# [Project Name]

Brief description of what this project does.

## Quick Start

```bash
# Navigate to project folder
cd ~/Documents/projects/[project-name]

# Activate virtual environment
source venv/bin/activate   # Mac
venv\Scripts\activate      # Windows

# Start Claude
claude
```

## Common Commands

| Command | What it does |
|---------|--------------|
| `source venv/bin/activate` | Activate virtual environment (Mac) |
| `venv\Scripts\activate` | Activate virtual environment (Windows) |
| `deactivate` | Exit virtual environment |
| `pip install [package]` | Install a Python package |
| `pip freeze > requirements.txt` | Save installed packages |
| `pip install -r requirements.txt` | Install from saved list |

## Project Structure

```
[project-name]/
├── .claude/                # Claude configuration
│   ├── CLAUDE.md           # Project-specific instructions
│   ├── AI_CODING_GUIDELINES.md
│   └── SESSION_LOG.md
├── .gitignore              # Files to not track in Git
├── venv/                   # Virtual environment (don't edit)
├── requirements.txt        # Python packages
├── data/                   # Input data files
├── output/                 # Generated files
└── README.md               # This file
```

## Notes

- Always activate venv before starting Claude
- Keep sensitive data in `.env` (never commit this file)
- Update SESSION_LOG.md at the end of each work session
