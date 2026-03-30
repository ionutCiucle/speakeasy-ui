# 2026-Mar__Auth-API-integration

## Plan

Wire up the Login and Register screens to the backend API, adding client-side form validation before requests are sent.

---

### Step 1 — Verify API endpoints and env config ✅

- `AuthAPI` base URL: `${EXPO_PUBLIC_API_BASE_URL}/auth` → `http://localhost:4000/api/auth`
- `loginAsyncAction` → `POST /auth/login`
- `registerAsyncAction` → `POST /auth/register`
- `.env` already has `EXPO_PUBLIC_API_BASE_URL=http://localhost:4000/api`

No changes needed.

---

### Step 2 — Add validation hooks ✅

Two hooks in `src/features/Auth/hooks/`, each returning a tuple `[value, onChange, error, validate] as const`:

| Hook | Rules |
|---|---|
| `useValidatedEmailField()` | Required + regex email pattern check |
| `useValidatedTextField(label)` | Not empty / not whitespace-only |

Each hook owns its own state. `onChange` clears the error on keystroke. `validate()` runs the check, sets the error if invalid, and returns a `boolean`.

Usage pattern in components:

```ts
const [email, onEmailChange, emailError, validateEmail] = useValidatedEmailField();
const [password, onPasswordChange, passwordError, validatePassword] = useValidatedTextField('Password');
```

---

### Step 3 — Update `LoginPage` ✅

- Replaced `useState` fields with `useValidatedEmailField` and `useValidatedTextField`.
- `handleLogin` calls both `validate()` functions before dispatching — both run so all errors surface at once.
- Per-field inline errors rendered beneath each `Input`; API failure shown as `submitError` below the fields.

---

### Step 4 — Update `RegisterPage` ✅

- Same pattern across all four fields: `username`, `email`, `password`, `confirmPassword`.
- Password-match check retained after field validation.
- Per-field inline errors; API failure shown as `submitError`.

---

### Step 5 — ESLint curly rule ✅

Added `"curly": ["error", "all"]` to `.eslintrc` to enforce curly braces on all control flow blocks (including `switch` case branches). Ran `eslint --fix` to resolve the two violations introduced by earlier compact one-liners.
