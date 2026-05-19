import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';
import { BracketContainer } from './BracketContainer';

const meta: Meta<typeof BracketContainer> = {
  title: 'Components/BracketContainer',
  component: BracketContainer,
  argTypes: {
    onBack: { action: 'onBack' },
  },
  args: {
    children: (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'Inter_400Regular', color: '#2D2416' }}>
          Content inside the bracket frame
        </Text>
      </View>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof BracketContainer>;

export const Default: Story = {};

export const WithBackButton: Story = {
  args: {
    onBack: () => {},
  },
};

export const SmallBrackets: Story = {
  args: {
    bracketSize: 20,
  },
};
