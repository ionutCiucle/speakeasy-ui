import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { MenuCard } from '../MenuCard';
import type { OrderItem } from '../MenuCard';

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

const item: OrderItem = {
  id: 'i1',
  name: 'Gin & Tonic',
  quantity: 2,
  price: 8.5,
};

const renderCard = (
  overrides: Partial<React.ComponentProps<typeof MenuCard>> = {},
) =>
  render(
    <MenuCard
      item={item}
      currencySymbol="£"
      onTapPlus={jest.fn()}
      onTapMinus={jest.fn()}
      onTapRemove={jest.fn()}
      {...overrides}
    />,
  );

describe('MenuCard', () => {
  describe('rendering', () => {
    it('renders the item name', () => {
      const { getByText } = renderCard();
      expect(getByText('Gin & Tonic')).toBeTruthy();
    });

    it('renders the formatted price', () => {
      const { getByText } = renderCard();
      expect(getByText('£8.50')).toBeTruthy();
    });

    it('renders the quantity badge with the item quantity', () => {
      const { getByText } = renderCard();
      expect(getByText('2')).toBeTruthy();
    });

    it('does not render the quantity badge when showQuantity is false', () => {
      const { queryByText } = renderCard({ showQuantity: false });
      expect(queryByText('2')).toBeNull();
    });

    it('does not render the quantity badge when quantity is 0', () => {
      const { queryByText } = renderCard({ item: { ...item, quantity: 0 } });
      expect(queryByText('0')).toBeNull();
    });
  });

  describe('loading state', () => {
    it('shows an ActivityIndicator when isLoading is true', () => {
      const { UNSAFE_getAllByType } = renderCard({ isLoading: true });
      expect(UNSAFE_getAllByType(ActivityIndicator).length).toBeGreaterThan(0);
    });

    it('hides the quantity text when isLoading is true', () => {
      const { queryByText } = renderCard({ isLoading: true });
      expect(queryByText('2')).toBeNull();
    });

    it('does not show an ActivityIndicator when isLoading is false', () => {
      const { UNSAFE_queryAllByType } = renderCard({ isLoading: false });
      expect(UNSAFE_queryAllByType(ActivityIndicator).length).toBe(0);
    });

    it('does not show an ActivityIndicator when showQuantity is false, even if isLoading', () => {
      const { UNSAFE_queryAllByType } = renderCard({
        isLoading: true,
        showQuantity: false,
      });
      expect(UNSAFE_queryAllByType(ActivityIndicator).length).toBe(0);
    });
  });

  describe('swipe actions', () => {
    it('calls onTapPlus with the item id when the left action is pressed', () => {
      const onTapPlus = jest.fn();
      const { UNSAFE_getAllByType } = renderCard({ onTapPlus });
      fireEvent.press(UNSAFE_getAllByType(TouchableOpacity)[0]);
      expect(onTapPlus).toHaveBeenCalledWith('i1');
    });

    it('calls onTapMinus when quantity > 1 and right action is pressed', () => {
      const onTapMinus = jest.fn();
      const onTapRemove = jest.fn();
      const { UNSAFE_getAllByType } = renderCard({
        item: { ...item, quantity: 2 },
        onTapMinus,
        onTapRemove,
      });
      const touchables = UNSAFE_getAllByType(TouchableOpacity);
      fireEvent.press(touchables[touchables.length - 1]);
      expect(onTapMinus).toHaveBeenCalledWith('i1');
      expect(onTapRemove).not.toHaveBeenCalled();
    });

    it('calls onTapRemove when quantity is 1 and right action is pressed', () => {
      const onTapMinus = jest.fn();
      const onTapRemove = jest.fn();
      const { UNSAFE_getAllByType } = renderCard({
        item: { ...item, quantity: 1 },
        onTapMinus,
        onTapRemove,
      });
      const touchables = UNSAFE_getAllByType(TouchableOpacity);
      fireEvent.press(touchables[touchables.length - 1]);
      expect(onTapRemove).toHaveBeenCalledWith('i1');
      expect(onTapMinus).not.toHaveBeenCalled();
    });

    it('calls onTapRemove when quantity is 0 and right action is pressed', () => {
      const onTapMinus = jest.fn();
      const onTapRemove = jest.fn();
      const { UNSAFE_getAllByType } = renderCard({
        item: { ...item, quantity: 0 },
        onTapMinus,
        onTapRemove,
      });
      const touchables = UNSAFE_getAllByType(TouchableOpacity);
      fireEvent.press(touchables[touchables.length - 1]);
      expect(onTapRemove).toHaveBeenCalledWith('i1');
      expect(onTapMinus).not.toHaveBeenCalled();
    });

    it('does not render the left action when onTapPlus is not provided', () => {
      const onTapMinus = jest.fn();
      const { UNSAFE_getAllByType } = renderCard({
        onTapPlus: undefined,
        onTapMinus,
      });
      // Only card + right action touchables — no left action
      const touchables = UNSAFE_getAllByType(TouchableOpacity);
      expect(touchables.length).toBe(2);
    });
  });
});
