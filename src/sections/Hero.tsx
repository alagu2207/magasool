import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow, radius } from '../theme';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useFormModal } from '../forms/FormModalProvider';
import { HERO_BADGES, HERO_FLOW } from '../data';

function FlowCard({ item, compact }: { item: (typeof HERO_FLOW)[number]; compact?: boolean }) {
  return (
    <View style={[styles.flowCard, compact && styles.flowCardCompact]}>
      <View style={[styles.arch, compact && styles.archCompact, { backgroundColor: item.tint }]}>
        <Text style={[styles.archEmoji, compact && styles.archEmojiCompact]}>{item.emoji}</Text>
      </View>
      <Text style={styles.flowRole}>{item.role}</Text>
      <Text style={styles.flowDesc}>{item.desc}</Text>
    </View>
  );
}

function Arrow() {
  return (
    <View style={styles.arrow}>
      <Ionicons name="arrow-forward" size={20} color={colors.greenAccent} />
    </View>
  );
}

export function Hero() {
  const { isMobile, isTablet } = useResponsive();
  const { openForm } = useFormModal();
  const stack = isMobile || isTablet;

  return (
    <LinearGradient colors={['#F1F8F1', '#FBFEFB', '#FFFFFF']} style={styles.bg}>
      <Container>
        <View style={[styles.row, stack && styles.rowStack]}>
          {/* Left: copy + CTAs */}
          <View style={[styles.left, stack && styles.leftStack]}>
            <Text style={styles.h1}>
              <Text style={styles.h1Dark}>Sell Smarter.{'\n'}</Text>
              <Text style={styles.h1Green}>Source Better.</Text>
            </Text>
            <Text style={styles.lead}>
              Magasool is your trusted agricultural brokerage platform that connects farmers,
              sales executives, and buyers for seamless trade and growth.
            </Text>

            <View style={[styles.ctaRow, stack && styles.ctaRowStack]}>
              <Button label="I'm a Farmer" variant="green" size="lg" icon="paper-plane-outline" onPress={() => openForm('farmer')} />
              <Button label="I'm a Buyer" variant="orange" size="lg" icon="cart-outline" onPress={() => openForm('buyer')} style={!stack && { marginLeft: 14 }} />
            </View>

            <View style={styles.badges}>
              {HERO_BADGES.map((b) => (
                <View key={b.label} style={styles.badge}>
                  <View style={styles.badgeIcon}>
                    <Ionicons name={b.icon} size={13} color={colors.greenAccent} />
                  </View>
                  <Text style={styles.badgeText}>{b.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right: farmer -> exec -> buyer flow */}
          <View style={[styles.right, stack && styles.rightStack]}>
            <View style={[styles.flowRow, isMobile && styles.flowRowCompact]}>
              {HERO_FLOW.map((item, i) => (
                <React.Fragment key={item.role}>
                  <FlowCard item={item} compact={isMobile} />
                  {!isMobile && i < HERO_FLOW.length - 1 && <Arrow />}
                </React.Fragment>
              ))}
            </View>

            <View style={styles.trustWrap}>
              <View style={styles.shield}>
                <Ionicons name="shield-checkmark" size={16} color={colors.white} />
              </View>
              <Text style={styles.trustText}>Trusted. Transparent. Connected.</Text>
            </View>
          </View>
        </View>
      </Container>

      {/* Landscape band at the bottom of the hero */}
      <LinearGradient
        colors={['rgba(120,180,120,0.0)', '#CDE6C4', '#A9D69A']}
        style={styles.field}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { width: '100%', paddingTop: 48, position: 'relative' },
  row: { flexDirection: 'row', alignItems: 'center', paddingBottom: 70 },
  rowStack: { flexDirection: 'column', paddingBottom: 56 },

  left: { flex: 1, paddingRight: 24 },
  leftStack: { paddingRight: 0, alignItems: 'flex-start', marginBottom: 36 },

  h1: { marginBottom: 18 },
  h1Dark: { fontSize: 46, fontWeight: '800', color: colors.ink, letterSpacing: -1, lineHeight: 50 },
  h1Green: { fontSize: 46, fontWeight: '800', color: colors.greenAccent, letterSpacing: -1, lineHeight: 50 },
  lead: { fontSize: 16, lineHeight: 25, color: colors.body, maxWidth: 460, marginBottom: 26 },

  ctaRow: { flexDirection: 'row', marginBottom: 26 },
  ctaRowStack: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 as unknown as number },

  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 22 as unknown as number },
  badge: { flexDirection: 'row', alignItems: 'center' },
  badgeIcon: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center', marginRight: 7,
  },
  badgeText: { fontSize: 13, color: colors.body, fontWeight: '600' },

  right: { flex: 1.05, alignItems: 'center' },
  rightStack: { width: '100%' },

  flowRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' },
  flowRowCompact: { justifyContent: 'space-between', width: '100%' },
  flowCard: {
    width: 142,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingBottom: 14,
    paddingTop: 0,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
    overflow: 'hidden',
  },
  flowCardCompact: { width: '31.5%' },
  arch: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  archCompact: { height: 96, borderTopLeftRadius: 48, borderTopRightRadius: 48 },
  archEmoji: { fontSize: 64 },
  archEmojiCompact: { fontSize: 40 },
  flowRole: { fontSize: 14.5, fontWeight: '800', color: colors.ink, marginBottom: 4 },
  flowDesc: { fontSize: 11.5, lineHeight: 16, color: colors.muted, textAlign: 'center' },
  arrow: { alignSelf: 'center', marginTop: 56, marginHorizontal: 4 },

  trustWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 22 },
  shield: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.greenAccent,
    alignItems: 'center', justifyContent: 'center', marginRight: 9,
  },
  trustText: { color: colors.greenDeep, fontWeight: '700', fontSize: 14 },

  field: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84 },
});
