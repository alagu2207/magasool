import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { layout } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Centers content to a max width with consistent page gutters. */
export function Container({ children, style }: Props) {
  return <View style={[styles.outer]}><View style={[styles.inner, style]}>{children}</View></View>;
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: layout.gutter,
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxWidth,
  },
});
