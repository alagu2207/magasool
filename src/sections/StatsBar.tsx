import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TextStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container } from '../ui/Container';
import { useResponsive } from '../hooks/useResponsive';
import { useInView } from '../hooks/useInView';
import { STATS } from '../data';

function formatIndian(n: number): string {
  const s = String(n);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
}

function parseStat(value: string) {
  const m = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!m) return { isNumeric: false, prefix: '', target: 0, suffix: value };
  return { isNumeric: true, prefix: m[1], target: parseFloat(m[2].replace(/,/g, '')) || 0, suffix: m[3] };
}

function StatDisplay({ value, style }: { value: string; style: StyleProp<TextStyle> }) {
  const { isNumeric, prefix, target, suffix } = parseStat(value);
  const { ref, inView } = useInView(0.3);
  const v = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(isNumeric ? `${prefix}0${suffix}` : value);

  useEffect(() => {
    if (!isNumeric) return;
    const id = v.addListener(({ value: val }) => {
      setDisplay(`${prefix}${formatIndian(Math.round(val))}${suffix}`);
    });
    return () => v.removeListener(id);
  }, [isNumeric, prefix, suffix, v]);

  useEffect(() => {
    if (!isNumeric || !inView) return;
    Animated.timing(v, {
      toValue: target,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [isNumeric, inView, target, v]);

  return (
    <Text ref={ref} style={style}>
      {display}
    </Text>
  );
}

export function StatsBar() {
  const { isMobile } = useResponsive();
  return (
    <View style={styles.section}>
      <Container>
        <LinearGradient
          colors={[colors.greenStatsFrom, colors.greenStatsTo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bar, isMobile && styles.barStack]}
        >
          {STATS.map((s, i) => (
            <View
              key={s.label}
              style={[
                styles.item,
                isMobile && styles.itemMobile,
                !isMobile && i < STATS.length - 1 && styles.itemBorder,
              ]}
            >
              <Ionicons name={s.icon as any} size={24} color={colors.white} style={{ marginBottom: 6 }} />
              <StatDisplay value={s.value} style={styles.value} />
              <Text style={styles.label}>{s.label}</Text>
            </View>
          ))}
        </LinearGradient>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.white, paddingVertical: 20 },
  bar: {
    flexDirection: 'row',
    borderRadius: radius.md,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  barStack: { flexWrap: 'wrap' },
  item: { flex: 1, alignItems: 'center', paddingHorizontal: 8 },
  itemMobile: { flexBasis: '50%', flex: 0, marginBottom: 16 },
  itemBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.2)' },
  value: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
