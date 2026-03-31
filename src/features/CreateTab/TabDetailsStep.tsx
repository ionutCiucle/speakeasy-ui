import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';
import { CurrencySelector, Input, LocationSelector } from '@/components';
import { useOutletContext } from 'react-router-native';
import { useLayoutActions } from '@/state-management/layout';
import { ModalId } from '@/state-management/layout/enums';
import { useCreateTabActions } from '@/state-management/createTab';
import { useAppSelector } from '@/state-management/providerHooks';
import { useTabDetailsValidation } from './hooks/useTabDetailsValidation';

interface WizardOutletContext {
  onValidate: (fn: (() => boolean) | null) => void;
}

export function TabDetailsStep() {
  const { showModal } = useLayoutActions();
  const { setTabName, setVenue, setNotes } = useCreateTabActions();
  const tabName = useAppSelector((state) => state.createTab.tabName);
  const venue = useAppSelector((state) => state.createTab.venue);
  const notes = useAppSelector((state) => state.createTab.notes);
  const currency = useAppSelector((state) => state.createTab.currency);

  const handleTabNameChange = useCallback(
    (text: string) => {
      setTabName(text);
    },
    [setTabName],
  );

  const handleVenueChange = useCallback(
    (text: string) => {
      setVenue(text);
    },
    [setVenue],
  );

  const handleNotesChange = useCallback(
    (text: string) => {
      setNotes(text);
    },
    [setNotes],
  );

  const { onValidate } = useOutletContext<WizardOutletContext>();
  const { errors, validateAll } = useTabDetailsValidation({ tabName, venue });

  useEffect(() => {
    onValidate(validateAll);
    return () => onValidate(null);
  }, [onValidate, validateAll]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.sectionHeader}>TAB DETAILS</Text>

          {/* Tab Name */}
          <Input
            label="Tab Name"
            placeholder="Friday Night Out"
            value={tabName}
            size="small"
            invalid={!!errors.tabName}
            error={errors.tabName}
            onChangeText={handleTabNameChange}
          />

          {/* Venue / Location */}
          <LocationSelector
            value={venue}
            invalid={!!errors.venue}
            error={errors.venue}
            onChangeText={handleVenueChange}
          />

          {/* Currency */}
          <CurrencySelector
            currencyCode={currency.code}
            currencyName={currency.name}
            onPress={() => showModal(ModalId.CurrencyPicker)}
          />

          {/* Notes */}
          <Input
            label="Notes (optional)"
            placeholder={
              'e.g. Jamie\u2019s birthday dinner \u2014 extra napkins please'
            }
            value={notes}
            size="small"
            onChangeText={handleNotesChange}
            multiline
            numberOfLines={3}
          />

          {/* Info box */}
          <View style={styles.infoBox}>
            <Feather
              name="info"
              size={16}
              color={Color.WarmBrown}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              Tab opens at the time you tap &ldquo;Start Tab&rdquo;.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  form: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: Color.WarmBrown,
    marginBottom: 12,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Linen,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 16,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
    flex: 1,
  },
});
