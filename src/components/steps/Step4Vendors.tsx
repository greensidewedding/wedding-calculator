'use client';

import { useCalculatorStore } from '@/store/calculatorStore';
import { VENDOR_OPTIONS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Step4Vendors() {
  const { data, updateData, setCurrentStep } = useCalculatorStore();
  const [vendors, setVendors] = useState(VENDOR_OPTIONS);

  useEffect(() => {
    if (data?.selectedVendors && data.selectedVendors.length > 0) {
      setVendors(
        VENDOR_OPTIONS.map((vendor) => ({
          ...vendor,
          selected: data.selectedVendors.some((v) => v.id === vendor.id),
        }))
      );
    }
  }, [data?.selectedVendors]);

  const handleVendorToggle = (vendorId: string) => {
    const updated = vendors.map((v) =>
      v.id === vendorId ? { ...v, selected: !v.selected } : v
    );
    setVendors(updated);

    const selected = updated.filter((v) => v.selected);
    const totalVendor = selected.reduce((sum, v) => sum + v.price, 0);

    updateData({
      selectedVendors: selected,
      totalVendor,
    });
  };

  const handlePrev = () => setCurrentStep(3);
  const handleNext = () => setCurrentStep(5);

  const totalVendor = vendors
    .filter((v) => v.selected)
    .reduce((sum, v) => sum + v.price, 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-bold text-sage-dark mb-2">Pilih Vendor Pernikahan</h2>
        <p className="text-gray-600">Pilih vendor yang ingin Anda gunakan</p>
      </div>

      <div className="space-y-3">
        {vendors.map((vendor, index) => (
          <motion.label
            key={vendor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              vendor.selected
                ? 'border-sage bg-sage bg-opacity-10'
                : 'border-sage-light hover:border-sage'
            }`}
          >
            <input
              type="checkbox"
              checked={vendor.selected}
              onChange={() => handleVendorToggle(vendor.id)}
              className="w-5 h-5 accent-sage cursor-pointer"
            />
            <div className="flex-1 ml-4">
              <p className="font-semibold text-sage-dark">{vendor.name}</p>
            </div>
            <p className="font-bold text-gold">{formatCurrency(vendor.price)}</p>
          </motion.label>
        ))}
      </div>

      {/* Summary */}
      {totalVendor > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-cream p-6 rounded-xl"
        >
          <h4 className="font-semibold text-sage-dark mb-4">Vendor Terpilih ({vendors.filter((v) => v.selected).length})</h4>
          <div className="space-y-2 mb-4">
            {vendors
              .filter((v) => v.selected)
              .map((v) => (
                <div key={v.id} className="flex justify-between text-sm">
                  <span>{v.name}</span>
                  <span className="font-semibold">{formatCurrency(v.price)}</span>
                </div>
              ))}
          </div>
          <div className="border-t border-sage-light pt-4 flex justify-between font-bold">
            <span>Total Vendor</span>
            <span className="text-gold text-lg">{formatCurrency(totalVendor)}</span>
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
