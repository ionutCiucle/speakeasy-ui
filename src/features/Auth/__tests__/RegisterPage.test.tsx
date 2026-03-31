import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { RegisterPage } from '../RegisterPage';

const mockNavigate = jest.fn();
const mockRegisterAndLogin = jest.fn();

jest.mock('react-router-native', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children }: any) => children,
}));

jest.mock('@/state-management/auth', () => ({
  useAuthWorkflows: () => ({ registerAndLogin: mockRegisterAndLogin }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

function fillValidForm({
  getByPlaceholderText,
  getAllByPlaceholderText,
}: ReturnType<typeof render>) {
  fireEvent.changeText(getByPlaceholderText('@yourname'), 'testuser');
  fireEvent.changeText(
    getByPlaceholderText('your@email.com'),
    'test@example.com',
  );
  const [passwordInput, confirmPasswordInput] =
    getAllByPlaceholderText('••••••••');
  fireEvent.changeText(passwordInput, 'password123');
  fireEvent.changeText(confirmPasswordInput, 'password123');
}

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the registration form', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <RegisterPage />,
    );

    expect(getByPlaceholderText('@yourname')).toBeTruthy();
    expect(getByPlaceholderText('your@email.com')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('shows validation errors for all empty fields on submit', async () => {
    const { getByText } = render(<RegisterPage />);

    fireEvent.press(getByText('Create Account'));

    await waitFor(() => {
      expect(getByText('Username is required')).toBeTruthy();
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
      expect(getByText('Confirm password is required')).toBeTruthy();
    });
    expect(mockRegisterAndLogin).not.toHaveBeenCalled();
  });

  it('shows "Passwords do not match" when passwords differ', async () => {
    const { getByText, getByPlaceholderText, getAllByPlaceholderText } = render(
      <RegisterPage />,
    );

    fireEvent.changeText(getByPlaceholderText('@yourname'), 'testuser');
    fireEvent.changeText(
      getByPlaceholderText('your@email.com'),
      'test@example.com',
    );
    const [passwordInput, confirmPasswordInput] =
      getAllByPlaceholderText('••••••••');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'different456');
    fireEvent.press(getByText('Create Account'));

    await waitFor(() => {
      expect(getByText('Passwords do not match.')).toBeTruthy();
    });
    expect(mockRegisterAndLogin).not.toHaveBeenCalled();
  });

  it('calls registerAndLogin with correct credentials on valid submit', async () => {
    mockRegisterAndLogin.mockResolvedValue(true);
    const rendered = render(<RegisterPage />);

    fillValidForm(rendered);
    fireEvent.press(rendered.getByText('Create Account'));

    await waitFor(() => {
      expect(mockRegisterAndLogin).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('navigates to /home on successful registration', async () => {
    mockRegisterAndLogin.mockResolvedValue(true);
    const rendered = render(<RegisterPage />);

    fillValidForm(rendered);
    fireEvent.press(rendered.getByText('Create Account'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('shows a submit error on registration failure', async () => {
    mockRegisterAndLogin.mockResolvedValue(false);
    const rendered = render(<RegisterPage />);

    fillValidForm(rendered);
    fireEvent.press(rendered.getByText('Create Account'));

    await waitFor(() => {
      expect(
        rendered.getByText('Registration failed. Please try again.'),
      ).toBeTruthy();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to / on "Back" press', () => {
    const { getByTestId } = render(<RegisterPage />);

    fireEvent.press(getByTestId('back-button'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
