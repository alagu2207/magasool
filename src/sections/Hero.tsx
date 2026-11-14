import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useFormModal } from '../forms/FormModalProvider';
import { trackEvent } from '../analytics/analytics';
import { HERO_BADGES, HERO } from '../data';

export function Hero() {
  const { isMobile, isTablet } = useResponsive();
  const { openForm } = useFormModal();
  const stack = isMobile || isTablet;

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

  return (
    <View style={styles.section} nativeID="home">
      <Container>
        <View style={[styles.row, stack && styles.rowStack]}>
          {/* Left Column: Headlines & Actions */}
          <View style={[styles.left, stack && styles.leftStack]}>
            <View style={styles.eyebrowBadge}>
              <Text style={styles.eyebrow}>{HERO.eyebrow}</Text>
            </View>

            <Text style={styles.h1}>
              <Text style={styles.h1Dark}>{HERO.titleDark}{'\n'}</Text>
              <Text style={styles.h1Green}>{HERO.titleGreen}</Text>
            </Text>

            <Text style={styles.lead}>{HERO.lead}</Text>

            <View style={styles.ctaRow}>
              <Button
                label={HERO.ctaPrimary}
                variant="green"
                size="md"
                icon="arrow-forward"
                iconPosition="right"
                onPress={() => scrollToSection('products')}
              />
              <Button
                label={HERO.ctaSecondary}
                variant="orange"
                size="md"
                icon="paper-plane-outline"
                iconPosition="left"
                onPress={handleRequestQuote}
                style={{ marginLeft: 12 }}
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

          {/* Right Column: Hero Visual Artwork */}
          <View style={[styles.right, stack && styles.rightStack]}>
            <View style={styles.visualCard}>
              <Image
                source={require('../../assets/mockup/hero-visual.png')}
                style={styles.heroImage}
                resizeMode="cover"
                accessibilityLabel="Magasool global agricultural exports illustration"
              />
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FAFCFA',
    paddingVertical: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF4EF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32 as unknown as number,
  },
  rowStack: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 24 as unknown as number,
  },
  left: {
    flex: 1.15,
    paddingRight: 10,
  },
  leftStack: {
    paddingRight: 0,
  },
  eyebrowBadge: {
    marginBottom: 12,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.greenDeep,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  h1: {
    marginBottom: 16,
  },
  h1Dark: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.5,
    lineHeight: 46,
  },
  h1Green: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.greenDeep,
    letterSpacing: -0.5,
    lineHeight: 46,
  },
  lead: {
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.body,
    marginBottom: 24,
    maxWidth: 520,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10 as unknown as number,
    marginBottom: 28,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 18 as unknown as number,
    paddingTop: 8,
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
    marginRight: 7,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.ink,
  },
  right: {
    flex: 1.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightStack: {
    width: '100%',
    marginTop: 10,
  },
  visualCard: {
    width: '100%',
    aspectRatio: 442 / 180,
    maxHeight: 330,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: '#E8F5E9',
    ...shadow.card,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
});
