// Fixed regional prices seeded once from Frankfurter USD rates on 2026-10-28; never converted at checkout.
import productImages from './productImages.json';

export const productCategories = [
  { id: 'all', label: 'All Products' },
  { id: 'supplements', label: 'Health Supplements' },
  { id: 'personal-care', label: 'Personal Care' },
  { id: 'skincare', label: 'Skincare & Beauty' },
  { id: 'beverages', label: 'Teas & Beverages' },
];

const images = {
  supplement: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&h=600&fit=crop',
  calcium: 'https://images.unsplash.com/photo-1550572017-edd951aa8f71?w=600&h=600&fit=crop',
  tea: 'https://images.unsplash.com/photo-1597318181404-9a0d0a5a0627?w=600&h=600&fit=crop',
  personal: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop',
  skincare: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop',
  beverage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
  capsule: 'https://images.unsplash.com/photo-1584308664884-24d4eb5227a5?w=600&h=600&fit=crop',
  cream: 'https://images.unsplash.com/photo-1620916567198-59c4b5a4c4e8?w=600&h=600&fit=crop',
};

export const featuredProducts = [
  {
    id: 'lingzhi',
    name: 'Lucklife Lingzhi',
    tagline: 'Premium Reishi Mushroom Extract',
    category: 'supplements',
    featured: true,
    price_usd: 89.99, price_ngn: 122517.79, price_gbp: 67.53,
    image: images.supplement,
    benefits: [
      'Good for strengthening immune system',
      'Good for people who want to prevent cancer, cardiovascular disease, diabetes, liver disease, allergy, rheumatism',
    ],
    description:
      'Our flagship Lingzhi formula combines centuries of traditional wisdom with modern extraction technology for maximum potency and bioavailability.',
  },
  {
    id: 'haizhao-gai',
    name: 'Haizhao Gai',
    tagline: 'Natural Calcium Supplement',
    category: 'supplements',
    featured: true,
    price_usd: 54.99, price_ngn: 74866.69, price_gbp: 41.27,
    image: images.calcium,
    benefits: [
      'Natural green, sufficient dissolution, contain high quantity',
      'High quantity pure calcium, easily absorbed and utilized by the human body',
    ],
    description:
      'Sourced from pristine marine algae, Haizhao Gai delivers highly bioavailable calcium in a natural, easily digestible form.',
  },
  {
    id: 'slimming-tea',
    name: 'Lucklife Slimming Tea',
    tagline: 'Herbal Wellness Blend',
    category: 'beverages',
    featured: true,
    price_usd: 39.99, price_ngn: 54444.79, price_gbp: 30.01,
    image: images.tea,
    benefits: [
      'Reducing intake of fat and sugar, slimming, enhance blood circulation and dissolving stasis',
      'Eliminate heat and toxin',
    ],
    description:
      'A carefully crafted blend of traditional herbs designed to support healthy metabolism and natural detoxification.',
  },
];

