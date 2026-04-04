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

export const LongName: Story = {
  args: {
    item: {
      id: '3',
      name: 'Espresso Martini with Extra Vanilla Syrup',
      quantity: 2,
      price: 11.0,
    },
  },
};

export const ReadOnly: Story = {
  args: {
    item: { id: '4', name: 'Sparkling Water', quantity: 1, price: 3.5 },
    onTapPlus: undefined,
    onTapMinus: undefined,
    onTapRemove: undefined,
  },
};
