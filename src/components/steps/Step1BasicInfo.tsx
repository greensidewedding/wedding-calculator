'use client';

import { useState } from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';
import { GUEST_CATEGORIES } from '@/lib/constants';

export default function Step1BasicInfo() {
  const { data, updateData, setCurrentStep, calculateTotal } = useCalculatorStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    updateData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!data?.brideGroomName?.trim()) {
      newErrors.brideGroomName = 'Nama pengantin harus diisi';
    }
    if (!data?.weddingCity?.trim()) {
      newErrors.weddingCity = 'Kota pernikahan harus diisi';
    }
    if (!data?.weddingDate) {
      newErrors.weddingDate = 'Tanggal pernikahan harus dipilih';
    }
    if (!data?.guestCount || data.guestCount === 0) {
      newErrors.guestCount = 'Jumlah tamu harus diisi';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-sage-dark mb-2">Informasi Dasar</h2>
        <p className="text-gray-600">Mari kita mulai dengan informasi dasar tentang pernikahan Anda</p>
      </div>

      {/* Bride/Groom Name */}
      <div>
        <label className="block text-sm font-semibold text-sage-dark mb-2">Nama Pengantin</label>
        <input
          type="text"
          value={data?.brideGroomName || ''}
          onChange={(e) => handleChange('brideGroomName', e.target.value)}
          placeholder="Contoh: Budi & Siti"
          className="w-full px-4 py-3 border-2 border-sage-light rounded-lg focus:outline-none focus:border-sage transition-colors"
        />
        {errors.brideGroomName && <p className="text-red-500 text-sm mt-1">{errors.brideGroomName}</p>}
      </div>

      {/* Wedding City */}
      <div>
        <label className="block text-sm font-semibold text-sage-dark mb-2">Kota Pernikahan</label>
        <input
          type="text"
          value={data?.weddingCity || ''}
          onChange={(e) => handleChange('weddingCity', e.target.value)}
          placeholder="Contoh: Jakarta, Surabaya, Bandung"
          className="w-full px-4 py-3 border-2 border-sage-light rounded-lg focus:outline-none focus:border-sage transition-colors"
        />
        {errors.weddingCity && <p className="text-red-500 text-sm mt-1">{errors.weddingCity}</p>}
      </div>

      {/* Wedding Date */}
      <div>
        <label className="block text-sm font-semibold text-sage-dark mb-2">Tanggal Pernikahan</label>
        <input
          type="date"
          value={data?.weddingDate || ''}
          onChange={(e) => handleChange('weddingDate', e.target.value)}
          className="w-full px-4 py-3 border-2 border-sage-light rounded-lg focus:outline-none focus:border-sage transition-colors"
        />
        {errors.weddingDate && <p className="text-red-500 text-sm mt-1">{errors.weddingDate}</p>}
      </div>

      {/* Guest Count */}
      <div>
        <label className="block text-sm font-semibold text-sage-dark mb-4">Jumlah Tamu</label>
        <input
          type="number"
          value={data?.guestCount || ''}
          onChange={(e) => {
            const count = parseInt(e.target.value) || 0;
            handleChange('guestCount', count);
            // Auto-select guest category
            if (count <= 300) handleChange('guestCategory', '100-300');
            else if (count <= 500) handleChange('guestCategory', '300-500');
            else if (count <= 800) handleChange('guestCategory', '500-800');
            else handleChange('guestCategory', '800+');
          }}
          placeholder="Contoh: 250"
          min="1"
          className="w-full px-4 py-3 border-2 border-sage-light rounded-lg focus:outline-none focus:border-sage transition-colors"
        />
        {errors.guestCount && <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>}

        {/* Quick Select */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {GUEST_CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                const mid = category.value === '100-300' ? 200 : category.value === '300-500' ? 400 : category.value === '500-800' ? 650 : 1000;
                handleChange('guestCount', mid);
                handleChange('guestCategory', category.value);
              }}
              className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                data?.guestCategory === category.value
                  ? 'bg-sage text-white'
                  : 'bg-sage-light text-sage-dark hover:bg-sage hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 pt-8 border-t border-sage-light">
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
