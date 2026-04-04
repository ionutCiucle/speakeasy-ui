import type { Meta, StoryObj } from '@storybook/react-native';
import { CurrencySelector } from './CurrencySelector';

const meta: Meta<typeof CurrencySelector> = {
  title: 'Components/CurrencySelector',
  component: CurrencySelector,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    currencyCode: 'GBP',
    currencyName: 'British Pound',
  },
};

export default meta;

type Story = StoryObj<typeof CurrencySelector>;

export const GBP: Story = {
  args: {
    currencyCode: 'GBP',
    currencyName: 'British Pound',
  },
};

export const USD: Story = {
  args: {
    currencyCode: 'USD',
    currencyName: 'US Dollar',
  },
};

export const EUR: Story = {
  args: {
    currencyCode: 'EUR',
    currencyName: 'Euro',
  },
};
