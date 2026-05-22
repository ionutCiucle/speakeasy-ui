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

### Skill file reorganisation

`.claude/skills/savegame/` renamed to `.claude/skills/save-game/` (kebab-case to match other skill names). `.claude/skills/start-game/` added as a companion skill for creating and checking out feature branches.

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

## Tab Closed Summary screen

`src/features/TabDetail/TabClosedSummaryPage.tsx` — new full-screen route at `/tab/:id/summary` displayed after the user confirms payment and when navigating to an already-closed tab.

### Layout

- **Closed banner** — dark forest (`#141F14`) card with a green check circle (`Color.ActiveGreen`), "Tab closed — [date]" in white, and "Paid by [name]" in a light sage green (`#8CD18C`). Close date is stored in component state (`useState(() => new Date())`) on mount so the exact time is captured for future BE submission; falls back to `tab.closedAt` when the tab was already closed server-side.
- **Receipt carousel** — paged horizontal `ScrollView` consuming `photos` from `location.state` (passed forward from `ConfirmPaymentPage`). Dots indicator is overlaid inside the card via `position: 'absolute'`; active dot is `Color.Gold`, inactive is `Color.Sand`. Falls back to a placeholder receipt icon when no photos are present.
- **Settlement section** — renders one card per tab member. The payer row (derived from `tab.settlements[0].payerId`, falling back to the current user) uses a gold avatar and a "Payer" linen badge. Other members show an amount derived from `TabSettlementDTO.amount` and either a "Pending" (gold) or "✓ Settled" (dark forest + green) badge.
- **Footer** — "Notifications sent to all members" note + "Repeat this Tab" outline button (no-op placeholder for the repeat flow).

### Navigation wiring

- `ConfirmPaymentPage.handleConfirmPaid` now navigates to `/tab/:id/summary` instead of `/tab/:id`, forwarding `photos` in state.
- `TabDetailPage` renders `<Navigate replace to="/tab/:id/summary" state={{ title: tab.title }} />` when `tab.closedAt !== null`.

## Routing refactor — confirm-payment and summary inside AppLayout

Moved `ConfirmPaymentPage` and `TabClosedSummaryPage` inside the `AppLayout` layout route so they can access the global modal infrastructure (`ModalRoot`). `PhotographReceiptPage` remains outside as a full-screen route (portal candidate for the future).

### AppRoutes.tsx change

`/tab/:id` is now a pathless parent route (no `element`) with three child routes registered under it:

```
<Route element={<AppLayout />}>
  ...
  <Route path="/tab/:id">
    <Route index element={<TabDetailPage />} />
    <Route path="confirm-payment" element={<ConfirmPaymentPage />} />
    <Route path="summary" element={<TabClosedSummaryPage />} />
  </Route>
</Route>
```

### AppLayout title resolution

Added `endsWith('/confirm-payment')` check so the header shows "Confirm Payment". The summary route falls through to the empty `/tab/` config and picks up `state.title` forwarded from `TabDetailPage`'s redirect.

## Edit Receipt Total modal

`src/components/modals/EditReceiptTotalModal.tsx` — bottom-sheet modal triggered from the "Edit" button on the receipt total card in `ConfirmPaymentPage`.

- `ModalHeader` ("Edit Total") — Done button dismisses without applying
- "RECEIPT TOTAL" label (Inter 600, 10px, 0.8 letter-spacing, WarmBrown)
- Linen input card (60px height, radius 8): small currency symbol (Inter 400 13px) + large `TextInput` (Inter 600 24px Espresso), digits-only filtering
- Helper text: "Changes will update the grand total"
- Sand divider + Gold "Apply" button (52px, radius 10, Inter 600 16px white)
- Phase 2: `handleApply` is a no-op beyond closing; persistence to tab state deferred

Wired via `ModalId.EditReceiptTotal` and `EditReceiptTotalModalPayload { currentTotal, currencyCode }`.

## Edit Tip modal

`src/components/modals/EditTipModal.tsx` — bottom-sheet modal triggered from the new "Edit" button on the tip card in `ConfirmPaymentPage`.

- `ModalHeader` ("Edit Tip")
- "TIP PERCENTAGE" label + pill row: 5%, 10%, 15%, 20%, Custom (62×36px, radius 18)
  - Active: Gold bg, white Inter 600; Inactive: Linen bg, WarmBrown Inter 400
