import { NativeRouter } from 'react-router-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { AppProvider } from './state-management/Provider';
import { AppRoutes } from './AppRoutes';

export const Root = () => {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <NativeRouter>
          <AppRoutes />
        </NativeRouter>
      </NavigationContainer>
    </AppProvider>
  );
};
