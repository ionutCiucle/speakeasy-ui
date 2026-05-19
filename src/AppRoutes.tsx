import { Navigate, Routes, Route } from 'react-router-native';
import {
  SplashPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
} from '@/features/Auth';
import { AppLayout } from './AppLayout';
import { HomePage } from '@/features/Home/HomePage';
import { TabDetailPage } from '@/features/TabDetail/TabDetailPage';
import { PhotographReceiptPage } from '@/features/TabDetail/PhotographReceiptPage';
import { ConfirmPaymentPage } from '@/features/TabDetail/ConfirmPaymentPage';
import { ProfilePage } from '@/features/Profile/ProfilePage';
import {
  CreateTabPage,
  TabDetailsStep,
  AddMemberStep,
  BuildMenuStep,
  ReviewStep,
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

      {/* Full-screen routes — no app shell */}
      <Route
        path="/tab/:id/photograph-receipt"
        element={<PhotographReceiptPage />}
      />
      <Route path="/tab/:id/confirm-payment" element={<ConfirmPaymentPage />} />

      {/* Authenticated shell — pathless layout route */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/tab/:id" element={<TabDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Create Tab wizard — each step is a subroute */}
        <Route path="/create-tab" element={<CreateTabPage />}>
          <Route index element={<Navigate to="tab-details" replace />} />
          <Route path="tab-details" element={<TabDetailsStep />} />
          <Route path="add-members" element={<AddMemberStep />} />
          <Route path="build-menu" element={<BuildMenuStep />} />
          <Route path="review" element={<ReviewStep />} />
        </Route>
      </Route>
    </Routes>
  );
}
