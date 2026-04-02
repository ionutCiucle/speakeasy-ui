import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabMenuItem } from '../TabMenuItem';
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

const baseItem: OrderItem = {
  id: 'item-1',
  name: 'Gin & Tonic',
  quantity: 2,
  price: 7.0,
};

const singleItem: OrderItem = { ...baseItem, quantity: 1 };

function renderItem(
  item: OrderItem = baseItem,
  extra: Partial<React.ComponentProps<typeof TabMenuItem>> = {},
) {
  return render(
    <TabMenuItem
      item={item}
      currencySymbol="$"
      onIncrement={jest.fn()}
      onDecrement={jest.fn()}
      {...extra}
    />,
  );
}

function leftAction(
  getAllByType: ReturnType<typeof render>['UNSAFE_getAllByType'],
) {
  return getAllByType(TouchableOpacity)[0];
}

function rightAction(
  getAllByType: ReturnType<typeof render>['UNSAFE_getAllByType'],
) {
  const all = getAllByType(TouchableOpacity);
  return all[all.length - 1];
}

describe('TabMenuItem — rendering', () => {
  it('renders the item name', () => {
    const { getByText } = renderItem();
    expect(getByText('Gin & Tonic')).toBeTruthy();
  });

  it('renders the quantity badge', () => {
    const { getByText } = renderItem();
    expect(getByText('2')).toBeTruthy();
  });

  it('renders the total price (quantity × unit price)', () => {
    const { getByText } = renderItem();
    expect(getByText('$14.00')).toBeTruthy();
  });

  it('renders the correct price for quantity 1', () => {
    const { getByText } = renderItem({ ...baseItem, quantity: 1, price: 8.5 });
    expect(getByText('$8.50')).toBeTruthy();
  });

  it('shows the trash icon when quantity is 1', () => {
    const { UNSAFE_getByType } = renderItem(singleItem);
    expect(UNSAFE_getByType(Ionicons)).toBeTruthy();
  });

  it('does not show the trash icon when quantity is greater than 1', () => {
    const { UNSAFE_queryByType } = renderItem();
    expect(UNSAFE_queryByType(Ionicons)).toBeNull();
  });
});

describe('TabMenuItem — onIncrement / onDecrement (legacy)', () => {
  it('calls onIncrement with the item id when left action is pressed', () => {
    const onIncrement = jest.fn();
    const { UNSAFE_getAllByType } = renderItem(baseItem, { onIncrement });
    fireEvent.press(leftAction(UNSAFE_getAllByType));
    expect(onIncrement).toHaveBeenCalledWith('item-1');
  });

  it('calls onDecrement with the item id when right action is pressed', () => {
    const onDecrement = jest.fn();
    const { UNSAFE_getAllByType } = renderItem(baseItem, { onDecrement });
    fireEvent.press(rightAction(UNSAFE_getAllByType));
    expect(onDecrement).toHaveBeenCalledWith('item-1');
  });
});

describe('TabMenuItem — onTapPlus', () => {
  it('calls onTapPlus with the item id when left action is pressed', () => {
    const onTapPlus = jest.fn();
    const { UNSAFE_getAllByType } = renderItem(baseItem, { onTapPlus });
    fireEvent.press(leftAction(UNSAFE_getAllByType));
    expect(onTapPlus).toHaveBeenCalledWith('item-1');
  });

  it('does not throw when onTapPlus is not provided', () => {
    const { UNSAFE_getAllByType } = renderItem();
    expect(() =>
      fireEvent.press(leftAction(UNSAFE_getAllByType)),
    ).not.toThrow();
  });
});

describe('TabMenuItem — onTapMinus', () => {
  it('calls onTapMinus when right action is pressed and quantity > 1', () => {
    const onTapMinus = jest.fn();
    const { UNSAFE_getAllByType } = renderItem(baseItem, { onTapMinus });
    fireEvent.press(rightAction(UNSAFE_getAllByType));
    expect(onTapMinus).toHaveBeenCalledWith('item-1');
  });

  it('does not call onTapMinus when quantity is 1', () => {
    const onTapMinus = jest.fn();
    const { UNSAFE_getAllByType } = renderItem(singleItem, { onTapMinus });
    fireEvent.press(rightAction(UNSAFE_getAllByType));
    expect(onTapMinus).not.toHaveBeenCalled();
  });

  it('does not throw when onTapMinus is not provided', () => {
    const { UNSAFE_getAllByType } = renderItem();
    expect(() =>
      fireEvent.press(rightAction(UNSAFE_getAllByType)),
    ).not.toThrow();
  });
});

describe('TabMenuItem — onTapRemove', () => {
  it('calls onTapRemove when right action is pressed and quantity is 1', () => {
    const onTapRemove = jest.fn();
    const { UNSAFE_getAllByType } = renderItem(singleItem, { onTapRemove });
    fireEvent.press(rightAction(UNSAFE_getAllByType));
    expect(onTapRemove).toHaveBeenCalledWith('item-1');
  });

  it('does not call onTapRemove when quantity is greater than 1', () => {
    const onTapRemove = jest.fn();
    const { UNSAFE_getAllByType } = renderItem(baseItem, { onTapRemove });
    fireEvent.press(rightAction(UNSAFE_getAllByType));
    expect(onTapRemove).not.toHaveBeenCalled();
  });

  it('does not throw when onTapRemove is not provided', () => {
    const { UNSAFE_getAllByType } = renderItem(singleItem);
    expect(() =>
      fireEvent.press(rightAction(UNSAFE_getAllByType)),
    ).not.toThrow();
  });
});
