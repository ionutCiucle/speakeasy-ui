import { NativeRouter } from 'react-router-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './state-management/Provider';
import { AppRoutes } from './AppRoutes';

export const Root = () => {
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
