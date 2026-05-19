import type { Meta, StoryObj } from '@storybook/react-native';
import { AddItemForm } from './AddItemForm';

const meta: Meta<typeof AddItemForm> = {
  title: 'Components/AddItemForm',
  component: AddItemForm,
  argTypes: {
    onAdd: { action: 'onAdd' },
  },
  args: {
    currencyCode: 'GBP',
  },
};

export default meta;

type Story = StoryObj<typeof AddItemForm>;

export const Default: Story = {
  args: {
    currencyCode: 'GBP',
  },
};

export const CustomLabels: Story = {
  args: {
    currencyCode: 'USD',
    sectionLabel: 'NEW MENU ITEM',
    buttonLabel: 'Add to Tab',
  },
};
