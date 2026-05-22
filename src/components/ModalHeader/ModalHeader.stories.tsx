import type { Meta, StoryObj } from '@storybook/react-native';
import { ModalHeader } from './ModalHeader';

const meta: Meta<typeof ModalHeader> = {
  title: 'Components/ModalHeader',
  component: ModalHeader,
  argTypes: {
    onDone: { action: 'onDone' },
  },
  args: {
    title: 'Select Currency',
  },
};

export default meta;

type Story = StoryObj<typeof ModalHeader>;

export const Default: Story = {
  args: {
    title: 'Select Currency',
  },
};

export const AddItems: Story = {
  args: {
    title: 'Add Items',
  },
};
