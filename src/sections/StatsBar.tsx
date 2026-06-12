import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container } from '../ui/Container';
import { useResponsive } from '../hooks/useResponsive';
import { STATS } from '../data';

export function StatsBar() {
  const { isMobile } = useResponsive();
  return (
    <View style={styles.section}>
      <Container>
        <LinearGradient
          colors={[colors.greenStatsFrom, colors.greenStatsTo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bar, isMobile && styles.barStack]}
        >
          {STATS.map((s, i) => (
            <View
              key={s.label}
              style={[
                styles.item,
                isMobile && styles.itemMobile,
                !isMobile && i < STATS.length - 1 && styles.itemBorder,
              ]}
            >
              <Ionicons name={s.icon} size={26} color={colors.white} style={{ marginBottom: 8 }} />
              <Text style={styles.value}>{s.value}</Text>
              <Text style={styles.label}>{s.label}</Text>
            </View>
          ))}
        </LinearGradient>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.white, paddingVertical: 28 },
  bar: {
    flexDirection: 'row',
    borderRadius: radius.md,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  barStack: { flexWrap: 'wrap' },
  item: { flex: 1, alignItems: 'center', paddingHorizontal: 8 },
  itemMobile: { flexBasis: '50%', flex: 0, marginBottom: 18 },
  itemBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.18)' },
  value: { color: colors.white, fontSize: 24, fontWeight: '800' },
  label: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 4 },
});
