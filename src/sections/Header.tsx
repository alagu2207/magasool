import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow, glass } from '../theme';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useNav, Route } from '../nav/NavProvider';
import { useFormModal } from '../forms/FormModalProvider';
import { trackEvent } from '../analytics/analytics';
import { NAV } from '../data';

/** Map each header nav label to the page it opens. */
const ROUTE_FOR: Record<string, Route> = {
  'About Us': 'about',
  Products: 'products',
  'Contact Us': 'contact',
  'Privacy Policy': 'privacy',
  'Terms & Conditions': 'terms',
};

export function Header() {
  const { isMobile } = useResponsive();
  const { navigate } = useNav();
  const { openForm } = useFormModal();
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  const go = (item: string) => {
    setActive(item);
    trackEvent('nav_click', { item, location: 'header' });
    navigate(ROUTE_FOR[item] ?? 'home');
  };

  return (
    <View style={styles.bar}>
      <Container>
        <View style={styles.row}>
          <Pressable onPress={() => go('Home')} style={styles.brand}>
            <Logo height={isMobile ? 128 : 176} />
            <Text style={[styles.brandTitle, { fontSize: isMobile ? 24 : 34 }]}>Magasool</Text>
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
              <Button label="Farmer" variant="green" size="sm" icon="leaf-outline" onPress={() => openForm('farmer')} />
              <Button label="Buyer" variant="yellow" size="sm" icon="cart-outline" onPress={() => openForm('buyer')} style={{ marginLeft: 10 }} />
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
              <Pressable key={item} onPress={() => { go(item); setOpen(false); }} style={styles.mobileItem}>
                <Text style={[styles.navText, item === active && styles.navTextActive]}>{item}</Text>
              </Pressable>
            ))}
            <View style={styles.mobileActions}>
              <Button label="Farmer" variant="green" size="sm" icon="leaf-outline" full style={{ flex: 1 }} onPress={() => { openForm('farmer'); setOpen(false); }} />
              <Button label="Buyer" variant="yellow" size="sm" icon="cart-outline" full style={{ flex: 1, marginLeft: 10 }} onPress={() => { openForm('buyer'); setOpen(false); }} />
            </View>
          </View>
        )}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: glass.fillStrong,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: glass.borderSoft,
    // web-only: frost content scrolling beneath the bar
    // @ts-ignore
    backdropFilter: 'blur(18px) saturate(140%)',
    // @ts-ignore
    WebkitBackdropFilter: 'blur(18px) saturate(140%)',
    ...shadow.soft,
    // @ts-ignore web-only: pin the bar so the frosted blur reads as you scroll
    position: 'sticky',
    // @ts-ignore
    top: 0,
    zIndex: 10,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 as unknown as number },
  brandTitle: { color: colors.green, fontWeight: '800', letterSpacing: -0.5 },
  nav: { flexDirection: 'row', alignItems: 'center', gap: 26 as unknown as number },
  navItem: { alignItems: 'center' },
  navText: { color: colors.body, fontSize: 14.5, fontWeight: '600' },
  navTextActive: { color: colors.green, fontWeight: '700' },
  navUnderline: {
    marginTop: 5,
    height: 2,
    width: 18,
    borderRadius: 2,
    backgroundColor: colors.green,
  },
  actions: { flexDirection: 'row', alignItems: 'center' },
  burger: { padding: 4 },
  mobileMenu: { marginTop: 12, gap: 4 as unknown as number },
  mobileItem: { paddingVertical: 10 },
  mobileActions: { flexDirection: 'row', marginTop: 10 },
});
