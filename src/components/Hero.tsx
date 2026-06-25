'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-cream via-white to-sage-light flex items-center justify-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-6 py-20 text-center relative z-10">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-sage-dark mb-6 leading-tight">
            Hitung Budget Pernikahan
            <span className="text-gold"> Impianmu</span>
            <br />
            dalam <span className="text-gold">1 Menit</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Dapatkan estimasi biaya pernikahan sesuai kebutuhan dan jumlah tamu secara instan. Saatnya mewujudkan pernikahan impianmu dengan budget yang tepat.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/calculator"
            className="inline-block bg-sage hover:bg-sage-dark text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Mulai Hitung Budget →
          </Link>
          <a
            href="#features"
            className="inline-block border-2 border-sage text-sage hover:bg-sage hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-sage-light"
        >
          <p className="text-sm text-gray-500 mb-4">Dipercaya oleh ribuan calon pengantin</p>
          <div className="flex justify-center items-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-sage-dark">5000+</p>
              <p className="text-sm text-gray-600">Pengantin</p>
            </div>
            <div className="w-px h-12 bg-sage-light"></div>
            <div>
              <p className="text-3xl font-bold text-sage-dark">98%</p>
              <p className="text-sm text-gray-600">Kepuasan</p>
            </div>
            <div className="w-px h-12 bg-sage-light"></div>
            <div>
              <p className="text-3xl font-bold text-sage-dark">24/7</p>
              <p className="text-sm text-gray-600">Support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
