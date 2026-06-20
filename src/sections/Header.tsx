import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadow } from '../theme';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useNav } from '../nav/NavProvider';
import { NAV } from '../data';

export function Header() {
  const { isMobile } = useResponsive();
  const { navigate } = useNav();
  const [active, setActive] = useState('Home');
  const [open, setOpen] = useState(false);

  // Home/About/etc. live on the home page; tapping a nav item returns there.
  const go = (item: string) => { setActive(item); navigate('home'); };

  return (
    <View style={styles.bar}>
      <Container>
        <View style={styles.row}>
          <Pressable onPress={() => go('Home')}>
            <Logo height={isMobile ? 64 : 88} />
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
              <Button label="Login" variant="outline" size="sm" icon="person-outline" />
              <Button label="Register" variant="yellow" size="sm" icon="person-add-outline" style={{ marginLeft: 10 }} />
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
              <Button label="Login" variant="outline" size="sm" icon="person-outline" full style={{ flex: 1 }} />
              <Button label="Register" variant="yellow" size="sm" icon="person-add-outline" full style={{ flex: 1, marginLeft: 10 }} />
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadow.soft,
    zIndex: 10,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
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
