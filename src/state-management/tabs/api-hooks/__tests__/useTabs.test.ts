import { renderHook, waitFor } from '@testing-library/react-native';
import { useTabs } from '../useTabs';

const mockGet = jest.fn();

jest.mock('@/services', () => ({
  TabAPI: { get: (...args: unknown[]) => mockGet(...args) },
}));

const mockTab = {
  id: '1',
  title: 'Friday Night Out',
  venue: 'The Speakeasy Bar',
  currency: { code: 'USD', name: 'US Dollar' },
  status: 'active',
  members: [],
  menuItems: [],
  items: [],
  participants: [],
  settlements: [],
};

describe('useTabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('resolves to empty tabs with no error after a successful empty response', async () => {
    mockGet.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useTabs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.tabs).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('sets isLoading to true while fetching', async () => {
    let resolve: (v: unknown) => void;
    mockGet.mockReturnValue(new Promise((r) => (resolve = r)));

    const { result } = renderHook(() => useTabs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    resolve!({ data: [] });
  });

  it('fetches tabs on mount', async () => {
    mockGet.mockResolvedValue({ data: [mockTab] });

    const { result } = renderHook(() => useTabs());

    await waitFor(() => {
      expect(result.current.tabs).toEqual([mockTab]);
    });
  });

  it('sets isLoading to false after successful fetch', async () => {
    mockGet.mockResolvedValue({ data: [mockTab] });

    const { result } = renderHook(() => useTabs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('calls TabAPI.get with the correct endpoint', async () => {
    mockGet.mockResolvedValue({ data: [] });

    renderHook(() => useTabs());

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith('/');
    });
  });

  it('sets error when the request fails', async () => {
    mockGet.mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useTabs());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to load tabs');
    });
  });

  it('sets isLoading to false after a failed fetch', async () => {
    mockGet.mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useTabs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('keeps tabs empty after a failed fetch', async () => {
    mockGet.mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useTabs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.tabs).toEqual([]);
  });

  it('logs a console error on failure', async () => {
    const err = new Error('Network Error');
    mockGet.mockRejectedValue(err);

    renderHook(() => useTabs());

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        '[useTabs] Failed to load tabs:',
        err,
      );
    });
  });

  it('clears a previous error when a subsequent fetch succeeds', async () => {
    // First mount: fails
    mockGet.mockRejectedValueOnce(new Error('Network Error'));
    const { result, unmount } = renderHook(() => useTabs());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to load tabs');
    });

    unmount();

    // Second mount: succeeds
    mockGet.mockResolvedValueOnce({ data: [mockTab] });
    const { result: result2 } = renderHook(() => useTabs());

    await waitFor(() => {
      expect(result2.current.error).toBeNull();
      expect(result2.current.tabs).toEqual([mockTab]);
    });
  });
});
