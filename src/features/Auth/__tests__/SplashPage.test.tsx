import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SplashPage } from '../SplashPage';

const mockNavigate = jest.fn();

jest.mock('react-router-native', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
}));

beforeEach(() => {
  mockNavigate.mockClear();
});

describe('SplashPage', () => {
  it('renders brand name and tagline', () => {
    const { getByText } = render(<SplashPage />);

    expect(getByText('SPEAKEASY')).toBeTruthy();
    expect(getByText('Never lose track of the night')).toBeTruthy();
  });

  it('renders Get Started and Sign In links', () => {
    const { getByText } = render(<SplashPage />);

    expect(getByText('Get Started')).toBeTruthy();
    expect(getByText('Already a member? Sign In')).toBeTruthy();
  });

  it('navigates to /register on "Get Started" press', () => {
    const { getByText } = render(<SplashPage />);

    fireEvent.press(getByText('Get Started'));

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});
