# Tab Detail — Menu Items Wiring

**Date:** April 2026
**Branch:** `feature/add-tab-detail`

## What was built

Wired `tab.menuItems` (the orderable menu returned by the BE) into `TabDetailPage`, and connected `AddItemsModal` to persist additions via `PATCH /tabs/:id`.

Previously, `TabDetailPage` only displayed placed orders (`tab.items`) and ignored `tab.menuItems` entirely. `AddItemsModal` stored items in local state but never called the API.

### New hook — `useUpdateTabMenuItems`

`src/state-management/tabs/api-hooks/useUpdateTabMenuItems.ts`

Wraps `TabAPI.patch<TabDTO>(`/${tabId}`, { menuItems })`. Returns `{ updateMenuItems, isLoading }`. Follows the same local-state pattern as `useTabDetails` (no global store).

Exported from `src/state-management/tabs/api-hooks/index.ts` and `src/state-management/tabs/index.ts`.

### Layout state — modal payload

`src/state-management/layout/types.ts` and `reducer.ts` extended with an optional `modalPayload` field on `LayoutState`. `ShowModalAction` now accepts an optional generic payload so `ModalId.AddItems` can carry `{ existingMenuItems, onDone }` without coupling the layout slice to tab-specific types.

`useLayoutActions.showModal` updated to accept an optional second argument passed through as payload.

### ModalRoot

`renderContent` now reads `state.layout.modalPayload` and passes `existingMenuItems` and `onDone` into `AddItemsModal`.

### AddItemsModal

- Accepts `existingMenuItems: TabMenuItemDTO[]` and `onDone: (merged: { name, price }[]) => Promise<void>`
- On Done: merges existing + newly added items, calls `onDone(merged)`, closes modal on success

### TabDetailPage

- Adds `useUpdateTabMenuItems(id)`
- Calls `showModal(ModalId.AddItems, { existingMenuItems: tab.menuItems, onDone: handleMenuItemsDone })`
- `handleMenuItemsDone` calls `updateMenuItems(merged)` and refreshes tab data on success
- Passes `tab.menuItems` (mapped to `OrderItem[]`) into `TabMenuItems` for display

### TabMenuItems / display

`tab.menuItems` (the defined menu) is now shown in place of `tab.items` (placed orders) in the menu list. Each row shows `quantity: 0` until ordering is wired. `handleIncrement` / `handleDecrement` remain TODOs for the ordering flow.

## Per-card loading indicator

`TabMenuItems` now accepts `loadingItemId?: string | null` instead of `isLoading?: boolean`. Each `MenuCard` receives `isLoading={item.id === loadingItemId}` so only the tapped card shows the spinner.

`TabDetailPage` tracks `loadingItemId` in local state. `syncMemberItems` is now async — it sets `loadingItemId` to the triggering item's id before `await updateMemberItems(...)` and clears it to `null` after. The `isUpdatingMemberItems` global flag is no longer used for display.

`TabDetailPage` tests added (`src/features/TabDetail/__tests__/TabDetailPage.test.tsx`) covering: initial quantity display, increment/decrement/remove, API payload shape (aggregated quantities, zero-quantity omission), and per-card spinner behaviour.

## Member item ordering

Wired `+` / `-` / trash swipe actions on `MenuCard` in `TabDetailPage` to `PATCH /:tabId/members/:userId/items`.

### New async action — `updateMemberItemsAsyncAction`

`src/state-management/tabs/asyncActions.ts` — calls `TabAPI.patch(`/${tabId}/members/${userId}/items`, { items })` where `items` is `{ menuItemId, quantity }[]` (zero-quantity items omitted per BE validation).

New action types in `enums.ts`: `UpdateMemberItemsPending/Success/Failure`. State field `isUpdatingMemberItems` added to `TabsState` and reducer.

`useTabAsyncActions` now exposes `updateMemberItems` and `isUpdatingMemberItems`.

### TabDetailPage ordering logic

`memberMenuItems` — flat array of ordered entries. Each `+` push appends one entry; `-` and trash remove the last occurrence. Card quantity = `memberMenuItems.filter(m => m.id === cardId).length`. `syncMemberItems` derives the aggregated `{ menuItemId, quantity }[]` and calls the API after every mutation. `userId` read from `state.auth.userId`.

### MenuCard loading state & UX polish

- `isLoading` prop — shows `ActivityIndicator` inside the quantity badge while a PATCH is in flight
- `showQuantity` hides the badge entirely (used in `BuildMenuStep`)
- Badge hidden when `quantity === 0` (unless loading)
- Quantity badge moved to right of item name; drag handle added on left
- Badge colour changed to `Color.Flame`

### Tests

`src/components/__tests__/MenuCard.test.tsx` — 14 tests covering rendering, loading state (spinner shown/hidden, `showQuantity` takes precedence), and all swipe actions including quantity ≤ 1 → trash behaviour.

