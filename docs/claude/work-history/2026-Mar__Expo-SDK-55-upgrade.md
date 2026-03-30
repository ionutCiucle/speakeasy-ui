# 2026-Mar__Expo-SDK-55-upgrade

## Plan

Upgrade Expo SDK from 54 to 55 (latest), updating all peer dependencies to
their SDK 55-compatible versions.

---

### Step 1 — Upgrade Expo ✅

```
npx expo install expo@latest
npx expo install --fix
```

Updated packages:

| Package | Before | After |
|---|---|---|
| `expo` | ^54.0.33 | ^55.0.9 |
| `expo-font` | 14.0.11 | ~55.0.4 |
| `expo-secure-store` | 15.0.8 | ~55.0.9 |
| `expo-status-bar` | 3.0.9 | ~55.0.4 |
| `react` | 19.1.0 | 19.2.0 |
| `react-dom` | 19.1.0 | 19.2.0 |
| `react-native` | 0.81.5 | 0.83.4 |
| `react-native-gesture-handler` | 2.28.0 | ~2.30.0 |
| `react-native-screens` | 4.16.0 | ~4.23.0 |
| `@types/react` | 19.1.17 | ~19.2.10 |
| `jest-expo` | ~54.0.17 | ~55.0.11 |
| `react-test-renderer` | ^19.1.0 | 19.2.0 |

`expo install --fix` also added the `expo-secure-store` config plugin automatically.

CLAUDE.md stack line updated: React Native 0.72 / Expo SDK 49 → React Native 0.83 / Expo SDK 55.
