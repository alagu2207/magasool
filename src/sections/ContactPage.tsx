import React from 'react';
import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../nav/NavProvider';
import { useFormModal } from '../forms/FormModalProvider';
import { trackEvent } from '../analytics/analytics';
import { CONTACT, SOCIALS } from '../data';

export function ContactPage() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  const { openForm } = useFormModal();
  const basis = isMobile ? '100%' : isTablet ? '50%' : '25%';

  const open = (m: (typeof CONTACT.methods)[number]) => {
    if (!m.href) return;
    trackEvent('contact_method_click', { method: m.label });
    Linking.openURL(m.href);
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
          <Text style={styles.heroEyebrow}>Get In Touch</Text>
          <Text style={[styles.heroTitle, isMobile && { fontSize: 27, lineHeight: 34 }]}>{CONTACT.title}</Text>
          <Text style={styles.heroSub}>{CONTACT.subtitle}</Text>
        </Container>
      </LinearGradient>

      <Container>
        {/* Intro */}
        <Reveal>
          <View style={styles.introCard}>
            <Text style={styles.introText}>{CONTACT.intro}</Text>
          </View>
        </Reveal>

        {/* Query form */}
        <Reveal>
          <View style={styles.queryCard}>
            <View style={styles.queryIcon}>
              <Ionicons name="chatbubble-ellipses-outline" size={26} color={colors.green} />
            </View>
            <Text style={styles.queryTitle}>Have a Question?</Text>
            <Text style={styles.querySub}>
              Send us your contact number and query — our team will get back to you shortly.
            </Text>
            <Button
              label="Send us a Message"
              variant="green"
              size="lg"
              icon="paper-plane-outline"
              onPress={() => openForm('contact')}
              style={{ marginTop: 18 }}
            />
          </View>
        </Reveal>

        {/* Methods */}
        <View style={styles.grid}>
          {CONTACT.methods.map((m, i) => (
            <Reveal key={m.label} delay={Math.min(i, 4) * 60} style={[styles.cell, { flexBasis: basis as any }]}>
              <Pressable style={styles.card} onPress={() => open(m)} disabled={!m.href}>
                <View style={styles.iconWrap}>
                  <Ionicons name={m.icon} size={24} color={colors.greenAccent} />
                </View>
                <Text style={styles.cardLabel}>{m.label}</Text>
                <Text style={styles.cardValue}>{m.value}</Text>
              </Pressable>
            </Reveal>
          ))}
        </View>

        {/* Social profiles */}
        <Reveal>
          <View style={styles.socialCard}>
            <Text style={styles.socialTitle}>Follow Us</Text>
            <Text style={styles.socialSub}>Stay connected for updates, prices, and farmer stories.</Text>
            <View style={styles.socialRow}>
              {SOCIALS.map((s) => (
                <Pressable
                  key={s.label}
                  style={styles.socialBtn}
                  accessibilityRole="link"
                  accessibilityLabel={s.label}
                  onPress={() => {
                    trackEvent('social_click', { network: s.label, location: 'contact' });
                    Linking.openURL(s.url);
                  }}
                >
                  <Ionicons name={s.icon} size={20} color={colors.white} />
                  <Text style={styles.socialBtnText}>{s.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Reveal>

        {/* Form redirection CTA */}
        <Reveal>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to get started?</Text>
            <Text style={styles.ctaSub}>
              Register your interest and our team will reach out to you directly.
            </Text>
            <View style={[styles.ctaRow, isMobile && styles.ctaRowStack]}>
              <Button label="I'm a Farmer" variant="green" size="lg" icon="leaf-outline" onPress={() => openForm('farmer')} />
              <Button
                label="I'm a Buyer"
                variant="yellow"
                size="lg"
                icon="cart-outline"
                onPress={() => openForm('buyer')}
                style={!isMobile && { marginLeft: 14 }}
              />
            </View>
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
  back: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: radius.pill,
    paddingVertical: 7, paddingHorizontal: 14, marginBottom: 18, gap: 6 as unknown as number,
  },
  backText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  heroEyebrow: { color: 'rgba(255,255,255,0.82)', fontSize: 13, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  heroTitle: { color: colors.white, fontSize: 38, fontWeight: '800', letterSpacing: -0.5 },
  heroSub: { color: 'rgba(255,255,255,0.88)', fontSize: 15, lineHeight: 23, marginTop: 12, maxWidth: 560 },

  /* intro */
  introCard: {
    backgroundColor: colors.greenTint, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    padding: 24, marginTop: -28, ...shadow.card,
  },
  introText: { color: colors.body, fontSize: 14.5, lineHeight: 24 },

  /* query form */
  queryCard: {
    backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    padding: 28, marginTop: 22, alignItems: 'center', ...shadow.soft,
  },
  queryIcon: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  queryTitle: { fontSize: 20, fontWeight: '800', color: colors.ink },
  querySub: { fontSize: 13.5, lineHeight: 21, color: colors.body, marginTop: 6, textAlign: 'center', maxWidth: 460 },

  /* methods grid */
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 28, marginHorizontal: -9 },
  cell: { paddingHorizontal: 9, marginBottom: 18 },
  card: {
    backgroundColor: colors.white, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 28, paddingHorizontal: 18, alignItems: 'center', height: '100%', ...shadow.soft,
  },
  iconWrap: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  cardLabel: { fontSize: 15, fontWeight: '800', color: colors.ink, marginBottom: 6 },
  cardValue: { fontSize: 13, lineHeight: 19, color: colors.body, textAlign: 'center' },

  /* socials */
  socialCard: {
    backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    padding: 28, marginTop: 30, alignItems: 'center', ...shadow.soft,
  },
  socialTitle: { fontSize: 20, fontWeight: '800', color: colors.ink },
  socialSub: { fontSize: 13.5, lineHeight: 21, color: colors.body, marginTop: 6, textAlign: 'center' },
  socialRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 18, gap: 12 as unknown as number },
  socialBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 9 as unknown as number,
    backgroundColor: colors.green, borderRadius: radius.pill, paddingVertical: 11, paddingHorizontal: 20,
  },
  socialBtnText: { color: colors.white, fontSize: 14, fontWeight: '700' },

  /* cta */
  ctaCard: {
    backgroundColor: colors.greenTint, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    padding: 30, marginTop: 30, alignItems: 'center', ...shadow.soft,
  },
  ctaTitle: { fontSize: 22, fontWeight: '800', color: colors.ink },
  ctaSub: { fontSize: 14, lineHeight: 22, color: colors.body, marginTop: 8, textAlign: 'center', maxWidth: 460 },
  ctaRow: { flexDirection: 'row', marginTop: 20 },
  ctaRowStack: { flexDirection: 'column', alignSelf: 'stretch', gap: 12 as unknown as number },
});
