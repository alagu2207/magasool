import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { sound } from './sound';

type Variant = 'green' | 'yellow' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  label: string;
  variant?: Variant;
  size?: Size;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  full?: boolean;
};

const PAD: Record<Size, { py: number; px: number; fs: number }> = {
  sm: { py: 9, px: 16, fs: 14 },
  md: { py: 12, px: 20, fs: 15 },
  lg: { py: 15, px: 26, fs: 16 },
};

export function Button({ label, variant = 'green', size = 'md', icon, onPress, style, full }: Props) {
  const pad = PAD[size];
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const bg =
    variant === 'green' ? colors.green : variant === 'yellow' ? colors.yellow : 'transparent';
  const fg = isOutline
    ? colors.ink
    : isGhost
    ? colors.green
    : variant === 'yellow'
    ? colors.greenDark // dark text reads on the golden background
    : colors.white;

  const handlePress = () => {
    sound.click();
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: bg,
          paddingVertical: pad.py,
          paddingHorizontal: pad.px,
          borderWidth: isOutline ? 1 : 0,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
          alignSelf: full ? 'stretch' : 'flex-start',
        },
        style,
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.label, { color: fg, fontSize: pad.fs }]}>{label}</Text>
        {icon ? <Ionicons name={icon} size={pad.fs + 2} color={fg} style={styles.icon} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  label: { fontWeight: '700' },
  icon: { marginLeft: 8 },
});
