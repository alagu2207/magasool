import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { useResponsive } from '../hooks/useResponsive';
import { TESTIMONIALS } from '../data';

export function Testimonials() {
  const { isMobile, isTablet } = useResponsive();
  const stack = isMobile || isTablet;
  const [activePage, setActivePage] = useState(0);

  const prev = () => {
    setActivePage((p) => (p > 0 ? p - 1 : TESTIMONIALS.length - 1));
  };

  const next = () => {
    setActivePage((p) => (p < TESTIMONIALS.length - 1 ? p + 1 : 0));
  };

  return (
    <View style={styles.section} nativeID="testimonials">
      <Container>
        <View style={styles.header}>
          <Text style={styles.title}>
            Building Trusted <Text style={styles.titleGreen}>Global Partnerships</Text>
          </Text>
          <Text style={styles.subtitle}>
            What our international buyers and business partners say about working with Magasool.
          </Text>
        </View>

        <View style={styles.carouselContainer}>
          {!stack && (
            <Pressable style={styles.navBtn} onPress={prev} accessibilityLabel="Previous testimonial">
              <Ionicons name="chevron-back" size={18} color={colors.body} />
            </Pressable>
          )}

          <View style={[styles.cardsRow, stack && styles.cardsRowStack]}>
            {TESTIMONIALS.map((t, idx) => (
              <View key={t.name} style={[styles.card, stack && styles.cardStack]}>
                <View style={styles.quoteIconWrap}>
                  <Text style={styles.quoteMarks}>“</Text>
                </View>
                <Text style={styles.quoteText}>{t.quote}</Text>

                <View style={styles.authorRow}>
                  <View style={styles.avatarCircle}>
                    <Ionicons name="person" size={16} color={colors.greenDeep} />
                  </View>
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{t.name}</Text>
                    <Text style={styles.authorRole}>{t.role}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {!stack && (
            <Pressable style={styles.navBtn} onPress={next} accessibilityLabel="Next testimonial">
              <Ionicons name="chevron-forward" size={18} color={colors.body} />
            </Pressable>
          )}
        </View>

        <View style={styles.dotsRow}>
          {TESTIMONIALS.map((_, i) => (
            <Pressable key={i} onPress={() => setActivePage(i)}>
              <View style={[styles.dot, i === activePage && styles.dotActive]} />
            </Pressable>
          ))}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 56,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 8,
  },
  titleGreen: {
    color: colors.greenDeep,
  },
  subtitle: {
    fontSize: 13.5,
    color: colors.body,
    textAlign: 'center',
    maxWidth: 600,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12 as unknown as number,
  },
  navBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F6F4',
    borderWidth: 1,
    borderColor: '#DFECE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 16 as unknown as number,
  },
  cardsRowStack: {
    flexDirection: 'column',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#DFECE2',
    padding: 20,
    justifyContent: 'space-between',
    ...shadow.soft,
  },
  cardStack: {
    width: '100%',
  },
  quoteIconWrap: {
    marginBottom: 6,
  },
  quoteMarks: {
    fontSize: 28,
    lineHeight: 24,
    fontWeight: '900',
    color: colors.greenDeep,
  },
  quoteText: {
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.body,
    marginBottom: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.ink,
  },
  authorRole: {
    fontSize: 10.5,
    color: colors.muted,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8 as unknown as number,
    marginTop: 22,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#D1E2D6',
  },
  dotActive: {
    backgroundColor: colors.greenDeep,
    width: 18,
  },
});
