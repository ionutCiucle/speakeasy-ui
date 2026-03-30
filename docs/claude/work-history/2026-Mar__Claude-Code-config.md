# 2026-Mar__Claude-Code-config

## Goal

Add project-level Claude Code configuration to ensure a consistent nvm environment when running Node/Expo commands, and pre-approve common git and MCP tool operations.

---

### Step 1 — PreToolUse nvm hook ✅

Added `.claude/settings.json` with a `PreToolUse` hook scoped to `Bash` tool calls.

**What it does:** Detects when a shell command starts with `node`, `npm`, `npx`, or `expo`, and prepends `source ~/.nvm/nvm.sh && nvm use --silent && ` before executing. This ensures the correct Node version (from `.nvmrc`) is always active, even in Claude Code shell sessions that don't inherit the user's nvm shell setup.

**Why:** Without this, Bash invocations in Claude Code inherit the system Node rather than the project's pinned version, causing version mismatches with Expo SDK 55 which requires Node 20.

---

### Step 2 — Local permissions ✅

Added `.claude/settings.local.json` with pre-approved permissions:

- `Bash(git add:*)` / `Bash(git commit:*)` / `Bash(git push:*)` — avoids confirmation prompts for standard git operations
- `mcp__...__use_figma` — pre-approves the Figma MCP tool
