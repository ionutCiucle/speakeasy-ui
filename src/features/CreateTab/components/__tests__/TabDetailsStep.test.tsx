import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TabDetailsStep } from '../TabDetailsStep';

const mockOnValidate = jest.fn();
const mockSetTabName = jest.fn();
const mockSetVenue = jest.fn();
const mockSetNotes = jest.fn();
const mockShowModal = jest.fn();

let mockTabName = '';
let mockVenue = '';
let mockNotes = '';

jest.mock('react-router-native', () => ({
  useOutletContext: () => ({ onValidate: mockOnValidate }),
}));

jest.mock('@/state-management/create-tab', () => ({
  useCreateTabActions: () => ({
    setTabName: mockSetTabName,
    setVenue: mockSetVenue,
    setNotes: mockSetNotes,
  }),
}));

jest.mock('@/state-management/providerHooks', () => ({
  useAppSelector: (selector: (s: unknown) => unknown) =>
    selector({
      createTab: {
        tabName: mockTabName,
        venue: mockVenue,
        notes: mockNotes,
        currency: { code: 'USD', name: 'US Dollar' },
      },
    }),
}));

jest.mock('@/state-management/layout', () => ({
  useLayoutActions: () => ({ showModal: mockShowModal }),
}));

jest.mock('@/components', () => {
  const { TextInput, Text, TouchableOpacity } =
    jest.requireActual('react-native');
  return {
    Input: ({
      label,
      onChangeText,
    }: {
      label: string;
      onChangeText: (t: string) => void;
    }) => (
      <>
        <Text>{label}</Text>
        <TextInput testID={label} onChangeText={onChangeText} />
      </>
    ),
    LocationSelector: ({
      onChangeText,
    }: {
      onChangeText: (t: string) => void;
    }) => <TextInput testID="location-selector" onChangeText={onChangeText} />,
    CurrencySelector: ({ onPress }: { onPress: () => void }) => (
      <TouchableOpacity testID="currency-selector" onPress={onPress}>
        <Text>Currency</Text>
      </TouchableOpacity>
    ),
  };
});

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
}));

describe('TabDetailsStep', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTabName = '';
    mockVenue = '';
    mockNotes = '';
  });

  it('renders the TAB DETAILS section header', () => {
    const { getByText } = render(<TabDetailsStep />);

    expect(getByText('TAB DETAILS')).toBeTruthy();
  });

  it('renders the Tab Name input', () => {
    const { getByText } = render(<TabDetailsStep />);

    expect(getByText('Tab Name')).toBeTruthy();
  });

  it('renders the Notes input', () => {
    const { getByText } = render(<TabDetailsStep />);

    expect(getByText('Notes (optional)')).toBeTruthy();
  });

  it('renders the info box text', () => {
    const { getByText } = render(<TabDetailsStep />);

    expect(
      getByText('Tab opens at the time you tap \u201cStart Tab\u201d.'),
    ).toBeTruthy();
  });

  it('registers the validator on mount', () => {
    render(<TabDetailsStep />);

    expect(mockOnValidate).toHaveBeenCalledWith(expect.any(Function));
  });

  it('unregisters the validator on unmount', () => {
    const { unmount } = render(<TabDetailsStep />);

    unmount();

    expect(mockOnValidate).toHaveBeenLastCalledWith(null);
  });

  it('calls setTabName when tab name changes', () => {
    const { getByTestId } = render(<TabDetailsStep />);

    fireEvent.changeText(getByTestId('Tab Name'), 'Friday Night Out');

    expect(mockSetTabName).toHaveBeenCalledWith('Friday Night Out');
  });

  it('calls setVenue when venue changes', () => {
    const { getByTestId } = render(<TabDetailsStep />);

    fireEvent.changeText(getByTestId('location-selector'), 'The Speakeasy Bar');

    expect(mockSetVenue).toHaveBeenCalledWith('The Speakeasy Bar');
  });

  it('calls setNotes when notes change', () => {
    const { getByTestId } = render(<TabDetailsStep />);

    fireEvent.changeText(getByTestId('Notes (optional)'), 'Bring ID');

    expect(mockSetNotes).toHaveBeenCalledWith('Bring ID');
  });

  it('calls showModal when currency selector is pressed', () => {
    const { getByTestId } = render(<TabDetailsStep />);

    fireEvent.press(getByTestId('currency-selector'));

    expect(mockShowModal).toHaveBeenCalledTimes(1);
  });
});
