import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { useResponsive } from '../hooks/useResponsive';
import { EXPORT_PROCESS } from '../data';

export function HowItWorks() {
  const { isMobile, isTablet } = useResponsive();
  const stack = isMobile || isTablet;

  return (
    <View style={styles.section} nativeID="export-process">
      <Container>
        <View style={styles.header}>
          <Text style={styles.title}>
            From Farm to <Text style={styles.titleHighlight}>{EXPORT_PROCESS.highlight}</Text>
          </Text>
          <Text style={styles.subtitle}>{EXPORT_PROCESS.subtitle}</Text>
        </View>

        <View style={[styles.stepsRow, stack && styles.stepsRowStack]}>
          {EXPORT_PROCESS.steps.map((step, index) => (
            <React.Fragment key={step.no}>
              <View style={[styles.cardWrap, stack && styles.cardWrapStack]}>
                <View style={styles.card}>
                  {/* Step number badge */}
                  <View style={styles.numBadge}>
                    <Text style={styles.numText}>{step.no}</Text>
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.imageWrap}>
                      <Image
                        source={step.image}
                        style={styles.stepImage}
                        resizeMode="cover"
                        accessibilityLabel={step.title}
                      />
                    </View>

                    <View style={styles.infoWrap}>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      <Text style={styles.stepDesc}>{step.desc}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {!stack && index < EXPORT_PROCESS.steps.length - 1 && (
                <View style={styles.arrowWrap}>
                  <Ionicons name="arrow-forward" size={20} color={colors.greenAccent} />
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
    paddingVertical: 56,
  },
  header: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 10,
  },
  titleHighlight: {
    color: colors.greenDeep,
  },
  subtitle: {
    fontSize: 14,
    color: colors.body,
    textAlign: 'center',
    maxWidth: 640,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepsRowStack: {
    flexDirection: 'column',
    gap: 16 as unknown as number,
  },
  cardWrap: {
    flex: 1,
    position: 'relative',
  },
  cardWrapStack: {
    width: '100%',
  },
  card: {
    backgroundColor: '#F9FCF9',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2EEE5',
    padding: 16,
    paddingTop: 18,
    position: 'relative',
    ...shadow.soft,
  },
  numBadge: {
    position: 'absolute',
    top: -12,
    left: 16,
    backgroundColor: colors.greenDeep,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
    zIndex: 2,
  },
  numText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12 as unknown as number,
  },
  imageWrap: {
    width: 68,
    height: 52,
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: '#E5EFE7',
    flexShrink: 0,
  },
  stepImage: {
    width: '100%',
    height: '100%',
  },
  infoWrap: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 6,
  },
  stepDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.body,
  },
  arrowWrap: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
