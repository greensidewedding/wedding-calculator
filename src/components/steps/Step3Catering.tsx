'use client';

import { useCalculatorStore } from '@/store/calculatorStore';
import { CATERING_PRICES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Step3Catering() {
  const { data, updateData, setCurrentStep } = useCalculatorStore();

  const handleCateringSelect = (price: number) => {
    updateData({ cateringPrice: price });
  };

  const handlePrev = () => setCurrentStep(2);
  const handleNext = () => setCurrentStep(4);

  const totalCatering = (data?.cateringPrice || 0) * (data?.guestCount || 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-sage-dark mb-2">Pilih Paket Catering</h2>
        <p className="text-gray-600">Harga per orang × Jumlah tamu = Total catering</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATERING_PRICES.map((option, index) => (
          <motion.button
            key={option.price}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleCateringSelect(option.price)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              data?.cateringPrice === option.price
                ? 'border-sage bg-sage bg-opacity-10'
                : 'border-sage-light hover:border-sage'
            }`}
          >
            <h3 className="font-semibold text-lg text-sage-dark mb-2">{option.label}</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Harga per orang</p>
                <p className="text-xl font-bold text-gold">{formatCurrency(option.price)}</p>
              </div>
              {data?.cateringPrice === option.price && (
                <div className="pt-4 border-t border-sage space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Untuk {data?.guestCount} tamu</p>
                    <p className="text-lg font-bold text-sage-dark">{formatCurrency(totalCatering)}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Summary */}
      {data?.cateringPrice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-cream p-6 rounded-xl"
        >
          <h4 className="font-semibold text-sage-dark mb-3">Ringkasan Catering</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Harga per pax</span>
              <span className="font-semibold">{formatCurrency(data.cateringPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Jumlah tamu</span>
              <span className="font-semibold">{data.guestCount} orang</span>
            </div>
            <div className="border-t border-sage-light pt-2 flex justify-between font-bold">
              <span>Total Catering</span>
              <span className="text-gold text-lg">{formatCurrency(totalCatering)}</span>
            </div>
          </div>
        </motion.div>
      )}

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
