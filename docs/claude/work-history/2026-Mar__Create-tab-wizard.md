# 2026-Mar__Create-tab-wizard

## Plan

Build the Create Tab multi-step wizard. Entry point wired from the Home screen ("Start Tab" button and `newTab` nav press). Step 1 collects the core tab details: name, venue/location, currency, and optional notes.

---

### Step 1 — Color tokens ✅

Added two new tokens to `src/styles.ts`:

| Token | Hex | Usage |
|---|---|---|
| `Color.EspressoDark` | `#1A140D` | Continue button background |
| `Color.Linen` | `#EDE8DC` | Info box background |

---

### Step 2 — CreateTabStep1Page ✅

`src/features/CreateTab/CreateTabStep1Page.tsx`

4-step wizard shell with step 1 content rendered.

**Layout:**
- Header row: back chevron (`Feather: 'chevron-left'`) / "New Tab" title / close X — back calls `navigate(-1)`, close navigates to `/home`
- Progress bar: 4 equal segments; active segment filled `Color.Gold`, inactive `Color.Sand`
- Step label: `Step 1 of 4 · Tab Details`
- Scrollable form body with `KeyboardAvoidingView` (iOS: `padding`, Android: `height`)

**Form fields:**
| Field | Type | Notes |
|---|---|---|
| Tab Name | `TextInput` | Plain text input |
| Venue / Location | `TextInput` with icon | `Feather: 'map-pin'` Gold icon prefix |
| Currency | `TouchableOpacity` selector | Shows code + name + chevron; stubbed at USD |
| Notes | Multiline `TextInput` | Optional, 3-line height, `textAlignVertical: top` |

**Info box** — `Color.Linen` background with `Feather: 'info'` icon; informs users the tab opens when "Start Tab" is tapped.

**Continue button** — `Color.EspressoDark` background, `Color.White` label, `Feather: 'chevron-right'` suffix; `handleContinue` stubbed with TODO for step 2 navigation.

`MainNav` pinned at the bottom with `activeTab="newTab"`; `handleNavTabPress` is a no-op (already on the wizard).

`useSafeAreaInsets().top` applied to the header `paddingTop` to respect the device notch.

---

### Step 3 — Feature index ✅

`src/features/CreateTab/index.ts` — re-exports `CreateTabStep1Page`.

---

### Step 4 — Route registration ✅

`src/AppRoutes.tsx` — added `<Route path="/create-tab" element={<CreateTabStep1Page />} />`.

---

### Step 5 — Refactor: CreateTabPage container + TabDetailsStep ✅

- `CreateTabStep1Page` renamed → `TabDetailsStep` (accepts `onContinue: () => void` prop)
- New `CreateTabPage` container manages `currentStep` state and renders the active step
- Route `/create-tab` now points to `<CreateTabPage />`

---

### Step 6 — Extract shared components ✅

Three reusable components extracted from `TabDetailsStep` into `src/components/`:

| Component | Description |
|---|---|
| `Wizard` | Progress bar segments + "Step N of M · Name" label; props: `totalSteps`, `currentStep`, `stepName` |
| `LocationSelector` | "Venue / Location" label + map-pin icon text input; props: `value`, `onChangeText` |
| `CurrencySelector` | "Currency" label + selector row + hint text; props: `currencyCode`, `currencyName`, `onPress` |

---

### Step 7 — Layout slice + ModalContainer ✅

**`src/state-management/layout/`** — new slice following the standard slice structure:
- `LayoutState { activeModal: ModalId | null }`
- Actions: `ShowModal` / `HideModal`
- `ModalId` enum — `CurrencyPicker` is the first entry
- `useLayoutActions` hook exposes `showModal(modalId)` and `hideModal()`

**`src/components/modals/ModalContainer.tsx`** — global animated bottom sheet shell mounted in `AppLayout`:
- Reads `activeModal` from layout state
- Slide-up + overlay animation (240ms, `Easing.inOut(Easing.ease)`)
- Overlay: `Color.Black` at 60% opacity; sheet: `Color.Ivory`, rounded top corners
- Drag handle (40×4px, `Color.Sand`) rendered by the container — modal content components do not repeat it
- `renderedModal` ref pattern ensures close animation fully plays before content unmounts
- `renderContent(modalId, onDone)` switch dispatches to per-modal content

**`TabDetailsStep`** — tapping `CurrencySelector` dispatches `showModal(ModalId.CurrencyPicker)`

---

### Step 8 — CurrencyModal ✅

**`src/components/modals/CurrencyModal.tsx`** — bottom sheet content for currency selection:
- Props: `onDone: () => void` (wired to `hideModal` by `ModalContainer`)
- Local state: `selectedCode` (default `'USD'`), `searchQuery`
- Search filters by code, name, or country
- Currency list (7 popular currencies): avatar circle with country abbreviation + per-currency colour, `CODE Symbol` label (Gold if selected, Espresso otherwise), `Name · Country` subtitle, `Color.Sand` separators, Gold checkmark on selected row
- "Scroll to see all currencies ›" footer

| Currency | Abbr | Avatar colour |
|---|---|---|
| USD $ | US | `#2E4F99` |
| EUR € | EU | `#0D308F` |
| GBP £ | GB | `#BF2133` |
| CAD $ | CA | `#D92630` |
| AUD $ | AU | `#1A408C` |
| JPY ¥ | JP | `#D9141F` |
| MXN $ | MX | `#087A24` |

---

### Step 9 — Home screen wiring ✅

`src/features/Home/HomePage.tsx`:

- Imported `useNavigate` from `react-router-native`
- `handleStartTab` — was a TODO stub; now calls `navigate('/create-tab')`
- `handleTabPress` — extended: pressing the `newTab` tab calls `navigate('/create-tab')` and returns early instead of calling `setActiveTab`
- Both handlers updated with `navigate` in their `useCallback` dependency arrays
