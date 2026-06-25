import { WeddingCalculatorData } from '@/types';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const calculateVenuePrice = (
  venueType: string,
  guestCount: number
): number => {
  const venueRange: Record<string, [number, number]> = {
    gedung: [10000000, 30000000],
    hotel: [30000000, 100000000],
    outdoor: [20000000, 60000000],
    ballroom: [50000000, 150000000],
    rumah: [5000000, 20000000],
  };

  if (!venueRange[venueType]) return 0;

  const [min, max] = venueRange[venueType];
  // Calculate based on guest count
  const pricePerGuest = (max - min) / 800;
  const estimatedPrice = min + pricePerGuest * guestCount;

  return Math.min(estimatedPrice, max);
};

export const calculateSouvenirPrice = (guestCount: number): number => {
  return guestCount * 10000;
};

export const getBudgetRecommendation = (totalBudget: number): string => {
  if (totalBudget >= 150000000) {
    return 'Konsep Luxury Wedding sangat memungkinkan. Anda bisa mewujudkan pernikahan impian dengan kualitas internasional dan detail sempurna.';
  } else if (totalBudget >= 75000000) {
    return 'Konsep Modern Wedding sangat ideal untuk budget Anda. Anda bisa menciptakan pernikahan kontemporer yang elegan dan berkesan.';
  } else {
    return 'Konsep Intimate Wedding lebih direkomendasikan. Fokus pada kualitas detail dan momen berkesan dengan budget yang lebih efisien.';
  }
};

export const getConceptColor = (concept: string): string => {
  const colors: Record<string, string> = {
    intimate: '#A8BBA2',
    traditional: '#D4AF37',
    modern: '#7A8A72',
    luxury: '#2C3E50',
  };
  return colors[concept] || '#A8BBA2';
};

export const redirectToWhatsApp = (phone: string, message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
};
