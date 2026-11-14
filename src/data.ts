/** All landing-page copy in one place so sections stay presentational. */

export const NAV = ['Home', 'About Us', 'Our Products', 'Export Process', 'Mission & Vision', 'Contact Us'];

export const HERO_BADGES = [
  { icon: 'shield-checkmark' as const, label: 'Quality-Focused Sourcing' },
  { icon: 'leaf' as const, label: 'Fresh Produce Supply' },
  { icon: 'globe' as const, label: 'Global Export Services' },
];

export const HERO = {
  eyebrow: 'INDIAN AGRICULTURE • GLOBAL EXPORTS',
  titleDark: 'Fresh from Indian Farms.',
  titleGreen: 'Delivered to the World.',
  lead: 'Discover premium-quality Indian vegetables and fruits, carefully sourced and supplied to international markets. Your trusted partner for fresh produce exports.',
  ctaPrimary: 'Explore Our Products',
  ctaSecondary: 'Request a Quote',
};

export const EXPORT_PROCESS = {
  title: 'From Farm to Global Markets',
  highlight: 'Global Markets',
  subtitle: "Bringing India's agricultural richness to international customers through a streamlined export process.",
  steps: [
    {
      no: '01',
      title: 'Product Sourcing',
      desc: 'We source fresh vegetables and fruits through our local agricultural network, prioritizing freshness and quality.',
      image: require('../assets/mockup/process-sourcing.png'),
    },
    {
      no: '02',
      title: 'Quality & Packaging',
      desc: 'Our export process focuses on product inspection, grading, appropriate packaging, and handling requirements.',
      image: require('../assets/mockup/process-quality.png'),
    },
    {
      no: '03',
      title: 'Global Export',
      desc: "We coordinate export operations and international supply to meet our buyers' requirements.",
      image: require('../assets/mockup/process-export.png'),
    },
  ],
};

export type ProduceCategory = 'All Products' | 'Vegetables' | 'Fruits' | 'Flowers';

export interface ProduceItem {
  id: string;
  name: string;
  category: 'Vegetable' | 'Fruit' | 'Flower';
  origin: string;
  available: string;
  price: string;
  moq: string;
  image: any;
}

export const PRODUCE_CATEGORIES: ProduceCategory[] = ['All Products', 'Vegetables', 'Fruits', 'Flowers'];

export const PRODUCE_ITEMS: ProduceItem[] = [
  {
    id: 'red-onion',
    name: 'Fresh Red Onion',
    category: 'Vegetable',
    origin: 'India',
    available: 'Year Round',
    price: '$[Price] / MT',
    moq: 'MOQ: [XX] MT',
    image: require('../assets/mockup/prod-onion.png'),
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'Vegetable',
    origin: 'India',
    available: 'Year Round',
    price: '$[Price] / kg',
    moq: 'MOQ: [XX] kg',
    image: require('../assets/mockup/prod-tomato.png'),
  },
  {
    id: 'green-chilli',
    name: 'Green Chilli',
    category: 'Vegetable',
    origin: 'India',
    available: 'Year Round',
    price: '$[Price] / kg',
    moq: 'MOQ: [XX] kg',
    image: require('../assets/mockup/prod-chilli.png'),
  },
  {
    id: 'greens',
    name: 'Greens',
    category: 'Vegetable',
    origin: 'India',
    available: 'Year Round',
    price: '$[Price] / kg',
    moq: 'MOQ: [XX] kg',
    image: require('../assets/mockup/prod-greens.png'),
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'Fruit',
    origin: 'India',
    available: 'Seasonal',
    price: '$[Price] / kg',
    moq: 'MOQ: [XX] kg',
    image: require('../assets/mockup/prod-mango.png'),
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'Fruit',
    origin: 'India',
    available: 'Year Round',
    price: '$[Price] / MT',
    moq: 'MOQ: [XX] MT',
    image: require('../assets/mockup/prod-banana.png'),
  },
  {
    id: 'papaya',
    name: 'Papaya',
    category: 'Fruit',
    origin: 'India',
    available: 'Year Round',
    price: '$[Price] / kg',
    moq: 'MOQ: [XX] kg',
    image: require('../assets/mockup/prod-papaya.png'),
  },
  {
    id: 'green-mugwort',
    name: 'Green Mugwort',
    category: 'Flower',
    origin: 'India',
    available: 'Seasonal',
    price: '$[Price] / kg',
    moq: 'MOQ: [XX] kg',
    image: require('../assets/mockup/prod-mugwort.png'),
  },
  {
    id: 'cockscomb',
    name: 'Cockscomb',
    category: 'Flower',
    origin: 'India',
    available: 'Seasonal',
    price: '$[Price] / kg',
    moq: 'MOQ: [XX] kg',
    image: require('../assets/mockup/prod-cockscomb.png'),
  },
  {
    id: 'indian-oleander',
    name: 'Indian Oleander',
    category: 'Flower',
    origin: 'India',
    available: 'Year Round',
    price: '$[Price] / kg',
    moq: 'MOQ: [XX] kg',
    image: require('../assets/mockup/prod-oleander.png'),
  },
];

