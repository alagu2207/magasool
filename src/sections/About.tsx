import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useResponsive } from '../hooks/useResponsive';
import { ABOUT } from '../data';

/**
 * Self-contained flat illustration for the About section: farmer → Magasool → buyer,
 * connected over green fields under the sun ("Empowering Farmers. Connecting Markets.
 * Growing Together."). Kept as an inline SVG data URI so it adds no assets or deps and
 * renders crisply at any size on web.
 */
const ART = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 440" width="720" height="440" role="img" aria-label="Magasool connects farmers and buyers">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F4FAF5"/>
      <stop offset="1" stop-color="#E7F4EA"/>
    </linearGradient>
    <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3FA85B"/>
      <stop offset="1" stop-color="#1E7A3D"/>
    </linearGradient>
  </defs>

  <rect x="1" y="1" width="718" height="438" rx="24" fill="url(#sky)" stroke="#E7EBE8"/>

  <circle cx="612" cy="92" r="52" fill="#F5B301" opacity="0.16"/>
  <circle cx="612" cy="92" r="34" fill="#F5B301"/>

  <path d="M0 330 Q 180 270 360 318 T 720 312 L720 440 L0 440 Z" fill="#BFE3C7"/>

  <g>
    <rect x="58" y="300" width="5" height="20" fill="#7A4F1D"/>
    <circle cx="60" cy="298" r="15" fill="#2F9E44"/>
    <rect x="662" y="296" width="5" height="20" fill="#7A4F1D"/>
    <circle cx="664" cy="294" r="15" fill="#2F9E44"/>
  </g>

  <path d="M0 372 Q 200 322 420 366 T 720 360 L720 440 L0 440 Z" fill="url(#hillFront)"/>

  <path d="M150 188 Q 255 150 360 180 Q 465 210 570 188" fill="none" stroke="#2F9E44" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" opacity="0.55"/>

  <ellipse cx="150" cy="244" rx="40" ry="8" fill="#11331F" opacity="0.07"/>
  <ellipse cx="360" cy="248" rx="46" ry="9" fill="#11331F" opacity="0.08"/>
  <ellipse cx="570" cy="244" rx="40" ry="8" fill="#11331F" opacity="0.07"/>

  <g>
    <circle cx="150" cy="190" r="46" fill="#FFFFFF" stroke="#D8EADD" stroke-width="2"/>
    <path d="M150 214 V186" fill="none" stroke="#1E7A3D" stroke-width="3" stroke-linecap="round"/>
    <path d="M150 200 C 133 201 124 189 126 177 C 143 178 150 189 150 201 Z" fill="#3FA85B"/>
    <path d="M150 192 C 167 193 176 181 174 169 C 157 170 150 181 150 193 Z" fill="#1E7A3D"/>
    <text x="150" y="272" font-size="15.5" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="#1F2937" text-anchor="middle">Farmer</text>
  </g>

  <g>
    <circle cx="360" cy="190" r="50" fill="#FFFFFF" stroke="#2F9E44" stroke-width="3"/>
    <path d="M342 181 H376" fill="none" stroke="#1E7A3D" stroke-width="3" stroke-linecap="round"/>
    <path d="M370 174 L380 181 L370 188" fill="none" stroke="#1E7A3D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M378 199 H344" fill="none" stroke="#1E7A3D" stroke-width="3" stroke-linecap="round"/>
    <path d="M350 192 L340 199 L350 206" fill="none" stroke="#1E7A3D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="360" y="276" font-size="15.5" font-family="Arial, Helvetica, sans-serif" font-weight="800" fill="#1E7A3D" text-anchor="middle">Magasool</text>
  </g>

  <g>
    <circle cx="570" cy="190" r="46" fill="#FFFFFF" stroke="#D8EADD" stroke-width="2"/>
    <path d="M551 185 H589 L593 215 H547 Z" fill="#EAF6ED" stroke="#1E7A3D" stroke-width="3" stroke-linejoin="round"/>
    <path d="M559 185 V179 A11 11 0 0 1 581 179 V185" fill="none" stroke="#1E7A3D" stroke-width="3" stroke-linecap="round"/>
    <text x="570" y="272" font-size="15.5" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="#1F2937" text-anchor="middle">Buyer</text>
  </g>
</svg>`;

const ART_URI = `data:image/svg+xml,${encodeURIComponent(ART)}`;

export function About() {
  const { isMobile, isTablet } = useResponsive();
  const basis = isMobile ? '100%' : isTablet ? '50%' : '25%';

  return (
    <View style={styles.section}>
      <Container>
        <SectionHeading eyebrow={ABOUT.eyebrow} title={ABOUT.tagline} />

        <View style={[styles.row, isMobile && styles.rowMobile]}>
          <View style={[styles.imageCol, isMobile && styles.imageColMobile]}>
            <View style={styles.imageWrap}>
              <Image
                source={{ uri: ART_URI }}
                style={styles.image}
                resizeMode="contain"
                accessibilityLabel="Magasool connects farmers and buyers across the marketplace"
              />
            </View>
          </View>

          <View style={styles.copyCol}>
            {ABOUT.paragraphs.map((p, i) => (
              <Text key={i} style={[styles.para, isMobile && styles.paraMobile]}>{p}</Text>
            ))}
          </View>
        </View>

        <Text style={styles.whyTitle}>{ABOUT.whyTitle}</Text>
        <View style={styles.grid}>
          {ABOUT.why.map((w) => (
            <View key={w.title} style={[styles.cell, { flexBasis: basis as any }]}>
              <View style={styles.card}>
                <View style={styles.iconWrap}>
                  <Ionicons name={w.icon} size={26} color={colors.greenAccent} />
                </View>
                <Text style={styles.cardTitle}>{w.title}</Text>
                <Text style={styles.cardDesc}>{w.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.greenTint, paddingVertical: 64 },

  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 32,
    gap: 40 as unknown as number,
  },
  rowMobile: { flexDirection: 'column', gap: 24 as unknown as number },

  copyCol: { flex: 1, minWidth: 0 as unknown as number },
  imageCol: { flex: 1, maxWidth: 480 },
  imageColMobile: { width: '100%', maxWidth: 520, alignSelf: 'center' },

  imageWrap: {
    width: '100%',
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    overflow: 'hidden',
    ...shadow.card,
  },
  image: { width: '100%', aspectRatio: 720 / 440 },

  para: {
    fontSize: 15,
    lineHeight: 26,
    color: colors.body,
    textAlign: 'left',
    marginBottom: 16,
  },
  paraMobile: { textAlign: 'center' },

  whyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.ink,
    textAlign: 'center',
    marginTop: 44,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 28, marginHorizontal: -9 },
  cell: { paddingHorizontal: 9, marginBottom: 18 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    height: '100%',
    ...shadow.soft,
  },
  iconWrap: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.greenSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  cardTitle: { fontSize: 15.5, fontWeight: '800', color: colors.ink, marginBottom: 9, textAlign: 'center' },
  cardDesc: { fontSize: 13, lineHeight: 20, color: colors.body, textAlign: 'center' },
});
