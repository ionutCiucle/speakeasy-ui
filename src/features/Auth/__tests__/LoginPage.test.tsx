import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginPage } from '../LoginPage';

const mockNavigate = jest.fn();
const mockLogin = jest.fn();

jest.mock('react-router-native', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children }: any) => children,
}));

jest.mock('@/state-management/auth', () => ({
  useAuthAsyncActions: () => ({ login: mockLogin }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign-in form', () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);

    expect(getByPlaceholderText('your@email.com')).toBeTruthy();
    expect(getByPlaceholderText('••••••••')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Forgot Password?')).toBeTruthy();
  });

  it('shows an error when email is empty on submit', async () => {
    const { getByText } = render(<LoginPage />);

    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
    });
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows an error when email format is invalid', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.changeText(getByPlaceholderText('your@email.com'), 'notanemail');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(getByText('Please enter a valid email address')).toBeTruthy();
    });
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows an error when password is empty on submit', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.changeText(
      getByPlaceholderText('your@email.com'),
      'test@example.com',
    );
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(getByText('Password is required')).toBeTruthy();
    });
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login with correct credentials on valid submit', async () => {
    mockLogin.mockResolvedValue(true);
    const { getByText, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.changeText(
      getByPlaceholderText('your@email.com'),
      'test@example.com',
    );
    fireEvent.changeText(getByPlaceholderText('••••••••'), 'password123');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('navigates to /home on successful login', async () => {
    mockLogin.mockResolvedValue(true);
    const { getByText, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.changeText(
      getByPlaceholderText('your@email.com'),
      'test@example.com',
    );
    fireEvent.changeText(getByPlaceholderText('••••••••'), 'password123');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('shows a submit error on login failure', async () => {
    mockLogin.mockResolvedValue(false);
    const { getByText, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.changeText(
      getByPlaceholderText('your@email.com'),
      'test@example.com',
    );
    fireEvent.changeText(getByPlaceholderText('••••••••'), 'password123');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(
        getByText('Login failed. Please check your credentials.'),
      ).toBeTruthy();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to /forgot-password on "Forgot Password?" press', () => {
    const { getByText } = render(<LoginPage />);

    fireEvent.press(getByText('Forgot Password?'));

    expect(mockNavigate).toHaveBeenCalledWith('/forgot-password');
  });
});
