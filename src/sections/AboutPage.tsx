import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { Floating } from '../ui/Floating';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../nav/NavProvider';
import { CTABanner } from './CTABanner';
import { ABOUT, STEPS } from '../data';

/* ------------------------------ Illustration ----------------------------- */
/* Inline SVG (no assets/deps): a sprout cradled in a hand — growth & care. */

const SPROUT = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240" role="img" aria-label="A growing sprout held in a caring hand">
  <defs>
    <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5BC077"/><stop offset="1" stop-color="#1E7A3D"/>
    </linearGradient>
  </defs>
  <circle cx="120" cy="120" r="96" fill="rgba(255,255,255,0.12)"/>
  <circle cx="120" cy="120" r="72" fill="rgba(255,255,255,0.16)"/>
  <path d="M120 150 V96" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
  <path d="M120 120 C 96 122 82 104 85 84 C 110 86 121 104 120 124 Z" fill="#FFFFFF"/>
  <path d="M120 108 C 144 110 158 92 155 72 C 130 74 119 92 120 112 Z" fill="#D6F2DD"/>
  <circle cx="62" cy="74" r="9" fill="#F5B301"/>
  <path d="M62 60 V50 M62 98 V88 M48 74 H38 M86 74 H76 M52 64 L45 57 M72 64 L79 57 M52 84 L45 91 M72 84 L79 91" stroke="#F5B301" stroke-width="3" stroke-linecap="round"/>
  <path d="M60 168 C 60 156 78 150 96 152 C 112 154 128 154 144 152 C 162 150 180 156 180 168 C 180 184 156 196 120 196 C 84 196 60 184 60 168 Z" fill="url(#ag)"/>
  <path d="M72 170 C 96 182 144 182 168 170" fill="none" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="3" stroke-linecap="round"/>
