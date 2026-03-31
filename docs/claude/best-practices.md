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

## Always use `Color.*` tokens for colours

Import colours from `src/styles.ts` — never hardcode hex values or named CSS colours in stylesheets.

```ts
// ✅ correct
color: Color.Flame

// ❌ wrong
color: '#e4572e'
color: 'red'
```
