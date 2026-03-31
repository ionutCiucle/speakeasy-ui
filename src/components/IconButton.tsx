import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Color } from '@/styles';

interface Props {
  name: React.ComponentProps<typeof Feather>['name'];
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  onPress: () => void;
}

export function IconButton({
  name,
  size = 28,
  color = Color.Gold,
  style,
  testID,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      testID={testID}
      style={style}
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      activeOpacity={0.7}
    >
      <Feather name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
