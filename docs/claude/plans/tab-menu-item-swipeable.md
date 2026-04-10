# Plan: Swipeable TabMenuItem

**Branch:** `feature/add-tab-detail`  
**Status:** Done

---

## Goal

Replace the current inline stepper in `TabMenuItem` with swipe gestures that match the Figma design:

- **Swipe right** → card translates right (partially off-screen), revealing the green (+) panel behind it on the left
- **Swipe left** → card translates left (partially off-screen), revealing the red (−/trash) panel behind it on the right
- Tapping the card snaps it back to resting position
- Tapping an action panel triggers the action and snaps back
- When `quantity === 1`, the right action shows a trash icon instead of `−`

---

## Design spec (from Figma)

### Card (resting state)
- Background: `#FFFFFF` (`Color.White`)
- Shadow: `0px 2px 8px rgba(0,0,0,0.05)`
- Border radius: `8px`
- Height: `54px`
- Full-width within `32px` horizontal margins

### Quantity badge
- Gold circle (`Color.Gold`, `#C9A84C`), `22×22px`
- White Inter 600 number, `10px`, centered
- Positioned `8px` from left, vertically centered

### Item name
- Inter 500, `13px`, `Color.Espresso` (`#2D2416`)
- Left of price badge, `38px` from left edge

### Price badge
- Background: `Color.Linen` (`#EDE8DC`), `68×26px`, radius `5px`
- Inter 600, `12px`, `Color.EspressoDark` (`#2D2416`), centered
- `14px` from right edge of card

### Left action panel (swipe right → increment)
- Width: `72px`, height: `54px`
- Background: `Color.ActiveGreen` (`#42904C`)
- Rounded left corners only (`8px`), flush right
- White `+` cross: two rectangles `18×3px` and `3×18px`, `1px` radius

### Right action panel (swipe left → decrement / remove)
- Width: `80px`, height: `54px`
- Background: `#C0392B` (new token: `Color.Danger`)
- Rounded right corners only (`8px`), flush left
- `quantity > 1`: white `−` bar (`18×3px`, `1px` radius), vertically centered
- `quantity === 1`: trash icon (use `Ionicons` `trash-outline`, white, `18px`)

---

## Technical approach

Use `Swipeable` from `react-native-gesture-handler` (already installed at v2.30). It handles the pan gesture and action panels natively. No Reanimated needed.

```
import { Swipeable } from 'react-native-gesture-handler';
```

`Swipeable` accepts `renderLeftActions` and `renderRightActions` render props. Each receives `(progress, dragX)` — an `Animated.Value` — which can be used to animate the action panel in/out.

The `Swipeable` ref will be stored per-item so we can call `ref.close()` after an action tap or a tap on the card itself.

---

## Steps

### Step 1 — Add `Color.Danger` token
- [x] Add `Danger: '#C0392B'` to `src/styles.ts`

### Step 2 — Rewrite `TabMenuItem`
- [x] Remove inline stepper (`stepperMinus`, `stepperPlus`, `stepperQty` etc.)
- [x] Wrap card in `<Swipeable>` with `renderLeftActions` and `renderRightActions`
- [x] Implement card layout:
  - Gold quantity badge (circle + number)
  - Item name (Inter 500, 13px)
  - Price badge (Linen background)
- [x] Implement `renderLeftActions` → green `+` panel
- [x] Implement `renderRightActions` → red `−` / trash panel (branch on `quantity === 1`)
- [x] On action tap: call `onIncrement` / `onDecrement`, then `swipeableRef.current?.close()`
- [x] On card tap (`TouchableOpacity`): call `swipeableRef.current?.close()`
- [x] Do **not** clip the `Swipeable` container — the card intentionally slides partially off-screen as the design shows

### Step 3 — Ensure `GestureHandlerRootView` wraps the app
- [x] Verify `Root.tsx` (or `App.tsx`) wraps with `<GestureHandlerRootView>` — required by RNGH v2 on Android

### Step 4 — Clean up `TabMenuItems`
- [x] `TabMenuItems` no longer needs to pass `onIncrement` / `onDecrement` layout — verify props still correct after TabMenuItem rewrite

### Step 5 — Update price display
- [x] Price badge shows **unit price** × quantity (total for that item), formatted with `currencySymbol`

---

## Files to change

| File | Change |
|---|---|
| `src/styles.ts` | Add `Danger` colour token |
| `src/features/TabDetail/components/TabMenuItems/TabMenuItem.tsx` | Full rewrite — swipeable card |
| `src/Root.tsx` | Verify / add `GestureHandlerRootView` wrapper |

`TabMenuItems.tsx` and `types.ts` are **not expected to change**.
