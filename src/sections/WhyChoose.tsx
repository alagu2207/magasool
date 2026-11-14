import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { useResponsive } from '../hooks/useResponsive';
import { WHY_CHOOSE } from '../data';

export function WhyChoose() {
  const { isMobile, isTablet } = useResponsive();
  const basis = isMobile ? '100%' : isTablet ? '50%' : '25%';

  return (
    <View style={styles.section} nativeID="why-choose">
      <Container>
        <View style={styles.header}>
          <Text style={styles.title}>
            Why Choose <Text style={styles.titleGreen}>Magasool?</Text>
          </Text>
        </View>

        <View style={styles.grid}>
          {WHY_CHOOSE.map((item) => (
            <View key={item.title} style={[styles.cell, { flexBasis: basis as any }]}>
              <View style={styles.card}>
                <View style={styles.iconCircle}>
                  <Ionicons name={item.icon} size={24} color={colors.greenDeep} />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
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
    borderBottomWidth: 1,
    borderBottomColor: '#EFF5F0',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
  },
  titleGreen: {
    color: colors.greenDeep,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  cell: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2EEE5',
    padding: 20,
    height: '100%',
    ...shadow.soft,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.greenSoft,
    borderWidth: 1,
    borderColor: '#CDE5D3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.body,
  },
});