export const WHY_CHOOSE = [
  {
    icon: 'leaf-outline' as const,
    title: 'Quality-Focused Sourcing',
    desc: 'Fresh produce sourced through a carefully coordinated agricultural network.',
  },
  {
    icon: 'cash-outline' as const,
    title: 'Competitive Pricing',
    desc: 'Value-driven export quotations based on product specifications and order requirements.',
  },
  {
    icon: 'cube-outline' as const,
    title: 'Reliable Supply',
    desc: 'Organized sourcing and export coordination to support consistent business requirements.',
  },
  {
    icon: 'headset-outline' as const,
    title: 'Dedicated Export Support',
    desc: 'Personalized assistance throughout enquiry, quotation, and export coordination.',
  },
];

export const STATS = [
  { icon: 'basket-outline' as const, value: '[XX]+', label: 'Product Varieties' },
  { icon: 'person-outline' as const, value: '[XX]+', label: 'Farmer Sourcing Partners' },
  { icon: 'globe-outline' as const, value: '[XX]+', label: 'Countries Served' },
  { icon: 'boat-outline' as const, value: '[XX]+', label: 'Export Orders' },
];

export const GLOBAL_MARKETS = {
  title: 'Connecting Indian Produce with Global Markets',
  highlight: 'Global Markets',
  subtitle: 'Taking the freshness and diversity of Indian agricultural produce to international customers.',
  destinations: [
    { country: 'UAE', note: 'Export Destination (Placeholder)', flag: '🇦🇪' },
    { country: 'Singapore', note: 'Export Destination (Placeholder)', flag: '🇸🇬' },
    { country: 'Malaysia', note: 'Export Destination (Placeholder)', flag: '🇲🇾' },
    { country: 'Australia', note: 'Export Destination (Placeholder)', flag: '🇦🇺' },
  ],
};

export const MISSION_VISION = {
  mission: {
    title: 'Our Mission',
    text: 'To connect the richness of Indian agriculture with global markets by exporting fresh, high-quality vegetables and fruits. We strive to deliver farm-fresh produce to international customers through reliable sourcing, quality-focused practices, transparent business relationships, and efficient export services while creating sustainable opportunities for local farmers.',
    image: require('../assets/mockup/mission-farmer.png'),
  },
  vision: {
    title: 'Our Vision',
    text: "To become a trusted global supplier of fresh Indian agricultural produce, bringing the diversity and quality of India's farms to international markets. We envision building a strong global supply network that empowers local farmers, strengthens international trade relationships, and establishes Indian agricultural products as a preferred choice worldwide.",
    image: require('../assets/mockup/vision-port.png'),
  },
};

export const TESTIMONIALS = [
  {
    quote: '[Placeholder] The produce quality, packaging, and communication were very professional. A reliable partner for our import requirements!',
    name: 'Buyer Name (Placeholder)',
    role: 'International Produce Buyer',
  },
  {
    quote: 'We are satisfied with the quality and timely coordination. The team is responsive and supportive throughout the process.',
    name: 'Company Name (Placeholder)',
    role: 'Importer & Distributor',
  },
  {
    quote: 'A consistent and professional export partner for fresh Indian vegetables and fruits. We look forward to a long-term business relationship.',
    name: 'Partner Name (Placeholder)',
    role: 'Business Partner',
  },
];

