# Styling

React Native `StyleSheet` is used for all styles. No third-party styling library.

## Shared utilities (`src/styles.ts`)

### `Color`

Central colour palette. Always use `Color.*` — never hardcode hex values.

| Token | Value | Use |
|---|---|---|
| `Color.White` | `#ffffff` | Backgrounds, button text |
| `Color.RaisinBlack` | `#2e282a` | Primary text, borders |
| `Color.RaisinBlackLight` | `#908c8d` | Placeholder text, secondary text |
| `Color.KellyGreen` | `#76b041` | Primary action buttons |
| `Color.Vetrdgris` | `#17bebb` | Accent / links |
| `Color.Jonquill` | `#ffc914` | Highlights |
| `Color.Flame` | `#e4572e` | Errors / destructive actions |

### `flex`

Helper that returns a `flexDirection` / `justifyContent` / `alignItems` object — avoids repeating these three properties on every container.

```ts
flex('column', 'center', 'center')
// → { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }
```

Usage with spread:

```ts
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...flex('column', 'center', 'center'),
    paddingHorizontal: 24,
  },
});
```

## Conventions

- Define styles at the bottom of each component file using `StyleSheet.create`.
- Never use inline styles — always use `StyleSheet`.
- Error text colour is `'red'` (not a `Color` token — to be standardised into `Color.Flame`).
