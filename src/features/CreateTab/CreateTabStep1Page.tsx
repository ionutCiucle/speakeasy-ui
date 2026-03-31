import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';

const TOTAL_STEPS = 4;
const CURRENT_STEP = 1;

export function CreateTabStep1Page() {
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

  const handleContinue = useCallback(() => {
    // TODO: navigate to step 2
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
          {/* Progress bar */}
          <View style={styles.progressBar}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressSegment,
                  i < CURRENT_STEP
                    ? styles.progressSegmentActive
                    : styles.progressSegmentInactive,
                ]}
              />
            ))}
          </View>

          <Text style={styles.stepLabel}>
            Step {CURRENT_STEP} of {TOTAL_STEPS} · Tab Details
          </Text>

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
            <Text style={[styles.fieldLabel, styles.fieldLabelSpaced]}>
              Venue / Location
            </Text>
            <View style={styles.inputWithIcon}>
              <Feather
                name="map-pin"
                size={16}
                color={Color.Gold}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.inputIconText}
                placeholder="The Rusty Anchor"
                placeholderTextColor={Color.Sand}
                value={venue}
                onChangeText={handleVenueChange}
              />
            </View>

            {/* Currency */}
            <Text style={[styles.fieldLabel, styles.fieldLabelSpaced]}>
              Currency
            </Text>
            <TouchableOpacity
              style={styles.currencySelector}
              activeOpacity={0.7}
            >
              <Text style={styles.currencyCode}>USD</Text>
              <Text style={styles.currencyName}>US Dollar</Text>
              <Feather
                name="chevron-down"
                size={16}
                color={Color.Gold}
                style={styles.currencyChevron}
              />
            </TouchableOpacity>
            <Text style={styles.currencyHint}>
              Members see all totals in this currency. You can change it up to
              the first order.
            </Text>

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
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.continueLabel}>Continue</Text>
              <Feather
                name="chevron-right"
                size={16}
                color={Color.Gold}
                style={styles.continueChevron}
              />
            </TouchableOpacity>
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
  progressBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 10,
    marginBottom: 8,
  },
  progressSegment: {
    flex: 1,
    height: 5,
    borderRadius: 2.5,
  },
  progressSegmentActive: {
    backgroundColor: Color.Gold,
  },
  progressSegmentInactive: {
    backgroundColor: Color.Sand,
  },
  stepLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    paddingHorizontal: 20,
    marginBottom: 16,
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
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Ivory,
    borderWidth: 1,
    borderColor: Color.Sand,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputIconText: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 17,
    color: Color.Espresso,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.Ivory,
    borderWidth: 1.5,
    borderColor: Color.Gold,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 44,
  },
  currencyCode: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 17,
    color: Color.Espresso,
    marginRight: 8,
  },
  currencyName: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 15,
    color: Color.WarmBrown,
    flex: 1,
  },
  currencyChevron: {
    marginLeft: 8,
  },
  currencyHint: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    lineHeight: 17,
    color: Color.WarmBrown,
    marginTop: 6,
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
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.EspressoDark,
    borderRadius: 10,
    height: 52,
    marginTop: 32,
  },
  continueLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 19,
    color: Color.White,
  },
  continueChevron: {
    marginLeft: 8,
  },
});
