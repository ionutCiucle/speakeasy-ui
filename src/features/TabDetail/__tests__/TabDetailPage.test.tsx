import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { TabDetailPage } from '../TabDetailPage';

// ─── mutable test state ───────────────────────────────────────────────────────

let mockTab: Record<string, unknown> | null = null;
const mockRefetch = jest.fn();
const mockShowModal = jest.fn();
const mockUpdateMemberItems = jest.fn();
const mockUpdateMenuItems = jest.fn();
let mockActiveModal: string | null = null;
let mockUserId = 'user-1';

// ─── mocks ────────────────────────────────────────────────────────────────────

jest.mock('react-router-native', () => ({
  useParams: () => ({ id: 'tab-1' }),
}));

jest.mock('@/state-management/tabs', () => ({
  useTabDetails: () => ({ tab: mockTab, refetch: mockRefetch }),
  useTabAsyncActions: () => ({
    updateMemberItems: mockUpdateMemberItems,
    updateMenuItems: mockUpdateMenuItems,
  }),
}));

jest.mock('@/state-management/layout', () => ({
  useLayoutActions: () => ({ showModal: mockShowModal }),
}));

jest.mock('@/state-management/providerHooks', () => ({
  useAppSelector: (selector: (s: unknown) => unknown) =>
    selector({
      layout: { activeModal: mockActiveModal },
      auth: { userId: mockUserId },
    }),
}));

// require() is intentional here — jest.mock factories are hoisted above imports
// by Babel, so top-level imports are undefined when the factory runs.
jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    Swipeable: ({
      children,
      renderLeftActions,
      renderRightActions,
    }: {
      children: React.ReactNode;
      renderLeftActions?: () => React.ReactNode;
      renderRightActions?: () => React.ReactNode;
    }) => (
      <View>
        {renderLeftActions?.()}
        {children}
        {renderRightActions?.()}
      </View>
    ),
  };
});

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
  Feather: () => null,
}));

// Stub shared components that aren't under test
jest.mock('@/components', () => {
  const { TouchableOpacity, Text, View } = require('react-native');
  return {
    Button: ({ label, onPress }: { label: string; onPress: () => void }) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{label}</Text>
      </TouchableOpacity>
    ),
    MemberAvatars: ({
      members,
    }: {
      members: { id: string; name: string }[];
    }) => (
      <View testID="member-avatars">
        {members.map((m) => (
          <View key={m.id} testID={`member-${m.id}`} />
        ))}
      </View>
    ),
    PageContainer: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
  };
});

// Mock local TabDetail sub-components.
// TabMenuItems is the key one — render testID-tagged controls so tests can
// drive and inspect per-card state.
jest.mock('../components', () => {
  const {
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
  } = require('react-native');

  return {
    TabInfoBar: () => null,
    TabViewToggle: () => null,
    TabSubtotal: () => null,
    TabMenuItems: ({
      items,
      currencySymbol,
      loadingItemId,
      onAdd,
      onTapPlus,
      onTapMinus,
      onTapRemove,
    }: {
      items: { id: string; name: string; quantity: number; price: number }[];
      currencySymbol: string;
      loadingItemId?: string | null;
      onAdd: () => void;
      onTapPlus?: (id: string) => void;
      onTapMinus?: (id: string) => void;
      onTapRemove?: (id: string) => void;
    }) => (
      <View>
        {items.map((item) => (
          <View key={item.id} testID={`card-${item.id}`}>
            <Text>{item.name}</Text>
            {item.id === loadingItemId ? (
              <ActivityIndicator testID={`spinner-${item.id}`} />
            ) : (
              <Text testID={`qty-${item.id}`}>{item.quantity}</Text>
            )}
            {onTapPlus && (
              <TouchableOpacity
                testID={`plus-${item.id}`}
                onPress={() => onTapPlus(item.id)}
              />
            )}
            {onTapMinus && (
              <TouchableOpacity
                testID={`minus-${item.id}`}
                onPress={() => onTapMinus(item.id)}
              />
            )}
            {onTapRemove && (
              <TouchableOpacity
                testID={`remove-${item.id}`}
                onPress={() => onTapRemove(item.id)}
              />
            )}
          </View>
        ))}
        <TouchableOpacity testID="add-more" onPress={onAdd} />
        <Text>{currencySymbol}</Text>
      </View>
    ),
  };
});

// ─── helpers ──────────────────────────────────────────────────────────────────

const TAB = {
  id: 'tab-1',
  title: 'Test Tab',
  venue: 'The Pub',
  currencyCode: 'GBP',
  currencyName: 'British Pound',
  notes: null,
  createdById: 'user-1',
  closedAt: null,
  createdAt: '2026-04-01T10:00:00Z',
  updatedAt: '2026-04-01T10:00:00Z',
  items: [],
  participants: [],
  settlements: [],
  members: [{ tabId: 'tab-1', userId: 'user-1' }],
  menuItems: [
    {
      id: 'm1',
      tabId: 'tab-1',
      name: 'Gin & Tonic',
      price: '8.50',
      addedBy: 'user-1',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 'm2',
      tabId: 'tab-1',
      name: 'Negroni',
      price: '9.00',
      addedBy: 'user-1',
      createdAt: '',
      updatedAt: '',
    },
  ],
};

function renderPage() {
  return render(<TabDetailPage />);
}

// ─── tests ────────────────────────────────────────────────────────────────────

