# Auth Screen Redesign

**Branch:** `feature/refactor-auth-screens`
**Date:** March 2026

## Summary

Redesigned all auth screens to match Figma specs. Introduced a Speakeasy brand design system (fonts, colour tokens, shared chrome), added a SplashPage as the app entry point, and a ForgotPasswordPage.

---

## Design system

### Colour tokens added (`src/styles.ts`)

| Token | Value | Use |
|---|---|---|
| `Color.Cream` | `#F5F0E8` | Page background |
| `Color.Gold` | `#C9A84C` | Primary brand accent, buttons, links |
| `Color.Espresso` | `#2D2416` | Primary text (titles) |
| `Color.WarmBrown` | `#8B7355` | Secondary text, labels |
| `Color.Ivory` | `#FDFAF5` | Input backgrounds |
| `Color.Sand` | `#D4C9B0` | Borders, dividers |

### Fonts (`src/Root.tsx`)

Loaded via `expo-font` using `@expo-google-fonts/*` packages. `Root.tsx` blocks render until fonts are ready.

| Font | Weights/styles | Use |
|---|---|---|
| Cormorant Garamond | 600, 700 | Logo "S", page titles |
| Inter | 400, 500, 600 | Labels, inputs, buttons, body text |
| Playfair Display | 400 Italic | Taglines and descriptive text |

### Shared chrome

Every auth screen shares the same structural elements:
- Gold top bar (4px)
- Gold bottom bar (4px)
- Corner bracket decorations (25px on Login/Register/ForgotPassword, 35px on Splash)

---

## Screens

### SplashPage (`src/features/Auth/SplashPage.tsx`)

New entry point at `/`. Shown on first launch and after logout.

- Large "S" logo (112px Cormorant Garamond Bold) with three decorative gold dots
- "SPEAKEASY" brand name (Cormorant Garamond, letter-spacing 8)
- Gold underline
- "Never lose track of the night" tagline (Playfair Display Italic)
- Ornament divider: two Sand lines flanking a 16×16 Gold square
- "Get Started" → `/register`
- "Already a member? Sign In" → `/login`

### LoginPage (`src/features/Auth/LoginPage.tsx`)

Moved from `/` to `/login`.

- "S" logo (52px) with dots
- "Welcome Back" title + "SPEAKEASY" subtitle with underline
- EMAIL and PASSWORD labelled inputs
- "Forgot Password?" → `/forgot-password`
- "Sign In" gold button
- "or" divider
- "Don't have an account? Create one" → `/register`

### RegisterPage (`src/features/Auth/RegisterPage.tsx`)

- "‹ Back" → `/` (Splash)
- "Join the Club" title + "SPEAKEASY" subtitle
- USERNAME, EMAIL, PASSWORD, CONFIRM PASSWORD labelled inputs
- Client-side password match validation
- Terms of Service text
- "Create Account" gold button
- "Already a member? Sign In" → `/login`
- `username` added to `registerAsyncAction` args and passed to BE

### ForgotPasswordPage (`src/features/Auth/ForgotPasswordPage.tsx`)

New screen at `/forgot-password`.

- "‹ Back" → `/login`
- "Forgot Password?" title + Sand underline
- Playfair Display italic description
- EMAIL input
- "Send Reset Link" gold button (TODO: implement)
- "Back to Sign In" → `/login`

---

## Route table (updated)

| Path | Component |
|---|---|
| `/` | `SplashPage` |
| `/login` | `LoginPage` |
| `/register` | `RegisterPage` |
| `/forgot-password` | `ForgotPasswordPage` |
| `/home` | `HomePage` |

---

## Shared components (`src/features/components/`)

Extracted reusable components from the auth screens to eliminate duplicated styling. All auth screens import from the directory index — never from individual files directly.

### `Button`

Primary gold call-to-action button used on all auth screens.

```tsx
<Button label="Sign In" onPress={handleLogin} style={styles.button} />
```

- Fixed styling: `Color.Gold` background, `borderRadius: 10`, `paddingVertical: 17`, Inter SemiBold 16px white text
- Optional `style` prop for per-screen layout overrides (e.g. `marginBottom`)

### `Input`

Label + `TextInput` combo, always rendered together.

```tsx
<Input
  label="EMAIL"
  placeholder="your@email.com"
  value={email}
  onChangeText={setEmail}
  autoCapitalize="none"
  keyboardType="email-address"
/>
```

- Label: Inter Medium 11px, `Color.WarmBrown`, `letterSpacing: 1.5`
- Input: `Color.Ivory` background, `Color.Sand` border, Inter Regular 15px, `Color.Espresso` text
- `marginBottom: 16` included in the component

### `BracketContainer`

Wraps screen content between the gold top/bottom bars and renders all 8 bracket corner pieces internally. Replaces 10 Views and 11 style definitions per screen.

```tsx
<BracketContainer bracketSize={35}>
  {/* screen content */}
</BracketContainer>
```

- `bracketSize` defaults to `25`. SplashPage uses `35`.
- Bracket thickness and offset (20px from edge) are fixed.
- Absolute positioning is an internal implementation detail — screens don't need to know about it.

### `Logo`

The stylised "S" with three decorative gold dots. Dot sizes and positions scale proportionally from the 112px base.

```tsx
<Logo />                          // 112px — SplashPage
<Logo size={52} marginBottom={8} /> // 52px  — LoginPage
```

- `size` defaults to `112`
- `marginBottom` is optional

---

## Directory conventions

### `src/features/Auth/index.ts`

Re-exports all Auth screen components. Consumers import from the directory, never from individual files:

```ts
// ✅ correct
import { SplashPage, LoginPage, RegisterPage, ForgotPasswordPage } from './features/Auth';

// ❌ wrong
import { LoginPage } from './features/Auth/LoginPage';
```

---

## BracketContainer polish (March 2026)

### Safe area insets ✅

`BracketContainer` now uses `useSafeAreaInsets()` so bracket corners and content clear the iPhone notch and home indicator on all devices:

- Top brackets positioned at `safeArea.top + 20`; bottom brackets at `safeArea.bottom + 20`
- Children wrapped in a `View` with `paddingTop: topOffset` and `paddingBottom: bottomOffset` — every page inside `BracketContainer` gets safe area clearance automatically without managing insets itself

### Consistent bracket size ✅

Default `bracketSize` changed from `25` → `35`. `SplashPage` was previously overriding with `bracketSize={35}`; that prop was removed so all pages now share the same bracket dimensions.

### Gold top/bottom bars removed ✅

The 4px `Color.Gold` top and bottom bars that flanked the container were removed, leaving only the four corner brackets.

### Back button replaces top-left bracket ✅

`BracketContainer` accepts an optional `onBack?: () => void` prop. When provided, the top-left corner bracket is replaced with a `Feather chevron-left` icon button (`size={28}`, `Color.Gold`) positioned at the same coordinates.

Applied to:
- `RegisterPage` — `handleBack` (navigates to `/`) passed as `onBack`; manual `TouchableOpacity` back button and `statusBarArea` spacer removed
- `ForgotPasswordPage` — `handleBack` (navigates to `/login`) passed as `onBack`; manual `TouchableOpacity` back button and `statusBarArea` spacer removed

---

## Packages installed

- `@expo-google-fonts/inter`
- `@expo-google-fonts/cormorant-garamond`
- `@expo-google-fonts/playfair-display`
- `expo-font`
