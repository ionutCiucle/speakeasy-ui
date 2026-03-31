import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '@/styles';

interface Props {
  children: React.ReactNode;
  bracketSize?: number;
  onBack?: () => void;
}

export function BracketContainer({
  children,
  bracketSize = 35,
  onBack,
}: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const margin = 20;
  const thickness = 1.5;
  const topOffset = top + margin;
  const bottomOffset = bottom + margin;

  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity
          style={[styles.backButton, { top: topOffset - 2, left: margin - 4 }]}
          onPress={onBack}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="chevron-left" size={28} color={Color.Gold} />
        </TouchableOpacity>
      ) : (
        <>
          <View
            style={[
              styles.bracketH,
              {
                top: topOffset,
                left: margin,
                width: bracketSize,
                height: thickness,
              },
            ]}
          />
          <View
            style={[
              styles.bracketV,
              {
                top: topOffset,
                left: margin,
                width: thickness,
                height: bracketSize,
              },
            ]}
          />
        </>
      )}

      <View
        style={[
          styles.bracketH,
          {
            top: topOffset,
            right: margin,
            width: bracketSize,
            height: thickness,
          },
        ]}
      />
      <View
        style={[
          styles.bracketV,
          {
            top: topOffset,
            right: margin,
            width: thickness,
            height: bracketSize,
          },
        ]}
      />
      <View
        style={[
          styles.bracketH,
          {
            bottom: bottomOffset,
            left: margin,
            width: bracketSize,
            height: thickness,
          },
        ]}
      />
      <View
        style={[
          styles.bracketV,
          {
            bottom: bottomOffset,
            left: margin,
            width: thickness,
            height: bracketSize,
          },
        ]}
      />
      <View
        style={[
          styles.bracketH,
          {
            bottom: bottomOffset,
            right: margin,
            width: bracketSize,
            height: thickness,
          },
        ]}
      />
      <View
        style={[
          styles.bracketV,
          {
            bottom: bottomOffset,
            right: margin,
            width: thickness,
            height: bracketSize,
          },
        ]}
      />

      <View
        style={{ flex: 1, paddingTop: topOffset, paddingBottom: bottomOffset }}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
  },
  bracketH: {
    position: 'absolute',
    backgroundColor: Color.Gold,
  },
  bracketV: {
    position: 'absolute',
    backgroundColor: Color.Gold,
  },
});
