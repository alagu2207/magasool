/** All landing-page copy in one place so sections stay presentational. */

export const NAV = ['Home', 'About', 'How It Works', 'Products', 'Contact'];

export const HERO_BADGES = [
  { icon: 'shield-checkmark' as const, label: 'Verified Network' },
  { icon: 'cash-outline' as const, label: 'Fair & Transparent' },
  { icon: 'headset' as const, label: 'End-to-End Support' },
];

export const HERO_FLOW = [
  { emoji: '👨‍🌾', role: 'Farmer', desc: 'Lists produce\nfrom the farm', tint: '#E8F3E9' },
  { emoji: '🧑‍💼', role: 'Sales Executive', desc: 'Connects, negotiates\n& ensures quality', tint: '#E5F0FB' },
  { emoji: '🧑‍🔧', role: 'Buyer', desc: 'Sources quality produce\nat the best price', tint: '#FBEFE6' },
];

export const STEPS = [
  {
    no: '01',
    icon: 'account-hard-hat' as const,
    title: 'For Farmers',
    desc: 'Register, list your produce, and get connected with verified buyers through our sales executives.',
  },
  {
    no: '02',
    icon: 'briefcase-outline' as const,
    title: 'For Buyers',
    desc: 'Submit your requirements, connect with our sales team, and get the best quality at fair prices.',
  },
  {
    no: '03',
    icon: 'account-group-outline' as const,
    title: 'For Sales Team',
    desc: 'Our sales executives bridge the gap between farmers and buyers and ensure smooth transactions.',
  },
];

export const STATS = [
  { icon: 'people' as const, value: '15,000+', label: 'Verified Farmers' },
  { icon: 'briefcase' as const, value: '2,500+', label: 'Active Buyers' },
  { icon: 'swap-horizontal' as const, value: '1,20,000+', label: 'Transactions' },
  { icon: 'cash' as const, value: '₹350 Cr+', label: 'Revenue Generated' },
];

export const WHY = [
  {
    icon: 'shield-checkmark' as const,
    title: 'Verified Farmers',
    desc: 'We onboard only verified farmers to ensure quality and trust.',
  },
  {
    icon: 'pricetags' as const,
    title: 'Fair Pricing',
    desc: 'Transparent pricing and better margins for both farmers and buyers.',
  },
  {
    icon: 'person' as const,
    title: 'Dedicated Sales Executive',
    desc: 'Personalized support from dedicated executives for seamless communication.',
  },
  {
    icon: 'headset' as const,
    title: 'End-to-End Support',
    desc: 'From inquiry to delivery, we provide complete assistance.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Magasool helped us sell our bananas at a better price with genuine buyers. The sales team is very supportive.',
    name: 'Ramesh Patil',
    role: 'Farmer, Nashik',
    emoji: '👨‍🌾',
  },
  {
    quote:
      'We get consistent quality and timely supply. Magasool understands our requirements well.',
    name: 'Vikram Mehta',
    role: 'Buyer, Mumbai',
    emoji: '🧑‍💼',
  },
  {
    quote:
      'Being a sales executive with Magasool has helped me build strong relationships and grow my business.',
    name: 'Sandeep Kumar',
    role: 'Sales Executive',
    emoji: '🧑‍🔧',
  },
];

export const FOOTER = {
  columns: [
    { title: 'Quick Links', links: ['Home', 'About Us', 'How It Works', 'Products', 'Contact Us'] },
    { title: 'For Farmers', links: ['Register as Farmer', 'List Your Produce', 'Farmer Support', 'Pricing Insights'] },
    { title: 'For Buyers', links: ['Submit Requirement', 'Find Products', 'Buyer Support', 'Log in'] },
    { title: 'Support', links: ['Help Center', 'Terms & Conditions', 'Privacy Policy', 'Contact Support'] },
  ],
  socials: ['logo-facebook', 'logo-twitter', 'logo-linkedin', 'logo-instagram'] as const,
};
