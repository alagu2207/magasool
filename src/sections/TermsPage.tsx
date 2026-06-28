import React from 'react';
import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../nav/NavProvider';
import { TERMS } from '../data';

type Block = (typeof TERMS.sections)[number]['blocks'][number];

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
  return (
    <View style={styles.list}>
      {block.items.map((it) => <Bullet key={it} text={it} />)}
    </View>
  );
}

export function TermsPage() {
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
              <Text style={[styles.heroTitle, isMobile && { fontSize: 27 }]}>{TERMS.title}</Text>
              <Text style={styles.heroSub}>
                Please read these terms carefully before using the Magasool platform and services.
              </Text>
              <View style={styles.effectivePill}>
                <Ionicons name="calendar-outline" size={13} color={colors.white} />
                <Text style={styles.effectiveText}>{TERMS.effective}</Text>
              </View>
            </View>
            <View style={styles.heroArt}>
              <Ionicons name="document-text" size={96} color="rgba(255,255,255,0.92)" />
            </View>
          </View>
        </Container>
      </LinearGradient>

      <Container>
        {/* Intro */}
        <Reveal>
          <View style={styles.introCard}>
            {TERMS.intro.map((p, i) => (
              <Text key={i} style={[styles.introText, i > 0 && { marginTop: 12 }]}>{p}</Text>
            ))}
          </View>
        </Reveal>

        {/* Sections */}
        {TERMS.sections.map((s, i) => (
          <Reveal key={s.id} delay={Math.min(i, 4) * 50}>
            <View style={styles.section}>
              <View style={styles.sectionHead}>
                <View style={styles.sectionIcon}>
                  <Ionicons name={s.icon} size={20} color={colors.green} />
                </View>
                <Text style={styles.sectionTitle}>{s.title}</Text>
              </View>
              {s.blocks.map((b, bi) => <BlockView key={bi} block={b} />)}
            </View>
          </Reveal>
        ))}

        {/* Contact */}
        <Reveal>
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Questions about these Terms?</Text>
            <Text style={styles.contactSub}>Reach our team for any clarification regarding these Terms & Conditions.</Text>
            <View style={[styles.contactRow, isMobile && styles.contactRowStack]}>
              <Pressable style={styles.contactItem} onPress={() => Linking.openURL(`tel:${TERMS.contact.phone.replace(/\s/g, '')}`)}>
                <View style={styles.contactIcon}><Ionicons name="call" size={16} color={colors.white} /></View>
                <Text style={styles.contactValue}>{TERMS.contact.phone}</Text>
              </Pressable>
              <Pressable style={styles.contactItem} onPress={() => Linking.openURL(`mailto:${TERMS.contact.email}`)}>
                <View style={styles.contactIcon}><Ionicons name="mail" size={16} color={colors.white} /></View>
                <Text style={styles.contactValue}>{TERMS.contact.email}</Text>
              </Pressable>
            </View>
          </View>
        </Reveal>

        {/* Closing */}
        <Reveal>
          <View style={styles.closing}>
            <Ionicons name="checkmark-circle" size={22} color={colors.green} />
            <Text style={styles.closingText}>{TERMS.closing}</Text>
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
  heroArt: { width: 200, height: 200, alignItems: 'center', justifyContent: 'center' },

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
