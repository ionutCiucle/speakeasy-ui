import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigate, useParams, useLocation } from 'react-router-native';
import { Color } from '@/styles';
import { MainNav, PageHeader } from '@/components';
import type { MainNavTab } from '@/components';

const TAB_ROUTES: Record<MainNavTab, string> = {
  home: '/home',
  newTab: '/create-tab',
  friends: '/friends',
  profile: '/profile',
};

export function ConfirmPaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const photos: string[] =
    (location.state as { photos?: string[] } | null)?.photos ?? [];

  const handleRetake = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleAddPhoto = useCallback(() => {
    navigate(`/tab/${id}/photograph-receipt`, { state: { photos } });
  }, [navigate, id, photos]);

  const handleConfirmPaid = useCallback(() => {
    navigate(`/tab/${id}`);
  }, [navigate, id]);

  const handleTabPress = useCallback(
    (tab: MainNavTab) => {
      navigate(TAB_ROUTES[tab]);
    },
    [navigate],
  );

  return (
    <View style={styles.screen}>
      <PageHeader title="Confirm Payment" onBack={handleRetake} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.photoCard}>
          {photos.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailList}
            >
              {photos.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.receiptIcon} />
          )}
        </View>
        <Text style={styles.photoLabel}>
          Receipt · {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
        </Text>

        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={handleAddPhoto}
          activeOpacity={0.7}
        >
          <Text style={styles.addPhotoText}>+ Add another photo</Text>
        </TouchableOpacity>

        <View style={styles.sandDivider} />

        <Text style={styles.sectionLabel}>RECEIPT TOTALS</Text>

        <View style={styles.receiptTotalCard}>
          <View>
            <Text style={styles.cardHeaderLabel}>RECEIPT TOTAL</Text>
            <Text style={styles.cardAmount}>€ 87.50</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.cardHeaderLabel}>TIP</Text>
          <Text style={styles.cardAmount}>€ 12.50</Text>
        </View>

        <View style={styles.sandDivider} />

        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Items total</Text>
          <Text style={styles.breakdownValue}>€ 87.50</Text>
        </View>
        <View style={[styles.breakdownRow, styles.breakdownRowSpacing]}>
          <Text style={styles.breakdownLabel}>Tip</Text>
          <Text style={styles.breakdownValue}>€ 12.50</Text>
        </View>
        <View style={[styles.breakdownRow, styles.breakdownRowSpacing]}>
          <Text style={styles.grandTotalLabel}>Grand Total</Text>
          <Text style={styles.grandTotalValue}>€ 100.00</Text>
        </View>

        <View style={styles.goldDivider} />

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmPaid}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmButtonText}>Confirm I Paid</Text>
        </TouchableOpacity>
      </ScrollView>

      <MainNav activeTab="home" onTabPress={handleTabPress} />
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
  photoCard: {
    backgroundColor: Color.Linen,
    borderRadius: 6,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptIcon: {
    width: 48,
    height: 66,
    borderWidth: 1.5,
    borderColor: Color.WarmBrown,
  },
  thumbnailList: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 146,
    borderRadius: 4,
  },
  photoLabel: {
    marginTop: 10,
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    textAlign: 'center',
  },
  addPhotoButton: {
    marginTop: 10,
    height: 40,
    borderWidth: 1.5,
    borderColor: Color.Gold,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.3,
    color: Color.Gold,
  },
  sandDivider: {
    height: 1,
    backgroundColor: Color.Sand,
    marginVertical: 16,
  },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 2,
    color: Color.WarmBrown,
    marginBottom: 14,
  },
  receiptTotalCard: {
    backgroundColor: Color.Ivory,
    borderWidth: 1.5,
    borderColor: Color.Gold,
    borderRadius: 6,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tipCard: {
    marginTop: 10,
    backgroundColor: Color.Ivory,
    borderWidth: 1.5,
    borderColor: Color.Sand,
    borderRadius: 6,
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  cardHeaderLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.5,
    color: Color.WarmBrown,
  },
  cardAmount: {
    marginTop: 2,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 20,
    lineHeight: 24,
    color: Color.Espresso,
  },
  editText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    lineHeight: 16,
    color: Color.Gold,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownRowSpacing: {
    marginTop: 10,
  },
  breakdownLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
  },
  breakdownValue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Color.WarmBrown,
  },
  grandTotalLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    lineHeight: 18,
    color: Color.Espresso,
  },
  grandTotalValue: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    lineHeight: 18,
    color: Color.Gold,
  },
  goldDivider: {
    height: 1,
    backgroundColor: Color.Gold,
    marginVertical: 16,
  },
  confirmButton: {
    backgroundColor: Color.EspressoDark,
    borderRadius: 8,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.3,
    color: Color.White,
  },
});
