import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

type Props = {
  eyebrow?: string;
  title: string;
  align?: 'center' | 'left';
};

/** Eyebrow label + bold title + short accent underline (matches the reference). */
export function SectionHeading({ eyebrow, title, align = 'center' }: Props) {
  return (
    <View style={[styles.wrap, align === 'center' && styles.center]}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={[styles.title, align === 'center' && styles.titleCenter]}>{title}</Text>
      <View style={[styles.underline, align === 'left' && { alignSelf: 'flex-start' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  center: { alignItems: 'center' },
  eyebrow: {
    color: colors.greenAccent,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  titleCenter: { textAlign: 'center' },
  underline: {
    marginTop: 12,
    width: 56,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.greenAccent,
  },
});
