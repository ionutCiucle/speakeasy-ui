# 2026-Mar__Logger-and-auth-workflows

## Plan

Add redux-style logging middleware to the custom store, and introduce `useAuthWorkflows` to compose multi-step auth flows.

---

### Step 1 — `useAuthWorkflows` hook ✅

Added `src/features/Auth/hooks/useAuthWorkflows.ts` with a `registerAndLogin` workflow.

- `registerAndLogin(credentials)` calls `registerAsyncAction` then, on success, automatically calls `loginAsyncAction` with the same credentials.
- Returns `true` only when both steps succeed; returns `false` and stops early if either fails.
- Consumed by `RegisterPage` in place of calling the two async actions separately.

---

### Step 2 — Auto-login after registration ✅

- Fixed `registerAsyncAction` to handle a `204 No Content` response (no JSON body).
- Split register and auto-login into separate `try/catch` blocks so a login failure doesn't mask a successful registration.
- Added `localStorage` fallback for `tokenService` so the web (webpack) build can store tokens when `expo-secure-store` is unavailable.

---

### Step 3 — Logging middleware ✅

Created `src/state-management/loggerMiddleware.ts` — a `createLoggerReducer` higher-order function that wraps any `AppReducer` and logs each dispatched action in a collapsible `console.group`:

```
▶ action  AUTH/LOGIN_SUCCESS
    prev state  { auth: { isLoading: true, ... } }
    action      { type: 'AUTH/LOGIN_SUCCESS', payload: { userId, token } }
    next state  { auth: { isLoading: false, token: '...', ... } }
```

- Styled to match `redux-logger` output (gray label, blue action, green next state).
- Gated on `__DEV__` — zero output in production builds.
- `Provider.tsx` wraps `appReducer` with `createLoggerReducer` once, outside the component, before passing it to `useReducer`.
