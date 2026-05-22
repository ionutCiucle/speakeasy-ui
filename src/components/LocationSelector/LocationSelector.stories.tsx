import type { Meta, StoryObj } from '@storybook/react-native';
import { LocationSelector } from './LocationSelector';

const meta: Meta<typeof LocationSelector> = {
  title: 'Components/LocationSelector',
  component: LocationSelector,
  argTypes: {
    onChangeText: { action: 'onChangeText' },
  },
  args: {
    value: '',
  },
};

export default meta;

type Story = StoryObj<typeof LocationSelector>;

export const Empty: Story = {
  args: {
    value: '',
  },
};

export const WithValue: Story = {
  args: {
    value: 'The Rusty Anchor',
  },
};

export const Invalid: Story = {
  args: {
    value: '',
    invalid: true,
    error: 'Venue is required',
  },
};
