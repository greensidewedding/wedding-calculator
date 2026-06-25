'use client';

import { useState } from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';
import { saveLead } from '@/lib/supabase';
import { redirectToWhatsApp } from '@/lib/utils';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function LeadCaptureModal({ onClose }: { onClose: () => void }) {
  const { data } = useCalculatorStore();
  const [formData, setFormData] = useState({
    whatsapp: '',
    instagram: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const whatsappNumber = formData.whatsapp.replace(/\D/g, '');
      const fullNumber = whatsappNumber.startsWith('62') ? whatsappNumber : `62${whatsappNumber.slice(1)}`;

      const leadData = {
        brideGroomName: data?.brideGroomName,
        whatsappNumber: fullNumber,
        instagram: formData.instagram,
        city: data?.weddingCity,
        guestCount: data?.guestCount,
        totalBudget: data?.total,
        calculatorData: data,
      };

      const result = await saveLead(leadData);

      if (result.success) {
        toast.success('Data berhasil dikirim!');
        setTimeout(() => {
          const message = `Halo Greenside Wedding Organizer, saya baru saja menggunakan Wedding Calculator dan ingin konsultasi mengenai pernikahan saya. Budget yang saya rencanakan adalah Rp ${(data?.total || 0).toLocaleString('id-ID')}. Mohon hubungi saya untuk informasi lebih lanjut. Terima kasih!`;
          redirectToWhatsApp(fullNumber, message);
          onClose();
        }, 1000);
      } else {
        toast.error('Gagal menyimpan data. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>

          <h2 className="font-serif text-2xl font-bold text-sage-dark mb-2">Dapatkan Hasil Lengkap</h2>
          <p className="text-gray-600 mb-6">Silakan isi data Anda untuk mendapatkan konsultasi gratis dari tim kami.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-semibold text-sage-dark mb-2">Nomor WhatsApp</label>
              <input
                type="tel"
                name="whatsapp"
                required
                placeholder="08xxxxxxxxxx atau 62xxxxxxxxxx"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-sage-light rounded-lg focus:outline-none focus:border-sage transition-colors"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-semibold text-sage-dark mb-2">Instagram (Opsional)</label>
              <input
                type="text"
                name="instagram"
                placeholder="@username"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-sage-light rounded-lg focus:outline-none focus:border-sage transition-colors"
              />
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-gray-500">
              Data Anda akan digunakan untuk memberikan konsultasi terbaik. Kami menghormati privasi Anda.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sage hover:bg-sage-dark text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Mengirim...' : '📱 Dapatkan Hasil Lengkap'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}
