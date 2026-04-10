import 'react-native-gesture-handler';
import { Root } from './src/Root';

// Set EXPO_PUBLIC_STORYBOOK=true in your environment to run Storybook
const STORYBOOK_ENABLED = process.env.EXPO_PUBLIC_STORYBOOK === 'true';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Entry = STORYBOOK_ENABLED ? require('./.rnstorybook').default : Root;

export default function App() {
  return <Entry />;
}
