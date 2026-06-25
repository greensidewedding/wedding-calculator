'use client';

import { useCalculatorStore } from '@/store/calculatorStore';
import { WEDDING_CONCEPTS } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function Step5Concept() {
  const { data, updateData, setCurrentStep, calculateTotal } = useCalculatorStore();

  const handleConceptSelect = (concept: any, multiplier: number) => {
    updateData({
      weddingConcept: concept,
      conceptMultiplier: multiplier,
    });
    calculateTotal();
  };

  const handlePrev = () => setCurrentStep(4);
  const handleNext = () => {
    calculateTotal();
    setCurrentStep(6);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-sage-dark mb-2">Pilih Konsep Pernikahan</h2>
        <p className="text-gray-600">Konsep akan mempengaruhi harga keseluruhan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WEDDING_CONCEPTS.map((concept, index) => (
          <motion.button
            key={concept.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleConceptSelect(concept.type, concept.multiplier)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              data?.weddingConcept === concept.type
                ? 'border-sage bg-sage bg-opacity-10'
                : 'border-sage-light hover:border-sage'
            }`}
          >
            <h3 className="font-semibold text-lg text-sage-dark mb-2">{concept.label}</h3>
            <p className="text-sm text-gray-600 mb-4">{concept.description}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">Multiplier:</span>
              <span className="text-2xl font-bold text-gold">×{concept.multiplier}</span>
            </div>
            {data?.weddingConcept === concept.type && (
              <div className="mt-4 pt-4 border-t border-sage text-sm text-sage-dark font-semibold">
                ✓ Terpilih
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Info */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>ℹ️ Catatan:</strong> Multiplier akan diterapkan pada total biaya sebelumnya. Semakin tinggi konsep, semakin tinggi detail dan kualitas.
        </p>
      </motion.div>

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
          Lihat Hasil →
        </button>
      </div>
    </div>
  );
}
