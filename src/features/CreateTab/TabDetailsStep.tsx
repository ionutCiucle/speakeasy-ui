import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
  LocationSelector,
  Wizard,
} from '@/components';
import { useLayoutActions } from '@/state-management/layout';
import { ModalId } from '@/state-management/layout/enums';

const TOTAL_STEPS = 4;
const CURRENT_STEP = 1;

interface Props {
  onContinue: () => void;
}

export function TabDetailsStep({ onContinue }: Props) {
  const { showModal } = useLayoutActions();
  const [tabName, setTabName] = useState('');
  const [venue, setVenue] = useState('');
  const [notes, setNotes] = useState('');

  const handleTabNameChange = useCallback((text: string) => {
    setTabName(text);
  }, []);

  const handleVenueChange = useCallback((text: string) => {
    setVenue(text);
  }, []);

  const handleNotesChange = useCallback((text: string) => {
    setNotes(text);
  }, []);

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
            <Text style={styles.fieldLabel}>Tab Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Friday Night Out"
              placeholderTextColor={Color.Sand}
              value={tabName}
              onChangeText={handleTabNameChange}
            />

            {/* Venue / Location */}
            <LocationSelector value={venue} onChangeText={handleVenueChange} />

            {/* Currency */}
            <CurrencySelector
              currencyCode="USD"
              currencyName="US Dollar"
              onPress={() => showModal(ModalId.CurrencyPicker)}
            />

            {/* Notes */}
            <Text style={[styles.fieldLabel, styles.fieldLabelSpaced]}>
              Notes (optional)
            </Text>
            <TextInput
              style={styles.notesInput}
              placeholder={
                'e.g. Jamie\u2019s birthday dinner \u2014 extra napkins please'
              }
              placeholderTextColor={Color.WarmBrown}
              value={notes}
              onChangeText={handleNotesChange}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
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
              onPress={onContinue}
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
  fieldLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    marginBottom: 6,
  },
  fieldLabelSpaced: {
    marginTop: 16,
  },
  input: {
    backgroundColor: Color.Ivory,
    borderWidth: 1,
    borderColor: Color.Sand,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 17,
    color: Color.Espresso,
  },
  notesInput: {
    backgroundColor: Color.Ivory,
    borderWidth: 1,
    borderColor: Color.Sand,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    height: 80,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 20,
    color: Color.Espresso,
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
