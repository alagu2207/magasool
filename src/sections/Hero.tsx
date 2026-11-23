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
  const { height: windowHeight } = useWindowDimensions();
  const { openForm } = useFormModal();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Gentle bouncing animation for the "Scroll down to explore" indicator
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
  const heroMinHeight = Platform.OS === 'web'
    ? ('calc(100vh - 72px)' as any)
    : (windowHeight ? windowHeight - 72 : 680);

  return (
    <View style={[styles.section, { minHeight: heroMinHeight }]} nativeID="home">
      {/* 1. Full-screen background image filling first screen edge-to-edge */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
          source={require('../../assets/mockup/hero-visual.png')}
          style={styles.heroBackgroundImage}
          resizeMode="cover"
          accessibilityLabel="Magasool global agricultural exports"
        />

        {/* 2. Gradient overlay ensuring high contrast and perfect text readability */}
        <LinearGradient
          colors={[
            'rgba(8, 24, 13, 0.93)',
            'rgba(8, 24, 13, 0.85)',
            'rgba(8, 24, 13, 0.62)',
            'rgba(8, 24, 13, 0.45)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* 3. Hero content (full width, centered container) */}
      <View style={styles.contentContainer}>
        <View style={[styles.innerRow, (isMobile || isTablet) && styles.innerRowStack]}>
          <View style={[styles.leftColumn, (isMobile || isTablet) && styles.leftColumnStack]}>
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
                style={!isMobile ? { marginLeft: 14 } : { marginTop: 10 }}
              />
            </View>

            {/* Trust Badges */}
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
      </View>

      {/* 4. Bottom "Scroll down to explore" indicator to transition to second page */}
      <View style={styles.scrollIndicatorWrapper}>
        <Pressable
          onPress={() => scrollToSection('export-process')}
          style={styles.scrollIndicatorBtn}
          accessibilityRole="button"
          accessibilityLabel="Scroll down to explore export process"
        >
          <Text style={styles.scrollIndicatorText}>Scroll to explore</Text>
          <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <Ionicons name="chevron-down" size={20} color="#86EFAC" />
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
    backgroundColor: '#0A1C10',
    paddingVertical: 48,
    // Ensure no left/right margins
    marginHorizontal: 0,
  },
  heroBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 1320,
    alignSelf: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
    justifyContent: 'center',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  innerRowStack: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  leftColumn: {
    maxWidth: 780,
  },
  leftColumnStack: {
    maxWidth: '100%',
  },
  eyebrowBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(30, 122, 61, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.4)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    marginBottom: 16,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
    marginRight: 8,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    color: '#86EFAC',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  h1: {
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: -0.8,
    lineHeight: 58,
    marginBottom: 20,
  },
  h1Mobile: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -0.4,
  },
  h1White: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  h1Accent: {
    color: '#4ADE80',
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  lead: {
    fontSize: 17,
    lineHeight: 26,
    color: '#E2E8F0',
    fontWeight: '500',
    marginBottom: 30,
    maxWidth: 620,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  leadMobile: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
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
    paddingTop: 8,
  },
  badgesMobile: {
    gap: 10 as unknown as number,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 35, 20, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  badgeIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
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
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 20,
  },
  scrollIndicatorBtn: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(10, 28, 15, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
    borderRadius: radius.pill,
  },
  scrollIndicatorText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E2E8F0',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
});
