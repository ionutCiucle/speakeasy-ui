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

## Slice structure

Each feature domain gets a directory under `src/state-management/`:

```
<slice>/
  enums.ts     - ActionType enum (prefix: 'SLICE_NAME/')
  types.ts     - SliceState, individual action interfaces, SliceAction union
  reducer.ts   - sliceReducer + sliceInitialState
  actions.ts   - action creator functions  (to be added)
  index.ts     - re-exports everything above
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

### `useAppSelector`

```ts
const username = useAppSelector(state => state.auth.username);
```

Memoizes the selected value via `useRef`. The component only re-renders when the selected value changes. Currently uses `JSON.stringify` for equality — a `shallowEqual` utility is planned (see work history).

### `useAppDispatch`

```ts
const dispatch = useAppDispatch();
dispatch({ type: AuthActionType.SET_USERNAME, payload: 'alice' });
```

## Known limitations / planned improvements

- `useAppSelector` equality check: replace `JSON.stringify` with `shallowEqual`.
- Action creators (`actions.ts`) not yet added to the `auth` slice.
- State and dispatch contexts should be split so dispatch-only consumers don't re-render on state changes.
- Sub-reducer `as SliceAction` casts in `store.ts` should be replaced with `SliceAction | { type: string }` signatures to avoid unsafe narrowing.
