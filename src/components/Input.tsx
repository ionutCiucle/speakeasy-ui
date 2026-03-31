import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import { Color } from '@/styles';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  invalid?: boolean;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChangeText: (text: string) => void;
}

export function Input({
  label,
  placeholder,
  value,
  invalid,
  error,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, invalid && styles.inputInvalid]}
        placeholder={placeholder}
        placeholderTextColor={Color.Sand}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
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
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Color.Ivory,
    borderWidth: 1,
    borderColor: Color.Sand,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 17,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 18,
    color: Color.Espresso,
  },
  inputInvalid: {
    borderColor: Color.Flame,
  },
  error: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Color.Flame,
    marginTop: 4,
  },
});
