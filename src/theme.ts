/**
 * Magasool design tokens.
 * Green = trust/agriculture, Orange = action/buyer CTAs.
 */
export const colors = {
  green: '#1E7A3D',
  greenDeep: '#15803D',
  greenDark: '#11331F', // footer
  greenStatsFrom: '#1C7A3C',
  greenStatsTo: '#11532A',
  greenAccent: '#2F9E44', // "Source Better", section labels
  greenSoft: '#E7F4EA', // chips / step circles
  greenTint: '#F4FAF5', // alternating section bg

  orange: '#F47A20',
  orangeDark: '#E16A12',

  ink: '#1F2937', // headings
  body: '#4B5563', // paragraphs
  muted: '#6B7280', // captions
  faint: '#9CA3AF',

  border: '#E7EBE8',
  card: '#FFFFFF',
  white: '#FFFFFF',
  star: '#F5B916',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
  xxl: 64,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const layout = {
  maxWidth: 1160,
  gutter: 20,
} as const;

export const shadow = {
  card: {
    shadowColor: '#1A3A22',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  soft: {
    shadowColor: '#1A3A22',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
} as const;

export const font = {
  // System stack keeps the static site dependency-free.
  family: undefined as undefined | string,
};
