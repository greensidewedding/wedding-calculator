import { VenueOption, ConceptOption, VendorItem } from '@/types';

// Color Constants
export const COLORS = {
  sage: '#A8BBA2',
  sageDark: '#7A8A72',
  gold: '#D4AF37',
  white: '#FFFFFF',
  cream: '#FFFAF0',
  dark: '#1a1a1a',
};

// Venue Options
export const VENUE_OPTIONS: VenueOption[] = [
  {
    type: 'gedung',
    label: 'Gedung Pernikahan',
    minPrice: 10000000,
    maxPrice: 30000000,
    description: 'Gedung khusus acara pernikahan',
  },
  {
    type: 'hotel',
    label: 'Hotel',
    minPrice: 30000000,
    maxPrice: 100000000,
    description: 'Ballroom atau ruang meeting hotel',
  },
  {
    type: 'outdoor',
    label: 'Outdoor Garden',
    minPrice: 20000000,
    maxPrice: 60000000,
    description: 'Taman atau outdoor space',
  },
  {
    type: 'ballroom',
    label: 'Ballroom',
    minPrice: 50000000,
    maxPrice: 150000000,
    description: 'Ballroom mewah di hotel premium',
  },
  {
    type: 'rumah',
    label: 'Rumah Sendiri',
    minPrice: 5000000,
    maxPrice: 20000000,
    description: 'Acara di rumah keluarga',
  },
];

// Catering Prices (per pax)
export const CATERING_PRICES = [
  { label: 'Economical', price: 50000 },
  { label: 'Standard', price: 75000 },
  { label: 'Premium', price: 100000 },
  { label: 'Luxury', price: 150000 },
];

// Vendor Options
export const VENDOR_OPTIONS: VendorItem[] = [
  { id: 'wo', name: 'Wedding Organizer', price: 8000000, selected: false },
  { id: 'dekorasi', name: 'Dekorasi', price: 15000000, selected: false },
  { id: 'mua', name: 'Makeup & Hair (MUA)', price: 5000000, selected: false },
  { id: 'attire', name: 'Attire / Busana', price: 6000000, selected: false },
  { id: 'fotografi', name: 'Fotografi', price: 4000000, selected: false },
  { id: 'videografi', name: 'Videografi', price: 5000000, selected: false },
  { id: 'entertainment', name: 'Music & Entertainment', price: 5000000, selected: false },
  { id: 'mc', name: 'Master of Ceremony', price: 2500000, selected: false },
  { id: 'cake', name: 'Wedding Cake', price: 1500000, selected: false },
  { id: 'photobooth', name: 'Photobooth', price: 3000000, selected: false },
];

// Wedding Concepts
export const WEDDING_CONCEPTS: ConceptOption[] = [
  {
    type: 'intimate',
    label: 'Intimate Wedding',
    multiplier: 0.9,
    description: 'Pernikahan sederhana dan intim dengan keluarga dekat',
  },
  {
    type: 'traditional',
    label: 'Traditional Wedding',
    multiplier: 1.0,
    description: 'Pernikahan tradisional dengan kearifan lokal',
  },
  {
    type: 'modern',
    label: 'Modern Wedding',
    multiplier: 1.1,
    description: 'Pernikahan modern dengan sentuhan kontemporer',
  },
  {
    type: 'luxury',
    label: 'Luxury Wedding',
    multiplier: 1.3,
    description: 'Pernikahan mewah dengan standar internasional',
  },
];

// Guest Categories
export const GUEST_CATEGORIES = [
  { label: '100 - 300 Orang', value: '100-300' },
  { label: '300 - 500 Orang', value: '300-500' },
  { label: '500 - 800 Orang', value: '500-800' },
  { label: '800+ Orang', value: '800+' },
];