</svg>`;
const SPROUT_URI = `data:image/svg+xml,${encodeURIComponent(SPROUT)}`;

/* --------------------------- Animated pulse ring -------------------------- */

function Pulse({ delay = 0 }: { delay?: number }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(v, { toValue: 1, duration: 2800, delay, easing: Easing.out(Easing.ease), useNativeDriver: false }),
    );
    loop.start();
    return () => loop.stop();
  }, [v, delay]);
  const scale = v.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1.3] });
  const opacity = v.interpolate({ inputRange: [0, 0.12, 1], outputRange: [0, 0.55, 0] });
  return <Animated.View style={[styles.pulse, { transform: [{ scale }], opacity }]} pointerEvents="none" />;
}

/* --------------------------------- Page ----------------------------------- */

export function AboutPage() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  const whyBasis = isMobile ? '100%' : isTablet ? '50%' : '25%';
  const stepBasis = isMobile ? '100%' : '33.333%';

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
          <View style={[styles.heroRow, isMobile && styles.heroRowStack]}>
            <View style={styles.heroText}>
              <Pressable onPress={() => navigate('home')} style={styles.back}>
                <Ionicons name="arrow-back" size={15} color={colors.white} />
                <Text style={styles.backText}>Back to Home</Text>
              </Pressable>
              <Text style={styles.heroEyebrow}>{ABOUT.eyebrow}</Text>
              <Text style={styles.heroTitle}>{ABOUT.tagline}</Text>
              <Text style={styles.heroSub}>
                Magasool is a trusted agricultural marketplace that connects farmers and buyers
                through transparent coordination and dedicated support.
              </Text>
            </View>

            <View style={styles.heroArt}>
              <Pulse delay={0} />
              <Pulse delay={1400} />
              <Floating amplitude={12} duration={2800}>
                <Image source={{ uri: SPROUT_URI }} style={styles.heroImg} resizeMode="contain" accessibilityLabel="Growing sprout held in a caring hand" />
              </Floating>
            </View>
          </View>
        </Container>
      </LinearGradient>

      <Container>
        {/* Intro / mission */}
        <Reveal>
          <View style={styles.introCard}>
            {ABOUT.paragraphs.map((p, i) => (
              <Text key={i} style={[styles.introText, i > 0 && { marginTop: 12 }]}>{p}</Text>
            ))}
          </View>
        </Reveal>

        {/* How we bring everyone together */}
        <Reveal>
          <Text style={styles.blockTitle}>How We Bring Everyone Together</Text>
        </Reveal>
        <View style={styles.grid}>
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 4) * 60} style={[styles.cell, { flexBasis: stepBasis as any }]}>
              <View style={styles.stepCard}>
                <View style={styles.stepHead}>
                  <View style={styles.stepIcon}>
                    <MaterialCommunityIcons name={s.icon} size={22} color={colors.green} />
                  </View>
                  <Text style={styles.stepNo}>{s.no}</Text>
                </View>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepDesc}>{s.desc}</Text>
              </View>
            </Reveal>
          ))}
        </View>

        {/* Why choose us */}
        <Reveal>
          <Text style={styles.blockTitle}>{ABOUT.whyTitle}</Text>
        </Reveal>
        <View style={styles.grid}>
          {ABOUT.why.map((w, i) => (
            <Reveal key={w.title} delay={Math.min(i, 4) * 60} style={[styles.cell, { flexBasis: whyBasis as any }]}>
              <View style={styles.whyCard}>
                <View style={styles.whyIcon}>
                  <Ionicons name={w.icon} size={26} color={colors.greenAccent} />
                </View>
                <Text style={styles.whyTitle}>{w.title}</Text>
                <Text style={styles.whyDesc}>{w.desc}</Text>
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
  heroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroRowStack: { flexDirection: 'column-reverse', alignItems: 'flex-start' },
  heroText: { flex: 1, paddingRight: 24 },
  back: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: radius.pill,
    paddingVertical: 7, paddingHorizontal: 14, marginBottom: 18, gap: 6 as unknown as number,
  },
  backText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  heroEyebrow: { color: 'rgba(255,255,255,0.82)', fontSize: 13, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  heroTitle: { color: colors.white, fontSize: 34, lineHeight: 42, fontWeight: '800', letterSpacing: -0.5, maxWidth: 560 },
  heroSub: { color: 'rgba(255,255,255,0.88)', fontSize: 15, lineHeight: 23, marginTop: 14, maxWidth: 520 },

  heroArt: { width: 240, height: 240, alignItems: 'center', justifyContent: 'center' },
  heroImg: { width: 220, height: 220 },
  pulse: {
    position: 'absolute', top: 20, left: 20, width: 200, height: 200, borderRadius: 100,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)',
  },

  /* intro */
  introCard: {
    backgroundColor: colors.greenTint, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    padding: 24, marginTop: -28, ...shadow.card,
  },
  introText: { color: colors.body, fontSize: 14.5, lineHeight: 24 },

  /* shared block */
  blockTitle: { fontSize: 22, fontWeight: '800', color: colors.ink, textAlign: 'center', marginTop: 52, marginBottom: 4, letterSpacing: -0.2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 24, marginHorizontal: -9 },
  cell: { paddingHorizontal: 9, marginBottom: 18 },

  /* step cards */
  stepCard: {
    backgroundColor: colors.white, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 24, paddingHorizontal: 22, height: '100%', ...shadow.soft,
  },
  stepHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  stepIcon: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  stepNo: { fontSize: 28, fontWeight: '800', color: colors.border },
  stepTitle: { fontSize: 16.5, fontWeight: '800', color: colors.ink, marginBottom: 8 },
  stepDesc: { fontSize: 13.5, lineHeight: 21, color: colors.body },

  /* why cards */
  whyCard: {
    backgroundColor: colors.white, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 28, paddingHorizontal: 20, alignItems: 'center', height: '100%', ...shadow.soft,
  },
  whyIcon: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  whyTitle: { fontSize: 15.5, fontWeight: '800', color: colors.ink, marginBottom: 9, textAlign: 'center' },
  whyDesc: { fontSize: 13, lineHeight: 20, color: colors.body, textAlign: 'center' },
});
