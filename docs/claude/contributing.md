# Contributing

## Branch naming

Always create a branch before starting work. Never commit directly to `main`.

| Prefix | Use for |
|---|---|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `infra/` | CI, tooling, repo config |
| `docs/` | Documentation only |
| `refactor/` | Refactors with no behaviour change |

Example: `feature/add-profile-screen`, `fix/token-expiry-redirect`

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/) prefixes:

| Prefix | Use for |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `ci:` | CI / workflow changes |
| `docs:` | Documentation only |
| `refactor:` | Refactor with no behaviour change |
| `chore:` | Dependency updates, config changes |

Keep the subject line short and imperative. Add detail in the body if needed.

## PR process

1. Push your branch and open a PR against `main`
2. The **Preflight** CI check must pass (`ts:check` + `lint:check`)
3. PR requires approval from `@ionutCiucle` (CODEOWNERS) before it can be merged

## Preflight

The preflight workflow runs on every PR targeting `main`:

```bash
npm run ts:check   # TypeScript type check
npm run lint:check # ESLint
```

Run these locally before pushing to catch issues early.
