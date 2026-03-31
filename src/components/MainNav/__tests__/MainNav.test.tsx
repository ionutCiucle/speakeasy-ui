import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MainNav } from '../MainNav';

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
  Ionicons: () => null,
}));

describe('MainNav', () => {
  it('renders all four tab labels', () => {
    const { getByText } = render(<MainNav />);

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('New Tab')).toBeTruthy();
    expect(getByText('Friends')).toBeTruthy();
    expect(getByText('Profile')).toBeTruthy();
  });

  it('defaults active tab to home', () => {
    const { getByText } = render(<MainNav />);
    const homeLabel = getByText('Home');

    expect(homeLabel.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#C9A84C' })]),
    );
  });

  it('applies gold colour to the active tab label', () => {
    const { getByText } = render(<MainNav activeTab="friends" />);

    expect(getByText('Friends').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#C9A84C' })]),
    );
  });

  it('applies warm brown colour to inactive tab labels', () => {
    const { getByText } = render(<MainNav activeTab="home" />);

    for (const label of ['New Tab', 'Friends', 'Profile']) {
      expect(getByText(label).props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ color: '#8B7355' })]),
      );
    }
  });

  it('calls onTabPress with the correct tab key when a tab is pressed', () => {
    const onTabPress = jest.fn();
    const { getByText } = render(<MainNav onTabPress={onTabPress} />);

    fireEvent.press(getByText('Friends'));

    expect(onTabPress).toHaveBeenCalledWith('friends');
  });

  it('calls onTabPress for each tab with the correct key', () => {
    const onTabPress = jest.fn();
    const { getByText } = render(<MainNav onTabPress={onTabPress} />);

    fireEvent.press(getByText('Home'));
    fireEvent.press(getByText('New Tab'));
    fireEvent.press(getByText('Profile'));

    expect(onTabPress).toHaveBeenNthCalledWith(1, 'home');
    expect(onTabPress).toHaveBeenNthCalledWith(2, 'newTab');
    expect(onTabPress).toHaveBeenNthCalledWith(3, 'profile');
  });

  it('does not throw when onTabPress is not provided', () => {
    const { getByText } = render(<MainNav />);

    expect(() => fireEvent.press(getByText('Home'))).not.toThrow();
  });
});
