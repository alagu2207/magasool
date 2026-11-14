import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';

type Props = {
  /** 'light' = on a light background (header), 'dark' = on a dark background (footer) */
  tone?: 'light' | 'dark';
  /** Rendered height of emblem in px. */
  height?: number;
  showTagline?: boolean;
};

export function Logo({ tone = 'light', height = 44, showTagline = true }: Props) {
  const isDark = tone === 'dark';
  const textColor = isDark ? colors.white : colors.ink;
  const subColor = isDark ? 'rgba(255,255,255,0.75)' : colors.greenDeep;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo-mark.png')}
        style={{ width: height, height, marginRight: 10 }}
        resizeMode="contain"
        accessibilityLabel="Magasool logo emblem"
      />
      <View style={styles.textWrap}>
        <Text style={[styles.brandName, { color: textColor, fontSize: Math.round(height * 0.44) }]}>
          MAGASOOL
        </Text>
        {showTagline && (
          <Text style={[styles.tagline, { color: subColor, fontSize: Math.max(Math.round(height * 0.23), 10) }]}>
            Fresh Produce. Global Reach.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrap: {
    justifyContent: 'center',
  },
  brandName: {
    fontWeight: '900',
    letterSpacing: 1.2,
    lineHeight: 22,
  },
  tagline: {
    fontWeight: '600',
    letterSpacing: 0.2,
    marginTop: 1,
  },
});
