# 2026-Mar__Authenticated-layout-shell

## Plan

Lift `PageHeader` and `MainNav` out of individual pages into a shared layout shell (`AppLayout`) so they persist across route changes. Auth screens remain full-screen. `ProfilePage` promoted to its own route. Introduce `IconButton` as a reusable icon-press primitive used by `BackButton`, `PageHeader`, and `BracketContainer`.

---

### Step 1 — Navigation bug fix: rehydration re-fires on every route change ✅

**`src/features/Auth/hooks/useAuthTokenRehydration.ts`**

Root cause: React Router v6's `useNavigate` (non-data-router path) recreates the `navigate` function reference on every location change because `locationPathname` is in its internal `useCallback` deps. This made `rehydrate`'s `useCallback` recreate on every navigation, which re-triggered `useEffect`, which called `navigate('/home')` and bounced the user back.

Fix: store `navigate` in a ref (`navigateRef.current = navigate`) updated each render. `rehydrate`'s `useCallback` now depends only on `loginSuccess` (stable), so the effect fires exactly once on mount.

---

### Step 2 — `PageHeader` wizard variant ✅

Added two optional props:

```ts
interface Props {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}
```

Layout: three-column flex (`[flex:1 left] [auto centre] [flex:1 right]`) keeps the title optically centred regardless of which buttons are present. Buttons use `IconButton` (see step 4). Both default to `Color.Gold` / size `28` — matching the auth screen back button.

---

### Step 3 — `AppLayout` layout route ✅

**`src/features/App/AppLayout.tsx`** + **`src/features/App/index.ts`**

Pathless layout route (no `path` prop) that wraps all authenticated routes. Uses `useLocation()` to look up a route config map:

```ts
const ROUTE_CONFIG = {
  '/home':       { title: 'My Tabs', tab: 'home' },
  '/profile':    { title: 'Profile', tab: 'profile' },
  '/create-tab': { title: 'New Tab', tab: 'newTab', wizard: true },
};
```

Renders: `PageHeader` (with `onBack`/`onClose` for wizard routes) → `View flex:1` containing `<Outlet />` → `MainNav`.

`MainNav` tab press navigates to the route for that tab; pressing the already-active tab is a no-op.

---

### Step 4 — `IconButton` component ✅

**`src/components/IconButton.tsx`**

Generic icon press primitive. Wraps `TouchableOpacity` + `Feather` icon. Defaults match the auth-screen back button style.

```ts
interface Props {
  name: React.ComponentProps<typeof Feather>['name'];
  size?: number;       // default 28
  color?: string;      // default Color.Gold
  style?: StyleProp<ViewStyle>;
  testID?: string;
  onPress: () => void;
}
```

- `activeOpacity={0.7}` — matches the app-wide convention
- `hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}` — consistent with original `BackButton`
- `style` prop passed to `TouchableOpacity` so callers can inject positioning (used by `BackButton`)

Exported from `src/components/index.ts`.

---

### Step 5 — `BackButton` refactored to wrap `IconButton` ✅

**`src/components/BackButton.tsx`**

`BackButton` is now a thin absolute-positioning wrapper around `IconButton`. All icon rendering, colour, size, hit slop, and opacity live in `IconButton`; `BackButton` only contributes `position: absolute`, `left: 16`, `zIndex: 1`, and `testID`.

```tsx
<IconButton
  testID="back-button"
  name="chevron-left"
  style={[styles.button, { top }]}
  onPress={onPress}
/>
```

---

### Step 6 — `BracketContainer` migrated from `BackButton` to `IconButton` ✅

**`src/components/BracketContainer.tsx`**

`BackButton` replaced with a direct `IconButton` call using the same absolute-position style object (`position: 'absolute', left: 16, zIndex: 1`) defined locally. `BackButton` is no longer used anywhere in the app.

---

### Step 7 — Route wiring + page stripping ✅

**`src/AppRoutes.tsx`** — nested authenticated routes under `AppLayout`:

```tsx
<Route element={<AppLayout />}>
  <Route path="/home"       element={<HomePage />} />
  <Route path="/profile"    element={<ProfilePage />} />
  <Route path="/create-tab" element={<CreateTabStep1Page />} />
</Route>
```

**`src/features/Home/HomePage.tsx`** — removed `PageHeader`, `MainNav`, inline `ProfilePage` render, `activeTab` state, `handleTabPress`, `HEADER_TITLES`.

**`src/features/Profile/ProfilePage.tsx`** — promoted to its own `/profile` route; no structural changes needed (already pure content).

**`src/features/CreateTab/CreateTabStep1Page.tsx`** — removed custom header block (`handleBack`, `handleClose`, back/close buttons, title), `MainNav`, `useSafeAreaInsets`. Added `paddingTop: 12` to `progressBar` style to replace the spacing the removed header provided.
