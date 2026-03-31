# Plan: createTab state slice

## State shape

```ts
interface CreateTabState {
  tabName: string;
  venue: string;
  currency: { code: string; name: string };
  notes: string;
}
```

`currency` lives here (not layout) — it's tab data, not UI state.

---

## New files — `src/state-management/createTab/`

| File | Contents |
|---|---|
| `enums.ts` | `CreateTabActionType` — `SetTabName`, `SetVenue`, `SetCurrency`, `SetNotes` |
| `types.ts` | `CreateTabState`, four action interfaces, `CreateTabAction` union |
| `reducer.ts` | `createTabReducer` + `createTabInitialState` (`currency` defaults to `{ code: 'USD', name: 'US Dollar' }`) |
| `hooks/useCreateTabActions.ts` | `setTabName`, `setVenue`, `setCurrency`, `setNotes` — all `useCallback([dispatch])` |
| `hooks/index.ts` | re-export |
| `index.ts` | re-export everything |

Wire into `store.ts` following the existing pattern.

---

## Component changes

**`TabDetailsStep`** — drop all three `useState` calls; read `tabName`, `venue`, `notes`, `currency` from `useAppSelector`; dispatch via `useCreateTabActions`.

**`CurrencyModal`** — add `selectedCode: string` + `onSelect: (code: string, name: string) => void` props; remove the local `selectedCode` `useState` (search query stays local — it's ephemeral UI state, not tab data).

**`ModalRoot`** — in the `CurrencyPicker` case of `renderContent`: read `state.createTab.currency` via `useAppSelector`, pass `setCurrency` as `onSelect`. `ModalRoot` already switches on modal ID so feature-specific wiring here is appropriate.
