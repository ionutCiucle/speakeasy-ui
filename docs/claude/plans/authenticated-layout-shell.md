# Plan: Persistent Authenticated Layout Shell

## Goal

Move `PageHeader` and `MainNav` out of individual pages into a shared `AppLayout` component that wraps all authenticated routes. Page content switches per route via React Router v6's `<Outlet>`. Auth screens stay full-screen and outside this hierarchy.

---

## New files

| File | Purpose |
|---|---|
| `src/features/App/AppLayout.tsx` | Layout route shell |
| `src/features/App/index.ts` | Barrel |

## Modified files

| File | Change |
|---|---|
| `src/components/PageHeader.tsx` | Added optional `onBack` / `onClose` props for wizard variant |
| `src/AppRoutes.tsx` | Nest authenticated routes under `AppLayout` |
| `src/features/Home/HomePage.tsx` | Strip `PageHeader`, `MainNav`, inline `ProfilePage`, `activeTab` state |
| `src/features/CreateTab/CreateTabStep1Page.tsx` | Strip custom header block + `MainNav` |
| `src/features/Profile/ProfilePage.tsx` | No structural changes needed |

---

## Steps

### Step 1 — Extend `PageHeader` with optional back / close buttons ✅

Added two optional props to `PageHeader`:

```ts
interface Props {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}
```

Layout uses the three-column pattern (`[flex:1 left] [auto centre] [flex:1 right]`) so the title is always optically centred regardless of which buttons are present. Left side shows `Feather chevron-left` when `onBack` is provided; right side shows `Feather x` when `onClose` is provided. Empty `View` slots hold their space when the props are absent, preserving the centred title.

---

### Step 2 — `AppLayout` layout route ✅

**File:** `src/features/App/AppLayout.tsx`

Route config map drives both the header variant and the active nav tab:

```ts
const ROUTE_CONFIG = {
  '/home':       { title: 'My Tabs', tab: 'home' },
  '/profile':    { title: 'Profile', tab: 'profile' },
  '/create-tab': { title: 'New Tab', tab: 'newTab', wizard: true },
};
```

Layout structure:

```
View (flex: 1, bg: Cream)
├── PageHeader (onBack + onClose passed when config.wizard === true)
├── View (flex: 1) → <Outlet />
└── MainNav (route-aware active tab + navigate handlers)
```

- Wizard routes get `onBack → navigate(-1)` and `onClose → navigate('/home')`
- `MainNav` tab press navigates to the route for that tab; pressing the active tab is a no-op

Also created `src/features/App/index.ts` barrel.

---

### Step 3 — Wire routes in `AppRoutes.tsx` ✅

```tsx
<Routes>
  {/* Full-screen auth routes */}
  <Route path="/"                element={<SplashPage />} />
  <Route path="/login"           element={<LoginPage />} />
  <Route path="/register"        element={<RegisterPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

  {/* Authenticated shell — pathless layout route */}
  <Route element={<AppLayout />}>
    <Route path="/home"       element={<HomePage />} />
    <Route path="/profile"    element={<ProfilePage />} />
    <Route path="/create-tab" element={<CreateTabStep1Page />} />
  </Route>
</Routes>
```

`ProfilePage` promoted to its own route (previously rendered inline inside `HomePage`).

---

### Step 4 — Strip `HomePage` ✅

Removed: `PageHeader`, `MainNav`, `ProfilePage` inline render, `activeTab` state,
`handleTabPress`, `HEADER_TITLES`, `MainNavTab` import.

Kept: `handleStartTab` → `navigate('/create-tab')`, `handleScanQR` stub, empty-state content.

---

### Step 5 — Strip `CreateTabStep1Page` ✅

Removed: entire header block (back button, title, X), `handleBack`, `handleClose`,
`handleNavTabPress`, `<MainNav>`, `useSafeAreaInsets` import.

Kept: progress bar + step label + form (page content). Added `paddingTop: 12` to
`progressBar` style to replace the spacing previously provided by the removed header.
