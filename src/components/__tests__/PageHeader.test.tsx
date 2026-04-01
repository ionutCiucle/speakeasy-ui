import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PageHeader } from '../PageHeader';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
}));

describe('PageHeader', () => {
  it('renders the title', () => {
    const { getByText } = render(<PageHeader title="My Tabs" />);

    expect(getByText('My Tabs')).toBeTruthy();
  });

  it('does not render a back button when onBack is not provided', () => {
    const { queryByTestId } = render(<PageHeader title="My Tabs" />);

    expect(queryByTestId('back-button')).toBeNull();
  });

  it('does not render a close button when onClose is not provided', () => {
    const { queryByTestId } = render(<PageHeader title="My Tabs" />);

    expect(queryByTestId('close-button')).toBeNull();
  });

  it('calls onBack when the back button is pressed', () => {
    const onBack = jest.fn();
    const { getByTestId } = render(
      <PageHeader title="My Tabs" onBack={onBack} />,
    );

    fireEvent.press(getByTestId('back-button'));

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the close button is pressed', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <PageHeader title="My Tabs" onClose={onClose} />,
    );

    fireEvent.press(getByTestId('close-button'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders both back and close buttons when both handlers are provided', () => {
    const { getByTestId } = render(
      <PageHeader title="My Tabs" onBack={jest.fn()} onClose={jest.fn()} />,
    );

    expect(getByTestId('back-button')).toBeTruthy();
    expect(getByTestId('close-button')).toBeTruthy();
  });
});
