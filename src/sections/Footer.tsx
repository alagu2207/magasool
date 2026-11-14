import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { useResponsive } from '../hooks/useResponsive';
import { useNav, Route } from '../nav/NavProvider';
import { useFormModal } from '../forms/FormModalProvider';
import { trackEvent } from '../analytics/analytics';
import { FOOTER } from '../data';

const SECTION_IDS: Record<string, string> = {
  Home: 'home',
  'About Us': 'why-choose',
  'Our Products': 'products',
  'Fresh Vegetables': 'products',
  'Fresh Fruits': 'products',
  'Seasonal Produce': 'products',
  'Product Catalogue': 'products',
  'Export Process': 'export-process',
  'Mission & Vision': 'mission-vision',
  'Contact Us': 'rfq-form',
  'Export Enquiries': 'rfq-form',
};

const ROUTE_FOR: Record<string, Route> = {
  'Privacy Policy': 'privacy',
  'Terms & Conditions': 'terms',
};

export function Footer() {
  const { isMobile, isTablet } = useResponsive();
  const { navigate } = useNav();
  const { openForm } = useFormModal();
  const stack = isMobile || isTablet;

  const scrollToSection = (id: string) => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLink = (link: string) => {
    trackEvent('footer_link_click', { link });
    if (link === 'Request a Quote') {
      const el = typeof document !== 'undefined' ? document.getElementById('rfq-form') : null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        openForm('buyer');
      }
      return;
    }

    if (ROUTE_FOR[link]) {
      navigate(ROUTE_FOR[link]);
      return;
    }

    if (SECTION_IDS[link]) {
      navigate('home');
      setTimeout(() => {
        scrollToSection(SECTION_IDS[link]);
      }, 100);
      return;
    }

    navigate('home');
  };

  return (
    <View style={styles.footer} nativeID="contact">
      <Container>
        <View style={[styles.mainRow, stack && styles.mainRowStack]}>
          {/* Brand Column */}
          <View style={[styles.brandCol, stack && styles.brandColStack]}>
            <Logo tone="dark" height={38} showTagline={true} />
            <Text style={styles.brandAbout}>{FOOTER.about}</Text>
            <View style={styles.socialRow}>
              {FOOTER.socials.map((s) => (
                <Pressable
                  key={s.label}
                  style={styles.socialBtn}
                  accessibilityRole="link"
                  accessibilityLabel={s.label}
                  onPress={() => {
                    trackEvent('social_click', { network: s.label, location: 'footer' });
                    Linking.openURL(s.url);
                  }}
                >
                  <Ionicons name={s.icon as any} size={15} color={colors.white} />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Nav Link Columns */}
          <View style={[styles.linksGrid, stack && styles.linksGridStack]}>
            {FOOTER.columns.map((col) => (
              <View key={col.title} style={styles.col}>
                <Text style={styles.colTitle}>{col.title}</Text>
                {col.links.map((link) => (
                  <Pressable key={link} style={styles.linkWrap} onPress={() => handleLink(link)}>
                    <Text style={styles.linkText}>{link}</Text>
                  </Pressable>
                ))}
              </View>
            ))}

            {/* Get In Touch Column */}
            <View style={styles.col}>
              <Text style={styles.colTitle}>{FOOTER.contact.title}</Text>
              <View style={styles.contactItem}>
                <Ionicons name="location-outline" size={13} color="#6EE7B7" style={{ marginTop: 2, marginRight: 6 }} />
                <Text style={styles.contactText}>{FOOTER.contact.address}</Text>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="call-outline" size={13} color="#6EE7B7" style={{ marginTop: 2, marginRight: 6 }} />
                <Text style={styles.contactText}>{FOOTER.contact.phone}</Text>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="mail-outline" size={13} color="#6EE7B7" style={{ marginTop: 2, marginRight: 6 }} />
                <Text style={styles.contactText}>{FOOTER.contact.email}</Text>
              </View>

              <View style={styles.contactItem}>
                <Ionicons name="logo-whatsapp" size={13} color="#6EE7B7" style={{ marginTop: 2, marginRight: 6 }} />
                <Text style={styles.contactText}>{FOOTER.contact.whatsapp}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={[styles.bottomBar, isMobile && styles.bottomBarMobile]}>
          <Text style={styles.copyright}>© 2026 Magasool. All rights reserved.</Text>
          <View style={styles.legalLinks}>
            <Pressable onPress={() => handleLink('Privacy Policy')}>
              <Text style={styles.legalLinkText}>Privacy Policy</Text>
            </Pressable>
            <Text style={styles.legalDivider}>|</Text>
            <Pressable onPress={() => handleLink('Terms & Conditions')}>
              <Text style={styles.legalLinkText}>Terms & Conditions</Text>
            </Pressable>
          </View>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#0D2818',
    paddingTop: 48,
    paddingBottom: 24,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 32 as unknown as number,
  },
  mainRowStack: {
    flexDirection: 'column',
  },
  brandCol: {
    flex: 1.2,
    paddingRight: 16,
  },
  brandColStack: {
    width: '100%',
    paddingRight: 0,
    marginBottom: 28,
  },
  brandAbout: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11.5,
    lineHeight: 18,
    marginTop: 14,
    marginBottom: 16,
    maxWidth: 320,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8 as unknown as number,
  },
  socialBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linksGrid: {
    flex: 2.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16 as unknown as number,
  },
  linksGridStack: {
    flexWrap: 'wrap',
    gap: 20 as unknown as number,
  },
  col: {
    minWidth: 120,
    flex: 1,
  },
  colTitle: {
    color: colors.white,
    fontSize: 12.5,
    fontWeight: '800',
    marginBottom: 12,
  },
  linkWrap: {
    marginBottom: 7,
  },
  linkText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11.5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  contactText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 32,
    marginBottom: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomBarMobile: {
    flexDirection: 'column',
    gap: 8 as unknown as number,
    alignItems: 'center',
  },
  copyright: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legalLinkText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
  },
  legalDivider: {
    color: 'rgba(255,255,255,0.3)',
    marginHorizontal: 8,
    fontSize: 11,
  },
});
