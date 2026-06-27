import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container } from '../ui/Container';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';
import { useResponsive } from '../hooks/useResponsive';
import { WHY } from '../data';

export function WhyChoose() {
  const { isMobile, isTablet } = useResponsive();
  const basis = isMobile ? '100%' : isTablet ? '50%' : '25%';

  return (
    <View style={styles.section}>
      <Container>
        <SectionHeading title="Why Choose Magasool?" />
        <View style={styles.grid}>
          {WHY.map((w) => (
            <View key={w.title} style={[styles.cell, { flexBasis: basis as any }]}>
              <GlassCard style={styles.card}>
                <View style={styles.iconWrap}>
                  <Ionicons name={w.icon} size={26} color={colors.greenAccent} />
                </View>
                <Text style={styles.title}>{w.title}</Text>
                <Text style={styles.desc}>{w.desc}</Text>
              </GlassCard>
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.greenTint, paddingVertical: 64 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 40, marginHorizontal: -9 },
  cell: { paddingHorizontal: 9, marginBottom: 18 },
  card: {
    borderRadius: radius.md,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    height: '100%',
  },
  iconWrap: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.65)',
    borderWidth: 1, borderColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  title: { fontSize: 15.5, fontWeight: '800', color: colors.ink, marginBottom: 9, textAlign: 'center' },
  desc: { fontSize: 13, lineHeight: 20, color: colors.body, textAlign: 'center' },
});
