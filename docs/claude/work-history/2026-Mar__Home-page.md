# 2026-Mar__Home-page

## Plan

Build the Home screen (empty state) from the Figma design. Screen shows a header, a tab receipt illustration, empty-state copy, two CTAs, and a bottom navigation bar.

---

### Step 1 — TabReceiptIcon component ✅

`src/features/Home/components/TabReceiptIcon.tsx`

Three `View` elements (no SVG dependency) replicate the Figma vectors:
- `card` — 84×62 bordered rectangle (the receipt body)
- `stem` — 38px vertical line below the card centre
- `base` — 52px horizontal line at the bottom

All borders use `Color.Gold` (`#C9A84C`), `borderWidth: 1.8` matching the Figma spec.

---

### Step 2 — BottomNav component ✅

`src/features/Home/components/BottomNav.tsx`

Four-tab bar: Home, New Tab, Friends, Profile.

- Active tab colour: `Color.Gold`; inactive: `Color.WarmBrown`
- Icon placeholder shapes sized to match the Figma vectors
- `activeTab` prop (default `'home'`) and optional `onTabPress` callback
- White background, `Color.Sand` top separator, `Color.Gold` 4px bottom indicator
- Shadow matches Figma: `0px -2px 12px rgba(0,0,0,0.08)`

---

### Step 3 — HomePage ✅

`src/features/Home/HomePage.tsx` — replaced the placeholder Welcome screen.

Layout:
- Header (60px): "My Tabs" in `CormorantGaramond_700Bold` 22px / `Color.Espresso`
- Gold 1px divider
- `flex: 1` empty state: `TabReceiptIcon`, heading, subtitle, primary + secondary buttons
- `<BottomNav />` pinned to bottom

Buttons match Figma exactly (327×54, border-radius 8):
- Primary: `Color.Gold` background, white `Inter_600SemiBold` text
- Secondary: outlined `Color.Gold` border and text on `Color.Cream` background

Handlers (`handleStartTab`, `handleScanQR`) stubbed with TODO comments for future navigation.

---

### Step 4 — Index files ✅

- `src/features/Home/components/index.ts` — re-exports `BottomNav` and `TabReceiptIcon`
- `src/features/Home/index.ts` — re-exports `HomePage`
