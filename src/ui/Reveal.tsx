import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import { useInView } from '../hooks/useInView';

type Props = {
  children: React.ReactNode;
  /** Stagger this reveal relative to siblings (ms). */
  delay?: number;
  /** How far (px) the content slides up as it fades in. */
  y?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Fades + slides its children up the first time they scroll into view (web) or
 * on mount (native). Used to give the home page a polished, progressive reveal.
 */
export function Reveal({ children, delay = 0, y = 26, style }: Props) {
  const { ref, inView } = useInView(0.12);
  const v = useRef(new Animated.Value(0)).current;
  const played = useRef(false);

  useEffect(() => {
    if (!inView || played.current) return;
    played.current = true;
    Animated.timing(v, {
      toValue: 1,
      duration: 620,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [inView, delay, v]);

  const translateY = v.interpolate({ inputRange: [0, 1], outputRange: [y, 0] });

  return (
    <Animated.View ref={ref} style={[style, { opacity: v, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}
