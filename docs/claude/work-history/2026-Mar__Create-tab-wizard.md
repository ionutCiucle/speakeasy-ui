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

### Step 9 — createTab state slice ✅

**`src/state-management/createTab/`** — new slice following the standard structure:

| Field | Type | Default |
|---|---|---|
| `tabName` | `string` | `''` |
| `venue` | `string` | `''` |
| `currency` | `{ code: string; name: string }` | `{ code: 'USD', name: 'US Dollar' }` |
| `notes` | `string` | `''` |

Actions: `SetTabName`, `SetVenue`, `SetCurrency`, `SetNotes` — all string/object payloads.
Hook: `useCreateTabActions` exposes `setTabName`, `setVenue`, `setCurrency`, `setNotes`.

**`TabDetailsStep`** — replaced all `useState` calls with `useAppSelector` + `useCreateTabActions`. `CurrencySelector` now receives `currency.code` / `currency.name` from the store.

**`CurrencyModal`** — removed local `selectedCode` state; now accepts `selectedCode: string` and `onSelect: (code, name) => void` props. Search query remains local (ephemeral UI state).

**`ModalRoot`** — reads `state.createTab.currency` and passes `setCurrency` as `onSelect` into `CurrencyModal` via `renderContent`.

---

### Step 10 — ESLint: enforce switch-case braces ✅

- Installed `eslint-plugin-unicorn@55` (v64 is ESM-only and incompatible with ESLint v8)
- Added `"unicorn"` to `plugins` and `"unicorn/switch-case-braces": ["error", "always"]` to rules in `.eslintrc`
- Ran `--fix` across all reducers and `src/` — all switch cases now wrapped in `{ }` blocks
- Created `.vscode/settings.json` with `eslint.workingDirectory` + `eslint.nodePath` to ensure the VS Code ESLint extension resolves plugins from the workspace `node_modules`

---

### Step 11 — Home screen wiring ✅

`src/features/Home/HomePage.tsx`:

- Imported `useNavigate` from `react-router-native`
- `handleStartTab` — was a TODO stub; now calls `navigate('/create-tab')`
- `handleTabPress` — extended: pressing the `newTab` tab calls `navigate('/create-tab')` and returns early instead of calling `setActiveTab`
- Both handlers updated with `navigate` in their `useCallback` dependency arrays

---

### Step 12 — Input `size` prop + form field consistency ✅

**`src/components/Input/Input.tsx`**:
- Added `size?: 'default' | 'small'` prop (default `'default'`)
- `inputSmall` style matches `LocationSelector`/`CurrencySelector` dimensions: `height: 44`, `paddingHorizontal: 14`, `paddingVertical: 0`, `borderRadius: 8`, `fontSize: 14`, `Inter_500Medium`
- Removed `letterSpacing: 1.5` from label — now visually consistent with the other field labels

**Form field spacing standardised** — all three field components now use a container wrapper with `marginBottom: 16` instead of mixing container bottom-margin with label top-margin:

| Component | Before | After |
|---|---|---|
| `Input` | container `marginBottom: 16`, label no `marginTop` | unchanged |
| `LocationSelector` | label `marginTop: 16`, no container margin | `<View container>` `marginBottom: 16`, label no `marginTop` |
| `CurrencySelector` | label `marginTop: 16`, no container margin | `<View container>` `marginBottom: 16`, label no `marginTop` |

**`TabDetailsStep`** — Tab Name and Notes inputs now use `size="small"`.

---

### Step 13 — TabDetailsStep continue validation ✅

**`src/features/CreateTab/hooks/useTabDetailsValidation.ts`** — new hook:
- Accepts `{ tabName, venue }` values
- Tracks a `submitted` flag; errors are computed reactively so they clear as soon as the user fixes the field
- `validateAll()` sets `submitted = true`, returns `boolean`
- Rules: `tabName` and `venue` must be non-empty after trim

