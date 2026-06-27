/**
 * Magasool design tokens.
 * Green = trust/agriculture, Yellow = action/buyer CTAs (use dark text on yellow surfaces).
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

  yellow: '#F5B301', // golden action color — pair with dark text
  yellowDark: '#C98700', // deeper gold — required markers / accents on light bg

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

/**
 * Glassmorphism tokens (web). Frosted translucent surfaces — pair the `fill`
 * with a `backdropFilter` blur and a hairline light `border` for the "glass"
 * look. Inspired by GlassyUI. Reads best over tinted sections, imagery, or a
 * dimmed modal backdrop (it needs something behind it to blur).
 */
export const glass = {
  fill: 'rgba(255,255,255,0.55)', // cards/panels over tinted backgrounds
  fillStrong: 'rgba(255,255,255,0.74)', // header / modal — needs more legibility
  border: 'rgba(255,255,255,0.65)', // bright top highlight edge
  borderSoft: 'rgba(255,255,255,0.4)',
  blur: 14, // backdrop blur radius (px)
  blurStrong: 22,
} as const;

export const glassShadow = {
  shadowColor: '#0E2C1A',
  shadowOpacity: 0.12,
  shadowRadius: 24,
  shadowOffset: { width: 0, height: 12 },
  elevation: 6,
} as const;

export const font = {
  // System stack keeps the static site dependency-free.
  family: undefined as undefined | string,
};
