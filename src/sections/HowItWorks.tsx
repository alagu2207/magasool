import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useResponsive } from '../hooks/useResponsive';
import { STEPS } from '../data';

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.numCircle}>
          <Text style={styles.num}>{step.no}</Text>
        </View>
        <MaterialCommunityIcons name={step.icon} size={30} color={colors.greenAccent} />
      </View>
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.desc}>{step.desc}</Text>
    </View>
  );
}

export function HowItWorks() {
  const { isMobile } = useResponsive();
  return (
    <View style={styles.section}>
      <Container>
        <SectionHeading eyebrow="How It Works" title="Simple Steps, Stronger Connections" />
        <View style={[styles.row, isMobile && styles.rowStack]}>
          {STEPS.map((step, i) => (
            <React.Fragment key={step.no}>
              <View style={styles.cardWrap}>
                <StepCard step={step} />
              </View>
              {!isMobile && i < STEPS.length - 1 && (
                <Ionicons name="arrow-forward" size={18} color={colors.faint} style={styles.connector} />
              )}
            </React.Fragment>
          ))}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.white, paddingVertical: 64 },
  row: { flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', marginTop: 40 },
  rowStack: { flexDirection: 'column' },
  cardWrap: { flex: 1, maxWidth: 340 },
  connector: { alignSelf: 'center', marginHorizontal: 6 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 18,
    ...shadow.soft,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 14 as unknown as number },
  numCircle: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  num: { color: colors.greenDeep, fontWeight: '800', fontSize: 15 },
  title: { fontSize: 17, fontWeight: '800', color: colors.greenAccent, marginBottom: 10 },
  desc: { fontSize: 13.5, lineHeight: 21, color: colors.body, textAlign: 'center' },
});
