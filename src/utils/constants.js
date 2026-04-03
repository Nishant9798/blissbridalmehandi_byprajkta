export const CATEGORIES = [
  'All',
  'Bridal',
  'Arabic',
  'Traditional',
  'Minimal',
  'Party',
  'Festival',
];

export const SERVICES = [
  {
    title: 'Bridal Mehandi',
    description: 'Exquisite full-hand bridal designs that tell your love story with intricate patterns and personalized motifs.',
    icon: 'GiDiamondRing',
  },
  {
    title: 'Arabic Mehandi',
    description: 'Bold, flowing Arabic patterns featuring elegant floral trails and geometric designs.',
    icon: 'GiFlowerPot',
  },
  {
    title: 'Traditional Mehandi',
    description: 'Classic Indian mehandi with detailed paisley, peacock, and traditional motifs.',
    icon: 'GiPeacockTail',
  },
  {
    title: 'Minimal Mehandi',
    description: 'Contemporary minimalist designs perfect for those who love subtle elegance.',
    icon: 'GiFlowerStar',
  },
  {
    title: 'Party Mehandi',
    description: 'Trendy and stylish designs for engagement parties, sangeet, and celebrations.',
    icon: 'GiPartyPopper',
  },
  {
    title: 'Festival Mehandi',
    description: 'Beautiful festive designs for Karwa Chauth, Diwali, Eid, and other celebrations.',
    icon: 'GiLanternFlame',
  },
];

export const EVENT_TYPES = [
  'Bridal Mehandi',
  'Engagement',
  'Sangeet / Party',
  'Karwa Chauth',
  'Festival',
  'Baby Shower',
  'Other',
];

export const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

export const PACKAGES = [
  {
    name: 'Essential',
    price: '1,500',
    priceNote: 'Starting from',
    description: 'Perfect for small gatherings and minimal designs',
    features: [
      'Single hand front design',
      'Arabic or minimal style',
      'Up to 2 hours session',
      'Natural organic henna',
    ],
    recommended: false,
  },
  {
    name: 'Classic Bridal',
    price: '5,000',
    priceNote: 'Starting from',
    description: 'Complete bridal mehandi for your special day',
    features: [
      'Both hands front & back',
      'Feet mehandi included',
      'Bridal or traditional style',
      'Up to 4 hours session',
      'Premium organic henna',
      'Aftercare tips included',
    ],
    recommended: true,
  },
  {
    name: 'Royal Bridal',
    price: '10,000',
    priceNote: 'Starting from',
    description: 'The ultimate bridal mehandi experience',
    features: [
      'Full hands & arms design',
      'Full feet & legs design',
      'Personalized motifs & portraits',
      'Up to 6 hours session',
      'Premium imported henna',
      'Aftercare kit included',
      'Complimentary touch-up',
    ],
    recommended: false,
  },
  {
    name: 'Party Package',
    price: '800',
    priceNote: 'Per person from',
    description: 'Ideal for group events and celebrations',
    features: [
      'Trendy party designs',
      'Single hand per person',
      'Minimum 5 guests',
      'On-location service',
      'Natural organic henna',
    ],
    recommended: false,
  },
];
