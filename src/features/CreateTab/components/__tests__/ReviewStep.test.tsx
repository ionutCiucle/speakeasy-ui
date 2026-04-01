import React from 'react';
import { render } from '@testing-library/react-native';
import { ReviewStep } from '../ReviewStep';

let mockState = {
  tabName: 'Friday Night Out',
  venue: 'The Speakeasy Bar',
  currency: { code: 'USD', name: 'US Dollar' },
  members: [] as { id: string; name: string }[],
  menuItems: [] as { id: string; name: string; price: number }[],
};

jest.mock('@/state-management/providerHooks', () => ({
  useAppSelector: (selector: (s: unknown) => unknown) =>
    selector({ createTab: mockState }),
}));

jest.mock('@/components', () => {
  const { Text } = jest.requireActual('react-native');
  return {
    Avatar: ({ label }: { label: string }) => <Text>{label}</Text>,
  };
});

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
}));

describe('ReviewStep', () => {
  beforeEach(() => {
    mockState = {
      tabName: 'Friday Night Out',
      venue: 'The Speakeasy Bar',
      currency: { code: 'USD', name: 'US Dollar' },
      members: [],
      menuItems: [],
    };
  });

  it('renders the tab name', () => {
    const { getByText } = render(<ReviewStep />);

    expect(getByText('Friday Night Out')).toBeTruthy();
  });

  it('renders the venue', () => {
    const { getByText } = render(<ReviewStep />);

    expect(getByText('The Speakeasy Bar')).toBeTruthy();
  });

  it('renders the currency', () => {
    const { getByText } = render(<ReviewStep />);

    expect(getByText('USD · US Dollar')).toBeTruthy();
  });

  it('renders the members count including the host', () => {
    mockState.members = [
      { id: '1', name: 'Alice Smith' },
      { id: '2', name: 'Bob Jones' },
    ];

    const { getByText } = render(<ReviewStep />);

    expect(getByText('MEMBERS (3)')).toBeTruthy();
  });

  it('renders MEMBERS (1) when there are no added members', () => {
    const { getByText } = render(<ReviewStep />);

    expect(getByText('MEMBERS (1)')).toBeTruthy();
  });

  it('renders the "Me" avatar', () => {
    const { getByText } = render(<ReviewStep />);

    expect(getByText('Me')).toBeTruthy();
  });

  it('renders member initials as avatars', () => {
    mockState.members = [{ id: '1', name: 'Alice Smith' }];

    const { getByText } = render(<ReviewStep />);

    expect(getByText('AS')).toBeTruthy();
  });

  it('does not render the items section when there are no menu items', () => {
    const { queryByText } = render(<ReviewStep />);

    expect(queryByText(/^ITEMS/)).toBeNull();
  });

  it('renders the items section when there are menu items', () => {
    mockState.menuItems = [{ id: '1', name: 'Negroni', price: 12 }];

    const { getByText } = render(<ReviewStep />);

    expect(getByText('ITEMS (1)')).toBeTruthy();
  });

  it('renders menu item names', () => {
    mockState.menuItems = [{ id: '1', name: 'Old Fashioned', price: 14 }];

    const { getByText } = render(<ReviewStep />);

    expect(getByText('Old Fashioned')).toBeTruthy();
  });

  it('formats menu item prices with the currency symbol', () => {
    mockState.menuItems = [{ id: '1', name: 'Martini', price: 11 }];

    const { getByText } = render(<ReviewStep />);

    expect(getByText('$11.00')).toBeTruthy();
  });

  it('shows correct item count in the section header for multiple items', () => {
    mockState.menuItems = [
      { id: '1', name: 'Negroni', price: 12 },
      { id: '2', name: 'Spritz', price: 10 },
    ];

    const { getByText } = render(<ReviewStep />);

    expect(getByText('ITEMS (2)')).toBeTruthy();
  });

  it('shows the info bar with item count', () => {
    mockState.menuItems = [
      { id: '1', name: 'Negroni', price: 12 },
      { id: '2', name: 'Spritz', price: 10 },
    ];

    const { getByText } = render(<ReviewStep />);

    expect(getByText(/2 items on menu/)).toBeTruthy();
  });
});
