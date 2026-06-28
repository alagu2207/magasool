import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Pressable, Linking, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { Floating } from '../ui/Floating';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../nav/NavProvider';
import { PRIVACY } from '../data';

/* ----------------------------- Illustrations ----------------------------- */
/* Inline SVG (no assets/deps) themed to privacy & data protection. */

const SHIELD = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240" role="img" aria-label="Privacy shield">
  <defs>
    <linearGradient id="shg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5BC077"/><stop offset="1" stop-color="#1E7A3D"/>
    </linearGradient>
  </defs>
  <path d="M120 26 L196 56 V120 C196 168 162 201 120 216 C78 201 44 168 44 120 V56 Z" fill="url(#shg)"/>
  <path d="M120 44 L180 68 V120 C180 158 154 185 120 198 C86 185 60 158 60 120 V68 Z" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="3"/>
  <path d="M104 118 V106 a16 16 0 0 1 32 0 V118" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/>
  <rect x="92" y="116" width="56" height="48" rx="10" fill="#FFFFFF"/>
  <circle cx="120" cy="136" r="7" fill="#1E7A3D"/>
  <rect x="117" y="138" width="6" height="16" rx="3" fill="#1E7A3D"/>
</svg>`;

const SECURE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 140" width="150" height="140" role="img" aria-label="Protected data">
  <defs>
    <linearGradient id="sg2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5BC077"/><stop offset="1" stop-color="#1E7A3D"/>
    </linearGradient>
  </defs>
  <circle cx="75" cy="70" r="62" fill="#E7F4EA"/>
  <rect x="42" y="26" width="62" height="88" rx="10" fill="#FFFFFF" stroke="#D8EADD" stroke-width="2"/>
  <rect x="54" y="46" width="38" height="6" rx="3" fill="#CFE3D5"/>
  <rect x="54" y="60" width="38" height="6" rx="3" fill="#CFE3D5"/>
  <rect x="54" y="74" width="24" height="6" rx="3" fill="#CFE3D5"/>
  <path d="M98 72 L122 82 V102 C122 114 111 122 98 126 C85 122 74 114 74 102 V82 Z" fill="url(#sg2)"/>
  <path d="M88 101 l7 7 l13 -15" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const COOKIE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="140" height="140" role="img" aria-label="Cookie">
  <circle cx="70" cy="72" r="60" fill="#E7F4EA"/>
  <circle cx="70" cy="70" r="44" fill="#E4B36A" stroke="#D89F4E" stroke-width="3"/>
  <circle cx="56" cy="58" r="6" fill="#6B4423"/>
  <circle cx="86" cy="62" r="5" fill="#6B4423"/>
  <circle cx="66" cy="86" r="6" fill="#6B4423"/>
  <circle cx="92" cy="85" r="4" fill="#6B4423"/>
  <circle cx="50" cy="80" r="4" fill="#6B4423"/>
  <circle cx="74" cy="48" r="3.5" fill="#6B4423"/>
  <circle cx="120" cy="40" r="4" fill="#E4B36A"/>
  <circle cx="22" cy="62" r="3" fill="#E4B36A"/>
</svg>`;

const ART: Record<string, { uri: string; w: number }> = {
  secure: { uri: `data:image/svg+xml,${encodeURIComponent(SECURE)}`, w: 190 },
  cookie: { uri: `data:image/svg+xml,${encodeURIComponent(COOKIE)}`, w: 170 },
};
const SHIELD_URI = `data:image/svg+xml,${encodeURIComponent(SHIELD)}`;

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

/* ------------------------------- Block render ----------------------------- */

type Block = (typeof PRIVACY.sections)[number]['blocks'][number];

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.type === 'p') return <Text style={styles.para}>{block.text}</Text>;
  if (block.type === 'list') {
    return (
      <View style={styles.list}>
        {block.items.map((it) => <Bullet key={it} text={it} />)}
      </View>
    );
  }
  // group
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{block.subtitle}</Text>
      {block.lead ? <Text style={styles.groupLead}>{block.lead}</Text> : null}
      <View style={styles.list}>
        {block.items.map((it) => <Bullet key={it} text={it} />)}
      </View>
    </View>
  );
}

/* --------------------------------- Page ----------------------------------- */