describe('TabDetailPage — member item ordering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTab = TAB;
    mockActiveModal = null;
    mockUserId = 'user-1';
    mockUpdateMemberItems.mockResolvedValue(true);
    mockUpdateMenuItems.mockResolvedValue(true);
  });

  describe('quantity display', () => {
    it('renders all menu items with quantity 0 initially', () => {
      const { getByTestId } = renderPage();
      expect(getByTestId('qty-m1').props.children).toBe(0);
      expect(getByTestId('qty-m2').props.children).toBe(0);
    });

    it('increments quantity when + is pressed', async () => {
      const { getByTestId } = renderPage();
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      expect(getByTestId('qty-m1').props.children).toBe(1);
    });

    it('increments independently per item', async () => {
      const { getByTestId } = renderPage();
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      await act(async () => {
        fireEvent.press(getByTestId('plus-m2'));
      });
      expect(getByTestId('qty-m1').props.children).toBe(2);
      expect(getByTestId('qty-m2').props.children).toBe(1);
    });

    it('decrements quantity when - is pressed', async () => {
      const { getByTestId } = renderPage();
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      await act(async () => {
        fireEvent.press(getByTestId('minus-m1'));
      });
      expect(getByTestId('qty-m1').props.children).toBe(1);
    });

    it('clears member quantity for an item when remove is pressed', async () => {
      const { getByTestId } = renderPage();
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      await act(async () => {
        fireEvent.press(getByTestId('remove-m1'));
      });
      expect(getByTestId('qty-m1').props.children).toBe(0);
    });

    it('does not go below 0 when minus is pressed at 0', async () => {
      const { getByTestId } = renderPage();
      await act(async () => {
        fireEvent.press(getByTestId('minus-m1'));
      });
      expect(getByTestId('qty-m1').props.children).toBe(0);
    });
  });

  describe('API calls', () => {
    it('calls updateMemberItems with correct payload when + is pressed', async () => {
      const { getByTestId } = renderPage();
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      expect(mockUpdateMemberItems).toHaveBeenCalledWith('tab-1', 'user-1', [
        { menuItemId: 'm1', quantity: 1 },
      ]);
    });

    it('calls updateMemberItems with aggregated quantities for multiple presses', async () => {
      const { getByTestId } = renderPage();
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      expect(mockUpdateMemberItems).toHaveBeenLastCalledWith(
        'tab-1',
        'user-1',
        [{ menuItemId: 'm1', quantity: 2 }],
      );
    });

    it('omits items with quantity 0 from the member items payload', async () => {
      const { getByTestId } = renderPage();
      await act(async () => {
        fireEvent.press(getByTestId('plus-m1'));
      });
      await act(async () => {
        fireEvent.press(getByTestId('minus-m1'));
      });
      expect(mockUpdateMemberItems).toHaveBeenLastCalledWith(
        'tab-1',
        'user-1',
        [],
      );
    });

    it('calls updateMenuItems with the item removed when trash is pressed', async () => {
      const { getByTestId } = renderPage();
      await act(async () => {
        fireEvent.press(getByTestId('remove-m1'));
      });
      expect(mockUpdateMenuItems).toHaveBeenCalledWith('tab-1', [
        { name: 'Negroni', price: 9 },
      ]);
    });
  });

  describe('member avatars', () => {
    it('excludes the current user from the members list', () => {
      const { queryByTestId } = renderPage();
      expect(queryByTestId('member-user-1')).toBeNull();
    });

    it('shows no other members when the tab has only the current user', () => {
      const { getByTestId } = renderPage();
      expect(getByTestId('member-avatars').props.children).toHaveLength(0);
    });

    it('passes other members to MemberAvatars when there are multiple members', () => {
      mockTab = {
        ...TAB,
        members: [
          { tabId: 'tab-1', userId: 'user-1' },
          { tabId: 'tab-1', userId: 'user-2' },
        ],
      };
      const { getByTestId, queryByTestId } = renderPage();
      expect(getByTestId('member-user-2')).toBeTruthy();
      expect(queryByTestId('member-user-1')).toBeNull();
    });
  });

  describe('loading indicator', () => {
    it('shows spinner only on the tapped card while request is in flight', async () => {
      let resolve!: (v: boolean) => void;
      mockUpdateMemberItems.mockReturnValueOnce(
        new Promise<boolean>((r) => {
          resolve = r;
        }),
      );

      const { getByTestId, queryByTestId } = renderPage();

      act(() => {
        fireEvent.press(getByTestId('plus-m1'));
      });

      // m1 is loading, m2 is not
      await waitFor(() => expect(getByTestId('spinner-m1')).toBeTruthy());
      expect(queryByTestId('spinner-m2')).toBeNull();

      // resolve the request — spinner clears
      await act(async () => {
        resolve(true);
      });
      expect(queryByTestId('spinner-m1')).toBeNull();
    });

    it('shows spinner on the correct card when a different item is tapped', async () => {
      let resolve!: (v: boolean) => void;
      mockUpdateMemberItems.mockReturnValueOnce(
        new Promise<boolean>((r) => {
          resolve = r;
        }),
      );

      const { getByTestId, queryByTestId } = renderPage();

      act(() => {
        fireEvent.press(getByTestId('plus-m2'));
      });

      await waitFor(() => expect(getByTestId('spinner-m2')).toBeTruthy());
      expect(queryByTestId('spinner-m1')).toBeNull();

      await act(async () => {
        resolve(true);
      });
    });
  });
});
