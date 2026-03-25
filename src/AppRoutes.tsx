import { Routes, Route } from 'react-router-native';
import { LoginPage } from './features/Auth/LoginPage';
import { RegisterPage } from './features/Auth/RegisterPage';
import { useAuthTokenRehydration } from './features/Auth/hooks/useAuthTokenRehydration';

export function AppRoutes() {
  const { isReady } = useAuthTokenRehydration();

  if (!isReady) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
