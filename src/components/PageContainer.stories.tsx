import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Text } from 'react-native';
import { PageContainer } from './PageContainer';

const meta: Meta<typeof PageContainer> = {
  title: 'Components/PageContainer',
  component: PageContainer,
  args: {
    children: (
      <Text style={{ fontFamily: 'Inter_400Regular', color: '#2D2416' }}>
        Page content with horizontal padding applied by the container.
      </Text>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof PageContainer>;

export const Default: Story = {};
