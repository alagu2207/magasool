import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../nav/NavProvider';
import { useFormModal } from '../forms/FormModalProvider';
import { trackEvent } from '../analytics/analytics';
import { CTABanner } from './CTABanner';
import { PRODUCTS, PRODUCTS_INTRO } from '../data';

export function ProductsPage() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  const { openForm } = useFormModal();
  const basis = isMobile ? '100%' : isTablet ? '50%' : '33.333%';

  const onEnquire = (name: string, minKg: number) => {
    trackEvent(
      'product_enquire',
      { content_type: 'product', content_name: name, item_name: name, min_kg: minKg },
      'Lead',
    );
    openForm('buyer');
  };

  return (
    <View style={styles.page}>
      {/* Hero */}
      <LinearGradient
        colors={[colors.greenStatsFrom, colors.greenStatsTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Container>
          <Pressable onPress={() => navigate('home')} style={styles.back}>
            <Ionicons name="arrow-back" size={15} color={colors.white} />
            <Text style={styles.backText}>Back to Home</Text>
          </Pressable>
          <Text style={styles.heroEyebrow}>{PRODUCTS_INTRO.eyebrow}</Text>
          <Text style={[styles.heroTitle, isMobile && { fontSize: 26, lineHeight: 33 }]}>{PRODUCTS_INTRO.title}</Text>
          <Text style={styles.heroSub}>{PRODUCTS_INTRO.subtitle}</Text>
        </Container>
      </LinearGradient>

      <Container>
        <View style={styles.grid}>
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={Math.min(i, 5) * 60} style={[styles.cell, { flexBasis: basis as any }]}>
              <View style={styles.card}>
                <View style={styles.imageWrap}>
                  <Image
                    source={p.image}
                    style={styles.image}
                    resizeMode="cover"
                    accessibilityLabel={`${p.name} — fresh farm produce`}
                  />
                  <View style={styles.minBadge}>
                    <Ionicons name="cube-outline" size={12} color={colors.greenDark} />
                    <Text style={styles.minBadgeText}>Min {p.minKg} kg</Text>
                  </View>
                </View>

                <View style={styles.body}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{p.name}</Text>
                    <Text style={styles.tamil}>{p.tamil}</Text>
                  </View>
                  <Text style={styles.desc}>{p.desc}</Text>

                  <View style={styles.footerRow}>
                    <View style={styles.orderInfo}>
                      <Text style={styles.orderLabel}>Minimum Order</Text>
                      <Text style={styles.orderValue}>{p.minKg} kg</Text>
                    </View>
                    <Pressable style={styles.enquire} onPress={() => onEnquire(p.name, p.minKg)}>
                      <Text style={styles.enquireText}>Enquire</Text>
                      <Ionicons name="arrow-forward" size={14} color={colors.white} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </Reveal>
          ))}
        </View>
      </Container>

      {/* CTA */}
      <Reveal>
        <CTABanner />
      </Reveal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, paddingBottom: 16 },

  /* hero */
  hero: { paddingTop: 48, paddingBottom: 56 },
  back: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: radius.pill,
    paddingVertical: 7, paddingHorizontal: 14, marginBottom: 18, gap: 6 as unknown as number,
  },
  backText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  heroEyebrow: { color: 'rgba(255,255,255,0.82)', fontSize: 13, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  heroTitle: { color: colors.white, fontSize: 34, lineHeight: 42, fontWeight: '800', letterSpacing: -0.5, maxWidth: 620 },
  heroSub: { color: 'rgba(255,255,255,0.88)', fontSize: 15, lineHeight: 23, marginTop: 14, maxWidth: 620 },

  /* grid */
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 36, marginHorizontal: -9 },
  cell: { paddingHorizontal: 9, marginBottom: 18 },

  /* card */
  card: {
    backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    overflow: 'hidden', height: '100%', ...shadow.card,
  },
  imageWrap: { width: '100%', height: 190, backgroundColor: colors.greenTint, position: 'relative' },
  image: { width: '100%', height: '100%' },
  minBadge: {
    position: 'absolute', top: 12, right: 12, flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.yellow, borderRadius: radius.pill, paddingVertical: 5, paddingHorizontal: 10,
    gap: 5 as unknown as number, ...shadow.soft,
  },
  minBadgeText: { color: colors.greenDark, fontSize: 12, fontWeight: '800' },

  body: { padding: 18, flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 },
  name: { fontSize: 17.5, fontWeight: '800', color: colors.ink },
  tamil: { fontSize: 13, color: colors.greenAccent, fontWeight: '700' },
  desc: { fontSize: 13.5, lineHeight: 21, color: colors.body, marginBottom: 16 },

  footerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 14, marginTop: 'auto',
  },
  orderInfo: {},
  orderLabel: { fontSize: 11, color: colors.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  orderValue: { fontSize: 16, color: colors.green, fontWeight: '800', marginTop: 2 },
  enquire: {
    flexDirection: 'row', alignItems: 'center', gap: 6 as unknown as number,
    backgroundColor: colors.green, borderRadius: radius.sm, paddingVertical: 9, paddingHorizontal: 16,
  },
  enquireText: { color: colors.white, fontSize: 13.5, fontWeight: '700' },
});
