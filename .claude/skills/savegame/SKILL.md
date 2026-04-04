---
name: savegame
description: Run ts:check and lint:check, fix any issues found, then stage, commit, and push all current changes
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

4. Draft a commit message:
   - Summarise the nature of the changes (new feature, fix, refactor, etc.)
   - Keep it concise (1–2 sentences focused on the "why")
   - Follow the repo convention: `feat:`, `fix:`, or `refactor:` prefix

5. Stage all modified and untracked files relevant to the work (avoid committing files that look unrelated or sensitive):

```
git add <files>
```

6. Commit using a HEREDOC:

```
git commit -m "$(cat <<'EOF'
<message>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

7. Push to the current remote branch:

```
git push
```

8. Report the commit hash and confirm the push succeeded.
