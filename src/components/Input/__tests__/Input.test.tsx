import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';

describe('Input', () => {
  const baseProps = {
    label: 'EMAIL',
    placeholder: 'your@email.com',
    value: '',
    onChangeText: jest.fn(),
  };

  it('renders the label and placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input {...baseProps} />,
    );

    expect(getByText('EMAIL')).toBeTruthy();
    expect(getByPlaceholderText('your@email.com')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input {...baseProps} onChangeText={onChangeText} />,
    );

    fireEvent.changeText(getByPlaceholderText('your@email.com'), 'hello');

    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('does not render an error message when error is not provided', () => {
    const { queryByText } = render(<Input {...baseProps} />);

    expect(queryByText(/error/i)).toBeNull();
  });

  it('renders the error message when error prop is provided', () => {
    const { getByText } = render(
      <Input {...baseProps} error="Email is required" />,
    );

    expect(getByText('Email is required')).toBeTruthy();
  });

  it('does not apply invalid border style by default', () => {
    const { getByPlaceholderText } = render(<Input {...baseProps} />);
    const input = getByPlaceholderText('your@email.com');
    const flatStyle = Array.isArray(input.props.style)
      ? Object.assign({}, ...input.props.style)
      : input.props.style;

    expect(flatStyle.borderColor).not.toBe('#e4572e');
  });

  it('applies invalid border style when invalid=true', () => {
    const { getByPlaceholderText } = render(<Input {...baseProps} invalid />);
    const input = getByPlaceholderText('your@email.com');
    const flatStyle = Array.isArray(input.props.style)
      ? Object.assign({}, ...input.props.style)
      : input.props.style;

    expect(flatStyle.borderColor).toBe('#e4572e');
  });

  it('renders both invalid border and error message together', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input {...baseProps} invalid error="Email is required" />,
    );
    const input = getByPlaceholderText('your@email.com');
    const flatStyle = Array.isArray(input.props.style)
      ? Object.assign({}, ...input.props.style)
      : input.props.style;

    expect(flatStyle.borderColor).toBe('#e4572e');
    expect(getByText('Email is required')).toBeTruthy();
  });
});
