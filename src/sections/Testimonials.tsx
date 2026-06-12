import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useResponsive } from '../hooks/useResponsive';
import { TESTIMONIALS } from '../data';

function Stars() {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Ionicons key={i} name="star" size={14} color={colors.star} style={{ marginLeft: 1 }} />
      ))}
    </View>
  );
}

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.quoteMark}>“</Text>
      <Text style={styles.quote}>{t.quote}</Text>
      <View style={styles.person}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>{t.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{t.name}</Text>
          <Text style={styles.role}>{t.role}</Text>
        </View>
        <Stars />
      </View>
    </View>
  );
}

export function Testimonials() {
  const { isMobile } = useResponsive();
  const [page, setPage] = useState(0);

  return (
    <View style={styles.section}>
      <Container>
        <SectionHeading title="What Our Partners Say" />
        <View style={[styles.row, isMobile && styles.rowStack]}>
          {TESTIMONIALS.map((t) => (
            <View key={t.name} style={[styles.cell, isMobile && styles.cellStack]}>
              <Card t={t} />
            </View>
          ))}
        </View>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <Pressable key={i} onPress={() => setPage(i)}>
              <View style={[styles.dot, i === page && styles.dotActive]} />
            </Pressable>
          ))}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.white, paddingVertical: 64 },
  row: { flexDirection: 'row', marginTop: 40, marginHorizontal: -9 },
  rowStack: { flexDirection: 'column' },
  cell: { flex: 1, paddingHorizontal: 9 },
  cellStack: { paddingHorizontal: 0, marginBottom: 16 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
    height: '100%',
    ...shadow.soft,
  },
  quoteMark: { fontSize: 40, lineHeight: 36, color: colors.greenAccent, fontWeight: '800', marginBottom: 2 },
  quote: { fontSize: 13.5, lineHeight: 21, color: colors.body, marginBottom: 18 },
  person: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center', marginRight: 11,
  },
  avatarEmoji: { fontSize: 20 },
  name: { fontSize: 13.5, fontWeight: '800', color: colors.ink },
  role: { fontSize: 11.5, color: colors.muted, marginTop: 1 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 26, gap: 8 as unknown as number },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.greenAccent, width: 20 },
});
