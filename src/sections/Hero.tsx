import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable, Animated, Easing, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useFormModal } from '../forms/FormModalProvider';
import { trackEvent } from '../analytics/analytics';
import { HERO_BADGES, HERO } from '../data';

export function Hero() {
  const { isMobile, isTablet } = useResponsive();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const { openForm } = useFormModal();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Gentle bouncing animation for the "Scroll to explore" indicator
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 6,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bounceAnim]);

  const scrollToSection = (id: string) => {
    trackEvent('hero_cta_click', { target: id });
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
  };

  const handleRequestQuote = () => {
    trackEvent('hero_cta_click', { target: 'rfq-form' });
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const el = document.getElementById('rfq-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    openForm('buyer');
  };

  // Full first screen height (exact viewport height minus header)
  // On desktop/windows: calc(100vh - 72px)
  // On phone: calc(100vh - 65px)
  const headerHeight = isMobile ? 65 : 72;
  const heroMinHeight = Platform.OS === 'web'
    ? (`calc(100vh - ${headerHeight}px)` as any)
    : (windowHeight ? windowHeight - headerHeight : 680);

  return (
    <View style={[styles.section, { minHeight: heroMinHeight }]} nativeID="home">
      {/* =========================================================================
          1. FULL SCREEN IMAGE (Covering 100% of the first page on Windows & Phone)
          ========================================================================= */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
          source={require('../../assets/mockup/hero-visual.png')}
          style={styles.fullScreenImage}
          resizeMode="cover"
          accessibilityLabel="Magasool global agricultural exports illustration"
        />

        {/* Responsive gradient overlay:
            - Desktop: Left-to-right gradient for contrast behind headlines while produce shines on the right
            - Mobile: Top-to-bottom gradient for full portrait readability */}
        <LinearGradient
          colors={
            isMobile
              ? [
                  'rgba(6, 20, 11, 0.94)',
                  'rgba(6, 20, 11, 0.84)',
                  'rgba(6, 20, 11, 0.65)',
                  'rgba(6, 20, 11, 0.45)',
                ]
              : [
                  'rgba(6, 20, 11, 0.94)',
                  'rgba(6, 20, 11, 0.82)',
                  'rgba(6, 20, 11, 0.50)',
                  'rgba(6, 20, 11, 0.25)',
                ]
          }
          start={isMobile ? { x: 0, y: 0 } : { x: 0, y: 0.5 }}
          end={isMobile ? { x: 0, y: 1 } : { x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* =========================================================================
          2. HERO CONTENT (Crisp typography & CTA buttons overlaid on the image)
          ========================================================================= */}
      <View style={[styles.contentContainer, isMobile && styles.contentContainerMobile]}>
        <View style={styles.copyWrapper}>
          {/* Eyebrow badge */}
          <View style={styles.eyebrowBadge}>
            <View style={styles.eyebrowDot} />
            <Text style={styles.eyebrow}>{HERO.eyebrow}</Text>
          </View>

          {/* Main Headline */}
          <Text style={[styles.h1, isMobile && styles.h1Mobile]}>
            <Text style={styles.h1White}>{HERO.titleDark}{'\n'}</Text>
            <Text style={styles.h1Accent}>{HERO.titleGreen}</Text>
          </Text>

          {/* Lead description */}
          <Text style={[styles.lead, isMobile && styles.leadMobile]}>
            {HERO.lead}
          </Text>

          {/* Action buttons */}
          <View style={[styles.ctaRow, isMobile && styles.ctaRowMobile]}>
            <Button
              label={HERO.ctaPrimary}
              variant="green"
              size={isMobile ? 'md' : 'lg'}
              icon="arrow-forward"
              iconPosition="right"
              onPress={() => scrollToSection('products')}
            />
            <Button
              label={HERO.ctaSecondary}
              variant="orange"
              size={isMobile ? 'md' : 'lg'}
              icon="paper-plane-outline"
              iconPosition="left"
              onPress={handleRequestQuote}
              style={!isMobile ? { marginLeft: 14 } : { marginTop: 12 }}
            />
          </View>

          {/* 3 Trust Badges */}
          <View style={[styles.badges, isMobile && styles.badgesMobile]}>
            {HERO_BADGES.map((b) => (
              <View key={b.label} style={styles.badgeItem}>
                <View style={styles.badgeIconCircle}>
                  <Ionicons name={b.icon as any} size={15} color="#4ADE80" />
                </View>
                <Text style={styles.badgeLabel}>{b.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* =========================================================================
          3. SCROLL DOWN TO EXPLORE (Smooth transition to the second section)
          ========================================================================= */}
      <View style={styles.scrollIndicatorWrapper}>
        <Pressable
          onPress={() => scrollToSection('export-process')}
          style={styles.scrollIndicatorBtn}
          accessibilityRole="button"
          accessibilityLabel="Scroll down to export process"
        >
          <Text style={styles.scrollIndicatorText}>Scroll to explore</Text>
          <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <Ionicons name="chevron-down" size={18} color="#86EFAC" />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#08170D',
    paddingVertical: 40,
    marginHorizontal: 0,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 1440,
    alignSelf: 'center',
    paddingHorizontal: 48,
    zIndex: 10,
    justifyContent: 'center',
  },
  contentContainerMobile: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  copyWrapper: {
    maxWidth: 760,
  },
  eyebrowBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(30, 122, 61, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.45)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    marginBottom: 16,
  },
  eyebrowDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#4ADE80',
    marginRight: 8,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    color: '#86EFAC',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  h1: {
    fontSize: 54,
    fontWeight: '900',
    letterSpacing: -0.8,
    lineHeight: 60,
    marginBottom: 20,
  },
  h1Mobile: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.4,
    marginBottom: 16,
  },
  h1White: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  h1Accent: {
    color: '#4ADE80',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  lead: {
    fontSize: 17,
    lineHeight: 26,
    color: '#F1F5F9',
    fontWeight: '500',
    marginBottom: 32,
    maxWidth: 620,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  leadMobile: {
    fontSize: 14.5,
    lineHeight: 22,
    marginBottom: 24,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 34,
  },
  ctaRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    marginBottom: 26,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16 as unknown as number,
    paddingTop: 6,
  },
  badgesMobile: {
    gap: 10 as unknown as number,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 30, 16, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  badgeIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(74, 222, 128, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  badgeLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  scrollIndicatorWrapper: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  scrollIndicatorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6 as unknown as number,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(8, 24, 13, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.35)',
    borderRadius: radius.pill,
    ...shadow.soft,
  },
  scrollIndicatorText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E2E8F0',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
