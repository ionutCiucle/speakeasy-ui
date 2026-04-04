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

## Tooling

### savegame skill — work-history step

`.claude/skills/savegame/SKILL.md` updated to include a step (step 4) that automatically updates the relevant `docs/claude/work-history/` doc before committing. The skill now:

- Derives the work area from the branch name
- Finds a matching doc by filename, or creates one if none exists
- Stages the doc alongside the code changes

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
