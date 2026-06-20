import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useFormModal } from '../forms/FormModalProvider';

export function CTABanner() {
  const { isMobile } = useResponsive();
  const { openForm } = useFormModal();
  return (
    <View style={styles.section}>
      <Container>
        <LinearGradient
          colors={['#1E7A3D', '#15692F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.banner, isMobile && styles.bannerStack]}
        >
          <View style={[styles.left, isMobile && styles.leftStack]}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="sprout" size={26} color={colors.white} />
            </View>
            <View style={styles.copy}>
              <Text style={styles.title}>Ready to Grow Together?</Text>
              <Text style={styles.sub}>
                Join Magasool today — a trusted network where farmers and buyers connect,
                trade fairly, and grow together.
              </Text>
            </View>
          </View>

          <View style={[styles.actions, isMobile && styles.actionsStack]}>
            <Button label="Join as Farmer" variant="outline" icon="paper-plane-outline" onPress={() => openForm('farmer')} style={styles.joinFarmer} />
            <Button label="Join as Buyer" variant="yellow" icon="cart-outline" onPress={() => openForm('buyer')} style={!isMobile ? { marginLeft: 12 } : { marginTop: 10 }} />
          </View>
        </LinearGradient>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.white, paddingVertical: 28 },
  banner: {
    borderRadius: radius.lg,
    paddingVertical: 30,
    paddingHorizontal: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  bannerStack: { flexDirection: 'column', alignItems: 'flex-start' },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 20 },
  leftStack: { paddingRight: 0, marginBottom: 18 },
  iconCircle: {
    width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center', marginRight: 18,
  },
  copy: { flex: 1 },
  title: { color: colors.white, fontSize: 24, fontWeight: '800', marginBottom: 6 },
  sub: { color: 'rgba(255,255,255,0.88)', fontSize: 13.5, lineHeight: 20, maxWidth: 520 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  actionsStack: { flexDirection: 'column', alignItems: 'stretch', alignSelf: 'stretch' },
  joinFarmer: { backgroundColor: colors.white, borderColor: colors.white },
});
