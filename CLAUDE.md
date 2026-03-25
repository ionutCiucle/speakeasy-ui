# speakeasy-ui

React Native mobile app built with Expo.

## Stack

- **Runtime:** React Native 0.72 / Expo SDK 49
- **Language:** TypeScript 5 (strict mode)
- **Navigation:** React Navigation v6 (stack) + React Router Native v6
- **State Management:** React Context + useReducer (custom singleton store)
- **Styling:** StyleSheet (React Native)
- **Linting:** ESLint + `@typescript-eslint`
- **Formatting:** Prettier

## Architecture

### Entry point

`App.tsx` → `src/Root.tsx`

`Root.tsx` sets up the navigation shell (`NavigationContainer` + `NativeRouter`) and is where routes are registered.

### State management

Custom Redux-like store using React Context and `useReducer`. See [docs/claude/state-management.md](docs/claude/state-management.md).

```
src/state-management/
  auth/               - auth slice
  store.ts            - combined reducer + AppState / AppAction types
  Provider.tsx        - AppProvider component (wrap app root with this)
  providerHooks.ts    - useAppDispatch, useAppSelector
```

### Routes

Routes are defined in `src/AppRoutes.tsx`. `Root.tsx` only sets up providers and the router shell — add new routes to `AppRoutes`.

`AppRoutes` also runs `useAuthTokenRehydration` on mount and renders `null` until rehydration is complete.

### API calls

All API calls go through async action creators in `src/state-management/<slice>/asyncActions.ts` — never call `AuthAPI` or other service clients directly from a component or hook.

Each async action is curried `(dispatch) => async (args) => { ... }` and dispatches three actions: **pending** (sets `isLoading: true`), **success**, and **failure**. It returns `true`/`false` so the component can react (navigate, show error, etc.).

Components access async actions through `use<Slice>AsyncActions` hooks — see [docs/claude/state-management.md](docs/claude/state-management.md) for the full pattern.

### Services

All I/O boundary modules live in `src/services/`. Import everything from the index — never import from sub-modules directly. See [docs/claude/services.md](docs/claude/services.md).

```
src/services/
  index.ts          - single entry point: re-exports tokenService + axios instances
  tokenService.ts   - JWT persistence via expo-secure-store
```

### Directory conventions

```
src/
  features/           - UI grouped by domain (e.g. features/Auth/)
    Auth/
      hooks/          - hooks scoped to the Auth feature
  services/           - I/O boundary modules (SecureStore, etc.)
  state-management/   - global state (slices follow the pattern in docs)
  styles.ts           - shared styles
  AppRoutes.tsx       - route definitions
  Root.tsx            - app shell (providers + router only)
```

## Documentation index

- [State Management](docs/claude/state-management.md)
- [Services](docs/claude/services.md)
- [Best Practices](docs/claude/best-practices.md)
- [Work History](docs/claude/work-history/)
