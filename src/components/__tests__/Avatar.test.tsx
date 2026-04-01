import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('renders the label', () => {
    const { getByText } = render(<Avatar label="JD" />);

    expect(getByText('JD')).toBeTruthy();
  });

  it('defaults to member variant', () => {
    const { UNSAFE_getAllByType } = render(<Avatar label="JD" />);

    const container = UNSAFE_getAllByType(View)[0];
    const flat = [container.props.style].flat();

    expect(flat).toContainEqual({ backgroundColor: '#EDE8DC' });
  });

  it('applies self variant background color', () => {
    const { UNSAFE_getAllByType } = render(
      <Avatar label="JD" variant="self" />,
    );

    const container = UNSAFE_getAllByType(View)[0];
    const flat = [container.props.style].flat();

    expect(flat).toContainEqual({ backgroundColor: '#C9A84C' });
  });

  it('applies self variant label color', () => {
    const { getByText } = render(<Avatar label="JD" variant="self" />);

    const label = getByText('JD');
    const flat = [label.props.style].flat();

    expect(flat).toContainEqual({ color: '#1A140D' });
  });

  it('applies member variant label color', () => {
    const { getByText } = render(<Avatar label="JD" variant="member" />);

    const label = getByText('JD');
    const flat = [label.props.style].flat();

    expect(flat).toContainEqual({ color: '#2D2416' });
  });

  it('defaults to size 44', () => {
    const { UNSAFE_getAllByType } = render(<Avatar label="JD" />);

    const container = UNSAFE_getAllByType(View)[0];
    const flat = [container.props.style].flat();

    expect(flat).toContainEqual({ width: 44, height: 44, borderRadius: 22 });
  });

  it('applies a custom size', () => {
    const { UNSAFE_getAllByType } = render(<Avatar label="JD" size={28} />);

    const container = UNSAFE_getAllByType(View)[0];
    const flat = [container.props.style].flat();

    expect(flat).toContainEqual({ width: 28, height: 28, borderRadius: 14 });
  });

  it('uses smaller font size for size <= 30', () => {
    const { getByText } = render(<Avatar label="JD" size={30} />);

    const label = getByText('JD');
    const flat = [label.props.style].flat();

    expect(flat).toContainEqual({ fontSize: 9, lineHeight: 11 });
  });

  it('uses larger font size for size > 30', () => {
    const { getByText } = render(<Avatar label="JD" size={44} />);

    const label = getByText('JD');
    const flat = [label.props.style].flat();

    expect(flat).toContainEqual({ fontSize: 11, lineHeight: 13 });
  });

  it('applies additional style to the container', () => {
    const { UNSAFE_getAllByType } = render(
      <Avatar label="JD" style={{ opacity: 0.5 }} />,
    );

    const container = UNSAFE_getAllByType(View)[0];
    const flat = [container.props.style].flat();

    expect(flat).toContainEqual({ opacity: 0.5 });
  });

  it('renders with a custom label from Text', () => {
    const { UNSAFE_getAllByType } = render(<Avatar label="AB" />);

    expect(UNSAFE_getAllByType(Text)).toHaveLength(1);
  });
});
