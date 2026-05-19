import type { Meta, StoryObj } from '@storybook/react-native';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  argTypes: {
    onBack: { action: 'onBack' },
    onClose: { action: 'onClose' },
  },
  args: {
    title: 'Page Title',
  },
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const TitleOnly: Story = {
  args: {
    title: 'My Tab',
  },
};

export const WithBack: Story = {
  args: {
    title: 'Add Members',
    onBack: () => {},
  },
};

export const WithClose: Story = {
  args: {
    title: 'New Tab',
    onClose: () => {},
  },
};

export const WithBoth: Story = {
  args: {
    title: 'Settings',
    onBack: () => {},
    onClose: () => {},
  },
};
