import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders the label', () => {
    const { getByText } = render(
      <Button label="Sign In" onPress={jest.fn()} />,
    );

    expect(getByText('Sign In')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Sign In" onPress={onPress} />);

    fireEvent.press(getByText('Sign In'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('defaults to primary variant', () => {
    const { getByText } = render(
      <Button label="Sign In" onPress={jest.fn()} />,
    );
    const label = getByText('Sign In');
    const flatStyle = Array.isArray(label.props.style)
      ? Object.assign({}, ...label.props.style)
      : label.props.style;

    expect(flatStyle.color).toBe('#ffffff');
  });

  it('applies white label colour for primary variant', () => {
    const { getByText } = render(
      <Button label="Sign In" variant="primary" onPress={jest.fn()} />,
    );
    const flatStyle = Array.isArray(getByText('Sign In').props.style)
      ? Object.assign({}, ...getByText('Sign In').props.style)
      : getByText('Sign In').props.style;

    expect(flatStyle.color).toBe('#ffffff');
  });

  it('applies gold label colour for secondary variant', () => {
    const { getByText } = render(
      <Button label="Scan QR" variant="secondary" onPress={jest.fn()} />,
    );
    const flatStyle = Array.isArray(getByText('Scan QR').props.style)
      ? Object.assign({}, ...getByText('Scan QR').props.style)
      : getByText('Scan QR').props.style;

    expect(flatStyle.color).toBe('#C9A84C');
  });
});
