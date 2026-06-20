import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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
import { PrivacyPolicy } from './src/sections/PrivacyPolicy';
import { FormModalProvider } from './src/forms/FormModalProvider';
import { NavProvider, useNav } from './src/nav/NavProvider';
import { CustomCursor } from './src/ui/CustomCursor';
import { Reveal } from './src/ui/Reveal';

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

  // Jump to the top whenever the page changes so a new route starts at its header.
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
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
        {route === 'privacy' ? <PrivacyPolicy /> : <Home />}
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