export const CTA_BANNER = {
  title: 'Bring the Best of Indian Agriculture to Your Market.',
  subtitle: "Looking for a reliable fresh produce export partner? Let's discuss your requirements and build a successful business relationship.",
  ctaPrimary: 'Request a Quote',
  ctaSecondary: 'Explore Our Products',
};

type HeroFlowItem = {
  emoji: string;
  role: string;
  desc: string;
  tint: string;
  image: number | null;
  /** Optional cover zoom for the card image (1 = no zoom). */
  imageScale?: number;
};

export const HERO_FLOW: HeroFlowItem[] = [
  { emoji: '👨‍🌾', role: 'Farmer', desc: 'Lists fresh produce\nstraight from the farm', tint: '#E8F3E9', image: require('../assets/farmer.jpg'), imageScale: 1.18 },
  { emoji: '🧑‍💼', role: 'Magasool Team', desc: 'Connects, negotiates\n& checks quality', tint: '#E5F0FB', image: require('../assets/team.jpg') },
  { emoji: '🧑‍🔧', role: 'Buyer', desc: 'Sources quality produce\nat a fair price', tint: '#FBEFE6', image: require('../assets/buyer.png') },
];

export const ABOUT = {
  eyebrow: 'About Us',
  tagline: 'Empowering Farmers. Connecting Markets. Growing Together.',
  paragraphs: [
    'At Magasool, we are dedicated to transforming the agricultural marketplace by creating a transparent and efficient connection between farmers and buyers. Our platform is designed to help farmers gain access to better market opportunities while enabling buyers and distributors to source quality agricultural products at competitive prices.',
    'We understand the challenges faced by farmers in finding reliable buyers and obtaining fair value for their hard work. Similarly, buyers often struggle to identify genuine suppliers and secure quality produce at the right price. Our mission is to bridge this gap through technology, market intelligence, and professional coordination.',
    'Unlike traditional brokerage systems, our platform acts as a trusted facilitator. Farmers can register their cultivated products, and buyers or distributors can submit their requirements. Based on these requirements, our team identifies suitable opportunities, coordinates transactions, and supports both parties throughout the process to ensure smooth and successful business dealings.',
  ],
  whyTitle: 'Why Choose Us',
  why: [
    {
      icon: 'trending-up' as const,
      title: 'Fair Market Access',
      desc: 'We help farmers reach genuine buyers and expand their selling opportunities beyond local markets.',
    },
    {
      icon: 'ribbon' as const,
      title: 'Quality Sourcing',
      desc: 'Buyers gain access to reliable agricultural products sourced directly from verified farming communities.',
    },
    {
      icon: 'eye' as const,
      title: 'Transparent Process',
      desc: 'Our platform promotes transparency, trust, and efficiency throughout the transaction process.',
    },
    {
      icon: 'hardware-chip' as const,
      title: 'Technology-Driven Solutions',
      desc: 'We leverage digital tools to simplify agricultural trade and improve communication between stakeholders.',
    },
  ],
};

export const STEPS = EXPORT_PROCESS.steps;
export const WHY = WHY_CHOOSE;

/**
 * Products marketplace listing.
 *
 * `image` is a bundled local asset (see assets/products/) so the photos load
 * instantly and work offline — no runtime image downloads. Every listing carries
 * a 50 kg minimum order, per Magasool's bulk-trade model.
 */
const MIN_ORDER_KG = 50;

export const PRODUCTS_INTRO = {
  eyebrow: 'Our Products',
  title: 'Fresh Farm Produce, Sourced in Bulk',
  subtitle:
    'Quality produce sourced directly from verified farmers. All listings are available for bulk trade with a minimum order of 50 kg.',
};

