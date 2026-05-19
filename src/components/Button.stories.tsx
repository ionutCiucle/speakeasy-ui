import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onPress: { action: 'onPress' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
  args: {
    label: 'Button',
    variant: 'primary',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Continue',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Cancel',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Learn more',
    variant: 'tertiary',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Next step',
    variant: 'primary',
    rightIcon: 'arrow-right',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Unavailable',
    variant: 'primary',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Submit',
    variant: 'primary',
    showSpinner: true,
  },
};
