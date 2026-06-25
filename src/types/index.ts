export interface WeddingCalculatorData {
  // Step 1: Basic Information
  brideGroomName: string;
  weddingCity: string;
  weddingDate: string;
  guestCount: number;
  guestCategory: '100-300' | '300-500' | '500-800' | '800+';

  // Step 2: Venue
  venueType: 'gedung' | 'hotel' | 'outdoor' | 'ballroom' | 'rumah';
  venuePrice: number;

  // Step 3: Catering
  cateringPrice: number; // per pax
  totalCatering: number;

  // Step 4: Vendors
  selectedVendors: VendorItem[];
  totalVendor: number;

  // Step 5: Concept
  weddingConcept: 'intimate' | 'traditional' | 'modern' | 'luxury';
  conceptMultiplier: number;

  // Calculations
  subtotal: number;
  total: number;
  breakdown: BudgetBreakdown;
}

export interface VendorItem {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export interface BudgetBreakdown {
  venue: number;
  catering: number;
  vendor: number;
  percentage: {
    venue: number;
    catering: number;
    vendor: number;
  };
}

export interface LeadData {
  id?: string;
  brideGroomName: string;
  whatsappNumber: string;
  instagram?: string;
  city: string;
  guestCount: number;
  totalBudget: number;
  calculatorData: WeddingCalculatorData;
  submittedAt?: string;
}

export interface VenueOption {
  type: 'gedung' | 'hotel' | 'outdoor' | 'ballroom' | 'rumah';
  label: string;
  minPrice: number;
  maxPrice: number;
  description: string;
}

export interface ConceptOption {
  type: 'intimate' | 'traditional' | 'modern' | 'luxury';
  label: string;
  multiplier: number;
  description: string;
}
