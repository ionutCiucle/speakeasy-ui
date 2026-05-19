import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TabMenuItems } from '../TabMenuItems';
import type { OrderItem } from '../../../types';

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
  Ionicons: () => null,
}));

const items: OrderItem[] = [
  { id: 'i1', name: 'Gin & Tonic', quantity: 2, price: 7.0 },
  { id: 'i2', name: 'Nachos', quantity: 1, price: 8.5 },
];

const renderList = (
  overrides: Partial<React.ComponentProps<typeof TabMenuItems>> = {},
) =>
  render(
    <TabMenuItems
      items={items}
      currencySymbol="$"
      onAdd={jest.fn()}
      {...overrides}
    />,
  );

describe('TabMenuItems', () => {
  it('renders all items', () => {
    const { getByText } = renderList();
    expect(getByText('Gin & Tonic')).toBeTruthy();
    expect(getByText('Nachos')).toBeTruthy();
  });

  it('renders the Add more items button', () => {
    const { getByText } = renderList();
    expect(getByText('+ Add more items')).toBeTruthy();
  });

  it('calls onAdd when Add more items is pressed', () => {
    const onAdd = jest.fn();
    const { getByText } = renderList({ onAdd });
    fireEvent.press(getByText('+ Add more items'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('renders nothing but the add button when items list is empty', () => {
    const { getByText, queryByText } = renderList({ items: [] });
    expect(getByText('+ Add more items')).toBeTruthy();
    expect(queryByText('Gin & Tonic')).toBeNull();
  });

  it('renders quantity badges for each item', () => {
    const { getAllByText } = renderList();
    expect(getAllByText(/\d+/).length).toBeGreaterThan(0);
  });
});
