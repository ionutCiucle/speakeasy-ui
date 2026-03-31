import { Routes, Route } from 'react-router-native';
import {
  SplashPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
} from '@/features/Auth';
import { AppLayout } from '@/features/App';
import { HomePage } from '@/features/Home/HomePage';
import { ProfilePage } from '@/features/Profile/ProfilePage';
import { CreateTabStep1Page } from '@/features/CreateTab';
import { useAuthTokenRehydration } from '@/features/Auth/hooks/useAuthTokenRehydration';

export function AppRoutes() {
  const { isReady } = useAuthTokenRehydration();

  if (!isReady) {
    return null;
  }

  return (
    <Routes>
      {/* Full-screen auth routes */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Authenticated shell — pathless layout route */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-tab" element={<CreateTabStep1Page />} />
      </Route>
    </Routes>
  );
}