export const PRODUCTS = [
  {
    name: 'Banana',
    tamil: 'வாழைப்பழம்',
    image: require('../assets/products/banana.jpg'),
    desc: 'Naturally ripened, sweet bananas harvested at peak freshness. Ideal for retail, juice units, and wholesale distribution.',
    minKg: MIN_ORDER_KG,
  },
  {
    name: 'Banana Leaves',
    tamil: 'வாழை இலை',
    image: require('../assets/products/banana-leaves.jpg'),
    desc: 'Broad, fresh green banana leaves — perfect for traditional dining, catering, and eco-friendly food packaging.',
    minKg: MIN_ORDER_KG,
  },
  {
    name: 'Banana Stem',
    tamil: 'வாழைத்தண்டு',
    image: require('../assets/products/banana-stem.jpg'),
    desc: 'Tender, fibre-rich banana stem (vazhaithandu) known for its health benefits. Supplied fresh for hotels and households.',
    minKg: MIN_ORDER_KG,
  },
  {
    name: 'Potato',
    tamil: 'உருளைக்கிழங்கு',
    image: require('../assets/products/potato.jpg'),
    desc: 'Firm, farm-fresh potatoes graded for size and quality. Suited for retail, restaurants, and food processing.',
    minKg: MIN_ORDER_KG,
  },
  {
    name: 'Tomato',
    tamil: 'தக்காளி',
    image: require('../assets/products/tomato.jpg'),
    desc: 'Plump, juicy red tomatoes picked fresh from the farm. Great for daily markets, hotels, and bulk supply.',
    minKg: MIN_ORDER_KG,
  },
  {
    name: 'Small Onion',
    tamil: 'சின்ன வெங்காயம்',
    image: require('../assets/products/small-onion.jpg'),
    desc: 'Aromatic small onions (shallots) with a rich flavour, widely used in South Indian cooking and sambar.',
    minKg: MIN_ORDER_KG,
  },
  {
    name: 'Bellary Onion',
    tamil: 'பெரிய வெங்காயம்',
    image: require('../assets/products/bellary-onion.jpg'),
    desc: 'Large Bellary (big) onions with firm layers and long shelf life. Reliable supply for wholesale and retail buyers.',
    minKg: MIN_ORDER_KG,
  },
  {
    name: 'Garlic',
    tamil: 'பூண்டு',
    image: require('../assets/products/garlic.jpg'),
    desc: 'Clean, fresh garlic bulbs with strong aroma and tight cloves. Available for kitchens, traders, and processors.',
    minKg: MIN_ORDER_KG,
  },
  {
    name: 'Keerai Varieties',
    tamil: 'கீரை வகைகள்',
    image: require('../assets/products/keerai.jpg'),
    desc: 'Assorted fresh greens (keerai) — including mulai, arai, and palak — bundled fresh daily for healthy bulk demand.',
    minKg: MIN_ORDER_KG,
  },
  {
    name: 'Flowers',
    tamil: 'மலர்கள்',
    image: require('../assets/products/flowers.jpg'),
    desc: 'Fresh, fragrant flowers such as marigold and jasmine — sourced daily for temples, events, garland makers, and bulk buyers.',
    minKg: MIN_ORDER_KG,
  },
] as const;

/** Contact Us page content. */
export const CONTACT = {
  title: 'Contact Us',
  subtitle:
    "We'd love to hear from you. Whether you're a farmer or a buyer, our team is here to help you connect and grow.",
  intro:
    'Have a question about selling your produce, sourcing in bulk, or how Magasool works? Reach out through any of the channels below and our team will get back to you shortly.',
  phone: '+91 97905 75351',
  email: 'Supportmagasool@gmail.com',
  methods: [
    { icon: 'call' as const, label: 'Call Us', value: '+91 97905 75351', href: 'tel:+919790575351' },
    { icon: 'mail' as const, label: 'Email Us', value: 'Supportmagasool@gmail.com', href: 'mailto:Supportmagasool@gmail.com' },
    { icon: 'location' as const, label: 'Location', value: 'Tamil Nadu, India', href: '' },
    { icon: 'time' as const, label: 'Working Hours', value: 'Mon – Sat, 9:00 AM – 6:00 PM', href: '' },
  ],
};

/**
 * Terms & Conditions page content. Uses the same block shape as PRIVACY
 * ('p' for paragraphs, 'list' for bullet lists) so it renders consistently.
 */
