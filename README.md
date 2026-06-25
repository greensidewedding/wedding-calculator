# Greenside Wedding Calculator

## 🎊 Modern Wedding Budget Calculator

Website untuk menghitung estimasi biaya pernikahan secara otomatis. Dirancang sebagai lead generation tool untuk Wedding Organizer dengan desain yang elegant, modern, dan mobile-first.

## ✨ Fitur Utama

### 1. **Kalkulator Budget Multi-Step**
- **Step 1**: Informasi Dasar (Nama, Kota, Tanggal, Jumlah Tamu)
- **Step 2**: Pilih Venue (Gedung, Hotel, Outdoor, Ballroom, Rumah)
- **Step 3**: Catering (Harga per pax)
- **Step 4**: Vendor Pernikahan (Wedding Organizer, Dekorasi, MUA, dll)
- **Step 5**: Konsep Pernikahan (Intimate, Traditional, Modern, Luxury)

### 2. **Kalkulasi Otomatis**
- Venue price estimation berdasarkan jumlah tamu
- Catering total = guest count × price per pax
- Multiple vendor selection dengan total calculation
- Konsep multiplier untuk adjustment harga

### 3. **Hasil Perhitungan**
- Ringkasan budget detail
- Breakdown persentase dengan pie chart
- Budget recommendation berdasarkan total
- Tabel ringkasan lengkap

### 4. **Lead Capture**
- Modal form untuk capture kontak calon pengantin
- Save data ke Supabase database
- Redirect ke WhatsApp dengan pesan otomatis

### 5. **Admin Dashboard**
- View semua leads
- Search dan filter leads
- Export data Excel
- Track budget trends

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Database**: Supabase
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Notifications**: React Hot Toast
- **Integrations**: WhatsApp API, Google Analytics, Meta Pixel

## 🎨 Design System

### Colors
- **Sage Green**: #A8BBA2 (Primary)
- **Sage Dark**: #7A8A72
- **Gold Accent**: #D4AF37 (Highlight)
- **Cream**: #FFFAF0 (Background)
- **White**: #FFFFFF

### Typography
- **Serif**: Playfair Display (Headlines)
- **Sans**: Montserrat (Body)

## 📁 Project Structure

```
wedding-calculator/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   └── calculator/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── CalculatorSteps.tsx
│   │   ├── StepIndicator.tsx
│   │   ├── ResultsPage.tsx
│   │   ├── LeadCaptureModal.tsx
│   │   └── steps/
│   │       ├── Step1BasicInfo.tsx
│   │       ├── Step2Venue.tsx
│   │       ├── Step3Catering.tsx
│   │       ├── Step4Vendors.tsx
│   │       └── Step5Concept.tsx
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── supabase.ts
│   │   └── utils.ts
│   ├── store/
│   │   └── calculatorStore.ts
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm atau yarn
- Supabase account

### Installation

1. Clone repository:
```bash
git clone https://github.com/greensidewedding/wedding-calculator.git
cd wedding-calculator
```

2. Install dependencies:
```bash
npm install
# atau
yarn install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan credentials Anda:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
WHATSAPP_NUMBER=62xxxxxxxxxxx
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id
```

4. Setup Supabase Database

Buat tabel `leads` dengan schema:
```sql
create table leads (
  id bigint primary key generated always as identity,
  bride_groom_name text not null,
  whatsapp_number text not null,
  instagram text,
  city text not null,
  guest_count integer not null,
  total_budget bigint not null,
  calculator_data jsonb not null,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index idx_leads_submitted_at on leads(submitted_at desc);
create index idx_leads_city on leads(city);
create index idx_leads_total_budget on leads(total_budget);
```

5. Run development server:
```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 💰 Budget Pricing

### Venue
- **Gedung**: Rp 10.000.000 - Rp 30.000.000
- **Hotel**: Rp 30.000.000 - Rp 100.000.000
- **Outdoor Garden**: Rp 20.000.000 - Rp 60.000.000
- **Ballroom**: Rp 50.000.000 - Rp 150.000.000
- **Rumah**: Rp 5.000.000 - Rp 20.000.000

### Catering
- Economical: Rp 50.000/pax
- Standard: Rp 75.000/pax
- Premium: Rp 100.000/pax
- Luxury: Rp 150.000/pax

### Vendor Default Prices
- Wedding Organizer: Rp 8.000.000
- Dekorasi: Rp 15.000.000
- MUA: Rp 5.000.000
- Attire/Busana: Rp 6.000.000
- Fotografi: Rp 4.000.000
- Videografi: Rp 5.000.000
- Entertainment: Rp 5.000.000
- MC: Rp 2.500.000
- Wedding Cake: Rp 1.500.000
- Photobooth: Rp 3.000.000

### Konsep Multiplier
- Intimate: ×0.9
- Traditional: ×1.0
- Modern: ×1.1
- Luxury: ×1.3

## 📊 Lead Management

### Collected Data
- Nama calon pengantin
- Nomor WhatsApp
- Instagram
- Kota pernikahan
- Jumlah tamu
- Total budget
- Lengkap calculator data
- Timestamp submission

### Admin Features
- View all leads with sorting
- Search by name, phone, city
- Filter by budget range dan tanggal
- Export ke Excel
- Dashboard statistics

## 🔗 Integrations

### WhatsApp API
Setelah form submission, user di-redirect ke WhatsApp dengan pesan otomatis:
```
Halo Greenside Wedding Organizer, saya baru saja menggunakan Wedding Calculator 
dan ingin konsultasi mengenai pernikahan saya.
```

### Google Analytics
Tracking untuk:
- Page views
- Calculator steps completion
- Lead submission events
- User behavior analysis

### Meta Pixel
For retargeting campaigns dan conversion tracking

## 📱 Mobile Responsive

Desain fully responsive:
- Mobile: 320px dan up
- Tablet: 768px dan up
- Desktop: 1024px dan up

Optimized untuk:
- Touch interactions
- Fast loading (< 3 detik)
- Low data usage
- Offline support ready

## 🎯 SEO Optimization

- Meta tags dan OpenGraph
- Structured data (JSON-LD)
- Fast Core Web Vitals
- Sitemap dan robots.txt
- Alt text untuk images
- Internal linking strategy

## 🔐 Security

- Environment variables untuk sensitive data
- Supabase Row Level Security (RLS)
- Input validation dengan Zod
- CORS configuration
- Rate limiting ready

## 📈 Performance

- Next.js optimization
- Image optimization
- Code splitting
- Lazy loading components
- Caching strategies

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t wedding-calculator .
docker run -p 3000:3000 wedding-calculator
```

## 📝 License

Copyright © 2024 Greenside Wedding Organizer. All rights reserved.

## 🤝 Support

Untuk support, hubungi:
- WhatsApp: [Nomor WA]
- Email: support@greensidewedding.com
- Instagram: @greensidewedding

## 🎉 Future Enhancements

- [ ] Timeline generator
- [ ] Checklist otomatis
- [ ] PDF report download
- [ ] Simulasi akad + resepsi terpisah
- [ ] Regional pricing variations
- [ ] Vendor marketplace integration
- [ ] Payment gateway integration
- [ ] Mobile app version

---

**Dibuat dengan 💚 untuk pernikahan impianmu**
