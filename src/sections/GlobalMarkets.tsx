import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, radius, shadow } from '../theme';
import { Container } from '../ui/Container';
import { useResponsive } from '../hooks/useResponsive';
import { GLOBAL_MARKETS } from '../data';

export function GlobalMarkets() {
  const { isMobile, isTablet } = useResponsive();
  const stack = isMobile || isTablet;

  return (
    <View style={styles.section} nativeID="global-markets">
      <Container>
        <View style={styles.header}>
          <Text style={styles.title}>
            Connecting Indian Produce with <Text style={styles.titleGreen}>{GLOBAL_MARKETS.highlight}</Text>
          </Text>
          <Text style={styles.subtitle}>{GLOBAL_MARKETS.subtitle}</Text>
        </View>

        {/* 4 Country Cards */}
        <View style={[styles.destinationsRow, stack && styles.destinationsRowStack]}>
          {GLOBAL_MARKETS.destinations.map((dest) => (
            <View key={dest.country} style={[styles.destCard, stack && styles.destCardStack]}>
              <View style={styles.flagCircle}>
                <Text style={styles.flagEmoji}>{dest.flag}</Text>
              </View>
              <View style={styles.destInfo}>
                <Text style={styles.countryName}>{dest.country}</Text>
                <Text style={styles.countryNote}>{dest.note}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Map & Logistics Visual Composite */}
        <View style={[styles.visualRow, stack && styles.visualRowStack]}>
          {/* Stylized Route Map Graphic (SVG) */}
          <View style={styles.mapContainer}>
            {/* World Map SVG with Trade Route Arcs */}
            <svg
              viewBox="0 0 760 300"
              style={{ width: '100%', height: '100%', minHeight: 220 }}
              role="img"
              aria-label="Global export map with routes from India"
            >
              <defs>
                <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F7FAF8" />
                  <stop offset="1" stopColor="#EEF6F0" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1E7A3D" floodOpacity="0.3" />
                </filter>
              </defs>

              <rect width="760" height="300" rx="14" fill="url(#mapBg)" stroke="#E2EDE5" />

              {/* Simplified World Continents Silhouettes */}
              <g fill="#D5E6D9" opacity="0.85">
                {/* Europe & Africa */}
                <path d="M 240,60 Q 280,50 310,70 Q 330,100 300,140 Q 290,190 320,240 Q 280,260 250,210 Q 230,150 240,90 Z" />
                {/* Asia / India */}
                <path d="M 360,50 Q 480,40 550,80 Q 560,130 500,160 Q 450,170 420,130 Q 390,90 360,50 Z" />
                {/* India Peninsula */}
                <path d="M 410,130 L 445,130 L 428,185 Z" fill="#2E8B4E" />
                {/* Southeast Asia */}
                <path d="M 510,150 Q 550,170 540,200 Q 500,210 500,170 Z" />
                {/* Australia */}
                <path d="M 580,200 Q 660,190 670,240 Q 610,270 570,240 Z" />
                {/* Middle East */}
                <path d="M 330,110 Q 380,105 380,140 Q 340,155 330,120 Z" />
              </g>

              {/* Trade Route Arcs from India (428, 155) */}
              {/* Route to UAE (360, 125) */}
              <path
                d="M 428,155 Q 394,120 360,125"
                fill="none"
                stroke="#E65100"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
              {/* Route to Singapore/Malaysia (520, 175) */}
              <path
                d="M 428,155 Q 470,185 520,175"
                fill="none"
                stroke="#1E7A3D"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
              {/* Route to Australia (610, 230) */}
              <path
                d="M 428,155 Q 520,230 610,230"
                fill="none"
                stroke="#1E7A3D"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />

              {/* India Origin Hub Beacon */}
              <circle cx="428" cy="155" r="9" fill="#15803D" opacity="0.25" />
              <circle cx="428" cy="155" r="5" fill="#15803D" filter="url(#glow)" />
              <circle cx="428" cy="155" r="2.5" fill="#FFFFFF" />
              <text x="428" y="142" fontSize="10" fontWeight="bold" fill="#15803D" textAnchor="middle">
                India (Hub)
              </text>

              {/* UAE Destination Pin */}
              <circle cx="360" cy="125" r="4.5" fill="#E65100" />
              <text x="360" y="114" fontSize="9" fontWeight="bold" fill="#111827" textAnchor="middle">
                UAE
              </text>

              {/* Singapore & Malaysia Destination Pin */}
              <circle cx="520" cy="175" r="4.5" fill="#15803D" />
              <text x="520" y="165" fontSize="9" fontWeight="bold" fill="#111827" textAnchor="middle">
                SG / MY
              </text>

              {/* Australia Destination Pin */}
              <circle cx="610" cy="230" r="4.5" fill="#15803D" />
              <text x="610" y="220" fontSize="9" fontWeight="bold" fill="#111827" textAnchor="middle">
                Australia
              </text>
            </svg>
          </View>

          {/* Port / Terminal Image on Right */}
          <View style={styles.portImageWrap}>
            <Image
              source={require('../../assets/mockup/global-port.png')}
              style={styles.portImage}
              resizeMode="cover"
              accessibilityLabel="International shipping port cargo terminal"
            />
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 56,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.ink,
    letterSpacing: -0.3,
    textAlign: 'center',
    marginBottom: 8,
  },
  titleGreen: {
    color: colors.greenDeep,
  },
  subtitle: {
    fontSize: 13.5,
    color: colors.body,
    textAlign: 'center',
    maxWidth: 620,
  },
  destinationsRow: {
    flexDirection: 'row',
    gap: 12 as unknown as number,
    marginBottom: 24,
  },
  destinationsRowStack: {
    flexWrap: 'wrap',
  },
  destCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DFECE2',
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    ...shadow.soft,
  },
  destCardStack: {
    flexBasis: '48%',
    flex: 0,
    marginBottom: 8,
  },
  flagCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  flagEmoji: {
    fontSize: 18,
  },
  destInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.ink,
  },
  countryNote: {
    fontSize: 10,
    color: colors.muted,
  },
  visualRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 16 as unknown as number,
  },
  visualRowStack: {
    flexDirection: 'column',
  },
  mapContainer: {
    flex: 2,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  portImageWrap: {
    flex: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: '#E8F2EA',
    minHeight: 180,
    ...shadow.soft,
  },
  portImage: {
    width: '100%',
    height: '100%',
  },
});
