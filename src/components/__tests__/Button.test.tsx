import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
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

  it('renders a spinner and hides the label when showSpinner is true', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button label="Sign In" showSpinner onPress={jest.fn()} />,
    );

    expect(queryByText('Sign In')).toBeNull();
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('does not fire onPress while spinner is shown', () => {
    const onPress = jest.fn();
    const { UNSAFE_getByType } = render(
      <Button label="Sign In" showSpinner onPress={onPress} />,
    );

    fireEvent.press(UNSAFE_getByType(ActivityIndicator));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('disables the touchable when showSpinner is true', () => {
    const { UNSAFE_getByType } = render(
      <Button label="Sign In" showSpinner onPress={jest.fn()} />,
    );

    expect(UNSAFE_getByType(TouchableOpacity).props.disabled).toBe(true);
  });

  it('spinner uses white color for primary variant', () => {
    const { UNSAFE_getByType } = render(
      <Button
        label="Sign In"
        variant="primary"
        showSpinner
        onPress={jest.fn()}
      />,
    );

    expect(UNSAFE_getByType(ActivityIndicator).props.color).toBe('#ffffff');
  });

  it('spinner uses gold color for secondary variant', () => {
    const { UNSAFE_getByType } = render(
      <Button
        label="Sign In"
        variant="secondary"
        showSpinner
        onPress={jest.fn()}
      />,
    );

    expect(UNSAFE_getByType(ActivityIndicator).props.color).toBe('#C9A84C');
  });

  it('spinner uses white color for tertiary variant', () => {
    const { UNSAFE_getByType } = render(
      <Button
        label="Sign In"
        variant="tertiary"
        showSpinner
        onPress={jest.fn()}
      />,
    );

    expect(UNSAFE_getByType(ActivityIndicator).props.color).toBe('#ffffff');
  });

  it('hides the right icon when showSpinner is true', () => {
    const { UNSAFE_queryByType } = render(
      <Button
        label="Continue"
        rightIcon="chevron-right"
        showSpinner
        onPress={jest.fn()}
      />,
    );

    expect(UNSAFE_queryByType(ActivityIndicator)).toBeTruthy();
    expect(UNSAFE_queryByType(Feather)).toBeNull();
  });
});
