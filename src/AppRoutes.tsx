import { Navigate, Routes, Route } from 'react-router-native';
import {
  SplashPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
} from '@/features/Auth';
import { AppLayout } from './AppLayout';
import { HomePage } from '@/features/Home/HomePage';
import { ProfilePage } from '@/features/Profile/ProfilePage';
import {
  CreateTabPage,
  TabDetailsStep,
  AddMemberStep,
} from '@/features/CreateTab';
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

        {/* Create Tab wizard — each step is a subroute */}
        <Route path="/create-tab" element={<CreateTabPage />}>
          <Route index element={<Navigate to="tab-details" replace />} />
          <Route path="tab-details" element={<TabDetailsStep />} />
          <Route path="add-members" element={<AddMemberStep />} />
        </Route>
      </Route>
    </Routes>
  );
}
