import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Greenside Wedding Calculator - Hitung Budget Pernikahan Impianmu',
  description: 'Kalkulator budget pernikahan modern yang membantu calon pengantin mengestimasi biaya pernikahan secara akurat dalam 1 menit.',
  keywords: 'wedding calculator, kalkulator pernikahan, budget pernikahan, wedding planner',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Greenside Wedding Calculator',
    description: 'Hitung budget pernikahan impianmu dalam 1 menit',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white font-sans">
        {children}
      </body>
    </html>
  );
}
