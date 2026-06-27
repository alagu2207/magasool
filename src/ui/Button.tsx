import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, glass } from '../theme';
import { sound } from './sound';
import { trackClick } from '../analytics/analytics';

type Variant = 'green' | 'yellow' | 'outline' | 'ghost' | 'glass';
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
  const isGlass = variant === 'glass';
  const bg =
    variant === 'green'
      ? colors.green
      : variant === 'yellow'
      ? colors.yellow
      : isGlass
      ? glass.fillStrong
      : 'transparent';
  const fg = isOutline
    ? colors.ink
    : isGhost
    ? colors.green
    : isGlass
    ? colors.ink
    : variant === 'yellow'
    ? colors.greenDark // dark text reads on the golden background
    : colors.white;

  const handlePress = () => {
    sound.click();
    trackClick(label, { component: 'button', variant });
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
          borderWidth: isOutline || isGlass ? 1 : 0,
          borderColor: isGlass ? glass.border : colors.border,
          opacity: pressed ? 0.85 : 1,
          alignSelf: full ? 'stretch' : 'flex-start',
          // web-only frosted-glass blur for the glass variant
          ...(isGlass
            ? ({
                backdropFilter: 'blur(14px) saturate(140%)',
                WebkitBackdropFilter: 'blur(14px) saturate(140%)',
              } as any)
            : null),
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
