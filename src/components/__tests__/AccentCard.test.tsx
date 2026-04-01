import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { AccentCard } from '../AccentCard';

describe('AccentCard', () => {
  it('renders children', () => {
    const { getByText } = render(
      <AccentCard accentColor="#ff0000">
        <Text>Card content</Text>
      </AccentCard>,
    );

    expect(getByText('Card content')).toBeTruthy();
  });

  it('applies the accent color to the accent strip', () => {
    const { UNSAFE_getAllByType } = render(
      <AccentCard accentColor="#C9A84C">
        <Text>Content</Text>
      </AccentCard>,
    );

    const views = UNSAFE_getAllByType(View);
    const accentStrip = views.find(
      (v) =>
        v.props.style &&
        [v.props.style]
          .flat()
          .some(
            (s: Record<string, unknown>) => s?.backgroundColor === '#C9A84C',
          ),
    );

    expect(accentStrip).toBeTruthy();
  });

  it('applies additional style to the card wrapper', () => {
    const { UNSAFE_getAllByType } = render(
      <AccentCard accentColor="#ff0000" style={{ marginBottom: 16 }}>
        <Text>Content</Text>
      </AccentCard>,
    );

    const card = UNSAFE_getAllByType(View)[0];
    const flatStyle = [card.props.style].flat();

    expect(flatStyle).toContainEqual({ marginBottom: 16 });
  });

  it('renders multiple children', () => {
    const { getByText } = render(
      <AccentCard accentColor="#ff0000">
        <Text>First</Text>
        <Text>Second</Text>
      </AccentCard>,
    );

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
  });
});
