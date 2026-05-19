import type { Meta, StoryObj } from '@storybook/react-native';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  args: {
    size: 112,
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    size: 112,
  },
};

export const Small: Story = {
  args: {
    size: 56,
  },
};

export const Large: Story = {
  args: {
    size: 160,
  },
};
