# Tab Detail Page

**Date:** April 2026  
**Branch:** `feature/add-tab-detail`

## What was built

Full `TabDetailPage` screen wired to real API data.

### Components extracted

All sub-components live in `src/features/TabDetail/components/`:

- `TabInfoBar` — venue, status badge (active / closed), creation date, member count
- `TabViewToggle` — "Mine / All" toggle switching the `ActiveView` state
- `TabMenuItems` — scrollable list of items with increment / decrement controls
- `TabSubtotal` — formatted subtotal row

Shared utilities and enums used across TabDetail components live in:

- `src/utils.ts` — `formatCurrency`
- `src/enums.ts` — `CurrencySymbol`

### State & data

`TabDetailPage` uses **`useTabDetails(tabId)`** to fetch `GET /api/tabs/:id` on mount and on `tabId` change. The hook follows the `use<Resource>` api-hook pattern (local state, no store).

Previously the page used `useTabs()` + `Array.find` — replaced because it fetched the full list just to read one record.

### Navigation

`TabDetailPage` reads `:id` from the URL via `useParams<{ id: string }>()`. Route registered in `AppRoutes.tsx`.

### Other additions

- `MemberAvatars` component — displays member avatars with a label; used in TabDetailPage's members section
- Gold chevron on the "Start Tab" button in the create-tab review step

### TabMenuItem — swipeable interactions

`TabMenuItem` was rewritten to support swipe gestures using `Swipeable` from `react-native-gesture-handler`:

- Swipe right → green `+` panel (increment)
- Swipe left → red `−` / trash panel (decrement / remove)
- `quantity === 1` shows trash icon instead of `−`
- Card slides off-screen on swipe; tapping card or action snaps back

New optional props on `TabMenuItem` (and threaded through `TabMenuItems`):

| Prop | Fires when |
|---|---|
| `onTapPlus(id)` | Left action tapped |
| `onTapMinus(id)` | Right action tapped, `quantity > 1` |
| `onTapRemove(id)` | Right action tapped, `quantity === 1` |

`Color.Danger: '#C0392B'` added to `src/styles.ts`.  
`GestureHandlerRootView` added to `src/Root.tsx`.

### Tests

Unit tests added for `TabMenuItem` and `TabMenuItems`:

- Rendering: name, quantity badge, total price, trash vs minus icon
- `onIncrement` / `onDecrement` callbacks
- `onTapPlus`, `onTapMinus`, `onTapRemove` — correct firing conditions
- Edge cases: missing optional callbacks don't throw

ESLint override added in `.eslintrc` to allow `no-var-requires` in test files (required by Jest's `jest.mock` hoisting behaviour).

## Files changed

```
src/features/TabDetail/
  TabDetailPage.tsx               - main page component
  components/
    TabInfoBar.tsx
    TabViewToggle.tsx
    TabMenuItems/
      TabMenuItems.tsx            - threads onTapPlus/Minus/Remove
      TabMenuItem.tsx             - swipeable rewrite + new tap props
      __tests__/
        TabMenuItem.test.tsx
        TabMenuItems.test.tsx
    TabSubtotal.tsx
    index.ts
  utils.ts                        - toItems() helper
  types.ts                        - ActiveView type
  index.ts

src/state-management/tabs/
  api-hooks/
    useTabDetails.ts              - new: fetches GET /api/tabs/:id
    useTabs.ts
    index.ts
  dto.ts
  index.ts

src/components/MemberAvatars.tsx
src/styles.ts                     - Color.Danger added
src/Root.tsx                      - GestureHandlerRootView added
.eslintrc                         - no-var-requires off in test files
```
