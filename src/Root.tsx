import { NativeRouter, Route, Routes } from 'react-router-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './state-management/Provider';

export const Root = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <NativeRouter>
          <Routes>
            {/* Add routes here */}
          </Routes>
        </NativeRouter>
      </NavigationContainer>
    </AppProvider>
  );
};
