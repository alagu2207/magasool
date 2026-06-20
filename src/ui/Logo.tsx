import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';

type Props = {
  /** 'light' = on a light background (header), 'dark' = on a dark background (footer) */
  tone?: 'light' | 'dark';
  /** Rendered height in px; width is derived from the artwork's aspect ratio. */
  height?: number;
  /** kept for API compatibility; the brand artwork already bakes in the tagline */
  showTagline?: boolean;
};

const DEFAULT_HEIGHT = 64;
const ASPECT = 1197 / 1094; // intrinsic ratio of assets/logo.png

/**
 * Magasool brand logo (banana-tree badge + wordmark + tagline) from assets/logo.png.
 * On dark backgrounds (footer) it sits on a white rounded chip so the green artwork stays legible.
 */
export function Logo({ tone = 'light', height = DEFAULT_HEIGHT }: Props) {
  const image = (
    <Image
      source={require('../../assets/logo.png')}
      style={{ height, width: height * ASPECT }}
      resizeMode="contain"
      accessibilityLabel="Magasool"
    />
  );

  if (tone === 'dark') {
    return <View style={styles.chip}>{image}</View>;
  }
  return image;
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
});