**`src/components/LocationSelector.tsx`** — added `invalid?: boolean` and `error?: string` props:
- `inputWithIconInvalid` style (`borderColor: Color.Flame`) applied when `invalid`
- Error text rendered below the input row (same style as `Input`'s error)

**`TabDetailsStep`**:
- `handleContinue` calls `validateAll()` and only invokes `onContinue` if the form is valid
- Tab Name `<Input>` wired with `invalid` + `error` from hook
- `<LocationSelector>` wired with `invalid` + `error` from hook

---

### Step 14 — AddMemberStep ✅

`src/features/CreateTab/AddMemberStep.tsx`

**WHO'S JOINING panel:**
- `Avatar` (size 44, variant `'self'`, label `"Me"`) always shown first
- Member avatars (size 44, variant `'member'`) for each added member
- "+" add button (dashed `Color.Sand` border) for future member-add flow
- `"No other members added"` text shown when `members.length === 0`

**Search bar:**
- `Feather: 'search'` icon on the left
- Disabled (`editable={false}`, `searchBarDisabled` style) when no friends exist (`FRIENDS.length === 0`)

**Friends list:**
- Placeholder `FRIENDS: unknown[] = []` — to be wired when friends slice exists

---

### Step 15 — BuildMenuStep ✅

`src/features/CreateTab/BuildMenuStep.tsx`

Menu item entry form:
- Name + price inputs with inline validation
- "Add Item" button appends to `menuItems` in the `createTab` store
- Renders each added item in a list with remove button
- Wired to `useCreateTabActions` (`addMenuItem`, `removeMenuItem`)

---

### Step 16 — ReviewStep ✅

`src/features/CreateTab/ReviewStep.tsx`

Pure display step — reads all `createTab` state from Redux:
- **TAB DETAILS card:** name, venue, currency
- **WHO'S JOINING card:** overlapping `Avatar` components (size 26, `marginLeft: -6`) for each member
- **ITEMS card:** list of menu items with price; Sand `infoBar` footer showing total

No Start Tab button — owned by `CreateTabPage` footer.

---

### Step 17 — CreateTabPage footer + Start Tab wiring ✅

**`src/features/CreateTab/CreateTabPage.tsx`**:
- Footer renders `Button variant="tertiary" label="Start Tab"` on the review step (step 4), `Button variant="tertiary" label="Continue" rightIcon="chevron-right"` otherwise
- `isReviewStep` derived from `stepConfig?.nextRoute === ''`
- `handleStartTab` calls `submitCreateTab()` (async action) and navigates to `/home` on success

---

### Step 18 — Avatar shared component ✅

`src/components/Avatar.tsx`

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | — |
| `variant` | `'self' \| 'member'` | `'member'` |
| `size` | `number` | `44` |
| `style` | `StyleProp<ViewStyle>` | — |

- `'self'` → Gold background, EspressoDark text
- `'member'` → Linen background, Espresso text
- Font size: 9 when `size <= 30`, 11 otherwise
- Used in `AddMemberStep` and `ReviewStep`

---

### Step 19 — Route persistence + badge indicator ✅

**`src/AppLayout.tsx`**:
- `lastCreateTabRoute` ref tracks the last active sub-route within `/create-tab` (updated on every render while on that route)
- `createTabInProgress` state: `true` when user navigates away mid-wizard (i.e. `lastCreateTabRoute.current !== '/create-tab'`)
- `<MainNav badgeTabs={createTabInProgress ? ['newTab'] : []} />` shows red dot on New Tab icon
- Pressing New Tab while `createTabInProgress` resumes at `lastCreateTabRoute.current`
- `handleClose` (X button): resets ref, dispatches `reset()`, navigates to `/home` — clears badge

**`src/components/MainNav/MainNav.tsx`**:
- Added `badgeTabs?: MainNavTab[]` prop
- Red 8×8 dot (`Color.Flame`) positioned `top: -3, right: -5` on the nav icon wrapper when tab key is in `badgeTabs`

---

### Step 20 — createTab async action + submit ✅

**`src/state-management/createTab/asyncActions.ts`**:
- `createTabAsyncAction(dispatch)(body)` — `POST /api/tabs` with `{ title, venue, currency, notes, members, menuItems }`
- Dispatches `SubmitPending` / `SubmitSuccess` / `SubmitFailure`

**`src/state-management/createTab/hooks/useCreateTabAsyncActions.ts`**:
- `submitCreateTab()` — zero-arg; reads all state internally, maps `tabName → title`

**`src/state-management/createTab/` slice additions:**
- `isSubmitting: boolean` added to `CreateTabState`
- `Reset`, `SubmitPending`, `SubmitSuccess`, `SubmitFailure` action types

---

### Step 21 — Button `showSpinner` prop ✅

**`src/components/Button.tsx`**:
- Added `showSpinner?: boolean` prop
- When `true`, replaces the label (and any icon) with `<ActivityIndicator>` using the variant's label colour
- `disabled` is coerced to `true` while spinning — prevents double-submit
- `VARIANT_COLOR` map drives both the label colour and the spinner colour

---

### Step 22 — FilterPills component + TabList scroll fix ✅

**`src/features/Home/components/FilterPills.tsx`** — new component containing only the pill buttons row (All / Owned / Joined). No tab count, no wrapper row.

**`src/features/Home/components/TabList/TabList.tsx`** — restructured so only the cards scroll:
- `filterRow` (tab count + `FilterPills`) and `filterSeparator` live **outside** the `ScrollView`
- `ScrollView` contains only the tab cards

---

### Step 23 — Step components moved to `CreateTab/components/` ✅

Moved `TabDetailsStep`, `AddMemberStep`, `BuildMenuStep`, `ReviewStep` into `src/features/CreateTab/components/` with a barrel `index.ts`. Tests moved to `src/features/CreateTab/components/__tests__/`.

---

### Step 24 — `apiHooks` pattern + `useTabs` ✅

New read-only data-fetching pattern — an alternative to GET async actions. Stores fetched data in local component state rather than the global store.

**`src/state-management/tabs/api-hooks/useTabs.ts`**:
- `useState` for `tabs`, `isLoading`, `error`
- `fetchTabs` in a `useCallback`; called once on mount via `useEffect`
- On failure: sets `error: 'Failed to load tabs'` and logs `console.error('[useTabs] Failed to load tabs:', err)`
- Returns `{ tabs, isLoading, error }`

**`src/features/Home/HomePage.tsx`** — replaced `getTabs` async action with `useTabs()`. Tabs data no longer lives in the global store.

**`src/state-management/tabs/` slice** — `getTabs` async action and all associated reducer fields (`isLoading`, `GetTabsPending`, `GetTabsSuccess`, `GetTabsFailure`) removed. Slice now only holds DTOs and exports `useTabs`.

**Docs** — `docs/claude/state-management.md` updated with the `use<Resource>` apiHooks pattern, rules, and when-to-use guidance.

---

### Step 25 — Directory renames ✅

- `src/state-management/tabs/hooks/` → `src/state-management/tabs/api-hooks/`
- `src/state-management/createTab/` → `src/state-management/create-tab/`

All internal and external imports updated accordingly.

---

### Step 26 — Axios removed; `createApi` factory introduced ✅

Replaced axios with a zero-dependency `fetch`-based API client. Call-site contract (`{ data }` destructure) is unchanged.

**`src/services/createApi.ts`** (was `apiClient.ts`):
- `createApi(baseURL, getHeaders?)` factory — `getHeaders` is an optional async function passed at construction time, replacing the old `setHeadersInterceptor` method
- Methods: `get`, `post`, `put`, `patch`, `delete` — all return `Promise<{ data: T }>`
- `_request` internal helper — not exported
- Non-2xx responses throw `Error('HTTP <status>: <statusText>')`

**`src/services/index.ts`**:
- `getAuthHeaders()` — shared helper that reads the JWT from SecureStore and returns `{ Authorization: Bearer <token> }` or `{}` when absent
- `AuthAPI` — no auth headers (login/register endpoints)
- `TabAPI` — constructed with `getAuthHeaders`

**Tests** — `src/services/__tests__/createApi.test.ts` (renamed from `apiClient.test.ts`): covers all five HTTP methods plus the `getHeaders` constructor argument.
