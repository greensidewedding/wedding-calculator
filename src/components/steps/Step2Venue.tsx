'use client';

import { useCalculatorStore } from '@/store/calculatorStore';
import { VENUE_OPTIONS } from '@/lib/constants';
import { calculateVenuePrice, formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Step2Venue() {
  const { data, updateData, setCurrentStep } = useCalculatorStore();

  const handleVenueSelect = (venueType: string) => {
    const estimatedPrice = calculateVenuePrice(venueType, data?.guestCount || 0);
    updateData({
      venueType: venueType as any,
      venuePrice: estimatedPrice,
    });
  };

  const handlePrev = () => setCurrentStep(1);
  const handleNext = () => setCurrentStep(3);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-sage-dark mb-2">Pilih Venue Pernikahan</h2>
        <p className="text-gray-600">Estimasi harga akan otomatis disesuaikan dengan jumlah tamu Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VENUE_OPTIONS.map((venue, index) => (
          <motion.button
            key={venue.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleVenueSelect(venue.type)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              data?.venueType === venue.type
                ? 'border-sage bg-sage bg-opacity-10'
                : 'border-sage-light hover:border-sage'
            }`}
          >
            <h3 className="font-semibold text-lg text-sage-dark mb-2">{venue.label}</h3>
            <p className="text-sm text-gray-600 mb-4">{venue.description}</p>
            <p className="text-sm font-semibold text-gold">
              {formatCurrency(venue.minPrice)} - {formatCurrency(venue.maxPrice)}
            </p>
            {data?.venueType === venue.type && (
              <div className="mt-4 pt-4 border-t border-sage">
                <p className="text-sm font-bold text-sage-dark">
                  Estimasi untuk {data?.guestCount} tamu:
                </p>
                <p className="text-xl font-bold text-gold">{formatCurrency(data?.venuePrice || 0)}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 pt-8 border-t border-sage-light">
        <button
          onClick={handlePrev}
          className="border-2 border-sage text-sage hover:bg-sage hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
        >
          ← Kembali
        </button>
        <button
          onClick={handleNext}
          className="bg-sage hover:bg-sage-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
        >
          Lanjut →
        </button>
      </div>
    </div>
  );
}
