# Best Practices

## Prop types: functional props go last

In component `interface Props`, list data/config props first and functional props (callbacks) last.

```ts
// ✅ correct
interface Props {
  label: string;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

// ❌ wrong
interface Props {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}
```

## Handlers in components must use `useCallback`

All event handlers defined inside a component must be wrapped in `useCallback`.

```ts
// ✅ correct
const handleSubmit = useCallback(() => {
  doSomething();
}, [doSomething]);

// ❌ wrong
const handleSubmit = () => {
  doSomething();
};
```

**Dependencies:** include every value from the component scope that the handler reads or calls. If the handler has no dependencies, pass `[]`.

## Directories with multiple files must have an index file

Any directory that contains more than one file must expose an `index.ts` that re-exports everything. Consumers import from the directory, never from individual files directly.

```ts
// ✅ correct
import { useAuthActions, useAuthAsyncActions } from './hooks';

// ❌ wrong
import { useAuthActions } from './hooks/useAuthActions';
import { useAuthAsyncActions } from './hooks/useAuthAsyncActions';
```

This applies everywhere: `hooks/`, `services/`, slice directories, etc.

## DTO suffix is reserved for BE response types

The `DTO` suffix marks interfaces that directly mirror a backend response shape. Never apply it to local or display-only types.

```ts
// ✅ correct — mirrors the BE response field-for-field
export interface TabDTO {
  id: string;
  title: string;
  currencyCode: string;
  // ...
}

// ❌ wrong — local display type, not a BE contract
type TabCardDataDTO = { ... };
type TabFilterDTO = 'all' | 'owned' | 'joined';
```

DTO files live in `src/state-management/<slice>/dto.ts`. All DTO types are re-exported from the slice `index.ts` using `export type`.

## Shared utilities live in `src/utils.ts`

Pure helper functions used across more than one feature belong in `src/utils.ts`. Do not duplicate helpers inside feature files.

```ts
// ✅ correct
import { toInitials, formatDuration, formatTotal } from '@/utils';

// ❌ wrong — local copy of a helper that already exists in utils
function toInitials(name: string) { ... }
```

## Enums live in `src/enums.ts`

App-wide enum definitions belong in `src/enums.ts`. Do not define enums or equivalent `Record` constants locally when they represent shared domain values.

```ts
// ✅ correct — src/enums.ts
export enum CurrencySymbol {
  USD = '$',
  EUR = '€',
  // ...
}

// ❌ wrong — local Record duplicated across files
const CURRENCY_SYMBOLS: Record<string, string> = { USD: '$', EUR: '€' };
```

## Feature-local types live in `types.ts`

Each feature directory that needs shared types must have a `types.ts` file. Never define types inline in a `utils.ts` or co-locate them in the component file when they are shared within the feature.

```
TabDetail/
  TabDetailPage.tsx
  types.ts    ← OrderItem, etc.
  utils.ts    ← imports types from ./types
```

## Always use `Color.*` tokens for colours

Import colours from `src/styles.ts` — never hardcode hex values or named CSS colours in stylesheets.

```ts
// ✅ correct
color: Color.Flame

// ❌ wrong
color: '#e4572e'
color: 'red'
```
