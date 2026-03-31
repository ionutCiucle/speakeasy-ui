import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HomePage } from '../HomePage';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
  Ionicons: () => null,
  FontAwesome6: () => null,
}));

jest.mock('@/features/Profile', () => ({
  ProfilePage: () => null,
}));

describe('HomePage', () => {
  it('renders the home empty state by default', () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('My Tabs')).toBeTruthy();
    expect(getByText('No tabs added yet')).toBeTruthy();
    expect(
      getByText("Start one or scan a QR to join a friend's tab"),
    ).toBeTruthy();
    expect(getByText('+ Start a Tab')).toBeTruthy();
    expect(getByText('Scan QR to Join')).toBeTruthy();
  });

  it('renders all four nav tab labels', () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('New Tab')).toBeTruthy();
    expect(getByText('Friends')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
  });

  it('updates the header title when a nav tab is pressed', () => {
    const { getByText, getAllByText } = render(<HomePage />);

    fireEvent.press(getByText('New Tab'));

    expect(getAllByText('New Tab').length).toBeGreaterThanOrEqual(2);
  });

  it('shows ProfilePage when profile tab is pressed', () => {
    const { getByText, queryByText } = render(<HomePage />);

    fireEvent.press(getByText('Profile'));

    expect(queryByText('No tabs added yet')).toBeNull();
  });

  it('shows empty state when switching back from profile', () => {
    const { getByText } = render(<HomePage />);

    fireEvent.press(getByText('Profile'));
    fireEvent.press(getByText('Home'));

    expect(getByText('No tabs added yet')).toBeTruthy();
  });
});
