import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable, Animated, Easing, useWindowDimensions } from 'react-native';
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
  const stack = isMobile || isTablet;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Gentle bouncing animation for the "Scroll down to explore" indicator
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 5,
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

  // Full first screen height (exact viewport height minus sticky header)
  const heroMinHeight = Platform.OS === 'web'
    ? ('calc(100vh - 72px)' as any)
    : (windowHeight ? windowHeight - 72 : 720);

  return (
    <View style={[styles.section, { minHeight: heroMinHeight }]} nativeID="home">
      {/* Center content extended wide from left to right */}
      <View style={styles.container}>
        <View style={[styles.row, stack && styles.rowStack]}>
          {/* Left Column: Headlines & Actions */}
          <View style={[styles.left, stack && styles.leftStack]}>
            <View style={styles.eyebrowBadge}>
              <Text style={styles.eyebrow}>{HERO.eyebrow}</Text>
            </View>

            <Text style={[styles.h1, isMobile && styles.h1Mobile]}>
              <Text style={styles.h1Dark}>{HERO.titleDark}{'\n'}</Text>
              <Text style={styles.h1Green}>{HERO.titleGreen}</Text>
            </Text>

            <Text style={[styles.lead, isMobile && styles.leadMobile]}>
              {HERO.lead}
            </Text>

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

            {/* 3 Badges under buttons */}
            <View style={[styles.badges, isMobile && styles.badgesMobile]}>
              {HERO_BADGES.map((b) => (
                <View key={b.label} style={styles.badgeItem}>
                  <View style={styles.badgeIconCircle}>
                    <Ionicons name={b.icon as any} size={15} color={colors.green} />
                  </View>
                  <Text style={styles.badgeLabel}>{b.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column: Hero Visual Artwork sized for first screen */}
          <View style={[styles.right, stack && styles.rightStack]}>
            <View style={[styles.visualCard, isMobile ? styles.visualCardMobile : (isTablet ? styles.visualCardTablet : styles.visualCardDesktop)]}>
              <Image
                source={require('../../assets/mockup/hero-visual.png')}
                style={styles.heroImage}
                resizeMode="cover"
                accessibilityLabel="Magasool global agricultural exports illustration"
              />
            </View>
          </View>
        </View>
      </View>

      {/* Bottom indicator: Smoothly guides user to the second section on scroll */}
      <View style={styles.scrollIndicatorWrapper}>
        <Pressable
          onPress={() => scrollToSection('export-process')}
          style={styles.scrollIndicatorBtn}
          accessibilityRole="button"
          accessibilityLabel="Scroll down to export process"
        >
          <Text style={styles.scrollIndicatorText}>Scroll to explore</Text>
          <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <Ionicons name="chevron-down" size={17} color={colors.green} />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FAFCFA',
    width: '100%',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF4EF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    width: '100%',
    maxWidth: 1560,
    paddingHorizontal: 36,
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 48 as unknown as number,
    width: '100%',
  },
  rowStack: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 28 as unknown as number,
  },
  left: {
    flex: 1.1,
    paddingRight: 12,
  },
  leftStack: {
    paddingRight: 0,
  },
  eyebrowBadge: {
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.greenDeep,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  h1: {
    fontSize: 46,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 52,
    marginBottom: 18,
  },
  h1Mobile: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.4,
    marginBottom: 14,
  },
  h1Dark: {
    color: colors.ink,
  },
  h1Green: {
    color: colors.greenDeep,
  },
  lead: {
    fontSize: 16,
    lineHeight: 25,
    color: colors.body,
    marginBottom: 28,
    maxWidth: 620,
  },
  leadMobile: {
    fontSize: 14.5,
    lineHeight: 22,
    marginBottom: 20,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  ctaRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    marginBottom: 24,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20 as unknown as number,
    paddingTop: 6,
  },
  badgesMobile: {
    gap: 12 as unknown as number,
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.greenSoft,
    borderWidth: 1,
    borderColor: '#C6E4CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  badgeLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.ink,
  },
  right: {
    flex: 1.25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  rightStack: {
    width: '100%',
    marginTop: 8,
  },
  visualCard: {
    width: '100%',
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: '#E8F5E9',
    ...shadow.card,
  },
  visualCardDesktop: {
    height: 480,
    maxHeight: 520,
  },
  visualCardTablet: {
    height: 380,
  },
  visualCardMobile: {
    height: 260,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  scrollIndicatorWrapper: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  scrollIndicatorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6 as unknown as number,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: '#D3E7D7',
    borderRadius: radius.pill,
    ...shadow.soft,
  },
  scrollIndicatorText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.greenDeep,
    letterSpacing: 0.6,
  },
});
