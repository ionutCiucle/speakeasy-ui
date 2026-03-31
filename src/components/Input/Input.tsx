import React, { useCallback, useState } from 'react';
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
  size?: 'default' | 'small';
  invalid?: boolean;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChangeText: (text: string) => void;
}

export function Input({
  label,
  placeholder,
  value,
  size = 'default',
  invalid,
  error,
  multiline,
  numberOfLines,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  onChangeText,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          size === 'small' && styles.inputSmall,
          multiline && styles.inputMultiline,
          isFocused && styles.inputFocused,
          invalid && styles.inputInvalid,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Color.Sand}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : undefined}
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
  inputSmall: {
    height: 44,
    paddingHorizontal: 14,
    paddingVertical: 0,
    borderRadius: 8,
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Inter_500Medium',
  },
  inputFocused: {
    borderWidth: 1.5,
    borderColor: Color.Gold,
  },
  inputMultiline: {
    height: 80,
    paddingTop: 14,
    paddingBottom: 14,
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