export const TERMS = {
  title: 'Terms & Conditions',
  effective: 'Last updated: June 25, 2026',
  contact: { phone: '+91 97905 75351', email: 'Supportmagasool@gmail.com' },
  intro: [
    'Welcome to Magasool. These Terms & Conditions ("Terms") govern your access to and use of our website and mediation services that connect farmers with buyers and distributors.',
    'By accessing or using our platform, you agree to be bound by these Terms. If you do not agree, please do not use our services.',
  ],
  sections: [
    {
      id: 'acceptance',
      icon: 'checkmark-circle' as const,
      title: 'Acceptance of Terms',
      blocks: [
        { type: 'p' as const, text: 'By registering, accessing, or using the Magasool platform, you confirm that you have read, understood, and agree to these Terms and our Privacy Policy.' },
      ],
    },
    {
      id: 'services',
      icon: 'people' as const,
      title: 'Our Role',
      blocks: [
        { type: 'p' as const, text: 'Magasool acts solely as a mediation platform that facilitates connections between farmers and buyers/distributors. We are not a buyer, seller, or party to any transaction between users.' },
        { type: 'p' as const, text: 'We coordinate introductions and support communication, but the final agreement, pricing, quality, and delivery terms are decided between the farmer and the buyer.' },
      ],
    },
    {
      id: 'eligibility',
      icon: 'person-circle' as const,
      title: 'Eligibility',
      blocks: [
        { type: 'p' as const, text: 'To use our services you must:' },
        { type: 'list' as const, items: ['Be at least 18 years of age', 'Provide accurate and complete registration details', 'Have the legal capacity to enter into binding agreements'] },
      ],
    },
    {
      id: 'responsibilities',
      icon: 'clipboard' as const,
      title: 'User Responsibilities',
      blocks: [
        { type: 'p' as const, text: 'As a user of the platform, you agree to:' },
        { type: 'list' as const, items: ['Provide truthful information about your produce or requirements', 'Honour commitments made to other users', 'Maintain the confidentiality of your account details', 'Use the platform only for lawful agricultural trade purposes'] },
      ],
    },
    {
      id: 'charges',
      icon: 'cash' as const,
      title: 'Service Charges & Payments',
      blocks: [
        { type: 'p' as const, text: 'Magasool may charge a service or mediation fee for successful connections or transactions. Applicable charges will be communicated in advance.' },
        { type: 'p' as const, text: 'Payments between farmers and buyers are settled directly between the parties unless otherwise agreed in writing.' },
      ],
    },
    {
      id: 'prohibited',
      icon: 'ban' as const,
      title: 'Prohibited Activities',
      blocks: [
        { type: 'p' as const, text: 'You must not:' },
        { type: 'list' as const, items: ['Post false, misleading, or fraudulent information', 'Misuse the platform to harass or harm other users', 'Bypass the platform to avoid applicable service charges in bad faith', 'Violate any applicable laws or regulations'] },
      ],
    },
    {
      id: 'liability',
      icon: 'shield-checkmark' as const,
      title: 'Limitation of Liability',
      blocks: [
        { type: 'p' as const, text: 'Magasool is not responsible for the quality, quantity, safety, or legality of produce, the accuracy of user listings, or the ability of users to complete a transaction.' },
        { type: 'p' as const, text: 'To the maximum extent permitted by law, Magasool shall not be liable for any direct, indirect, or consequential losses arising from the use of our services.' },
      ],
    },
    {
      id: 'ip',
      icon: 'pricetag' as const,
      title: 'Intellectual Property',
      blocks: [
        { type: 'p' as const, text: 'All content, branding, and materials on the Magasool platform are owned by or licensed to Magasool and may not be copied or reused without permission.' },
      ],
    },
    {
      id: 'termination',
      icon: 'close-circle' as const,
      title: 'Termination',
      blocks: [
        { type: 'p' as const, text: 'We reserve the right to suspend or terminate any account that violates these Terms or misuses the platform, without prior notice.' },
      ],
    },
    {
      id: 'law',
      icon: 'business' as const,
      title: 'Governing Law',
      blocks: [
        { type: 'p' as const, text: 'These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts of Tamil Nadu.' },
      ],
    },
    {
      id: 'changes',
      icon: 'sync' as const,
      title: 'Changes to these Terms',
      blocks: [
        { type: 'p' as const, text: 'We may update these Terms from time to time. Continued use of the platform after changes are posted constitutes acceptance of the revised Terms.' },
      ],
    },
  ],
  closing: 'By using Magasool, you acknowledge that you have read and agree to these Terms & Conditions.',
} as const;

