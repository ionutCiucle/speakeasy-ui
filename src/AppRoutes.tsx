import { Routes, Route } from 'react-router-native';
import {
  SplashPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
} from '@/features/Auth';
import { HomePage } from '@/features/Home/HomePage';
import { CreateTabStep1Page } from '@/features/CreateTab';
import { useAuthTokenRehydration } from '@/features/Auth/hooks/useAuthTokenRehydration';

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
      <Route path="/create-tab" element={<CreateTabStep1Page />} />
    </Routes>
  );
}
