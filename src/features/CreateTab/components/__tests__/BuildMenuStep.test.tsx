import React from 'react';
import { TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { BuildMenuStep } from '../BuildMenuStep';

const mockAddMenuItem = jest.fn();
const mockRemoveMenuItem = jest.fn();
let mockMenuItems: { id: string; name: string; price: number }[] = [];
let mockCurrency = { code: 'USD', name: 'US Dollar' };

jest.mock('@/state-management/create-tab', () => ({
  useCreateTabActions: () => ({
    addMenuItem: mockAddMenuItem,
    removeMenuItem: mockRemoveMenuItem,
  }),
}));

jest.mock('@/state-management/providerHooks', () => ({
  useAppSelector: (selector: (s: unknown) => unknown) =>
    selector({
      createTab: {
        menuItems: mockMenuItems,
        currency: mockCurrency,
      },
    }),
}));

// require() is intentional here — jest.mock factories are hoisted above imports
// by Babel, so top-level imports are undefined when the factory runs.
jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    Swipeable: ({
      children,
      renderLeftActions,
      renderRightActions,
    }: {
      children: React.ReactNode;
      renderLeftActions?: () => React.ReactNode;
      renderRightActions?: () => React.ReactNode;
    }) => (
      <View>
        {renderLeftActions?.()}
        {children}
        {renderRightActions?.()}
      </View>
    ),
  };
});

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
  Ionicons: () => null,
}));

describe('BuildMenuStep', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMenuItems = [];
    mockCurrency = { code: 'USD', name: 'US Dollar' };
  });

  it('renders the ADD AN ITEM section header', () => {
    const { getByText } = render(<BuildMenuStep />);

    expect(getByText('ADD AN ITEM')).toBeTruthy();
  });

  it('renders the MENU ITEMS section header', () => {
    const { getByText } = render(<BuildMenuStep />);

    expect(getByText('MENU ITEMS')).toBeTruthy();
  });

  it('renders the Add to Menu button', () => {
    const { getByText } = render(<BuildMenuStep />);

    expect(getByText('Add to Menu')).toBeTruthy();
  });

  it('does not call addMenuItem when name is empty', () => {
    const { getByText } = render(<BuildMenuStep />);

    fireEvent.press(getByText('Add to Menu'));

    expect(mockAddMenuItem).not.toHaveBeenCalled();
  });

  it('calls addMenuItem with name and parsed price when name is filled', () => {
    const { getByPlaceholderText, getByText } = render(<BuildMenuStep />);

    fireEvent.changeText(getByPlaceholderText('e.g. Gin & Tonic'), 'Negroni');
    fireEvent.changeText(getByPlaceholderText('0.00'), '12.50');
    fireEvent.press(getByText('Add to Menu'));

    expect(mockAddMenuItem).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Negroni', price: 12.5 }),
    );
  });

  it('accepts a price of zero when 0 is entered', () => {
    const { getByPlaceholderText, getByText } = render(<BuildMenuStep />);

    fireEvent.changeText(getByPlaceholderText('e.g. Gin & Tonic'), 'Water');
    fireEvent.changeText(getByPlaceholderText('0.00'), '0');
    fireEvent.press(getByText('Add to Menu'));

    expect(mockAddMenuItem).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Water', price: 0 }),
    );
  });

  it('trims the item name before adding', () => {
    const { getByPlaceholderText, getByText } = render(<BuildMenuStep />);

    fireEvent.changeText(
      getByPlaceholderText('e.g. Gin & Tonic'),
      '  Whisky  ',
    );
    fireEvent.changeText(getByPlaceholderText('0.00'), '8');
    fireEvent.press(getByText('Add to Menu'));

    expect(mockAddMenuItem).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Whisky' }),
    );
  });

  it('renders existing menu items', () => {
    mockMenuItems = [{ id: '1', name: 'Old Fashioned', price: 14 }];

    const { getByText } = render(<BuildMenuStep />);

    expect(getByText('Old Fashioned')).toBeTruthy();
  });

  it('formats menu item price with the currency symbol', () => {
    mockMenuItems = [{ id: '1', name: 'Martini', price: 11 }];

    const { getByText } = render(<BuildMenuStep />);

    expect(getByText('$11.00')).toBeTruthy();
  });

  it('formats price with non-USD symbol', () => {
    mockCurrency = { code: 'GBP', name: 'British Pound' };
    mockMenuItems = [{ id: '1', name: 'Pint', price: 5.5 }];

    const { getByText } = render(<BuildMenuStep />);

    expect(getByText('£5.50')).toBeTruthy();
  });

  it('calls removeMenuItem with the item id when delete is pressed', () => {
    mockMenuItems = [{ id: 'abc', name: 'Bourbon', price: 10 }];
    const { UNSAFE_getAllByType } = render(<BuildMenuStep />);

    // Last TouchableOpacity is the right-swipe action (remove) rendered by MenuCard
    const touchables = UNSAFE_getAllByType(TouchableOpacity);
    const deleteButton = touchables[touchables.length - 1];
    fireEvent.press(deleteButton);

    expect(mockRemoveMenuItem).toHaveBeenCalledWith('abc');
  });

  it('does not show the info box when there are no items', () => {
    const { queryByText } = render(<BuildMenuStep />);

    expect(queryByText(/items? on the menu/)).toBeNull();
  });

  it('shows the info box when there are items', () => {
    mockMenuItems = [
      { id: '1', name: 'Negroni', price: 12 },
      { id: '2', name: 'Spritz', price: 10 },
    ];

    const { getByText } = render(<BuildMenuStep />);

    expect(getByText(/2 items on the menu/)).toBeTruthy();
  });

  it('uses singular "item" in the info box for one item', () => {
    mockMenuItems = [{ id: '1', name: 'Aperol Spritz', price: 9 }];

    const { getByText } = render(<BuildMenuStep />);

    expect(getByText(/1 item on the menu/)).toBeTruthy();
  });
});
