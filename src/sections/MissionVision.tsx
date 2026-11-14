import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { useResponsive } from '../hooks/useResponsive';
import { MISSION_VISION } from '../data';

export function MissionVision() {
  const { isMobile, isTablet } = useResponsive();
  const stack = isMobile || isTablet;

  return (
    <View style={styles.section} nativeID="mission-vision">
      <Container>
        <View style={[styles.row, stack && styles.rowStack]}>
          {/* Mission Card */}
          <View style={[styles.card, stack && styles.cardStack]}>
            <View style={styles.thumbWrap}>
              <Image
                source={MISSION_VISION.mission.image}
                style={styles.thumb}
                resizeMode="cover"
                accessibilityLabel="Magasool Mission - Sourcing with farmers"
              />
            </View>

            <View style={styles.contentWrap}>
              <View style={styles.titleRow}>
                <View style={styles.iconCircle}>
                  <Ionicons name="leaf-outline" size={16} color={colors.greenDeep} />
                </View>
                <Text style={styles.title}>{MISSION_VISION.mission.title}</Text>
              </View>
              <Text style={styles.text}>{MISSION_VISION.mission.text}</Text>
            </View>
          </View>

          {/* Vision Card */}
          <View style={[styles.card, stack && styles.cardStack]}>
            <View style={styles.thumbWrap}>
              <Image
                source={MISSION_VISION.vision.image}
                style={styles.thumb}
                resizeMode="cover"
                accessibilityLabel="Magasool Vision - Global supply port"
              />
            </View>

            <View style={styles.contentWrap}>
              <View style={styles.titleRow}>
                <View style={styles.iconCircle}>
                  <Ionicons name="eye-outline" size={16} color={colors.greenDeep} />
                </View>
                <Text style={styles.title}>{MISSION_VISION.vision.title}</Text>
              </View>
              <Text style={styles.text}>{MISSION_VISION.vision.text}</Text>
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
    paddingVertical: 56,
    borderTopWidth: 1,
    borderTopColor: '#EFF5F0',
  },
  row: {
    flexDirection: 'row',
    gap: 20 as unknown as number,
  },
  rowStack: {
    flexDirection: 'column',
    gap: 18 as unknown as number,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#DFECE2',
    padding: 16,
    gap: 14 as unknown as number,
    ...shadow.soft,
  },
  cardStack: {
    width: '100%',
  },
  thumbWrap: {
    width: 120,
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: '#E8F2EA',
    flexShrink: 0,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  contentWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.greenDeep,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.body,
  },
});