- `deriveInitialOption(total, tip)` — matches current tip to a preset within 0.01 tolerance
- "TIP AMOUNT" label + Linen input card (same design as EditReceiptTotalModal)
  - `TextInput` disabled when a preset is active; re-enabled on Custom selection
  - Presets auto-calculate: `(receiptTotal * pct / 100).toFixed(2)`
- Helper text (preset only): "15% of € 87.50"
- Sand divider + Gold "Apply" button
- Phase 2: persistence deferred

Wired via `ModalId.EditTip` and `EditTipModalPayload { receiptTotal, currentTip, currencyCode }`.

`ConfirmPaymentPage` tip card updated to `flexDirection: 'row', justifyContent: 'space-between'` with an "Edit" `TouchableOpacity` alongside the tip amount.

## PriceInput improvements and EditReceiptTotalsModal integration

`PriceInput` updated:
- Height `42 → 44` to match `Input` small variant
- Divider uses `alignSelf: 'stretch'` instead of hardcoded height
- Focus state: gold `1.5px` border via `isFocused` state (same pattern as `Input`)
- New `disabled` prop: sets `editable={false}` and `opacity: 0.5` on the frame

`EditReceiptTotalsModal` updated:
- Both Receipt Total and Tip Amount inputs now use `<PriceInput>` from `@/components`
- Tip field passes `disabled={selectedOption !== 'custom'}` — read-only when a preset is active
- Removed inline `inputCard`, `currencySymbol`, `amountInput` styles and filtering handlers

## Components folder restructure

Each flat component file (`Button.tsx`, `ModalHeader.tsx`, etc.) was moved into its own subdirectory following the existing `Input/` and `MainNav/` convention:

```
Button/
  Button.tsx          ← component
  Button.stories.tsx  ← story
  index.ts            ← export * from './Button'
  __tests__/
    Button.test.tsx   ← test (if one existed)
```

17 components migrated: AccentCard, AddItemForm, Avatar, BackButton, BracketContainer, Button, CurrencySelector, IconButton, LocationSelector, Logo, MemberAvatars, MenuCard, ModalHeader, PageContainer, PageHeader, PriceInput, Wizard. The root `src/components/__tests__/` directory was dissolved — test files now live inside each component's own `__tests__/`. The top-level `src/components/index.ts` was unchanged; import paths still resolve because `'./Button'` now hits `Button/index.ts`. Cross-component relative imports (`'./IconButton'`, `'./Avatar'`, etc.) were updated to `'../IconButton'` etc.

## EditReceiptTotalsModal polish

- Done button hidden via new `hideDone` prop on `ModalHeader` (Apply button is present)
- Apply button replaced with shared `<Button label="Apply" />` from `@/components`
- Bottom padding increased to 44px
- `COMPACT_MODALS` replaced by `INTRINSIC_HEIGHT_MODALS` in `ModalRoot` — modals in this set use `maxHeight` (content-sized) rather than a fixed height; `EditReceiptTotals` is the first member
- Container `flex: 1` removed from the modal; `ScrollView` uses `flexShrink: 1` so the sheet shrinks to content

## Consolidated Edit Receipt Totals modal

Replaced the separate `EditReceiptTotalModal` and `EditTipModal` with a single `EditReceiptTotalsModal` that covers both the receipt total input and the tip percentage/amount selectors. Both the "Edit" button on the receipt total card and the "Edit" button on the tip card in `ConfirmPaymentPage` now open `ModalId.EditReceiptTotals` with a unified `EditReceiptTotalsModalPayload { currentTotal, currentTip, currencyCode }`.

The modal uses a `ScrollView` internally and runs at full sheet height. When a preset percentage is active and the user edits the receipt total, the tip amount auto-recalculates via a `useEffect`.

Old files deleted: `EditReceiptTotalModal.tsx`, `EditTipModal.tsx`. `COMPACT_MODALS` in `ModalRoot` is now an empty set (all modals use full height).

## Compact modal size

`ModalRoot` now supports a compact sheet variant for modals that need less vertical space. `COMPACT_SHEET_HEIGHT = SHEET_HEIGHT * 0.7` (30% shorter). A `COMPACT_MODALS` set controls which `ModalId`s use it — currently `EditReceiptTotal` and `EditTip`. The `sheetHeightFor(id)` helper drives both the sheet style and the slide-in/out animation start/end values so the animation always matches the rendered height.

## Modal sheet background fix

`ModalRoot` sheet background corrected from `Color.Cream` (`#F5F0E8`) to `Color.White` (`#FFFFFF`) to match the Figma spec.

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
