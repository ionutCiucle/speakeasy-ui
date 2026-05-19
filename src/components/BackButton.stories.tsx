import type { Meta, StoryObj } from '@storybook/react-native';
import { BackButton } from './BackButton';

const meta: Meta<typeof BackButton> = {
  title: 'Components/BackButton',
  component: BackButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    top: 0,
  },
};

export default meta;

type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  args: {
    top: 0,
  },
};