export const catalogProducts = [
  { id: 'everyday-sanitary-pad', name: 'Lucklife Everyday Sanitary Pad', category: 'personal-care', price_usd: 12.99, price_ngn: 17685.37, price_gbp: 9.75, image: images.personal, tagline: 'Daily Comfort Protection' },
  { id: 'night-sanitary-pad', name: 'Lucklife Night Sanitary Pad', category: 'personal-care', price_usd: 14.99, price_ngn: 20408.29, price_gbp: 11.25, image: images.personal, tagline: 'Overnight Protection' },
  { id: 'toothpaste', name: 'Lucklife Toothpaste', category: 'personal-care', price_usd: 8.99, price_ngn: 12239.53, price_gbp: 6.75, image: images.personal, tagline: 'Natural Oral Care' },
  { id: 'gentle-shampoo', name: 'Lucklife Gentle Shampoo', category: 'personal-care', price_usd: 16.99, price_ngn: 23131.21, price_gbp: 12.75, image: images.personal, tagline: 'Mild & Nourishing' },
  { id: 'daily-sanitary-pad', name: 'Lucklife Daily Sanitary Pad', category: 'personal-care', price_usd: 11.99, price_ngn: 16323.91, price_gbp: 9.00, image: images.personal, tagline: 'Everyday Freshness' },
  { id: 'movement-plus', name: 'Movement Plus', category: 'supplements', price_usd: 64.99, price_ngn: 88481.29, price_gbp: 48.77, image: images.supplement, tagline: 'Biologically Active Food Supplement' },
  { id: 'renshen-multi-power', name: 'Renshen Multi Power', category: 'supplements', price_usd: 74.99, price_ngn: 102095.89, price_gbp: 56.28, image: images.supplement, tagline: 'Ginseng Energy Formula' },
  { id: 'meridian-energy-cream', name: 'Lucklife Meridian-Collateral Energy Cream', category: 'skincare', price_usd: 29.99, price_ngn: 40830.19, price_gbp: 22.51, image: images.cream, tagline: 'Traditional Meridian Care' },
  { id: 'nourish-shower-gel', name: 'Lucklife Nourish Shower Gel', category: 'personal-care', price_usd: 15.99, price_ngn: 21769.75, price_gbp: 12.00, image: images.personal, tagline: 'Hydrating Body Wash' },
  { id: 'meigui-paste', name: 'Lucklife Meigui Paste', category: 'skincare', price_usd: 24.99, price_ngn: 34022.89, price_gbp: 18.75, image: images.skincare, tagline: 'Rose Beauty Paste' },
  { id: 'salvia-extract-tablet', name: 'Salvia Extract Tablet', category: 'supplements', price_usd: 49.99, price_ngn: 68059.39, price_gbp: 37.51, image: images.capsule, tagline: 'Cardiovascular Support' },
  { id: 'polypeptide-serum', name: 'Polypeptide Rejuvenating Complex Serum', category: 'skincare', price_usd: 59.99, price_ngn: 81673.99, price_gbp: 45.02, image: images.skincare, tagline: 'Professional Anti-Aging Care' },
  { id: 'hydrating-gel', name: 'Gel Hydratant Lucklife Visage Et Corps', category: 'skincare', price_usd: 22.99, price_ngn: 31299.97, price_gbp: 17.25, image: images.skincare, tagline: 'Face & Body Hydration' },
  { id: 'prickly-pear-vitamin', name: 'Prickly Pear Vitamin Charge', category: 'supplements', price_usd: 34.99, price_ngn: 47637.49, price_gbp: 26.26, image: images.supplement, tagline: 'Natural Vitamin Boost' },
  { id: 'easy-breathing-tablets', name: 'Easy Breathing Herbal Tablets', category: 'supplements', price_usd: 32.99, price_ngn: 44914.57, price_gbp: 24.76, image: images.capsule, tagline: 'Respiratory Wellness' },
  { id: 'massage-gel', name: 'Lucklife Massage Gel', category: 'skincare', price_usd: 19.99, price_ngn: 27215.59, price_gbp: 15.00, image: images.cream, tagline: 'Soothing Muscle Relief' },
  { id: 'boss-tea', name: 'Lucklife Boss Tea', category: 'beverages', price_usd: 29.99, price_ngn: 40830.19, price_gbp: 22.51, image: images.tea, tagline: 'Premium Executive Blend' },
  { id: 'nmn-coffee', name: 'NMN Yang-Sheng Coffee', category: 'beverages', price_usd: 44.99, price_ngn: 61252.09, price_gbp: 33.76, image: images.beverage, tagline: 'Longevity Coffee Blend' },
  { id: 'high-fibre-tablet', name: 'Lucklife High Fibre Tablet', category: 'supplements', price_usd: 27.99, price_ngn: 38107.27, price_gbp: 21.00, image: images.capsule, tagline: 'Digestive Health Support' },
  { id: 'garlic-softgel', name: 'Garlic Softgel', category: 'supplements', price_usd: 24.99, price_ngn: 34022.89, price_gbp: 18.75, image: images.capsule, tagline: 'Heart Health Formula' },
  { id: 'natto-capsules', name: 'Natto Extracts Capsules', category: 'supplements', price_usd: 36.99, price_ngn: 50360.41, price_gbp: 27.76, image: images.capsule, tagline: 'Circulation Support' },
  { id: 'sanjim-oral-liquid', name: 'Sanjim Oral Liquid', category: 'supplements', price_usd: 42.99, price_ngn: 58529.17, price_gbp: 32.26, image: images.supplement, tagline: 'Traditional Oral Tonic' },
  { id: 'three-tonify-liquid', name: 'Three Tonify Oral Liquid', category: 'supplements', price_usd: 45.99, price_ngn: 62613.55, price_gbp: 34.51, image: images.supplement, tagline: 'Triple Nourishment Formula' },
  { id: 'ares-capsule', name: 'Ares Capsule', category: 'supplements', price_usd: 52.99, price_ngn: 72143.77, price_gbp: 39.77, image: images.capsule, tagline: 'Vitality & Strength' },
  { id: 'lingzhi-capsules', name: 'Lingzhi Capsules', category: 'supplements', price_usd: 79.99, price_ngn: 108903.19, price_gbp: 60.03, image: images.capsule, tagline: 'Immune System Support' },
  { id: 'haizao-capsule', name: 'Haizao Capsule', category: 'supplements', price_usd: 48.99, price_ngn: 66697.93, price_gbp: 36.76, image: images.calcium, tagline: 'Marine Mineral Complex' },
  { id: 'qinggong-pill', name: 'Qinggong Pill Feminine Cleansing Insert', category: 'personal-care', price_usd: 38.99, price_ngn: 53083.33, price_gbp: 29.26, image: images.personal, tagline: 'Intimate Wellness Care' },
  { id: 'oral-liquid', name: 'Oral Liquid', category: 'supplements', price_usd: 35.99, price_ngn: 48998.95, price_gbp: 27.01, image: images.supplement, tagline: 'General Health Tonic' },
].map((product) => ({
  ...product,
  benefits: product.benefits || [`Premium quality ${product.name} from Luck Life International`],
  description: product.description || `${product.name} — ${product.tagline}. Crafted with natural ingredients and advanced production technology for your health and wellness.`,
}));

