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

---

### Step 5 — ProfilePage + email in auth state ✅

**`src/features/Profile/ProfilePage.tsx`** (new feature directory)

Temporary profile view rendered when the Profile nav tab is active. Shows:
- Username — from `s.auth.username`
- Email — from `s.auth.email`
- Log out button — calls `logoutAsyncAction`, navigates to `/`

**Auth state changes to support email:**
- `AuthState` — added `email: string | null`
- `LoginSuccessAction.payload` — added `email: string`
- `authReducer` — sets `email` on `LoginSuccess`, clears it on `LoginFailure` and `Logout`
- `loginAsyncAction` — dispatches `data.user.email` from the API response
- `useAuthActions.loginSuccess` — signature updated to `(userId, token, email)`
- `useAuthWorkflows.registerAndLogin` — dispatches email from the post-register login response
- `useAuthTokenRehydration` — extracts `payload.email` from the JWT when rehydrating

**`HomePage` updates:**
- `activeTab` state (`useState<ActiveTab>`) drives which content is shown and which nav item is highlighted
- Header title swaps to match the active tab
- `ProfilePage` renders in the content area when `activeTab === 'profile'`; empty state renders otherwise
- `handleTabPress` passed to `<BottomNav onTabPress={...} />`

---

### Step 6 — Figma polish: icon, nav icons, content positioning ✅

**`TabReceiptIcon`** — replaced the placeholder bordered rectangle with `MaterialCommunityIcons: 'glass-cocktail'` at size 84 / `Color.Gold`, matching the cocktail glass silhouette in the Figma.

**`BottomNav`** — replaced plain bordered `View` placeholders with `@expo/vector-icons` icons:
| Tab | Icon |
|---|---|
| Home | `Feather: 'menu'` (horizontal lines) |
| New Tab | `Feather: 'plus'` |
| Friends | `Ionicons: 'people-outline'` |
| Profile | `Feather: 'user'` |

`BottomNavTab` type extracted and exported from `BottomNav.tsx` so `HomePage` can import it directly (eliminates the local `ActiveTab` alias).

