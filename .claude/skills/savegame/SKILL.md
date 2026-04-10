---
name: savegame
description: Run ts:check and lint:check, fix any issues found, update work-history docs, then stage, commit, and push all current changes
---

## Steps

1. Run preflight checks in sequence:

```
npm run ts:check
npm run lint:check
```

2. If either check fails:
   - Analyse the errors carefully
   - Fix all issues in the relevant files
   - Re-run the failing check to confirm it passes
   - Repeat until both checks are clean
   - If a failure cannot be fixed (e.g. requires user input or a design decision), stop and explain the blocker clearly before proceeding

3. Once both checks pass, run `git status` and `git diff` in parallel to understand what has changed.

4. Update work-history docs:
   - Derive the main area of work from the branch name (e.g. `feature/add-tab-detail` → "tab-detail")
   - Look in `docs/claude/work-history/` for a doc whose filename contains that area (case-insensitive match)
   - If a matching doc exists, update it to reflect the changes just made — add a new sub-section or extend the relevant section; do not rewrite sections unrelated to this commit
   - If no matching doc exists, create a new file in `docs/claude/work-history/` named `<YYYY-Mon>__<Area>.md` (e.g. `2026-Apr__Tab-detail.md`) with a concise description of what was built
   - Stage the updated or created doc file alongside the code changes

5. Draft a commit message:
   - Summarise the nature of the changes (new feature, fix, refactor, etc.)
   - Keep it concise (1–2 sentences focused on the "why")
   - Follow the repo convention: `feat:`, `fix:`, or `refactor:` prefix

6. Stage all modified and untracked files relevant to the work (avoid committing files that look unrelated or sensitive):

```
git add <files>
```

7. Commit using a HEREDOC:

```
git commit -m "$(cat <<'EOF'
<message>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

8. Push to the current remote branch:

```
git push
```

9. Report the commit hash and confirm the push succeeded.
