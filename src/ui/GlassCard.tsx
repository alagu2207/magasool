import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { glass, glassShadow, radius } from '../theme';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Higher opacity + blur — use for headers and modals where legibility matters. */
  strong?: boolean;
  /** Override the backdrop blur radius (px). */
  intensity?: number;
};

/**
 * Frosted-glass surface (GlassyUI style). Translucent fill + a `backdropFilter`
 * blur of whatever sits behind it + a hairline light border. The blur props are
 * web-only (this site renders via react-native-web), so they're cast through.
 */
export function GlassCard({ children, style, strong, intensity }: Props) {
  const blur = intensity ?? (strong ? glass.blurStrong : glass.blur);
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: strong ? glass.fillStrong : glass.fill,
          borderColor: strong ? glass.border : glass.borderSoft,
          // web-only: frost whatever is rendered behind the surface
          backdropFilter: `blur(${blur}px) saturate(140%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(140%)`,
        } as any,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    borderWidth: 1,
    ...glassShadow,
  },
});
