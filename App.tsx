import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from './src/theme';
import { Header } from './src/sections/Header';
import { Hero } from './src/sections/Hero';
import { HowItWorks } from './src/sections/HowItWorks';
import { StatsBar } from './src/sections/StatsBar';
import { WhyChoose } from './src/sections/WhyChoose';
import { Testimonials } from './src/sections/Testimonials';
import { CTABanner } from './src/sections/CTABanner';
import { Footer } from './src/sections/Footer';
import { FormModalProvider } from './src/forms/FormModalProvider';

export default function App() {
  return (
    <FormModalProvider>
      <View style={styles.root}>
        <StatusBar style="dark" />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Header />
          <Hero />
          <HowItWorks />
          <StatsBar />
          <WhyChoose />
          <Testimonials />
          <CTABanner />
          <Footer />
        </ScrollView>
      </View>
    </FormModalProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  scroll: { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 0 },
});
