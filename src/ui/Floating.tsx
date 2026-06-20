import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  /** How far (px) it drifts up/down. */
  amplitude?: number;
  /** One half-cycle duration (ms). */
  duration?: number;
  /** Start offset so multiple floats don't move in lockstep. */
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Wraps content in a gentle, infinite vertical bob — used to give the
 * Privacy Policy illustrations a subtle "alive" feel. Mirrors Reveal's
 * non-native-driver approach so it works identically on web and native.
 */
export function Floating({ children, amplitude = 10, duration = 2600, delay = 0, style }: Props) {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(v, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, duration, delay]);

  const translateY = v.interpolate({ inputRange: [0, 1], outputRange: [0, -amplitude] });

  return <Animated.View style={[style, { transform: [{ translateY }] }]}>{children}</Animated.View>;
}
