import type { Meta, StoryObj } from '@storybook/react-native';
import { MainNav } from './MainNav';

const meta: Meta<typeof MainNav> = {
  title: 'Components/MainNav',
  component: MainNav,
  argTypes: {
    onTabPress: { action: 'onTabPress' },
    activeTab: {
      control: { type: 'select' },
      options: ['home', 'newTab', 'friends', 'profile'],
    },
  },
  args: {
    activeTab: 'home',
  },
};

export default meta;

type Story = StoryObj<typeof MainNav>;

export const HomeActive: Story = {
  args: {
    activeTab: 'home',
  },
};

export const ProfileActive: Story = {
  args: {
    activeTab: 'profile',
  },
};

export const WithBadge: Story = {
  args: {
    activeTab: 'home',
    badgeTabs: ['friends'],
  },
};

export const MultipleBadges: Story = {
  args: {
    activeTab: 'home',
    badgeTabs: ['newTab', 'friends'],
  },
};
