# Development Builds

This project uses **EAS Build** (Expo Application Services) instead of Expo Go for on-device testing. Expo Go is tied to App Store release cycles and may not support the current SDK version.

## Prerequisites

- [Apple Developer Program](https://developer.apple.com/programs/) membership ($99/year) — required to install builds on a physical iOS device
- EAS CLI installed globally
- An Expo account (free at expo.dev)

## One-time setup

**Install the EAS CLI:**

```bash
npm install -g eas-cli
```

**Log in to your Expo account:**

```bash
eas login
```

## Building for development

```bash
npm run build:dev
```

This triggers a cloud build on EAS servers. When it completes, EAS provides a QR code / install link — open it on your iPhone to install the dev client app.

You only need to rebuild when native dependencies change. For day-to-day JS changes, just start the dev server:

```bash
npx expo start --dev-client
```

Scan the QR code in the terminal with your iPhone camera to connect.

## Other build profiles

| Script | Profile | Use for |
|---|---|---|
| `npm run build:dev` | `development` | On-device development with live reload |
| `npm run build:preview` | `preview` | Internal distribution / QA testing |
| `npm run build:prod` | `production` | App Store submission |

## iOS Simulator (no Apple Developer account needed)

For testing without a physical device:

```bash
npx expo run:ios
```

Requires Xcode to be installed. The camera uses a simulated feed — sufficient for testing UI and navigation, but not real photo capture.