export const products = [...featuredProducts, ...catalogProducts].map(product => ({
  ...product,
  image: productImages[product.id] || product.image,
}));

export const getProductById = (id) => products.find((p) => p.id === id);

export const stats = [
  { value: 15, suffix: '+', label: 'Years of Successful Business in Russia and Other Countries' },
  { value: 10, suffix: '+', label: 'Countries across Asia and Europe' },
  { value: 50, suffix: '+', label: 'World-class R&D expert teams' },
  { value: 500, suffix: 'K+', label: 'Members and consumers worldwide' },
];

export const newsItems = [
  {
    id: 1,
    title: 'On January 31, 2026, Lucklife was invited to attend the High-Level Forum',
    date: 'February 2, 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'The 12-Person Nigerian Tour Group Sets Sail for Malaysia',
    date: 'November 14, 2025',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'A trip to Nigeria and Malaysia!',
    date: 'October 22, 2025',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2faacdce05?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Cameroon Edea Investment Promotion Conference',
    date: 'July 28, 2025',
    image: 'https://images.unsplash.com/photo-1475721027880-d576e5765a66?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Director Yu Boyong inspects the Kingdom of Buganda',
    date: 'April 30, 2025',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Lucklife International Nigeria Ltd Business Launching and Car Awards',
    date: 'April 28, 2025',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
  },
];

export const honorAwards = [
  'Diamond 1',
  'Diamond 3',
  'Sapphire',
  'Emerald',
  'Car Award',
  'China Trip Winner',
];
