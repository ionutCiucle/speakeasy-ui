# 2026-Mar__Jest-setup

## Plan

Install and configure Jest + React Native Testing Library, and add a test step to the pre-commit hook.

---

### Step 1 — Install packages ✅

Added to `devDependencies`:

| Package | Version | Purpose |
|---|---|---|
| `jest-expo` | ^55 | Expo's official Jest preset — handles RN module transforms |
| `@testing-library/react-native` | ^13 | Component rendering + querying |
| `react-test-renderer` | 19.1.0 | Pinned to match `react@19.1.0` (peer dep) |
| `@types/jest` | ^30 | TypeScript types for Jest globals |

---

### Step 2 — Configure Jest ✅

Created `jest.config.js`:

- `preset: 'jest-expo'` — handles `transformIgnorePatterns` and the RN environment automatically.
- `moduleNameMapper` maps `@/*` to `<rootDir>/src/*` to match the existing `tsconfig.json` path alias.
- `testMatch` picks up `*.test.{ts,tsx}` anywhere in the tree and files inside `__tests__/` folders.
- `collectCoverageFrom` scopes coverage reports to `src/**` only.

RNTL v13 auto-extends Jest matchers (`toBeVisible`, `toHaveTextContent`, etc.) on import — no `setupFilesAfterEnv` entry needed.

---

### Step 3 — Add npm scripts ✅

Added to `package.json`:

```
"test":          "jest"
"test:coverage": "jest --coverage"
```

---

### Step 4 — Add test step to pre-commit hook ✅

`.husky/pre-commit` now runs two steps:

1. `npx lint-staged` — Prettier formats staged `.ts`/`.tsx` files
2. `npm test -- --passWithNoTests` — runs the full test suite; `--passWithNoTests` allows the hook to pass before any test files exist
