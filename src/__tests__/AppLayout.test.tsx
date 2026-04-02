import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppLayout } from '../AppLayout';

const mockNavigate = jest.fn();
const mockReset = jest.fn();
let mockPathname = '/home';
let mockCreateTabInProgress = false;

jest.mock('react-router-native', () => ({
  useLocation: () => ({ pathname: mockPathname, state: null }),
  useNavigate: () => mockNavigate,
  Outlet: () => null,
}));

jest.mock('@/state-management/create-tab', () => ({
  useCreateTabActions: () => ({ reset: mockReset }),
}));

jest.mock('@/state-management/providerHooks', () => ({
  useAppSelector: (selector: (s: unknown) => unknown) =>
    selector({
      createTab: { tabName: mockCreateTabInProgress ? 'Friday Drinks' : '' },
    }),
}));

jest.mock('@/components', () => ({
  PageHeader: ({
    onBack,
    onClose,
  }: {
    onBack?: () => void;
    onClose?: () => void;
  }) => {
    const { TouchableOpacity, Text } = jest.requireActual('react-native');
    return (
      <>
        {onBack && (
          <TouchableOpacity testID="back-button" onPress={onBack}>
            <Text>Back</Text>
          </TouchableOpacity>
        )}
        {onClose && (
          <TouchableOpacity testID="close-button" onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        )}
      </>
    );
  },
  MainNav: ({ onTabPress }: { onTabPress: (tab: string) => void }) => {
    const { TouchableOpacity, Text } = jest.requireActual('react-native');
    return (
      <>
        <TouchableOpacity testID="nav-home" onPress={() => onTabPress('home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="nav-newTab"
          onPress={() => onTabPress('newTab')}
        >
          <Text>New Tab</Text>
        </TouchableOpacity>
      </>
    );
  },
}));

jest.mock('../ModalRoot', () => ({ ModalRoot: () => null }));

jest.mock('@expo/vector-icons', () => ({ Feather: () => null }));

describe('AppLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname = '/home';
    mockCreateTabInProgress = false;
  });

  describe('New Tab nav press', () => {
    it('navigates to /create-tab when no tab is in progress', () => {
      mockCreateTabInProgress = false;
      const { getByTestId } = render(<AppLayout />);

      fireEvent.press(getByTestId('nav-newTab'));

      expect(mockNavigate).toHaveBeenCalledWith('/create-tab');
    });

    it('resumes the last wizard route when a tab is in progress', () => {
      mockCreateTabInProgress = true;
      mockPathname = '/create-tab/add-members';

      // First render on the wizard route so lastCreateTabRoute ref is set
      const { rerender, getByTestId } = render(<AppLayout />);

      // Rerender simulating navigation away to /home
      mockPathname = '/home';
      rerender(<AppLayout />);

      fireEvent.press(getByTestId('nav-newTab'));

      expect(mockNavigate).toHaveBeenCalledWith('/create-tab/add-members');
    });

    it('does not navigate when already on the target route', () => {
      mockPathname = '/create-tab';
      mockCreateTabInProgress = false;
      const { getByTestId } = render(<AppLayout />);

      fireEvent.press(getByTestId('nav-newTab'));

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('back button — wizard step order', () => {
    it('navigates to tab-details when back is pressed on add-members', () => {
      mockPathname = '/create-tab/add-members';
      const { getByTestId } = render(<AppLayout />);

      fireEvent.press(getByTestId('back-button'));

      expect(mockNavigate).toHaveBeenCalledWith('/create-tab/tab-details', {
        replace: true,
      });
    });

    it('navigates to add-members when back is pressed on build-menu', () => {
      mockPathname = '/create-tab/build-menu';
      const { getByTestId } = render(<AppLayout />);

      fireEvent.press(getByTestId('back-button'));

      expect(mockNavigate).toHaveBeenCalledWith('/create-tab/add-members', {
        replace: true,
      });
    });

    it('navigates to build-menu when back is pressed on review', () => {
      mockPathname = '/create-tab/review';
      const { getByTestId } = render(<AppLayout />);

      fireEvent.press(getByTestId('back-button'));

      expect(mockNavigate).toHaveBeenCalledWith('/create-tab/build-menu', {
        replace: true,
      });
    });

    it('calls navigate(-1) for non-wizard back navigation (tab detail)', () => {
      mockPathname = '/tab/abc123';
      const { getByTestId } = render(<AppLayout />);

      fireEvent.press(getByTestId('back-button'));

      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
