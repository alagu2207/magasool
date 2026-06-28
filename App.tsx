import React, { useEffect, useRef } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Web: serve the icon fonts from a clean /fonts path. Expo's export emits them
// under /assets/node_modules/... which Cloudflare Pages does NOT serve, so the
// glyphs fall back to empty boxes. Declaring @font-face against our self-hosted
// copies (public/fonts/*) fixes it. Family names are read from each icon set so
// they always match what the <Icon> components request ('ionicons' etc.).
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const faces: Array<[string, string]> = [
    [Object.keys(Ionicons.font)[0], '/fonts/Ionicons.ttf'],
    [Object.keys(MaterialCommunityIcons.font)[0], '/fonts/MaterialCommunityIcons.ttf'],
  ];
  const css = faces
    .map(([family, url]) => `@font-face{font-family:'${family}';src:url('${url}') format('truetype');font-display:block;}`)
    .join('');
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

import { colors } from './src/theme';
import { Header } from './src/sections/Header';
import { Hero } from './src/sections/Hero';
import { About } from './src/sections/About';
import { HowItWorks } from './src/sections/HowItWorks';
import { StatsBar } from './src/sections/StatsBar';
import { WhyChoose } from './src/sections/WhyChoose';
import { Testimonials } from './src/sections/Testimonials';
import { CTABanner } from './src/sections/CTABanner';
import { Footer } from './src/sections/Footer';
import { AboutPage } from './src/sections/AboutPage';
import { ProductsPage } from './src/sections/ProductsPage';
import { ContactPage } from './src/sections/ContactPage';
import { TermsPage } from './src/sections/TermsPage';
import { PrivacyPolicy } from './src/sections/PrivacyPolicy';
import { FormModalProvider } from './src/forms/FormModalProvider';
import { NavProvider, useNav } from './src/nav/NavProvider';
import { CustomCursor } from './src/ui/CustomCursor';
import { Reveal } from './src/ui/Reveal';
import { initAnalytics, trackPageView } from './src/analytics/analytics';

/** Route -> URL path + readable title, used for analytics page views. */
const PAGE_INFO: Record<string, { path: string; title: string }> = {
  home: { path: '/', title: 'Home — Magasool' },
  about: { path: '/about', title: 'About Us — Magasool' },
  products: { path: '/products', title: 'Products — Magasool' },
  contact: { path: '/contact', title: 'Contact Us — Magasool' },
  terms: { path: '/terms', title: 'Terms & Conditions — Magasool' },
  privacy: { path: '/privacy', title: 'Privacy Policy — Magasool' },
};

function Home() {
  return (
    <>
      <Hero />
      <Reveal><About /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><StatsBar /></Reveal>
      <Reveal><WhyChoose /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><CTABanner /></Reveal>
    </>
  );
}

function AppShell() {
  const { route } = useNav();
  const scrollRef = useRef<ScrollView>(null);

  // Boot the analytics SDKs once, after the first render.
  useEffect(() => {
    initAnalytics();
  }, []);

  // Jump to the top whenever the page changes, and report the page view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    const info = PAGE_INFO[route] ?? { path: `/${route}`, title: route };
    trackPageView(info.path, info.title);
  }, [route]);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <CustomCursor />
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        {route === 'privacy' ? (
          <PrivacyPolicy />
        ) : route === 'about' ? (
          <AboutPage />
        ) : route === 'products' ? (
          <ProductsPage />
        ) : route === 'contact' ? (
          <ContactPage />
        ) : route === 'terms' ? (
          <TermsPage />
        ) : (
          <Home />
        )}
        <Footer />
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <NavProvider>
      <FormModalProvider>
        <AppShell />
      </FormModalProvider>
    </NavProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  scroll: { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 0 },
});
