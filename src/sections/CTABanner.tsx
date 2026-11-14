import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../theme';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useFormModal } from '../forms/FormModalProvider';
import { trackEvent } from '../analytics/analytics';
import { CTA_BANNER } from '../data';

export function CTABanner() {
  const { isMobile, isTablet } = useResponsive();
  const { openForm } = useFormModal();
  const stack = isMobile || isTablet;

  const scrollToSection = (id: string) => {
    trackEvent('cta_banner_click', { target: id });
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
  };

  const handleRequestQuote = () => {
    trackEvent('cta_banner_click', { target: 'rfq-form' });
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const el = document.getElementById('rfq-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    openForm('buyer');
  };

  return (
    <View style={styles.section}>
      <Container>
        <LinearGradient
          colors={['#145A2B', '#0E3B1C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.banner, stack && styles.bannerStack]}
        >
          <View style={[styles.copyWrap, stack && styles.copyWrapStack]}>
            <Text style={styles.title}>{CTA_BANNER.title}</Text>
            <Text style={styles.subtitle}>{CTA_BANNER.subtitle}</Text>
          </View>

          <View style={[styles.actionWrap, stack && styles.actionWrapStack]}>
            <Button
              label={CTA_BANNER.ctaPrimary}
              variant="orange"
              size="sm"
              icon="arrow-forward"
              iconPosition="right"
              onPress={handleRequestQuote}
            />
            <Button
              label={CTA_BANNER.ctaSecondary}
              variant="green-outline"
              size="sm"
              onPress={() => scrollToSection('products')}
              style={styles.outlineBtn}
            />
          </View>

          {!isMobile && (
            <View style={styles.produceImageWrap}>
              <Image
                source={require('../../assets/mockup/cta-produce.png')}
                style={styles.produceImage}
                resizeMode="cover"
                accessibilityLabel="Fresh produce crates"
              />
            </View>
          )}
        </LinearGradient>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
  },
  banner: {
    borderRadius: radius.md,
    paddingVertical: 24,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  bannerStack: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  copyWrap: {
    flex: 1.5,
    paddingRight: 20,
    zIndex: 2,
  },
  copyWrapStack: {
    paddingRight: 0,
    marginBottom: 16,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12.5,
    lineHeight: 18,
    maxWidth: 500,
  },
  actionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10 as unknown as number,
    zIndex: 2,
  },
  actionWrapStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  outlineBtn: {
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  produceImageWrap: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    width: 140,
    opacity: 0.65,
    overflow: 'hidden',
  },
  produceImage: {
    width: '100%',
    height: '100%',
  },
});
