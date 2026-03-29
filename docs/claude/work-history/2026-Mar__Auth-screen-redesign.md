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

---

## Packages installed

- `@expo-google-fonts/inter`
- `@expo-google-fonts/cormorant-garamond`
- `@expo-google-fonts/playfair-display`
- `expo-font`
