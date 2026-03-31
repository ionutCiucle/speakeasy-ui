import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export function LocationSelector({ value, onChangeText }: Props) {
  return (
    <>
      <Text style={styles.label}>Venue / Location</Text>
      <View style={styles.inputWithIcon}>
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
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    lineHeight: 13,
    color: Color.WarmBrown,
    marginBottom: 6,
    marginTop: 16,
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