/**
 * Social profiles, shared by the footer and the Contact page.
 * Replace the URLs with Magasool's real profile links.
 */
export const SOCIALS = [
  { icon: 'logo-linkedin' as const, label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: 'logo-twitter' as const, label: 'Twitter', url: 'https://twitter.com' },
  { icon: 'logo-instagram' as const, label: 'Instagram', url: 'https://instagram.com/magasool.india' },
  { icon: 'logo-youtube' as const, label: 'YouTube', url: 'https://youtube.com' },
];

export const FOOTER = {
  about:
    'Magasool is an Indian fresh produce export company supplying high-quality vegetables, fruits, and floral produce to international markets through reliable sourcing, quality-focused practices, and efficient export services.',
  columns: [
    {
      title: 'Quick Links',
      links: ['About Us', 'Our Products', 'Export Process', 'Mission & Vision', 'Contact Us'],
    },
    {
      title: 'Our Products',
      links: ['Fresh Vegetables', 'Fresh Fruits', 'Seasonal Produce', 'Product Catalogue'],
    },
    {
      title: 'Support',
      links: ['Request a Quote', 'Export Enquiries', 'FAQ', 'Privacy Policy', 'Terms & Conditions', 'Contact Support'],
    },
  ],
  contact: {
    title: 'Get In Touch',
    address: 'Your Company Address, City, State, India - Pin: [XXXXXX]',
    phone: '+91 [Your Phone Number]',
    email: 'info@magasool.com',
    whatsapp: 'Contact Support',
  },
  socials: SOCIALS,
};

/**
 * Privacy Policy page content. Blocks are a small discriminated union so the page
 * can render paragraphs, bullet lists, and sub-grouped lists from one data source.
 */
