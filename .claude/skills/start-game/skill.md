---
name: start-game
description: Create a new git branch for a feature or bugfix, prompting the user for type and name, then checking out the branch based on main
---

## Steps

1. Ask the user whether this is a **feature** or a **bug fix** using `AskUserQuestion` with two options: "Feature" and "Bug fix".

2. Ask the user for the name of the feature or bug fix (e.g. "Create a new tab", "Fix login redirect").

3. Convert the name to kebab-case:
   - Lowercase everything
   - Replace spaces (and any non-alphanumeric characters) with hyphens
   - Collapse multiple hyphens into one

4. Construct the branch name:
   - Feature → `feature/<kebab-case-name>`
   - Bug fix → `bugfix/<kebab-case-name>`

5. Confirm the branch name to the user before creating it.

6. Fetch latest main and create the branch:

```
git fetch origin main
git checkout -b <branch-name> origin/main
```

7. Report the branch name and confirm the user is now on it.
