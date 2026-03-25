# 2026-Mar — State Management Foundation

## What was done

Bootstrapped the global state management module under `src/state-management/`.

### Files created

| File | Purpose |
|---|---|
| `auth/enums.ts` | `AuthActionType` enum |
| `auth/types.ts` | `AuthState`, `AuthAction`, `SetUsernameAction` |
| `auth/reducer.ts` | `authReducer`, `authInitialState` |
| `auth/index.ts` | barrel re-export |
| `store.ts` | `appReducer`, `AppState`, `AppAction`, `appInitialState` |
| `Provider.tsx` | `AppProvider` component |
| `providerHooks.ts` | `useAppDispatch`, `useAppSelector` |

### Design decisions

- **No external library.** React Context + `useReducer` is sufficient for the current scale. Avoids bundle weight and keeps the pattern transparent.
- **Slice-per-directory.** Each domain module owns its enums, types, and reducer. The `store.ts` file is the only place that knows about all slices.
- **Memoized selector.** `useAppSelector` uses `useRef` + `JSON.stringify` equality so consumers don't re-render on unrelated state changes.

## Planned follow-up (from plan)

- [ ] Replace `JSON.stringify` equality in `useAppSelector` with `shallowEqual`
- [ ] Add `auth/actions.ts` with `setUsername` action creator
- [ ] Split `AppContext` into separate `AppStateContext` + `AppDispatchContext`
- [ ] Replace `as SliceAction` casts in `appReducer` with safer `SliceAction | { type: string }` signatures
