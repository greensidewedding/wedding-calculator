'use client';

import { useState } from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';
import { formatCurrency, getBudgetRecommendation, redirectToWhatsApp } from '@/lib/utils';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import LeadCaptureModal from './LeadCaptureModal';

const COLORS = ['#A8BBA2', '#D4AF37', '#7A8A72'];

export default function ResultsPage() {
  const { data, resetCalculator, setCurrentStep } = useCalculatorStore();
  const [showLeadModal, setShowLeadModal] = useState(false);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = [
    { name: 'Venue', value: data.breakdown.venue },
    { name: 'Catering', value: data.breakdown.catering },
    { name: 'Vendor', value: data.breakdown.vendor },
  ];

  const recommendation = getBudgetRecommendation(data.total);

  const handleReset = () => {
    resetCalculator();
    setCurrentStep(1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-serif text-4xl font-bold text-sage-dark mb-4">Estimasi Budget Anda</h1>
        <p className="text-gray-600">Berikut adalah estimasi lengkap untuk pernikahan impian Anda</p>
      </motion.div>

      {/* Main Budget Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-sage rounded-2xl p-8 text-white text-center"
      >
        <p className="text-lg mb-4 opacity-90">Total Budget Estimasi</p>
        <h2 className="font-serif text-6xl font-bold mb-4">{formatCurrency(data.total)}</h2>
        <p className="text-sm opacity-80">
          Untuk pernikahan {data.brideGroomName} di {data.weddingCity} dengan {data.guestCount} tamu
        </p>
      </motion.div>

      {/* Budget Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Venue', amount: data.breakdown.venue, percentage: data.breakdown.percentage.venue, color: 'bg-sage' },
          { label: 'Catering', amount: data.breakdown.catering, percentage: data.breakdown.percentage.catering, color: 'bg-gold' },
          { label: 'Vendor', amount: data.breakdown.vendor, percentage: data.breakdown.percentage.vendor, color: 'bg-sage-dark' },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border-2 border-sage-light rounded-xl p-6 hover:border-sage transition-all"
          >
            <p className="text-sm text-gray-600 mb-2">{item.label}</p>
            <p className="text-2xl font-bold text-sage-dark mb-3">{formatCurrency(item.amount)}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-sage-light rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-600 w-12 text-right">
                {item.percentage.toFixed(0)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white border-2 border-sage-light rounded-xl p-8"
      >
        <h3 className="font-semibold text-sage-dark text-lg mb-6">Breakdown Persentase</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Budget Recommendation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-cream border-2 border-gold rounded-xl p-8"
      >
        <h3 className="font-semibold text-sage-dark text-lg mb-4">💡 Rekomendasi Konsep</h3>
        <p className="text-gray-700 leading-relaxed">{recommendation}</p>
        <div className="mt-4 p-4 bg-white rounded-lg border border-gold">
          <p className="text-sm text-gray-600 mb-2">Konsep Terpilih:</p>
          <p className="font-bold text-sage-dark capitalize text-lg">
            {data.weddingConcept} Wedding (×{data.conceptMultiplier})
          </p>
        </div>
      </motion.div>

      {/* Detail Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white border-2 border-sage-light rounded-xl p-8"
      >
        <h3 className="font-semibold text-sage-dark text-lg mb-6">Ringkasan Lengkap</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-3">
              <div className="flex justify-between pb-3 border-b border-sage-light">
                <span className="text-gray-600">Nama Pengantin</span>
                <span className="font-semibold text-sage-dark">{data.brideGroomName}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-sage-light">
                <span className="text-gray-600">Kota Pernikahan</span>
                <span className="font-semibold text-sage-dark">{data.weddingCity}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-sage-light">
                <span className="text-gray-600">Tanggal</span>
                <span className="font-semibold text-sage-dark">{new Date(data.weddingDate).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-3">
              <div className="flex justify-between pb-3 border-b border-sage-light">
                <span className="text-gray-600">Jumlah Tamu</span>
                <span className="font-semibold text-sage-dark">{data.guestCount} orang</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-sage-light">
                <span className="text-gray-600">Tipe Venue</span>
                <span className="font-semibold text-sage-dark capitalize">{data.venueType}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-sage-light">
                <span className="text-gray-600">Harga per Pax</span>
                <span className="font-semibold text-sage-dark">{formatCurrency(data.cateringPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cost Summary Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white border-2 border-sage-light rounded-xl overflow-hidden"
      >
        <table className="w-full">
          <tbody>
            <tr className="border-b border-sage-light">
              <td className="px-6 py-4 font-semibold text-sage-dark">Venue</td>
              <td className="px-6 py-4 text-right font-bold text-gold">{formatCurrency(data.breakdown.venue)}</td>
            </tr>
            <tr className="border-b border-sage-light">
              <td className="px-6 py-4 font-semibold text-sage-dark">Catering</td>
              <td className="px-6 py-4 text-right font-bold text-gold">{formatCurrency(data.breakdown.catering)}</td>
            </tr>
            <tr className="border-b border-sage-light">
              <td className="px-6 py-4 font-semibold text-sage-dark">Vendor</td>
              <td className="px-6 py-4 text-right font-bold text-gold">{formatCurrency(data.breakdown.vendor)}</td>
            </tr>
            <tr className="border-b border-sage-light bg-cream">
              <td className="px-6 py-4 font-semibold text-sage-dark">Subtotal</td>
              <td className="px-6 py-4 text-right font-bold text-sage-dark">{formatCurrency(data.subtotal)}</td>
            </tr>
            <tr className="bg-sage bg-opacity-10">
              <td className="px-6 py-4 font-bold text-sage-dark text-lg">Total (dengan multiplier ×{data.conceptMultiplier})</td>
              <td className="px-6 py-4 text-right font-bold text-gold text-2xl">{formatCurrency(data.total)}</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={() => setShowLeadModal(true)}
          className="bg-sage hover:bg-sage-dark text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          📥 Dapatkan Konsultasi Gratis
        </button>
        <button
          onClick={handleReset}
          className="border-2 border-sage text-sage hover:bg-sage hover:text-white font-bold py-4 px-8 rounded-lg transition-all duration-300"
        >
          🔄 Hitung Ulang
        </button>
      </motion.div>

      {/* Lead Capture Modal */}
      {showLeadModal && <LeadCaptureModal onClose={() => setShowLeadModal(false)} />}
    </div>
  );
}
