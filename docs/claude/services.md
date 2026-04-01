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

Custom `fetch`-based API instances, one per micro-service, defined and exported from `src/services/index.ts`. Always import from `services` — never from sub-modules directly, and never call `fetch` directly in components or hooks.

| Export | Base URL | Auth headers |
|---|---|---|
| `AuthAPI` | `{API_BASE_URL}/auth` | No |
| `TabAPI` | `{API_BASE_URL}/tabs` | Yes — injects `Authorization: Bearer <token>` |

Base URL is read from `EXPO_PUBLIC_API_BASE_URL` in `.env` — never hardcode it.

### `createApi` (`src/services/createApi.ts`)

Factory function that returns an `ApiClient` instance backed by native `fetch`. Preserves the `{ data }` destructure contract so call sites are identical to the old axios pattern.

```ts
createApi(baseURL: string, getHeaders?: () => Promise<Record<string, string>>): ApiClient
```

**Methods:** `get`, `post`, `put`, `patch`, `delete` — all return `Promise<{ data: T }>`.

**`getHeaders`:** optional async function passed at construction time. Called before every request; its return value is merged onto the headers (after `Content-Type: application/json`, so it can override it). Token is read fresh from SecureStore on every request — async action creators do **not** pass tokens manually.

**`_request`:** internal helper — not exported.

### `getAuthHeaders` (`src/services/index.ts`)

Shared helper used by any API instance that requires authentication:

```ts
async function getAuthHeaders(): Promise<Record<string, string>> {
  const token = await getToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
```

Pass it as the second argument to `createApi` for any authenticated client:

```ts
export const TabAPI = createApi(`${API_BASE_URL}/tabs`, getAuthHeaders);
```

## Hooks

### `useAuthTokenRehydration` (`src/features/Auth/hooks/useAuthTokenRehydration.ts`)

Called once at app startup inside `AppRoutes`. Reads the stored JWT, checks expiry, and restores auth state before the UI renders.

Returns `{ isReady: boolean }`. `AppRoutes` renders `null` until `isReady` is `true` to prevent a flash of unauthenticated content.

**Token expiry handling:** if the token is expired or absent, `removeToken()` is called to clear the stale value from SecureStore, then the user is redirected to `/` (login page).

Reuses `registerSuccess` from `useAuthActions` — no separate rehydration action type needed.
