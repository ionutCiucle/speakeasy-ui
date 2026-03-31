# Plan: Persistent Authenticated Layout Shell

## Goal

Move `PageHeader` and `MainNav` out of individual pages into a shared `AppLayout` component that wraps all authenticated routes. Page content switches per route via React Router v6's `<Outlet>`. Auth screens stay full-screen and outside this hierarchy.

---

## New files

| File | Purpose |
|---|---|
| `src/features/App/AppLayout.tsx` | Layout route shell |
| `src/features/App/index.ts` | Barrel |
| `src/components/WizardPageHeader.tsx` | Header variant with back chevron + title + X close |

## Modified files

| File | Change |
|---|---|
| `src/components/index.ts` | Export `WizardPageHeader` |
| `src/AppRoutes.tsx` | Nest authenticated routes under `AppLayout` |
| `src/features/Home/HomePage.tsx` | Strip `PageHeader`, `MainNav`, inline `ProfilePage`, `activeTab` state |
| `src/features/CreateTab/CreateTabStep1Page.tsx` | Strip custom header block + `MainNav` |
| `src/features/Profile/ProfilePage.tsx` | No structural changes needed |

---

## Steps

### Step 1 — `WizardPageHeader` component ⬜

**File:** `src/components/WizardPageHeader.tsx`

```ts
interface Props {
  title: string;
  onBack: () => void;
  onClose: () => void;
}
```

- `useSafeAreaInsets` for `top`
- Header row: height `60 + top`, `paddingTop: top`, `paddingHorizontal: 20`, row layout
- Left: `Feather chevron-left` size 24 `Color.Espresso` → `onBack`
- Centre: title text, absolute-positioned so side buttons don't shift it
- Right: `Feather x` size 20 `Color.WarmBrown` → `onClose`
- Gold 1px divider below (matching `PageHeader`)

Also export from `src/components/index.ts`.

---

### Step 2 — `AppLayout` layout route ⬜

**File:** `src/features/App/AppLayout.tsx`

Route config map:

```ts
const ROUTE_CONFIG = {
  '/home':       { header: 'standard', title: 'My Tabs', tab: 'home' },
  '/profile':    { header: 'standard', title: 'Profile', tab: 'profile' },
  '/create-tab': { header: 'wizard',   title: 'New Tab', tab: 'newTab' },
};
```

Layout structure:

```
View (flex: 1, bg: Cream)
├── PageHeader | WizardPageHeader   ← chosen by config.header
├── View (flex: 1) → <Outlet />     ← page content
└── MainNav                         ← route-aware active tab + navigate handlers
```

- `WizardPageHeader` gets `onBack → navigate(-1)`, `onClose → navigate('/home')`
- `MainNav` tab press → navigate to route (`home→/home`, `newTab→/create-tab`, `profile→/profile`, `friends→/friends`); pressing the active tab is a no-op

Also create `src/features/App/index.ts` barrel exporting `AppLayout`.

---

### Step 3 — Wire routes in `AppRoutes.tsx` ⬜

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

Also import `ProfilePage` here (it's not currently imported in `AppRoutes`).

---

### Step 4 — Strip `HomePage` ⬜

**Remove:**
- `PageHeader` (import + JSX)
- `MainNav` (import + JSX)
- `ProfilePage` inline render + import
- `activeTab` / `setActiveTab` state
- `handleTabPress` callback
- `HEADER_TITLES` record
- `MainNavTab` import

**Keep:**
- `handleStartTab` → `navigate('/create-tab')`
- `handleScanQR` (stub)
- Empty-state content (icon, headings, buttons)

---

### Step 5 — Strip `CreateTabStep1Page` ⬜

**Remove:**
- Entire `{/* Header */}` block (back button row, title, X button)
- `handleBack` callback
- `handleClose` callback
- `handleNavTabPress` callback
- `<MainNav>` at bottom of JSX + import
- `useSafeAreaInsets` import and `const { top }` (only used by the removed header)
- `header` and `headerTitle` styles from `StyleSheet.create`

**Keep:**
- Progress bar + step label (page content, not header)
- `KeyboardAvoidingView` wrapping `ScrollView`
- All form fields and styles

---

## Implementation order

Steps 4 and 5 must land in the **same commit** as step 3 so the app is never
in a state with headers and nav missing from pages before the layout provides them.

Recommended sequence:
1. Step 1 (WizardPageHeader) — isolated, no impact on running app
2. Step 2 (AppLayout) — new file, no impact until wired
3. Steps 3 + 4 + 5 together — route wiring + page stripping in one commit
