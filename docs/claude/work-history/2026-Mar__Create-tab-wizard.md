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

### Step 5 — Home screen wiring ✅

`src/features/Home/HomePage.tsx`:

- Imported `useNavigate` from `react-router-native`
- `handleStartTab` — was a TODO stub; now calls `navigate('/create-tab')`
- `handleTabPress` — extended: pressing the `newTab` tab calls `navigate('/create-tab')` and returns early instead of calling `setActiveTab`
- Both handlers updated with `navigate` in their `useCallback` dependency arrays
