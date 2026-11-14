import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow } from '../theme';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useNav, Route } from '../nav/NavProvider';
import { useFormModal } from '../forms/FormModalProvider';
import { trackEvent } from '../analytics/analytics';
import { NAV } from '../data';

const SECTION_IDS: Record<string, string> = {
  Home: 'top',
  'About Us': 'why-choose',
  'Our Products': 'products',
  'Export Process': 'export-process',
  'Mission & Vision': 'mission-vision',
  'Contact Us': 'rfq-form',
};

const ROUTE_FOR: Record<string, Route> = {
  Home: 'home',
  'About Us': 'home',
  'Our Products': 'home',
  'Export Process': 'home',
  'Mission & Vision': 'home',
  'Contact Us': 'home',
};

export function Header() {
  const { isMobile } = useResponsive();
  const { route, navigate } = useNav();
  const { openForm } = useFormModal();
  const [active, setActive] = useState('Home');
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const go = (item: string) => {
    setActive(item);
    trackEvent('nav_click', { item, location: 'header' });
    const targetRoute = ROUTE_FOR[item] ?? 'home';
    if (route !== targetRoute) {
      navigate(targetRoute);
      setTimeout(() => {
        scrollToSection(SECTION_IDS[item] ?? 'top');
      }, 150);
    } else {
      scrollToSection(SECTION_IDS[item] ?? 'top');
    }
  };

  const handleRequestQuote = () => {
    trackEvent('cta_click', { label: 'Request a Quote', location: 'header' });
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const el = document.getElementById('rfq-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    openForm('buyer');
  };

  return (
    <View style={styles.bar}>
      <Container>
        <View style={styles.row}>
          <Pressable
            onPress={() => go('Home')}
            style={styles.brand}
            accessibilityRole="link"
            accessibilityLabel="Magasool — Home"
          >
            <Logo tone="light" height={isMobile ? 36 : 42} showTagline={!isMobile} />
          </Pressable>

          {!isMobile && (
            <View style={styles.nav}>
              {NAV.map((item) => {
                const isActive = item === active;
                return (
                  <Pressable key={item} onPress={() => go(item)} style={styles.navItem}>
                    <Text style={[styles.navText, isActive && styles.navTextActive]}>{item}</Text>
                    {isActive && <View style={styles.navUnderline} />}
                  </Pressable>
                );
              })}
            </View>
          )}

          {!isMobile ? (
            <View style={styles.actions}>
              <Button
                label="Request a Quote"
                variant="orange"
                size="sm"
                icon="paper-plane-outline"
                iconPosition="left"
                onPress={handleRequestQuote}
              />
            </View>
          ) : (
            <Pressable onPress={() => setOpen((o) => !o)} style={styles.burger}>
              <Ionicons name={open ? 'close' : 'menu'} size={26} color={colors.ink} />
            </Pressable>
          )}
        </View>

        {isMobile && open && (
          <View style={styles.mobileMenu}>
            {NAV.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  go(item);
                  setOpen(false);
                }}
                style={styles.mobileItem}
              >
                <Text style={[styles.navText, item === active && styles.navTextActive]}>{item}</Text>
              </Pressable>
            ))}
            <View style={styles.mobileActions}>
              <Button
                label="Request a Quote"
                variant="orange"
                size="md"
                icon="paper-plane-outline"
                iconPosition="left"
                full
                onPress={() => {
                  handleRequestQuote();
                  setOpen(false);
                }}
              />
            </View>
          </View>
        )}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.white,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEFEA',
    ...shadow.soft,
    // @ts-ignore web-only: pin the bar
    position: 'sticky',
    // @ts-ignore
    top: 0,
    zIndex: 50,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  nav: { flexDirection: 'row', alignItems: 'center', gap: 24 as unknown as number },
  navItem: { alignItems: 'center', paddingVertical: 4 },
  navText: { color: colors.body, fontSize: 13.5, fontWeight: '600' },
  navTextActive: { color: colors.green, fontWeight: '700' },
  navUnderline: {
    marginTop: 4,
    height: 2.5,
    width: 22,
    borderRadius: 2,
    backgroundColor: colors.green,
  },
  actions: { flexDirection: 'row', alignItems: 'center' },
  burger: { padding: 4 },
  mobileMenu: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 4 as unknown as number,
  },
  mobileItem: { paddingVertical: 10 },
  mobileActions: { marginTop: 12 },
});
