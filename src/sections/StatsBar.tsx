import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TextStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container } from '../ui/Container';
import { useResponsive } from '../hooks/useResponsive';
import { useInView } from '../hooks/useInView';
import { STATS } from '../data';

/** Group a whole number with the Indian system, e.g. 120000 -> "1,20,000". */
function formatIndian(n: number): string {
  const s = String(n);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
}

/** Splits e.g. "₹350 Cr+" -> { prefix:"₹", target:350, suffix:" Cr+" }. */
function parseStat(value: string) {
  const m = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!m) return { prefix: '', target: 0, suffix: value };
  return { prefix: m[1], target: parseFloat(m[2].replace(/,/g, '')) || 0, suffix: m[3] };
}

/** Counts up from 0 to the stat value the first time it scrolls into view. */
function CountUp({ value, style }: { value: string; style: StyleProp<TextStyle> }) {
  const { prefix, target, suffix } = parseStat(value);
  const { ref, inView } = useInView(0.3);
  const v = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const id = v.addListener(({ value: val }) => {
      setDisplay(`${prefix}${formatIndian(Math.round(val))}${suffix}`);
    });
    return () => v.removeListener(id);
  }, [prefix, suffix, v]);

  useEffect(() => {
    if (!inView) return;
    Animated.timing(v, {
      toValue: target,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [inView, target, v]);

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
              <Ionicons name={s.icon} size={26} color={colors.white} style={{ marginBottom: 8 }} />
              <CountUp value={s.value} style={styles.value} />
              <Text style={styles.label}>{s.label}</Text>
            </View>
          ))}
        </LinearGradient>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.white, paddingVertical: 28 },
  bar: {
    flexDirection: 'row',
    borderRadius: radius.md,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  barStack: { flexWrap: 'wrap' },
  item: { flex: 1, alignItems: 'center', paddingHorizontal: 8 },
  itemMobile: { flexBasis: '50%', flex: 0, marginBottom: 18 },
  itemBorder: { borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.18)' },
  value: { color: colors.white, fontSize: 24, fontWeight: '800' },
  label: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 4 },
});
