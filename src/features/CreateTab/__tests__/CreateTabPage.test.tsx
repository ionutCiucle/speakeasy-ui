import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CreateTabPage } from '../CreateTabPage';

const mockNavigate = jest.fn();
const mockSubmitCreateTab = jest.fn();
let mockPathname = '/create-tab/tab-details';
let mockIsSubmitting = false;

jest.mock('react-router-native', () => ({
  useLocation: () => ({ pathname: mockPathname }),
  useNavigate: () => mockNavigate,
  Outlet: () => null,
}));

jest.mock('@/state-management/create-tab', () => ({
  useCreateTabAsyncActions: () => ({ submitCreateTab: mockSubmitCreateTab }),
}));

jest.mock('@/state-management/providerHooks', () => ({
  useAppSelector: (selector: (s: unknown) => unknown) =>
    selector({ createTab: { isSubmitting: mockIsSubmitting } }),
}));

jest.mock('@expo/vector-icons', () => ({
  Feather: () => null,
}));

describe('CreateTabPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname = '/create-tab/tab-details';
    mockIsSubmitting = false;
    mockSubmitCreateTab.mockResolvedValue(false);
  });

  it('renders the step label for step 1', () => {
    const { getByText } = render(<CreateTabPage />);

    expect(getByText('Step 1 of 4 · Tab Details')).toBeTruthy();
  });

  it('renders the step label for step 3', () => {
    mockPathname = '/create-tab/build-menu';
    const { getByText } = render(<CreateTabPage />);

    expect(getByText('Step 3 of 4 · Build the Menu')).toBeTruthy();
  });

  it('renders the step label for the review step', () => {
    mockPathname = '/create-tab/review';
    const { getByText } = render(<CreateTabPage />);

    expect(getByText('Step 4 of 4 · Review & Start')).toBeTruthy();
  });

  it('renders Continue button on non-review steps', () => {
    const { getByText } = render(<CreateTabPage />);

    expect(getByText('Continue')).toBeTruthy();
  });

  it('renders Start Tab button on the review step', () => {
    mockPathname = '/create-tab/review';
    const { getByText } = render(<CreateTabPage />);

    expect(getByText('Start Tab')).toBeTruthy();
  });

  it('does not render Continue on the review step', () => {
    mockPathname = '/create-tab/review';
    const { queryByText } = render(<CreateTabPage />);

    expect(queryByText('Continue')).toBeNull();
  });

  it('navigates to the next route when Continue is pressed', () => {
    const { getByText } = render(<CreateTabPage />);

    fireEvent.press(getByText('Continue'));

    expect(mockNavigate).toHaveBeenCalledWith('/create-tab/add-members');
  });

  it('calls submitCreateTab when Start Tab is pressed', async () => {
    mockPathname = '/create-tab/review';
    const { getByText } = render(<CreateTabPage />);

    fireEvent.press(getByText('Start Tab'));

    await waitFor(() => {
      expect(mockSubmitCreateTab).toHaveBeenCalledTimes(1);
    });
  });

  it('navigates to /home after successful submission', async () => {
    mockPathname = '/create-tab/review';
    mockSubmitCreateTab.mockResolvedValue(true);
    const { getByText } = render(<CreateTabPage />);

    fireEvent.press(getByText('Start Tab'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('does not navigate when submission fails', async () => {
    mockPathname = '/create-tab/review';
    mockSubmitCreateTab.mockResolvedValue(false);
    const { getByText } = render(<CreateTabPage />);

    fireEvent.press(getByText('Start Tab'));

    await waitFor(() => {
      expect(mockSubmitCreateTab).toHaveBeenCalled();
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows a spinner on Start Tab while submitting', () => {
    mockPathname = '/create-tab/review';
    mockIsSubmitting = true;
    const { queryByText } = render(<CreateTabPage />);

    expect(queryByText('Start Tab')).toBeNull();
  });
});
