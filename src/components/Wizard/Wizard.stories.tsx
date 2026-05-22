import type { Meta, StoryObj } from '@storybook/react-native';
import { Wizard } from './Wizard';

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard',
  component: Wizard,
  args: {
    totalSteps: 3,
    currentStep: 1,
    stepName: 'Details',
  },
};

export default meta;

type Story = StoryObj<typeof Wizard>;

export const FirstStep: Story = {
  args: {
    totalSteps: 3,
    currentStep: 1,
    stepName: 'Details',
  },
};

export const MiddleStep: Story = {
  args: {
    totalSteps: 3,
    currentStep: 2,
    stepName: 'Members',
  },
};

export const LastStep: Story = {
  args: {
    totalSteps: 3,
    currentStep: 3,
    stepName: 'Review',
  },
};

export const FiveSteps: Story = {
  args: {
    totalSteps: 5,
    currentStep: 3,
    stepName: 'Payment',
  },
};
