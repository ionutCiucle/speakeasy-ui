import type { Meta, StoryObj } from '@storybook/react-native';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    onChangeText: { action: 'onChangeText' },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    value: '',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
  },
};

export const Small: Story = {
  args: {
    label: 'Item Name',
    placeholder: 'e.g. Gin & Tonic',
    size: 'small',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    value: 'hello@speakeasy.com',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    value: 'not-an-email',
    invalid: true,
    error: 'Please enter a valid email address',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Any special requests...',
    multiline: true,
    numberOfLines: 3,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    secureTextEntry: true,
  },
};
