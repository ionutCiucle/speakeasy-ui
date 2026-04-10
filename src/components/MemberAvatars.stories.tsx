import type { Meta, StoryObj } from '@storybook/react-native';
import { MemberAvatars } from './MemberAvatars';

const meta: Meta<typeof MemberAvatars> = {
  title: 'Components/MemberAvatars',
  component: MemberAvatars,
  argTypes: {
    onAdd: { action: 'onAdd' },
  },
  args: {
    members: [],
    showSelf: true,
  },
};

export default meta;

type Story = StoryObj<typeof MemberAvatars>;

export const Empty: Story = {
  args: {
    members: [],
  },
};

export const WithMembers: Story = {
  args: {
    members: [
      { id: '1', name: 'Alice Johnson' },
      { id: '2', name: 'Bob Smith' },
      { id: '3', name: 'Carol White' },
    ],
  },
};

export const WithoutSelf: Story = {
  args: {
    members: [
      { id: '1', name: 'Alice Johnson' },
      { id: '2', name: 'Bob Smith' },
    ],
    showSelf: false,
  },
};
