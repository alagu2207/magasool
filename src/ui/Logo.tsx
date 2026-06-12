import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';

type Props = {
  /** 'light' = green text on light bg, 'dark' = white text on dark bg */
  tone?: 'light' | 'dark';
  showTagline?: boolean;
};

/**
 * Magasool wordmark: a circular green "banana tree" badge + the name.
 * Swap the badge for the brand artwork via <Image source={require('../../assets/logo.png')} />.
 */
export function Logo({ tone = 'light', showTagline = true }: Props) {
  const textColor = tone === 'dark' ? colors.white : colors.green;
  const taglineColor = tone === 'dark' ? 'rgba(255,255,255,0.7)' : colors.greenAccent;
  return (
    <View style={styles.row}>
      <View style={styles.mark}>
        <MaterialCommunityIcons name="palm-tree" size={20} color={colors.white} />
      </View>
      <View>
        <Text style={[styles.name, { color: textColor }]}>MAGASOOL</Text>
        {showTagline ? (
          <Text style={[styles.tagline, { color: taglineColor }]}>Green · Fresh · Candor</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  mark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: colors.star,
  },
  name: { fontSize: 19, fontWeight: '800', letterSpacing: 0.5 },
  tagline: { fontSize: 9.5, marginTop: 0, letterSpacing: 1, fontWeight: '700', textTransform: 'uppercase' },
});
