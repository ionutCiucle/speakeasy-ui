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

### `use<Resource>` (apiHooks)

For read-only list fetching where the data only needs to live for the lifetime of the component. These hooks store their result in **local state** — no reducer, no store, no dispatch.

They live in `<slice>/hooks/use<Resource>.ts` and are the preferred approach when you just need to display a list and optionally re-fetch when parameters change.

```ts
// src/state-management/tabs/api-hooks/useTabs.ts
export function useTabs() {
  const [tabs, setTabs] = useState<TabDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTabs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await TabAPI.get<TabDTO[]>('/');
      setTabs(data);
    } catch {
      setError('Failed to load tabs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTabs();
  }, [fetchTabs]);

  return { tabs, isLoading, error };
}
```

When the hook needs to re-fetch based on changing inputs (e.g. a `tabId`), pass the param into `useCallback`'s dependency array:

```ts
// src/state-management/tabs/api-hooks/useTabDetails.ts
export function useTabDetails(tabId: string) {
  const [tab, setTab] = useState<TabDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTabDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await TabAPI.get<TabDTO>(`/${tabId}`);
      setTab(data);
    } catch {
      setError('Failed to load tab details');
    } finally {
      setIsLoading(false);
    }
  }, [tabId]);

  useEffect(() => {
    fetchTabDetails();
  }, [fetchTabDetails]);

  return { tab, isLoading, error };
}
```

**Rules:**
- Local state only — no `dispatch`, no store
- Always use the service API client from `@/services` (e.g. `TabAPI`); never import axios directly
- Return `{ <items>, isLoading, error }` — no mutations, no callbacks exposed
- Named `use<Resource>` to match the field name in the return value (e.g. `useTabs` returns `tabs`)
- Export from the slice's `index.ts`

**When to use which hook:**

| Situation | Hook |
|---|---|
| Fetch a list to display; optionally re-fetch on param change | `use<Resource>` (apiHook) |
| Fetch then navigate or show a toast on result | `use<Slice>AsyncActions` |
| Any mutation (POST / PATCH / DELETE) | `use<Slice>AsyncActions` |
| Data must persist across unmounts or be shared across screens | `use<Slice>AsyncActions` + store |

### `useAppDispatch`

Internal hook — not for direct use in components. Use a slice's `use<Slice>Actions` or `use<Slice>AsyncActions` hook instead.

## Slices

### `auth`

Handles authentication state: username, email, userId, token, isLoading. See `src/state-management/auth/`.

### `layout`

Controls global UI state that lives above any single feature — currently: which modal is visible.

```
src/state-management/layout/
  enums.ts    - LayoutActionType, ModalId
  types.ts    - LayoutState, ShowModalAction, HideModalAction, LayoutAction
  reducer.ts  - layoutReducer + layoutInitialState
  hooks/
    useLayoutActions.ts  - showModal(modalId), hideModal()
  index.ts    - re-exports everything above
```

**State shape:**

```ts
interface LayoutState {
  activeModal: ModalId | null;
}
```

**`ModalId` enum** — add a new entry here whenever a new modal sheet is introduced:

```ts
export enum ModalId {
  CurrencyPicker = 'CurrencyPicker',
}
```

**Usage:**

```ts
const { showModal, hideModal } = useLayoutActions();

showModal(ModalId.CurrencyPicker); // opens the sheet
hideModal();                        // closes it
```

`ModalContainer` (mounted in `AppLayout`) reads `activeModal` and renders the corresponding sheet with a slide-up + overlay animation.

## Known limitations / planned improvements

- `useAppSelector` equality check: replace `JSON.stringify` with `shallowEqual`.
- Sub-reducer `as SliceAction` casts in `store.ts` should be replaced with `SliceAction | { type: string }` signatures to avoid unsafe narrowing.
