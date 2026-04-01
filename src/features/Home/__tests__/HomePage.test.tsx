import React from 'react';
import { render } from '@testing-library/react-native';
import { HomePage } from '../HomePage';

let mockTabs: unknown[] = [];
let mockIsLoading = false;

jest.mock('react-router-native', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('@/state-management/tabs', () => ({
  useTabs: () => ({ tabs: mockTabs, isLoading: mockIsLoading, error: null }),
}));

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
  FontAwesome6: () => null,
}));

jest.mock('../components/TabList', () => ({
  TabList: () => null,
}));

describe('HomePage', () => {
  beforeEach(() => {
    mockTabs = [];
    mockIsLoading = false;
  });

  it('renders empty state when there are no tabs', () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('No tabs added yet')).toBeTruthy();
    expect(getByText('+ Start a Tab')).toBeTruthy();
    expect(getByText('Scan QR to Join')).toBeTruthy();
  });

  it('renders nothing while loading', () => {
    mockIsLoading = true;

    const { queryByText } = render(<HomePage />);

    expect(queryByText('No tabs added yet')).toBeNull();
  });

  it('does not render empty state when there are tabs', () => {
    mockTabs = [{ id: '1' }];

    const { queryByText } = render(<HomePage />);

    expect(queryByText('No tabs added yet')).toBeNull();
  });
});
