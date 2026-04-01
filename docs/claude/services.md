# Services

Thin modules in `src/services/` that handle I/O boundaries: network requests and secure storage. Components and hooks never call `fetch` or `SecureStore` directly — they go through these services.

## tokenService (`src/services/tokenService.ts`)

Wraps `expo-secure-store` for JWT persistence. All token I/O goes through this module.

| Function | Description |
|---|---|
| `saveToken(token)` | Persist token to SecureStore |
| `getToken()` | Read token from SecureStore (returns `null` if absent) |
| `removeToken()` | Delete token from SecureStore (use on logout) |

**Why SecureStore, not AsyncStorage:** AsyncStorage is unencrypted. Tokens must be stored in SecureStore.

## API clients (`src/services/index.ts`)

Axios instances, one per micro-service, defined and exported from `src/services/index.ts`. Always import from `services` — never from sub-modules directly, and never create axios instances elsewhere.

| Export | Base URL | Auth interceptor |
|---|---|---|
| `AuthAPI` | `{API_BASE_URL}/api/auth` | No |
| `TabAPI` | `{API_BASE_URL}/api/tabs` | Yes — injects `Authorization: Bearer <token>` |

Usage follows the standard axios API (`AuthAPI.post('/register', body)`, etc.). Base URL is read from `EXPO_PUBLIC_API_BASE_URL` in `.env` — never hardcode it.

**Auth interceptor:** `TabAPI` (and any future authenticated client) uses a request interceptor that calls `getToken()` from `tokenService` before each request and sets `Authorization: Bearer <token>`. Token is read fresh from SecureStore on every request, so re-auth token updates are picked up automatically. Async action creators do **not** pass tokens manually — the interceptor handles it.

## Hooks

### `useAuthTokenRehydration` (`src/features/Auth/hooks/useAuthTokenRehydration.ts`)

Called once at app startup inside `AppRoutes`. Reads the stored JWT, checks expiry, and restores auth state before the UI renders.

Returns `{ isReady: boolean }`. `AppRoutes` renders `null` until `isReady` is `true` to prevent a flash of unauthenticated content.

**Token expiry handling:** if the token is expired or absent, `removeToken()` is called to clear the stale value from SecureStore, then the user is redirected to `/` (login page).

Reuses `registerSuccess` from `useAuthActions` — no separate rehydration action type needed.
