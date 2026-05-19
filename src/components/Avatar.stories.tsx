import type { Meta, StoryObj } from '@storybook/react-native';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['self', 'member'],
    },
  },
  args: {
    label: 'JD',
    variant: 'member',
    size: 44,
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Member: Story = {
  args: {
    label: 'JD',
    variant: 'member',
  },
};

export const Self: Story = {
  args: {
    label: 'Me',
    variant: 'self',
  },
};

export const Small: Story = {
  args: {
    label: 'AB',
    variant: 'member',
    size: 30,
  },
};

export const Large: Story = {
  args: {
    label: 'TC',
    variant: 'self',
    size: 60,
  },
};
