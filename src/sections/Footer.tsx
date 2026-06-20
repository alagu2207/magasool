import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../nav/NavProvider';
import { FOOTER } from '../data';

export function Footer() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  const colBasis = isMobile ? '50%' : isTablet ? '33%' : 'auto';

  // The site is single-page; route the Privacy link to its page and other links home.
  const handleLink = (link: string) => navigate(link === 'Privacy Policy' ? 'privacy' : 'home');

  return (
    <View style={styles.footer}>
      <Container>
        <View style={[styles.top, (isMobile || isTablet) && styles.topStack]}>
          {/* Brand block */}
          <View style={[styles.brand, (isMobile || isTablet) && styles.brandStack]}>
            <Logo tone="dark" showTagline={false} height={50} />
            <Text style={styles.brandText}>
              Connecting farmers and buyers through the Magasool team, for a stronger agricultural ecosystem.
            </Text>
            <View style={styles.socials}>
              {FOOTER.socials.map((s) => (
                <Pressable key={s} style={styles.socialBtn}>
                  <Ionicons name={s as any} size={16} color={colors.white} />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Link columns */}
          <View style={[styles.cols, (isMobile || isTablet) && styles.colsStack]}>
            {FOOTER.columns.map((col) => (
              <View key={col.title} style={[styles.col, { flexBasis: colBasis as any }]}>
                <Text style={styles.colTitle}>{col.title}</Text>
                {col.links.map((link) => (
                  <Pressable key={link} style={styles.linkWrap} onPress={() => handleLink(link)}>
                    <Text style={styles.link}>{link}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.copyright}>© 2025 Magasool. All rights reserved.</Text>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { backgroundColor: colors.greenDark, paddingTop: 52, paddingBottom: 24 },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  topStack: { flexDirection: 'column' },
  brand: { width: 280, paddingRight: 30 },
  brandStack: { width: '100%', paddingRight: 0, marginBottom: 34 },
  brandText: { color: 'rgba(255,255,255,0.6)', fontSize: 12.5, lineHeight: 20, marginTop: 16 },
  socials: { flexDirection: 'row', marginTop: 18, gap: 10 as unknown as number },
  socialBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  cols: { flexDirection: 'row', flex: 1, justifyContent: 'space-between' },
  colsStack: { flexWrap: 'wrap' },
  col: { paddingRight: 20, marginBottom: 18 },
  colTitle: { color: colors.white, fontSize: 14, fontWeight: '800', marginBottom: 14 },
  linkWrap: { marginBottom: 9 },
  link: { color: 'rgba(255,255,255,0.62)', fontSize: 12.5 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginTop: 30, marginBottom: 18 },
  copyright: { color: 'rgba(255,255,255,0.5)', fontSize: 12, textAlign: 'center' },
});
