import type { Meta, StoryObj } from '@storybook/react-native';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    name: 'chevron-left',
    size: 28,
    color: '#C9A84C',
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Back: Story = {
  args: {
    name: 'chevron-left',
  },
};

export const Close: Story = {
  args: {
    name: 'x',
  },
};

export const Plus: Story = {
  args: {
    name: 'plus',
  },
};

export const Settings: Story = {
  args: {
    name: 'settings',
  },
};
