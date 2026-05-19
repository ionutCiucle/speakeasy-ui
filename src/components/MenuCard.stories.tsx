import type { Meta, StoryObj } from '@storybook/react-native';
import { MenuCard } from './MenuCard';

const meta: Meta<typeof MenuCard> = {
  title: 'Components/MenuCard',
  component: MenuCard,
  argTypes: {
    onTapPlus: { action: 'onTapPlus' },
    onTapMinus: { action: 'onTapMinus' },
    onTapRemove: { action: 'onTapRemove' },
  },
  args: {
    currencySymbol: '£',
    item: {
      id: '1',
      name: 'Gin & Tonic',
      quantity: 1,
      price: 8.5,
    },
  },
};

export default meta;

type Story = StoryObj<typeof MenuCard>;

export const SingleItem: Story = {
  args: {
    item: { id: '1', name: 'Gin & Tonic', quantity: 1, price: 8.5 },
  },
};

export const MultipleQuantity: Story = {
  args: {
    item: { id: '2', name: 'House Red Wine', quantity: 3, price: 6.0 },
  },
};

export const ZeroQuantity: Story = {
  args: {
    item: { id: '3', name: 'Sparkling Water', quantity: 0, price: 3.5 },
  },
};

export const LongName: Story = {
  args: {
    item: {
      id: '4',
      name: 'Espresso Martini with Extra Vanilla Syrup',
      quantity: 2,
      price: 11.0,
    },
  },
};

export const Loading: Story = {
  args: {
    item: { id: '5', name: 'Negroni', quantity: 2, price: 9.5 },
    isLoading: true,
  },
};

export const LoadingZeroQuantity: Story = {
  args: {
    item: { id: '6', name: 'Aperol Spritz', quantity: 0, price: 7.0 },
    isLoading: true,
  },
};

export const NoBadge: Story = {
  args: {
    item: { id: '7', name: 'Old Fashioned', quantity: 1, price: 10.0 },
    showQuantity: false,
  },
};

export const ReadOnly: Story = {
  args: {
    item: { id: '8', name: 'Sparkling Water', quantity: 1, price: 3.5 },
    onTapPlus: undefined,
    onTapMinus: undefined,
    onTapRemove: undefined,
  },
};

export const USDCurrency: Story = {
  args: {
    currencySymbol: '$',
    item: { id: '9', name: 'Margarita', quantity: 1, price: 12.0 },
  },
};
