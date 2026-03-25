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

### `useAppDispatch`

Internal hook — not for direct use in components. Use a slice's `use<Slice>Actions` hook instead.

## Known limitations / planned improvements

- `useAppSelector` equality check: replace `JSON.stringify` with `shallowEqual`.
- Sub-reducer `as SliceAction` casts in `store.ts` should be replaced with `SliceAction | { type: string }` signatures to avoid unsafe narrowing.
