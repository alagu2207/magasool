import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, glass } from '../theme';
import { sound } from './sound';
import { trackClick } from '../analytics/analytics';

type Variant = 'green' | 'orange' | 'yellow' | 'outline' | 'ghost' | 'glass' | 'green-outline' | 'orange-outline';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  label: string;
  variant?: Variant;
  size?: Size;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  pill?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  full?: boolean;
};

const PAD: Record<Size, { py: number; px: number; fs: number }> = {
  sm: { py: 7, px: 14, fs: 13 },
  md: { py: 10, px: 18, fs: 14.5 },
  lg: { py: 13, px: 24, fs: 15.5 },
};

export function Button({
  label,
  variant = 'green',
  size = 'md',
  icon,
  iconPosition = 'right',
  pill = true,
  onPress,
  style,
  full,
}: Props) {
  const pad = PAD[size];
  const isOutline = variant === 'outline';
  const isGreenOutline = variant === 'green-outline';
  const isOrangeOutline = variant === 'orange-outline';
  const isGhost = variant === 'ghost';
  const isGlass = variant === 'glass';

  const bg =
    variant === 'green'
      ? colors.green
      : variant === 'orange'
      ? colors.orange
      : variant === 'yellow'
      ? colors.yellow
      : isGlass
      ? glass.fillStrong
      : 'transparent';

  const fg =
    isGreenOutline || isGhost
      ? colors.green
      : isOrangeOutline
      ? colors.orange
      : isOutline
      ? colors.ink
      : isGlass
      ? colors.ink
      : variant === 'yellow'
      ? colors.greenDark
      : colors.white;

  const borderColor =
    isGreenOutline
      ? colors.green
      : isOrangeOutline
      ? colors.orange
      : isGlass
      ? glass.border
      : colors.border;

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
          borderRadius: pill ? radius.pill : radius.sm,
          borderWidth: isOutline || isGreenOutline || isOrangeOutline || isGlass ? 1.5 : 0,
          borderColor,
          opacity: pressed ? 0.85 : 1,
          alignSelf: full ? 'stretch' : 'flex-start',
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
        {icon && iconPosition === 'left' ? (
          <Ionicons name={icon} size={pad.fs + 1} color={fg} style={styles.iconLeft} />
        ) : null}
        <Text style={[styles.label, { color: fg, fontSize: pad.fs }]}>{label}</Text>
        {icon && iconPosition === 'right' ? (
          <Ionicons name={icon} size={pad.fs + 1} color={fg} style={styles.iconRight} />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  label: { fontWeight: '700' },
  iconLeft: { marginRight: 7 },
  iconRight: { marginLeft: 7 },
});
