# Navigation

React Router Native v6 handles in-app routing. React Navigation v6 provides the `NavigationContainer` shell.

## Structure

```
Root.tsx          - NavigationContainer + NativeRouter shell, renders <AppRoutes />
AppRoutes.tsx     - all route definitions, runs useAuthTokenRehydration on mount
```

`Root.tsx` only sets up providers and the router shell — **never add routes there**. All routes go in `AppRoutes.tsx`.

## Current routes

| Path | Component | Notes |
|---|---|---|
| `/` | `LoginPage` | Unauthenticated entry point |
| `/register` | `RegisterPage` | Registration form |
| `/home` | `HomePage` | Authenticated entry point |

## Adding a new route

1. Create the screen component under `src/features/<Domain>/`.
2. Import it in `AppRoutes.tsx` and add a `<Route path="/your-path" element={<YourPage />} />`.

## Navigation from components

Use `useNavigate` from `react-router-native`:

```ts
const navigate = useNavigate();
navigate('/home');
```

Use `Link` for declarative navigation (e.g. "Create account" links):

```ts
import { Link } from 'react-router-native';

<Link to="/register">
  <Text>Create account</Text>
</Link>
```

## Auth gating

`AppRoutes` renders `null` until `useAuthTokenRehydration` completes. The hook:
- Reads the stored JWT on mount
- If valid → restores auth state + navigates to `/home`
- If expired or missing → clears token + navigates to `/`

There is currently no route-level auth guard component — gating is handled entirely by the rehydration hook on startup.
