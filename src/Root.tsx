import { NativeRouter, Route, Routes } from 'react-router-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './state-management/Provider';
import { LoginPage } from './features/Auth/LoginPage';

export const Root = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <NativeRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </NativeRouter>
      </NavigationContainer>
    </AppProvider>
  );
};
