# 2026-Mar__Register-user

## Plan

Implement user registration and JWT-based auth persistence in the UI, wired to the `POST /api/auth/register` endpoint on the BE.

---

### Step 1 — Install `expo-secure-store` ✅

```bash
npx expo install expo-secure-store
```

Used to persist the JWT token securely on-device. Must be used instead of `AsyncStorage` for tokens — `AsyncStorage` is unencrypted.

---

### Step 2 — Add a token service ✅

Create `src/services/tokenService.ts` with three functions:

| Function | Description |
|---|---|
| `saveToken(token)` | Persist token to SecureStore |
| `getToken()` | Read token from SecureStore |
| `removeToken()` | Delete token from SecureStore (logout) |

---

### Step 3 — Add an API service ✅

Create `src/services/api.ts` as a thin wrapper around `fetch`:

- Base URL pointing to the BE (`http://localhost:3000/api`)
- `post(path, body)` — unauthenticated requests (register, login)
- `authPost(path, body)` / `authGet(path)` — authenticated requests that read the token from SecureStore and attach `Authorization: Bearer <token>`

---

### Step 4 — Update the auth slice ✅

Extend the existing auth slice under `src/state-management/auth/` to handle registration:

- Add `AuthActionType.RegisterSuccess` and `AuthActionType.RegisterFailure`
- Add `userId` and `token` fields to `AuthState`
- Update the reducer to handle the new action types

---

### Step 5 — Build the Register screen ✅

Created `src/features/Auth/RegisterPage.tsx` (not `src/screens/` — follows existing `features/Auth/` convention set by `LoginPage`):

- Fields: email, password
- On submit: call `api.post('/auth/register', { email, password })`
- On success: `saveToken(token)` → dispatch `registerSuccess(userId, token)` → navigate to `/home`
- On failure: dispatch `registerFailure()` + show inline error message

---

### Step 6 — Wire up navigation ✅

Routes are now defined in a dedicated `src/AppRoutes.tsx` component (not inline in `Root.tsx`). `Root.tsx` only sets up providers and the router shell, then renders `<AppRoutes />`.

Routes registered:
- `/` → `LoginPage`
- `/register` → `RegisterPage`

---

### Step 7 — Token rehydration on launch ✅

Implemented as a dedicated hook `src/features/Auth/hooks/useAuthTokenRehydration.ts` (not in `Root.tsx` directly). Used inside `AppRoutes`:

1. On mount, call `getToken()`
2. Decode the JWT payload and check the `exp` field
3. If valid: dispatch `registerSuccess(userId, token)` to restore auth state
4. If expired or missing: call `removeToken()` to clear the stale value, then navigate to `/` (login)
5. Either way, set `isReady = true` — `AppRoutes` renders `null` until ready to avoid a flash of unauthenticated content

> The hook reuses `registerSuccess` from `useAuthActions` for rehydration rather than introducing a separate rehydration action type.

---

## Planned follow-up

- [x] Add login screen (same pattern as register, hits `POST /api/auth/login`)
  - Added `LoginSuccess` / `LoginFailure` action types to the auth slice
  - Implemented `loginSuccess` and `loginFailure` in `useAuthActions`
  - Wired up `LoginPage.tsx` — email/password form, calls `AuthAPI.post('/login')`, saves token, dispatches `loginSuccess`, navigates to `/home`
- [x] Add logout action (calls `removeToken()` + dispatches clear-auth action)
  - Added `AuthActionType.Logout` to the auth slice; reducer resets to `authInitialState`
  - `logoutAsyncAction` in `asyncActions.ts` — calls `removeToken()` then dispatches `Logout`
  - Exported as `logout` from `useAuthAsyncActions`
- [x] Replace hardcoded `localhost:3000` base URL with env config
  - Added `EXPO_PUBLIC_API_BASE_URL` to `.env` (gitignored)
  - `src/services/index.ts` reads it via `process.env.EXPO_PUBLIC_API_BASE_URL`

---

## Async actions pattern

Introduce a thunk-like async action layer so components no longer call the API directly.

### Step 1 — Extend the auth slice with Pending action types ✅

Added `LoginPending` and `RegisterPending` to `enums.ts`, corresponding action interfaces to `types.ts`, added `isLoading: boolean` to `AuthState`, and updated the reducer to set `isLoading: true` on pending and `false` on success/failure.

### Step 2 — Create `src/state-management/auth/asyncActions.ts` ✅

Each async action is curried `(dispatch) => async (args) => { pending → api call → success | failure }`. Returns `true`/`false` so the component can react (e.g. navigate on success).

Actions are dispatched directly — no helper abstraction. `makeActionCreators` was introduced and then removed in favour of plain `dispatch({ type, payload })` calls.

### Step 3 — Create `src/state-management/auth/hooks/useAuthAsyncActions.ts` ✅

Hook at the same level as `useAuthActions`. Exports async actions with `useCallback(asyncAction(dispatch), [dispatch])`. Exported from the slice `index.ts`.

### Step 4 — Update `LoginPage` and `RegisterPage` ✅

Both components now use `useAuthAsyncActions`. No direct `AuthAPI` or `saveToken` calls in components. Navigation and error display driven by the returned boolean.
