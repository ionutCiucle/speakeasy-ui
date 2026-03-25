# 2026-Mar__Register-user

## Plan

Implement user registration and JWT-based auth persistence in the UI, wired to the `POST /api/auth/register` endpoint on the BE.

---

### Step 1 — Install `expo-secure-store`

```bash
npx expo install expo-secure-store
```

Used to persist the JWT token securely on-device. Must be used instead of `AsyncStorage` for tokens — `AsyncStorage` is unencrypted.

---

### Step 2 — Add a token service

Create `src/services/tokenService.ts` with three functions:

| Function | Description |
|---|---|
| `saveToken(token)` | Persist token to SecureStore |
| `getToken()` | Read token from SecureStore |
| `removeToken()` | Delete token from SecureStore (logout) |

---

### Step 3 — Add an API service

Create `src/services/api.ts` as a thin wrapper around `fetch`:

- Base URL pointing to the BE (`http://localhost:3000/api`)
- `post(path, body)` — unauthenticated requests (register, login)
- `authPost(path, body)` / `authGet(path)` — authenticated requests that read the token from SecureStore and attach `Authorization: Bearer <token>`

---

### Step 4 — Update the auth slice

Extend the existing auth slice under `src/state-management/auth/` to handle registration:

- Add `AuthActionType.RegisterSuccess` and `AuthActionType.RegisterFailure`
- Add `userId` and `token` fields to `AuthState`
- Update the reducer to handle the new action types

---

### Step 5 — Build the Register screen

Create `src/screens/Register.tsx`:

- Fields: email, password
- On submit: call `api.post('/auth/register', { email, password })`
- On success: `saveToken(token)` → dispatch `RegisterSuccess` → navigate to the app's main screen
- On failure: show an inline error message

---

### Step 6 — Wire up navigation

Register the screen in `Root.tsx` under the unauthenticated stack so it is reachable from the Login screen (or as the initial route when no token is present).

---

### Step 7 — Token rehydration on launch

In `Root.tsx` (or a dedicated `useAuthRehydration` hook):

1. On mount, call `getToken()`
2. If a token exists, decode it and check the `exp` field
3. If valid: dispatch a rehydration action to restore auth state and skip to the main screen
4. If expired or missing: show the unauthenticated stack

---

## Planned follow-up

- [ ] Add login screen (same pattern as register, hits `POST /api/auth/login`)
- [ ] Add logout action (calls `removeToken()` + dispatches clear-auth action)
- [ ] Replace hardcoded `localhost:3000` base URL with an env config
