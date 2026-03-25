# speakeasy-ui

React Native mobile app built with Expo.

## Stack

- React Native 0.72 / Expo SDK 49
- TypeScript 5 (strict mode)
- React Navigation v6 + React Router Native v6
- React Context + useReducer (state management)
- StyleSheet (styling)
- ESLint + Prettier

## Prerequisites

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode) or Android Emulator

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:
   ```
   EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

## Running

```bash
npm start
```

Then press:
- `i` — open in iOS Simulator
- `a` — open in Android Emulator

## Other commands

```bash
npm run ts:check    # TypeScript type check
npm run lint:check  # ESLint
npm run lint:fix    # ESLint with auto-fix
npm run format      # Prettier
```
