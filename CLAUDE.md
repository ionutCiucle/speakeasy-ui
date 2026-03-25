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

### Directory conventions

```
src/
  state-management/   - global state (slices follow the pattern in docs)
  styles.ts           - shared styles
```

## Documentation index

- [State Management](docs/claude/state-management.md)
- [Work History](docs/claude/work-history/)
