import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow, radius } from '../theme';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useFormModal } from '../forms/FormModalProvider';
import { HERO_BADGES, HERO_FLOW } from '../data';

function FlowCard({
  item,
  compact,
  index,
  lively,
}: {
  item: (typeof HERO_FLOW)[number];
  compact?: boolean;
  index: number;
  /** Farmer card gets a continuously floating emoji to draw the eye. */
  lively?: boolean;
}) {
  const enter = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  // Staggered fade + slide-up entrance.
  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 480,
      delay: index * 130,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [enter, index]);

  // Gentle, looping bob on the farmer emoji.
  useEffect(() => {
    if (!lively) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
        Animated.timing(float, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [lively, float]);

  const translateY = enter.interpolate({ inputRange: [0, 1], outputRange: [18, 0] });
  const emojiY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -7] });

  return (
    <Animated.View
      style={[styles.flowCard, compact ? styles.flowCardCompact : styles.flowCardWide, { opacity: enter, transform: [{ translateY }] }]}
    >
      <View style={[styles.arch, compact && styles.archCompact, { backgroundColor: item.tint }]}>
        <Animated.Text
          style={[styles.archEmoji, compact && styles.archEmojiCompact, { transform: [{ translateY: emojiY }] }]}
        >
          {item.emoji}
        </Animated.Text>
      </View>
      <Text style={styles.flowRole}>{item.role}</Text>
      <Text style={styles.flowDesc}>{item.desc}</Text>
    </Animated.View>
  );
}

/** Subtle "breathing" scale to draw attention to the farmer call-to-action. */
function PulseCTA({ children }: { children: React.ReactNode }) {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.04, duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        Animated.timing(scale, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);
  return <Animated.View style={{ transform: [{ scale }], alignSelf: 'flex-start' }}>{children}</Animated.View>;
}

function Arrow() {
  return (
    <View style={styles.arrow}>
      <Ionicons name="arrow-forward" size={20} color={colors.greenAccent} />
    </View>
  );
}

type Pos = { top?: number; left?: number; right?: number; bottom?: number };

/** Soft colored circle that gently drifts up and down — decorative bokeh. */
function FloatingBlob({
  size,
  color,
  range = 22,
  dur = 5200,
  delay = 0,
  ...pos
}: { size: number; color: string; range?: number; dur?: number; delay?: number } & Pos) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: dur, delay, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
        Animated.timing(v, { toValue: 0, duration: dur, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, dur, delay]);
  const translateY = v.interpolate({ inputRange: [0, 1], outputRange: [0, -range] });
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        ...pos,
        transform: [{ translateY }],
      }}
    />
  );
}

/** Drifting + slowly tilting leaf emoji. */
function FloatingLeaf({
  emoji,
  size,
  range = 16,
  rot = 10,
  dur = 4200,
  delay = 0,
  ...pos
}: { emoji: string; size: number; range?: number; rot?: number; dur?: number; delay?: number } & Pos) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: dur, delay, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
        Animated.timing(v, { toValue: 0, duration: dur, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, dur, delay]);
  const translateY = v.interpolate({ inputRange: [0, 1], outputRange: [0, -range] });
  const rotate = v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${rot}deg`] });
  return (
    <Animated.Text
      pointerEvents="none"
      style={{ position: 'absolute', fontSize: size, opacity: 0.5, ...pos, transform: [{ translateY }, { rotate }] }}
    >
      {emoji}
    </Animated.Text>
  );
}

/** Animated decorative layer behind the hero content. */
function HeroDecor({ compact }: { compact?: boolean }) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <FloatingBlob size={compact ? 120 : 210} color="rgba(47,158,68,0.10)" top={-36} left={-44} dur={6200} />
      <FloatingBlob size={compact ? 90 : 150} color="rgba(245,179,1,0.13)" top={48} right={-28} dur={5200} delay={400} />
      <FloatingBlob size={compact ? 80 : 130} color="rgba(47,158,68,0.08)" bottom={110} left={150} dur={5800} delay={800} />
      {!compact && (
        <>
          <FloatingLeaf emoji="🍃" size={30} top={74} left={70} dur={4200} />
          <FloatingLeaf emoji="🌿" size={34} bottom={130} right={90} dur={4800} delay={600} rot={-10} />
          <FloatingLeaf emoji="🌱" size={26} top={150} right={260} dur={4000} delay={300} />
        </>
      )}
    </View>
  );
}

export function Hero() {
  const { isMobile, isTablet } = useResponsive();
  const { openForm } = useFormModal();
  const { height } = useWindowDimensions();
  const stack = isMobile || isTablet;

  // Fill the screen below the header so the green hero reads as one full-height panel.
  const headerOffset = isMobile ? 90 : 116;
  const minHeight = Math.max(height - headerOffset, 520);

  return (
    <LinearGradient colors={['#F1F8F1', '#FBFEFB', '#FFFFFF']} style={[styles.bg, { minHeight }]}>
      <HeroDecor compact={isMobile} />
      <Container>
        <View style={[styles.row, stack && styles.rowStack]}>
          {/* Left: copy + CTAs */}
          <View style={[styles.left, stack && styles.leftStack]}>
            <Text style={styles.h1}>
              <Text style={styles.h1Dark}>Sell Smarter.{'\n'}</Text>
              <Text style={styles.h1Green}>Source Better.</Text>
            </Text>
            <Text style={styles.lead}>
              Magasool connects farmers and buyers through one trusted team — so produce
              moves faster, prices stay fair, and everyone grows.
            </Text>

            <View style={[styles.ctaRow, stack && styles.ctaRowStack]}>
              <PulseCTA>
                <Button label="I'm a Farmer" variant="green" size="lg" icon="paper-plane-outline" onPress={() => openForm('farmer')} />
              </PulseCTA>
              <Button label="I'm a Buyer" variant="yellow" size="lg" icon="cart-outline" onPress={() => openForm('buyer')} style={!stack && { marginLeft: 14 }} />
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
                  <FlowCard item={item} compact={isMobile} index={i} lively={item.role === 'Farmer'} />
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
  bg: { width: '100%', paddingTop: 48, position: 'relative', overflow: 'hidden', justifyContent: 'center' },
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

  flowRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', width: '100%' },
  flowRowCompact: { justifyContent: 'space-between', width: '100%' },
  flowCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingBottom: 18,
    paddingTop: 0,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
    overflow: 'hidden',
  },
  flowCardCompact: { width: '31.5%' },
  flowCardWide: { flex: 1, maxWidth: 210, marginHorizontal: 4 },
  arch: {
    width: '100%',
    height: 188,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  archCompact: { height: 96, borderTopLeftRadius: 48, borderTopRightRadius: 48 },
  archEmoji: { fontSize: 84 },
  archEmojiCompact: { fontSize: 40 },
  flowRole: { fontSize: 17, fontWeight: '800', color: colors.ink, marginBottom: 5 },
  flowDesc: { fontSize: 12.5, lineHeight: 18, color: colors.muted, textAlign: 'center', paddingHorizontal: 6 },
  arrow: { alignSelf: 'center', marginTop: 80, marginHorizontal: 4 },

  trustWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 22 },
  shield: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.greenAccent,
    alignItems: 'center', justifyContent: 'center', marginRight: 9,
  },
  trustText: { color: colors.greenDeep, fontWeight: '700', fontSize: 14 },

  field: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 84 },
});
