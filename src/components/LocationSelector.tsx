import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';

interface Props {
  value: string;
  invalid?: boolean;
  error?: string;
  onChangeText: (text: string) => void;
}

export function LocationSelector({
  value,
  invalid,
  error,
  onChangeText,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Venue / Location</Text>
      <View
        style={[
          styles.inputWithIcon,
          isFocused && styles.inputWithIconFocused,
          invalid && styles.inputWithIconInvalid,
        ]}
      >
        <Feather
          name="map-pin"
          size={16}
          color={Color.Gold}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="The Rusty Anchor"
          placeholderTextColor={Color.Sand}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    marginBottom: 6,
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
  inputWithIconFocused: {
    borderWidth: 1.5,
    borderColor: Color.Gold,
  },
  inputWithIconInvalid: {
    borderColor: Color.Flame,
  },
  error: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Color.Flame,
    marginTop: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 17,
    color: Color.Espresso,
  },
});