export function PrivacyPolicy() {
  const { isMobile } = useResponsive();
  const { navigate } = useNav();

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
              <Text style={[styles.heroTitle, isMobile && { fontSize: 27 }]}>{PRIVACY.title}</Text>
              <Text style={styles.heroSub}>
                Your trust matters. Here is how Magasool collects, uses, and safeguards your information.
              </Text>
              <View style={styles.effectivePill}>
                <Ionicons name="calendar-outline" size={13} color={colors.white} />
                <Text style={styles.effectiveText}>{PRIVACY.effective}</Text>
              </View>
            </View>

            <View style={styles.heroArt}>
              <Pulse delay={0} />
              <Pulse delay={1400} />
              <Floating amplitude={12} duration={2800}>
                <Image source={{ uri: SHIELD_URI }} style={styles.heroShield} resizeMode="contain" accessibilityLabel="Privacy shield" />
              </Floating>
            </View>
          </View>
        </Container>
      </LinearGradient>

      {/* Intro */}
      <Container>
        <Reveal>
          <View style={styles.introCard}>
            {PRIVACY.intro.map((p, i) => (
              <Text key={i} style={[styles.introText, i > 0 && { marginTop: 12 }]}>{p}</Text>
            ))}
          </View>
        </Reveal>

        {/* Sections */}
        {PRIVACY.sections.map((s, i) => {
          const art = s.art !== 'none' ? ART[s.art] : null;
          return (
            <Reveal key={s.id} delay={Math.min(i, 4) * 50}>
              <View style={styles.section}>
                <View style={styles.sectionHead}>
                  <View style={styles.sectionIcon}>
                    <Ionicons name={s.icon} size={20} color={colors.green} />
                  </View>
                  <Text style={styles.sectionTitle}>{s.title}</Text>
                </View>

                {art ? (
                  <View style={[styles.artRow, isMobile && styles.artRowStack]}>
                    <View style={styles.artBody}>
                      {s.blocks.map((b, bi) => <BlockView key={bi} block={b} />)}
                    </View>
                    <Floating amplitude={9} duration={2400} delay={i * 120} style={[styles.artWrap, isMobile && styles.artWrapMobile]}>
                      <Image source={{ uri: art.uri }} style={{ width: art.w, height: art.w * 0.92 }} resizeMode="contain" />
                    </Floating>
                  </View>
                ) : (
                  s.blocks.map((b, bi) => <BlockView key={bi} block={b} />)
                )}
              </View>
            </Reveal>
          );
        })}

        {/* Contact */}
        <Reveal>
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Privacy Questions?</Text>
            <Text style={styles.contactSub}>Reach our team for any privacy-related queries or requests.</Text>
            <View style={[styles.contactRow, isMobile && styles.contactRowStack]}>
              <Pressable style={styles.contactItem} onPress={() => Linking.openURL(`tel:${PRIVACY.contact.phone.replace(/\s/g, '')}`)}>
                <View style={styles.contactIcon}><Ionicons name="call" size={16} color={colors.white} /></View>
                <Text style={styles.contactValue}>{PRIVACY.contact.phone}</Text>
              </Pressable>
              <Pressable style={styles.contactItem} onPress={() => Linking.openURL(`mailto:${PRIVACY.contact.email}`)}>
                <View style={styles.contactIcon}><Ionicons name="mail" size={16} color={colors.white} /></View>
                <Text style={styles.contactValue}>{PRIVACY.contact.email}</Text>
              </Pressable>
            </View>
          </View>
        </Reveal>

        {/* Closing acknowledgment */}
        <Reveal>
          <View style={styles.closing}>
            <Ionicons name="checkmark-circle" size={22} color={colors.green} />
            <Text style={styles.closingText}>{PRIVACY.closing}</Text>
          </View>
        </Reveal>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, paddingBottom: 64 },

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
  heroTitle: { color: colors.white, fontSize: 38, fontWeight: '800', letterSpacing: -0.5 },
  heroSub: { color: 'rgba(255,255,255,0.88)', fontSize: 15, lineHeight: 23, marginTop: 12, maxWidth: 520 },
  effectivePill: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: radius.pill,
    paddingVertical: 7, paddingHorizontal: 13, marginTop: 20, gap: 7 as unknown as number,
  },
  effectiveText: { color: colors.white, fontSize: 12.5, fontWeight: '600' },

  heroArt: { width: 240, height: 240, alignItems: 'center', justifyContent: 'center' },
  heroShield: { width: 200, height: 200 },
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

  /* sections */
  section: { marginTop: 40 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 12 as unknown as number },
  sectionIcon: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  sectionTitle: { flex: 1, color: colors.ink, fontSize: 20, fontWeight: '800', letterSpacing: -0.2 },

  para: { color: colors.body, fontSize: 14.5, lineHeight: 24, marginBottom: 10 },

  list: { marginTop: 2, marginBottom: 8 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 9 },
  bulletDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.greenAccent, marginTop: 8, marginRight: 12 },
  bulletText: { flex: 1, color: colors.body, fontSize: 14.5, lineHeight: 23 },

  group: {
    backgroundColor: colors.greenTint, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    padding: 18, marginTop: 14,
  },
  groupTitle: { color: colors.green, fontSize: 15, fontWeight: '800', marginBottom: 8 },
  groupLead: { color: colors.body, fontSize: 14, lineHeight: 22, marginBottom: 8 },

  /* section with illustration */
  artRow: { flexDirection: 'row', alignItems: 'center', gap: 24 as unknown as number },
  artRowStack: { flexDirection: 'column' },
  artBody: { flex: 1, minWidth: 0 as unknown as number },
  artWrap: { width: 200, alignItems: 'center', justifyContent: 'center' },
  artWrapMobile: { width: '100%', marginTop: 8 },

  /* contact */
  contactCard: {
    backgroundColor: colors.greenTint, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    padding: 28, marginTop: 48, alignItems: 'center', ...shadow.soft,
  },
  contactTitle: { color: colors.ink, fontSize: 20, fontWeight: '800' },
  contactSub: { color: colors.body, fontSize: 13.5, lineHeight: 21, marginTop: 6, textAlign: 'center' },
  contactRow: { flexDirection: 'row', marginTop: 18, gap: 14 as unknown as number },
  contactRowStack: { flexDirection: 'column', alignSelf: 'stretch' },
  contactItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 10, paddingHorizontal: 16, gap: 10 as unknown as number,
  },
  contactIcon: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: colors.green,
    alignItems: 'center', justifyContent: 'center',
  },
  contactValue: { color: colors.ink, fontSize: 13.5, fontWeight: '700' },

  /* closing */
  closing: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12 as unknown as number,
    backgroundColor: colors.greenSoft, borderRadius: radius.md,
    borderLeftWidth: 4, borderLeftColor: colors.green,
    padding: 20, marginTop: 28,
  },
  closingText: { flex: 1, color: colors.ink, fontSize: 14.5, lineHeight: 23, fontWeight: '600' },
});
