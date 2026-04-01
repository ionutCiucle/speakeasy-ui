import React from 'react';
import { render } from '@testing-library/react-native';
import { HomePage } from '../HomePage';

const mockGetTabs = jest.fn();
let mockTabs: unknown[] = [];
let mockIsLoading = false;

jest.mock('react-router-native', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('@/state-management/providerHooks', () => ({
  useAppSelector: (selector: (s: unknown) => unknown) =>
    selector({
      tabs: { tabs: mockTabs, isLoading: mockIsLoading },
      auth: { userId: 'user-1' },
    }),
}));

jest.mock('@/state-management/tabs', () => ({
  useTabsAsyncActions: () => ({ getTabs: mockGetTabs }),
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
    jest.clearAllMocks();
    mockTabs = [];
    mockIsLoading = false;
  });

  it('calls getTabs on mount', () => {
    render(<HomePage />);

    expect(mockGetTabs).toHaveBeenCalledTimes(1);
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
    expect(queryByText('TabList')).toBeNull();
  });

  it('does not render empty state when there are tabs', () => {
    mockTabs = [{ id: '1' }];

    const { queryByText } = render(<HomePage />);

    expect(queryByText('No tabs added yet')).toBeNull();
  });
});
