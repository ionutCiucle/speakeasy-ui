# State Management

Custom Redux-like state management using React Context and `useReducer`. No external state library.

## Concepts

| Concept | Redux equivalent | Location |
|---|---|---|
| `AppState` | store shape | `store.ts` |
| `AppAction` | root action union | `store.ts` |
| `appReducer` | root reducer | `store.ts` |
| `AppProvider` | `<Provider store={store}>` | `Provider.tsx` |
| `useAppSelector` | `useSelector` | `providerHooks.ts` |
| `useAppDispatch` | `useDispatch` | `providerHooks.ts` |

## Conventions

### Action type casing

Action type enum entries use **PascalCase**, prefixed with the **PascalCase slice name**:

```ts
export enum AuthActionType {
  SetUsername = 'Auth/SetUsername',
}
```

Pattern: `'SliceName/ActionName'` — both parts PascalCase, separated by `/`.

## Slice structure

Each feature domain gets a directory under `src/state-management/`:

```
<slice>/
  enums.ts        - ActionType enum
  types.ts        - SliceState, individual action interfaces, SliceAction union
  reducer.ts      - sliceReducer + sliceInitialState
  hooks/
    use<Slice>Actions.ts  - action dispatch hook (see below)
  index.ts        - re-exports everything above
```

### Adding a new slice

1. Create the directory and four files above following the `auth/` slice as the canonical example.
2. In `store.ts`:
   - Import the reducer and initial state.
   - Add the slice key to `AppState`.
   - Add the slice action type to the `AppAction` union.
   - Add the initial state to `appInitialState`.
   - Call the sub-reducer inside `appReducer`.

## Hooks

### `use<Slice>Actions`

Each slice exposes a dedicated actions hook in `<slice>/hooks/use<Slice>Actions.ts`. This is the **only way consumers should dispatch actions** — they never call `useAppDispatch` directly or construct raw action objects.

```ts
// src/state-management/auth/hooks/useAuthActions.ts
export function useAuthActions() {
  const dispatch = useAppDispatch();

  const setUsername = useCallback(
    (username: string) => {
      dispatch({ type: AuthActionType.SetUsername, payload: username });
    },
    [dispatch],
  );

  return { setUsername };
}
```

Consumer usage:

```ts
const { setUsername } = useAuthActions();
setUsername('alice');
```

Rules:
- Wrap every action in a `useCallback` with `[dispatch]` as the dependency (dispatch is stable).
- Return all actions as a plain object.
- Export from the slice's `index.ts`.

### `useAppSelector`

```ts
const username = useAppSelector(state => state.auth.username);
```

Memoizes the selected value via `useRef`. The component only re-renders when the selected value changes. Currently uses `JSON.stringify` for equality — a `shallowEqual` utility is planned (see work history).

### `use<Slice>AsyncActions`

Each slice that makes API calls exposes an async actions hook in `<slice>/hooks/use<Slice>AsyncActions.ts`. Components use this instead of calling APIs directly.

Async action creators live in `<slice>/asyncActions.ts` and follow the curried pattern `(dispatch) => async (args) => { ... }`. Each dispatches three actions — pending, success, failure — directly via `dispatch({ type, payload })`. They return `true`/`false` so the component can react (e.g. navigate on success, show error on failure).

The hook wires dispatch in using `useCallback(asyncAction(dispatch), [dispatch])`:

```ts
// src/state-management/auth/hooks/useAuthAsyncActions.ts
export function useAuthAsyncActions() {
  const dispatch = useAppDispatch();

  const login = useCallback(loginAsyncAction(dispatch), [dispatch]);
  const register = useCallback(registerAsyncAction(dispatch), [dispatch]);

  return { login, register };
}
```

Rules:
- Components never import `AuthAPI` or call `saveToken` directly — async actions own that.
- Each async action must dispatch pending before the call and success/failure after.
- Every async action type needs a Pending variant in the slice's enum, and the reducer must handle it (typically sets `isLoading: true`).
- Export from the slice's `index.ts`.

### `useAppDispatch`

Internal hook — not for direct use in components. Use a slice's `use<Slice>Actions` or `use<Slice>AsyncActions` hook instead.

## Known limitations / planned improvements

- `useAppSelector` equality check: replace `JSON.stringify` with `shallowEqual`.
- Sub-reducer `as SliceAction` casts in `store.ts` should be replaced with `SliceAction | { type: string }` signatures to avoid unsafe narrowing.
