import { create } from 'zustand';
import { WeddingCalculatorData } from '@/types';

interface CalculatorStore {
  data: WeddingCalculatorData | null;
  currentStep: number;
  updateData: (newData: Partial<WeddingCalculatorData>) => void;
  setCurrentStep: (step: number) => void;
  resetCalculator: () => void;
  calculateTotal: () => void;
}

const initialData: WeddingCalculatorData = {
  brideGroomName: '',
  weddingCity: '',
  weddingDate: '',
  guestCount: 0,
  guestCategory: '100-300',
  venueType: 'gedung',
  venuePrice: 0,
  cateringPrice: 50000,
  totalCatering: 0,
  selectedVendors: [],
  totalVendor: 0,
  weddingConcept: 'modern',
  conceptMultiplier: 1.1,
  subtotal: 0,
  total: 0,
  breakdown: {
    venue: 0,
    catering: 0,
    vendor: 0,
    percentage: {
      venue: 0,
      catering: 0,
      vendor: 0,
    },
  },
};

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  data: initialData,
  currentStep: 1,

  updateData: (newData: Partial<WeddingCalculatorData>) =>
    set((state) => {
      const updatedData = { ...state.data, ...newData } as WeddingCalculatorData;
      return { data: updatedData };
    }),

  setCurrentStep: (step: number) => set({ currentStep: step }),

  resetCalculator: () =>
    set({
      data: initialData,
      currentStep: 1,
    }),

  calculateTotal: () =>
    set((state) => {
      if (!state.data) return {};

      const data = state.data;
      const venue = data.venuePrice;
      const catering = data.guestCount * data.cateringPrice;
      const vendor = data.totalVendor;

      const subtotal = venue + catering + vendor;
      const total = Math.round(subtotal * data.conceptMultiplier);

      const breakdown = {
        venue,
        catering,
        vendor,
        percentage: {
          venue: (venue / subtotal) * 100,
          catering: (catering / subtotal) * 100,
          vendor: (vendor / subtotal) * 100,
        },
      };

      return {
        data: {
          ...data,
          totalCatering: catering,
          subtotal,
          total,
          breakdown,
        },
      };
    }),
}));
