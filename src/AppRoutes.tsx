import { Routes, Route } from 'react-router-native';
import { SplashPage } from './features/Auth/SplashPage';
import { LoginPage } from './features/Auth/LoginPage';
import { RegisterPage } from './features/Auth/RegisterPage';
import { ForgotPasswordPage } from './features/Auth/ForgotPasswordPage';
import { HomePage } from './features/Home/HomePage';
import { useAuthTokenRehydration } from './features/Auth/hooks/useAuthTokenRehydration';

export function AppRoutes() {
  const { isReady } = useAuthTokenRehydration();

  if (!isReady) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
