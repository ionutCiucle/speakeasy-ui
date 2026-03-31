import React, { useCallback } from 'react';
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
import {
  Button,
  CurrencySelector,
  Input,
  LocationSelector,
  Wizard,
} from '@/components';
import { useNavigate } from 'react-router-native';
import { useLayoutActions } from '@/state-management/layout';
import { ModalId } from '@/state-management/layout/enums';
import { useCreateTabActions } from '@/state-management/createTab';
import { useAppSelector } from '@/state-management/providerHooks';
import { useTabDetailsValidation } from './hooks/useTabDetailsValidation';

const TOTAL_STEPS = 4;
const CURRENT_STEP = 1;

export function TabDetailsStep() {
  const navigate = useNavigate();
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

  const { errors, validateAll } = useTabDetailsValidation({ tabName, venue });

  const handleContinue = useCallback(() => {
    if (validateAll()) {
      navigate('/create-tab/add-members');
    }
  }, [validateAll, navigate]);

  return (
    <View style={styles.screen}>
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
          <Wizard
            totalSteps={TOTAL_STEPS}
            currentStep={CURRENT_STEP}
            stepName="Tab Details"
          />

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

            {/* Continue button */}
            <Button
              label="Continue"
              variant="tertiary"
              rightIcon="chevron-right"
              style={styles.continueWrapper}
              onPress={handleContinue}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
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
  continueWrapper: {
    marginTop: 32,
  },
});