**Empty state layout** — changed from `justifyContent: 'center'` to `justifyContent: 'flex-start'` with `paddingTop: 79` (matching the Figma's 79px gap between the header divider and the icon top). Added explicit `marginTop` values between the heading and the buttons to match Figma spacing.

---

### Step 7 — BottomNav promoted to MainNav in shared components ✅

Moved `src/features/Home/components/BottomNav.tsx` → `src/components/MainNav.tsx` and renamed the component and type (`BottomNav` → `MainNav`, `BottomNavTab` → `MainNavTab`).

- Exported from `src/components/index.ts` alongside `Button`, `Input`, etc.
- `MainNav` uses the `flex` utility from `@/styles` for `tabs` and `tab` styles
- `HomePage` now imports `MainNav` and `MainNavTab` from `@/components`

---

### Step 8 — Button secondary variant ✅

Added `variant?: 'primary' | 'secondary'` to `Button` (defaults to `'primary'` — no breaking change to existing usages).

- `secondary` renders a transparent background with a `Color.Gold` border and `Color.Gold` text
- `HomePage` CTA buttons replaced with `<Button variant="primary">` and `<Button variant="secondary">`, removing the inline `TouchableOpacity` definitions
- Style override applied via `style={styles.homeButton}` (width + margin)

---

### Step 9 — Prop types ordering convention ✅

Established and documented the rule: **data/config props first, functional (callback) props last** in all `interface Props` definitions.

- Added to `docs/claude/best-practices.md`
- Applied to `Button` (`onPress` moved after `variant` and `style`) and `Input` (`onChangeText` moved after all optional props)
- `MainNav` was already compliant

---

### Step 10 — Input: invalid border + error message ✅

Added two new props to `Input`:
- `invalid?: boolean` — applies `Color.Flame` border when `true`
- `error?: string` — renders an error message in `Color.Flame` below the input

`LoginPage` and `RegisterPage` updated to pass `invalid={!!fieldError}` and `error={fieldError ?? undefined}` directly to each `Input`, removing the standalone `<Text style={styles.error}>` nodes that previously sat below each field. Also fixed the hardcoded `'red'` colour to `Color.Flame` in both pages' submit error styles.

---

### Step 11 — Input unit tests ✅

`src/components/__tests__/Input.test.tsx` — 7 tests:

| Test | What it checks |
|---|---|
| Renders label and placeholder | Basic render |
| Calls onChangeText | Interaction |
| No error message by default | `error` prop absent |
| Renders error message | `error` prop present |
| No red border by default | `invalid` absent |
| Red border when `invalid=true` | `invalid` prop applied |
| Both invalid border and error together | Combined state |

---

### Step 12 — Component directory restructuring + MainNav unit tests ✅

- `Input` moved to `src/components/Input/` directory; `useValidatedEmailField` and `useValidatedTextField` hooks moved into `src/components/Input/hooks/` and re-exported from `src/components/index.ts`
- `MainNav` moved to `src/components/MainNav/` directory; `NavIcon` extracted to its own file `src/components/MainNav/NavIcon.tsx`
- `Color.Black` (`#000000`) added to the `Color` enum and used for the MainNav shadow
- `src/components/MainNav/__tests__/MainNav.test.tsx` — 7 tests covering labels, active/inactive colours, and `onTabPress` callbacks; `react-native-safe-area-context` mocked to return zero insets

---

### Step 13 — Button unit tests ✅

`src/components/__tests__/Button.test.tsx` — 5 tests:

| Test | What it checks |
|---|---|
| Renders label | Basic render |
| Calls onPress | Interaction |
| Defaults to primary variant | Default prop |
| Primary: white text | Colour check |
| Secondary: gold text | Colour check |

---

### Step 14 — PageHeader component ✅

`src/components/PageHeader.tsx` — shared header component used by `HomePage`.

- Uses `useSafeAreaInsets().top` to push content below the iPhone notch
- Height is `60 + top` set inline so the container grows rather than squashing content
- `paddingTop: top` ensures the title is vertically centred in the visible 60px region
- Gold 1px divider below the header
- `HomePage` updated to import and render `<PageHeader title={HEADER_TITLES[activeTab]} />`

---

### Step 15 — MainNav safe area + UI polish ✅

- MainNav uses `useSafeAreaInsets().bottom` via a dedicated spacer `<View style={{ height: bottom }} />` below the tab row — avoids squashing the fixed-height (62px) tabs container
- Removed hardcoded `paddingBottom: 5` from the tabs style
- Bottom spacer background set to `Color.White` to match the nav background
- Removed the gold 4px `homeIndicator` bottom border from MainNav
- `TabReceiptIcon` wrapper component removed; `FontAwesome6 martini-glass-empty` used inline in `HomePage` for an empty martini glass silhouette
- `react-native-safe-area-context` mocked in MainNav tests to fix the "No safe area value available" failure

---

### Step 16 — tabs slice + TabDashboard + NoTabs ✅

**`src/state-management/tabs/`** — new slice:

| Field | Type | Default |
|---|---|---|
| `tabs` | `Tab[]` | `[]` |
| `isLoading` | `boolean` | `false` |

Actions: `GetTabsPending`, `GetTabsSuccess` (payload: `Tab[]`), `GetTabsFailure`.

`Tab` interface matches the BE response shape: `id`, `title`, `venue`, `currencyCode`, `currencyName`, `notes`, `createdById`, `closedAt`, `createdAt`, `updatedAt`, plus relations `items`, `participants`, `settlements`, `members`, `menuItems`.

`getTabsAsyncAction(dispatch)()` — `GET /api/tabs` (auth header injected by `TabAPI` interceptor).

`useTabsAsyncActions` hook exposes zero-arg `getTabs()`.

**`src/features/Home/TabDashboard.tsx`** — replaces the old placeholder:
- Accepts `tabs: Tab[]` prop
- `toCardData(tab, userId)` derives display shape: status (from `closedAt`), role (`createdById === userId`), duration, formatted date, member count, total amount with currency symbol
- Filter pills (All / Owned / Joined), ACTIVE / CLOSED sections
- `TabCard` with coloured left accent bar (green = active, gold = closed), role badge, chevron, total amount

**`src/features/Home/NoTabs.tsx`** — extracted from old `HomePage` empty state:
- Martini glass icon, heading, subtitle
- "Start a Tab" → `/create-tab`, "Scan QR to Join" → TODO

**`src/features/Home/HomePage.tsx`** — rewritten:
- Calls `getTabs()` on mount
- Shows blank screen while `isLoading`
- Renders `TabDashboard` when `tabs.length > 0`, `NoTabs` otherwise