## MenuCard layout update

`src/components/MenuCard.tsx` updated to match revised Figma spec:

- Added a 3×2 drag handle (sand-coloured dots, 2px gap) on the left edge of the card
- Moved the quantity badge to sit between the item name and the price box (right side)
- Removed `marginLeft` from item name; badge gains `marginRight: 6` for spacing

## Tooling

### savegame skill — work-history step

`.claude/skills/savegame/SKILL.md` updated to include a step (step 4) that automatically updates the relevant `docs/claude/work-history/` doc before committing. The skill now:

- Derives the work area from the branch name
- Finds a matching doc by filename, or creates one if none exists
- Stages the doc alongside the code changes

## Bug fixes

### MenuCard trash icon shown at wrong quantity

`MenuCard` was using `quantity <= 1` to decide whether to show the trash icon, so the trash appeared at quantity 1 when minus should have been shown instead. Fixed to `quantity === 0` — trash only appears when there is nothing left to decrement.

`BuildMenuStep` was passing `quantity: 1` to each `MenuCard`, which masked the bug in that context. Changed to `quantity: 0` since `BuildMenuStep` has no quantity tracking (`showQuantity={false}`) and always wants the trash icon.

Tests updated/added in `src/components/__tests__/MenuCard.test.tsx`:
- "calls onTapMinus when quantity is 1" (was onTapRemove — corrected)
- "shows the trash icon and calls onTapRemove when quantity is 0" (visual + callback combined)
- "shows no trash icon and calls onTapMinus when quantity is greater than 0" (visual + callback combined)
- "calls onTapPlus when the left action is pressed" (explicit plus coverage)
- Ionicons mock updated to render `testID="icon-{name}"` so icon visibility is assertable

### Trash icon removes item from tab menu (gated by addedBy)

Tapping the trash icon on a `MenuCard` in `TabDetailPage` now removes that item from the tab's menu entirely via `PATCH /:tabId` (`updateMenuItems`), rather than just decrementing member quantity.

The trash icon is only shown when `canRemoveFromMenu` is true — which is gated by whether the current user added that item (`tab.menuItems.filter(m => m.addedBy === userId)`). Items added by other members show the minus icon at quantity 0 with no remove action.

**Changes:**
- `src/state-management/tabs/dto.ts` — added `addedBy: string` to `TabMenuItemDTO` (field already returned by BE)
- `src/components/MenuCard.tsx` — restored `canRemoveFromMenu?: boolean` prop; `showTrash = canRemoveFromMenu && quantity === 0`
- `src/features/TabDetail/components/TabMenuItems/TabMenuItems.tsx` — added `removableItemIds?: Set<string>` prop; passes `canRemoveFromMenu` to each `MenuCard`
- `src/features/TabDetail/TabDetailPage.tsx`:
  - Destructures `updateMenuItems` from `useTabAsyncActions`
  - Computes `removableItemIds` from `tab.menuItems.filter(m => m.addedBy === userId)`
  - `handleTapRemove` now calls `updateMenuItems(tab.id, filteredMenu)` and `refetch()` instead of `syncMemberItems`
  - Passes `removableItemIds` to `TabMenuItems`
- `TabDetailPage.test.tsx` — updated mocks and tests: `mockUpdateMenuItems` added; `addedBy` in TAB fixture; new test "calls updateMenuItems with the item removed when trash is pressed"

### BuildMenuStep — expanded test coverage

Additional tests added to `src/features/CreateTab/components/__tests__/BuildMenuStep.test.tsx`:
- Price validation: does not call `addMenuItem` when price field is empty
- Form reset: both name and price fields clear after a successful add
- Trash icons: one `trash-outline` icon rendered per menu item
- `Ionicons` mock updated to render `testID="icon-{name}"` (consistent with MenuCard tests)

## Files changed

```
src/state-management/tabs/api-hooks/
  useUpdateTabMenuItems.ts     - new: PATCH /:id with merged menuItems
  index.ts                     - export useUpdateTabMenuItems

src/state-management/tabs/index.ts
                               - re-export useUpdateTabMenuItems

src/state-management/layout/
  types.ts                     - LayoutState gains modalPayload?: unknown
  reducer.ts                   - ShowModal stores payload
  hooks/useLayoutActions.ts    - showModal accepts optional payload arg

src/ModalRoot.tsx              - passes modalPayload to AddItemsModal case

src/components/modals/AddItemsModal.tsx
                               - existingMenuItems + async onDone props
                               - merges on Done, calls onDone, closes

src/features/TabDetail/TabDetailPage.tsx
                               - useUpdateTabMenuItems
                               - showModal with payload
                               - tab.menuItems → TabMenuItems
```
