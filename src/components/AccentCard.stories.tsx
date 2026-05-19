import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Text } from 'react-native';
import { AccentCard } from './AccentCard';

const meta: Meta<typeof AccentCard> = {
  title: 'Components/AccentCard',
  component: AccentCard,
  args: {
    accentColor: '#C9A84C',
    children: (
      <Text style={{ padding: 16, fontFamily: 'Inter_400Regular' }}>
        Card content goes here
      </Text>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof AccentCard>;

export const Gold: Story = {
  args: {
    accentColor: '#C9A84C',
  },
};

export const Green: Story = {
  args: {
    accentColor: '#42904C',
  },
};

export const Red: Story = {
  args: {
    accentColor: '#C0392B',
  },
};
