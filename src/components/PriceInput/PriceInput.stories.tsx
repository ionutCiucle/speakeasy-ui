import type { Meta, StoryObj } from '@storybook/react-native';
import { PriceInput } from './PriceInput';

const meta: Meta<typeof PriceInput> = {
  title: 'Components/PriceInput',
  component: PriceInput,
  argTypes: {
    onChangeValue: { action: 'onChangeValue' },
  },
  args: {
    currencyCode: 'GBP',
    value: '',
  },
};

export default meta;

type Story = StoryObj<typeof PriceInput>;

export const Empty: Story = {
  args: {
    currencyCode: 'GBP',
    value: '',
  },
};

export const WithValue: Story = {
  args: {
    currencyCode: 'USD',
    value: '12.50',
  },
};

export const Invalid: Story = {
  args: {
    currencyCode: 'EUR',
    value: '',
    invalid: true,
    error: 'Price is required',
  },
};
