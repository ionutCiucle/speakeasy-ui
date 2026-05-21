import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from 'react-native';
import { useNavigate, useParams, useLocation } from 'react-router-native';
import { Color } from '@/styles';
import { Avatar, MainNav, PageHeader } from '@/components';
import type { MainNavTab } from '@/components';
import { useTabDetails } from '@/state-management/tabs';
import { useAppSelector } from '@/state-management/providerHooks';

const DARK_FOREST = '#141F14';
const PAYER_SUBTITLE_GREEN = '#8CD18C';

const TAB_ROUTES: Record<MainNavTab, string> = {
  home: '/home',
  newTab: '/create-tab',
  friends: '/friends',
  profile: '/profile',
};

function formatClosedDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso));
}

type SettlementStatus = 'payer' | 'pending' | 'settled';

interface MemberRow {
  userId: string;
  initials: string;
  isPayer: boolean;
  status: SettlementStatus;
  subtitle: string;
}

export function TabClosedSummaryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useTabDetails(id ?? '');
  const userId = useAppSelector((state) => state.auth.userId);
  const { width: windowWidth } = useWindowDimensions();

  const photos: string[] =
    (location.state as { photos?: string[] } | null)?.photos ?? [];

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [localClosedAt] = useState(() => new Date());
  const carouselWidth = windowWidth - 63;

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const w = e.nativeEvent.layoutMeasurement.width;
      if (w > 0) {
        setActivePhotoIndex(Math.round(e.nativeEvent.contentOffset.x / w));
      }
    },
    [],
  );

  const handleTabPress = useCallback(
    (navTab: MainNavTab) => {
      navigate(TAB_ROUTES[navTab]);
    },
    [navigate],
  );

  if (!tab) {
    return <View style={styles.screen} />;
  }

  const payerUserId = tab.settlements[0]?.payerId ?? userId;
  const payerIsCurrentUser = payerUserId === userId;
  const closedDate = formatClosedDate(
    tab.closedAt ?? localClosedAt.toISOString(),
  );
  const payerDisplay = payerIsCurrentUser
    ? 'you'
    : payerUserId.slice(0, 2).toUpperCase();

  const memberRows: MemberRow[] = tab.members.map((m) => {
    const initials = m.userId.slice(0, 2).toUpperCase();
    const isPayer = m.userId === payerUserId;

    if (isPayer) {
      return {
        userId: m.userId,
        initials,
        isPayer: true,
        status: 'payer',
        subtitle: 'Paid the bill',
      };
    }

    const settlement = tab.settlements.find((s) => s.payeeId === m.userId);
    const amountDisplay = settlement
      ? `€ ${parseFloat(settlement.amount).toFixed(2)}`
      : null;

    return {
      userId: m.userId,
      initials,
      isPayer: false,
      status: settlement ? 'settled' : 'pending',
      subtitle: amountDisplay ? `Owes ${amountDisplay}` : 'Owes',
    };
  });

  const sortedRows = [
    ...memberRows.filter((r) => r.isPayer),
    ...memberRows.filter((r) => !r.isPayer),
  ];

  return (
    <View style={styles.screen}>
      <PageHeader title={tab.title} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.closedBanner}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <View>
            <Text style={styles.closedTitle}>Tab closed — {closedDate}</Text>
            <Text style={styles.closedSubtitle}>Paid by {payerDisplay}</Text>
          </View>
        </View>

        <View style={styles.carouselCard}>
          {photos.length > 0 ? (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {photos.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={[styles.carouselImage, { width: carouselWidth }]}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.receiptIcon} />
          )}

          {photos.length > 1 && (
            <View style={styles.dotsRow} pointerEvents="none">
              {photos.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === activePhotoIndex && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <Text style={styles.receiptLabel}>
          Receipt · {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
        </Text>

        <Text style={styles.sectionLabel}>SETTLEMENT</Text>

        <View style={styles.settlementList}>
          {sortedRows.map((row) => (
            <SettlementCard
              key={row.userId}
              initials={row.initials}
              displayName={
                row.isPayer && payerIsCurrentUser ? 'You' : row.initials
              }
              isPayer={row.isPayer}
              status={row.status}
              subtitle={row.subtitle}
            />
          ))}
        </View>

        <Text style={styles.notificationNote}>
          Notifications sent to all members
        </Text>

        <TouchableOpacity style={styles.repeatButton} activeOpacity={0.7}>
          <Text style={styles.repeatButtonText}>Repeat this Tab</Text>
        </TouchableOpacity>
      </ScrollView>

      <MainNav activeTab="home" onTabPress={handleTabPress} />
    </View>
  );
}

interface SettlementCardProps {
  initials: string;
  displayName: string;
  isPayer: boolean;
  status: SettlementStatus;
  subtitle: string;
}

function SettlementCard({
  initials,
  displayName,
  isPayer,
  status,
  subtitle,
}: SettlementCardProps) {
  return (
    <View style={styles.settlementCard}>
      <Avatar
        label={initials}
        variant={isPayer ? 'self' : 'member'}
        size={36}
      />
      <View style={styles.settlementInfo}>
        <Text style={styles.settlementName}>{displayName}</Text>
        <Text style={styles.settlementSubtitle}>{subtitle}</Text>
      </View>
      <StatusBadge status={status} />
    </View>
  );
}

function StatusBadge({ status }: { status: SettlementStatus }) {
  if (status === 'payer') {
    return (
      <View style={styles.badgePayer}>
        <Text style={styles.badgePayerText}>Payer</Text>
      </View>
    );
  }
  if (status === 'settled') {
    return (
      <View style={styles.badgeSettled}>
        <Text style={styles.badgeSettledText}>✓ Settled</Text>
      </View>
    );
  }
  return (
    <View style={styles.badgePending}>
      <Text style={styles.badgePendingText}>Pending</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 31.5,
    paddingTop: 16,
    paddingBottom: 32,
  },
  closedBanner: {
    backgroundColor: DARK_FOREST,
    borderRadius: 6,
    paddingHorizontal: 16,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Color.ActiveGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.White,
  },
  closedTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: Color.White,
  },
  closedSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: PAYER_SUBTITLE_GREEN,
  },
  carouselCard: {
    marginTop: 14,
    backgroundColor: Color.Linen,
    borderRadius: 6,
    height: 120,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptIcon: {
    width: 48,
    height: 66,
    borderWidth: 1.5,
    borderColor: Color.WarmBrown,
  },
  carouselImage: {
    height: 120,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    gap: 6,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Color.Sand,
  },
  dotActive: {
    backgroundColor: Color.Gold,
  },
  receiptLabel: {
    marginTop: 8,
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    textAlign: 'center',
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 14,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 2,
    color: Color.WarmBrown,
  },
  settlementList: {
    gap: 8,
  },
  settlementCard: {
    backgroundColor: Color.White,
    borderRadius: 6,
    height: 64,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settlementInfo: {
    flex: 1,
  },
  settlementName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Espresso,
  },
  settlementSubtitle: {
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
  },
  badgePayer: {
    backgroundColor: Color.Linen,
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePayerText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    lineHeight: 13,
    color: Color.Gold,
  },
  badgePending: {
    backgroundColor: Color.Gold,
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePendingText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    lineHeight: 13,
    color: Color.White,
  },
  badgeSettled: {
    backgroundColor: DARK_FOREST,
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeSettledText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    lineHeight: 13,
    color: Color.ActiveGreen,
  },
  notificationNote: {
    marginTop: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
  },
  repeatButton: {
    marginTop: 12,
    height: 48,
    borderWidth: 1.5,
    borderColor: Color.WarmBrown,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.3,
    color: Color.WarmBrown,
  },
});