export const PRIVACY = {
  title: 'Privacy Policy',
  effective: 'Last updated: June 20, 2026',
  contact: { phone: '+91 97905 75351', email: 'Supportmagasool@gmail.com' },
  intro: [
    'Welcome to Magasool ("Company", "we", "our", or "us"). We are committed to protecting the privacy and personal information of farmers, buyers, distributors, and other users who access our website and services.',
    'This Privacy Policy explains how we collect, use, store, disclose, and protect your personal information when you use our platform.',
    'By accessing or using our website, you agree to the collection and use of information in accordance with this Privacy Policy.',
  ],
  sections: [
    {
      id: 'who-we-are',
      icon: 'leaf',
      title: 'Who We Are',
      art: 'none',
      blocks: [
        {
          type: 'p',
          text: 'This mediation platform is named and created by Magasool. Helping farmers and buyers/distributors gain access to better market opportunities and to source quality agricultural products at competitive prices. For any privacy related queries, contact us at +91 97905 75351 or Supportmagasool@gmail.com',
        },
      ],
    },
    {
      id: 'information-we-collect',
      icon: 'document-text',
      title: 'Information We Collect',
      art: 'none',
      blocks: [
        { type: 'p', text: 'We may collect the following information from users:' },
        {
          type: 'group',
          subtitle: 'Farmers',
          lead: '',
          items: ['Full name', 'Mobile number', 'Email address (if provided)', 'Address and location details', 'Farm details', 'Product/crop information'],
        },
        {
          type: 'group',
          subtitle: 'Buyers / Distributors',
          lead: '',
          items: ['Full name', 'Company name (if distributor)', 'Mobile number', 'Email address', 'Business address (if distributor)', 'Product requirements'],
        },
        {
          type: 'group',
          subtitle: 'Automatically Collected Information',
          lead: 'When you visit our website, we may automatically collect:',
          items: ['IP address', 'Browser type', 'Device information', 'Website usage data', 'Cookies and similar technologies'],
        },
      ],
    },
    {
      id: 'purpose',
      icon: 'compass',
      title: 'Purpose of Data Collection',
      art: 'none',
      blocks: [
        { type: 'p', text: 'We collect personal information for the following purposes:' },
        {
          type: 'list',
          items: [
            'User registration and account management',
            'Verification of farmers and buyers',
            'Matching product requirements with available agricultural products',
            'Facilitating business transactions and enquiries',
            'Customer support and communication',
            'Processing payments and service charges',
            'Improving platform functionality and user experience',
            'Compliance with legal and regulatory requirements',
          ],
        },
      ],
    },
    {
      id: 'how-we-use',
      icon: 'construct',
      title: 'How We Use Your Information',
      art: 'none',
      blocks: [
        { type: 'p', text: 'Your information may be used to:' },
        {
          type: 'list',
          items: [
            'Create and manage user accounts',
            'Connect farmers with potential buyers through our mediation services',
            'Contact users regarding enquiries, transactions, and platform updates',
            'Provide customer support',
            'Prevent fraud and misuse of services',
            'Generate reports and analytics',
            'Comply with applicable laws and government regulations',
          ],
        },
      ],
    },
    {
      id: 'sharing',
      icon: 'share-social',
      title: 'Information Sharing and Disclosure',
      art: 'none',
      blocks: [
        { type: 'p', text: 'We do not sell or rent personal information to third parties.' },
        { type: 'p', text: 'We may share information with:' },
        {
          type: 'list',
          items: [
            'Verified farmers and buyers where necessary to facilitate transactions',
            'Service providers assisting in website operation and payment processing',
            'Government authorities or law enforcement agencies when required by law',
            'Professional advisors, auditors, or legal consultants where necessary',
          ],
        },
        { type: 'p', text: 'All third parties receiving personal information are required to maintain confidentiality and security.' },
      ],
    },
    {
      id: 'security',
      icon: 'shield-checkmark',
      title: 'Data Security',
      art: 'secure',
      blocks: [
        { type: 'p', text: 'We implement reasonable technical and organizational security measures to protect personal information against:' },
        { type: 'list', items: ['Unauthorized access', 'Disclosure', 'Alteration', 'Loss or destruction'] },
        { type: 'p', text: 'While we strive to protect user information, no online transmission or storage system can be guaranteed to be completely secure.' },
      ],
    },
    {
      id: 'retention',
      icon: 'time',
      title: 'Data Retention',
      art: 'none',
      blocks: [
        { type: 'p', text: 'We retain personal information only for as long as necessary to:' },
        { type: 'list', items: ['Provide our services', 'Fulfill contractual obligations', 'Resolve disputes', 'Comply with legal and regulatory requirements'] },
        { type: 'p', text: 'Upon completion of the retention period, information may be securely deleted or anonymized.' },
      ],
    },
    {
      id: 'user-rights',
      icon: 'person-circle',
      title: 'User Rights',
      art: 'none',
      blocks: [
        { type: 'p', text: 'Subject to applicable laws, users may:' },
        {
          type: 'list',
          items: [
            'Access their personal information',
            'Request correction of inaccurate information',
            'Request deletion of personal information',
            'Withdraw consent where applicable',
            'Contact us regarding privacy concerns',
          ],
        },
        { type: 'p', text: 'Requests may be submitted using the contact details provided below.' },
      ],
    },
    {
      id: 'cookies',
      icon: 'options',
      title: 'Cookies',
      art: 'cookie',
      blocks: [
        { type: 'p', text: 'Our website may use cookies and similar technologies to:' },
        { type: 'list', items: ['Improve website functionality', 'Analyze website traffic', 'Enhance user experience'] },
        { type: 'p', text: 'Users may disable cookies through browser settings, although certain website features may not function properly.' },
      ],
    },
    {
      id: 'third-party',
      icon: 'link',
      title: 'Third-Party Links',
      art: 'none',
      blocks: [
        { type: 'p', text: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of such external websites. Users are encouraged to review their privacy policies before providing personal information.' },
      ],
    },
    {
      id: 'children',
      icon: 'people',
      title: "Children's Privacy",
      art: 'none',
      blocks: [
        { type: 'p', text: 'Our services are intended for individuals aged 18 years and above. We do not knowingly collect personal information from minors without appropriate authorization.' },
      ],
    },
    {
      id: 'changes',
      icon: 'sync',
      title: 'Changes to this Privacy Policy',
      art: 'none',
      blocks: [
        { type: 'p', text: 'We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with the revised effective date.' },
        { type: 'p', text: 'Continued use of the website after such updates constitutes acceptance of the revised Privacy Policy.' },
      ],
    },
  ],
  closing: 'By using our website and services, you acknowledge that you have read and understood this Privacy Policy.',
} as const;
