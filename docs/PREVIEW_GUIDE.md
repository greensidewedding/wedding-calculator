# 🎨 Preview Design Guide - Greenside Wedding Calculator

## 🚀 Cara Melihat Preview Website

Ada 3 cara untuk melihat preview design website Anda:

---

## **Option 1: Jalankan Locally (Recommended)** ⚡

Ini cara terbaik untuk melihat design dengan interaksi penuh.

### Prerequisites:
- Node.js 18+ (download dari nodejs.org)
- Git (untuk clone repository)
- Text editor (VSCode recommended)

### Step-by-Step:

**1. Clone Repository**
```bash
git clone https://github.com/greensidewedding/wedding-calculator.git
cd wedding-calculator
```

**2. Install Dependencies**
```bash
npm install
```

**3. Setup Environment Variables**
```bash
# Copy template
cp .env.example .env.local

# Isi minimal (untuk preview, Supabase optional):
# NEXT_PUBLIC_SUPABASE_URL=https://dummy.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy_key
```

**4. Jalankan Development Server**
```bash
npm run dev
```

**5. Buka di Browser**
```
http://localhost:3000
```

✅ Selesai! Anda bisa lihat preview penuh dengan semua fitur interaktif.

---

## **Option 2: Preview Cepat (Tanpa Setup Supabase)**

Jika hanya ingin melihat design tanpa database:

```bash
# 1. Clone & install (sama seperti option 1)
git clone https://github.com/greensidewedding/wedding-calculator.git
cd wedding-calculator
npm install

# 2. Edit .env.local dengan dummy values
echo "NEXT_PUBLIC_SUPABASE_URL=https://dummy.supabase.co" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy_key" >> .env.local

# 3. Run
npm run dev
```

⚠️ **Catatan:** Form submission tidak akan berfungsi tanpa Supabase setup, tapi Anda bisa melihat semua design & animasi.

---

## **Option 3: Deploy ke Vercel (Live Preview)** 🌐

Untuk melihat preview online tanpa install lokal:

### Langkah-Langkah:

**1. Login ke Vercel**
```
https://vercel.com
```
Login dengan GitHub account Anda.

**2. Import Project**
- Klik "New Project"
- Pilih repository: `wedding-calculator`
- Klik "Import"

**3. Setup Environment Variables**
```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**4. Deploy**
- Klik "Deploy"
- Tunggu ~2-3 menit

**5. Buka Live URL**
```
https://wedding-calculator-yourname.vercel.app
```

✅ Website live! Bisa dibagikan ke orang lain.

---

## 🎯 Apa yang Bisa Anda Lihat?

### **Halaman 1: Hero Section (Landing Page)**
- Headline menarik dengan warna sage & gold
- Subheadline penjelasan
- CTA button "Mulai Hitung Budget"
- Trust indicators (5000+ pengantin, 98% kepuasan)
- Responsive design untuk mobile

**Lokasi:** `http://localhost:3000`

---

### **Halaman 2: Wedding Calculator**
Setelah klik "Mulai Hitung Budget", Anda masuk ke:

#### **Step 1: Informasi Dasar**
- Input nama pengantin
- Input kota pernikahan
- Pilih tanggal
- Input/pilih jumlah tamu (100-300, 300-500, dll)
- Progress bar visual dengan step indicator

#### **Step 2: Pilih Venue**
- 5 pilihan venue (Gedung, Hotel, Outdoor, Ballroom, Rumah)
- Display harga range untuk setiap venue
- Auto-calculate estimasi harga berdasarkan jumlah tamu
- Selected state dengan highlight

#### **Step 3: Catering**
- 4 pilihan paket catering (Economical, Standard, Premium, Luxury)
- Display harga per pax
- Auto-calculate total catering (guest count × price)
- Summary card dengan breakdown

#### **Step 4: Vendor Pernikahan**
- Checkbox list untuk 10 vendor (WO, Dekorasi, MUA, dll)
- Harga untuk setiap vendor
- Total kalkulasi realtime
- Summary vendor terpilih

#### **Step 5: Konsep Pernikahan**
- 4 pilihan konsep (Intimate, Traditional, Modern, Luxury)
- Deskripsi & multiplier untuk setiap konsep
- Info tentang pengaruh konsep ke harga

**Lokasi:** `http://localhost:3000/calculator`

---

### **Halaman 3: Results Page**
Setelah selesai step 5, Anda melihat:

- **Total Budget Display** (large, highlighted dengan sage gradient)
- **3 Breakdown Cards** (Venue, Catering, Vendor) dengan percentage bar
- **Pie Chart** (visualisasi breakdown dengan Recharts)
- **Budget Recommendation** (based on total budget)
- **Complete Summary Table** dengan semua detail
- **Lead Capture Modal** (popup untuk input WhatsApp & Instagram)

**Lokasi:** Auto-redirect ke results setelah Step 5

---

## 🎨 Design Features yang Bisa Dilihat:

### **Color Scheme**
- ✅ Sage Green (#A8BBA2) - Primary color
- ✅ Gold (#D4AF37) - Accent highlights
- ✅ Cream (#FFFAF0) - Background
- ✅ White (#FFFFFF) - Cards & sections

### **Typography**
- ✅ Playfair Display (Headlines) - Elegant serif
- ✅ Montserrat (Body text) - Modern sans-serif

### **Animations**
- ✅ Fade-in effects pada load
- ✅ Slide-up animations untuk cards
- ✅ Smooth transitions on hover
- ✅ Floating animations untuk decorative elements

### **Responsive Design**
- ✅ Mobile-first approach (test dengan resize browser)
- ✅ Tablet responsive
- ✅ Desktop optimized
- ✅ Touch-friendly buttons

### **Interactive Elements**
- ✅ Form validation dengan error messages
- ✅ Real-time calculation updates
- ✅ Smooth step transitions
- ✅ Modal popups
- ✅ Charts & data visualization

---

## 📱 Testing Responsiveness

### **Di Browser:**

1. **Desktop (1920px)**
   - Buka website
   - Lihat full layout

2. **Tablet (768px)**
   - Press `F12` atau `Ctrl+Shift+I`
   - Klik device toggle (mobile icon)
   - Select "iPad" atau custom 768px

3. **Mobile (375px)**
   - Di DevTools, select "iPhone 12" atau 375px
   - Scroll & interact dengan mobile experience

### **Test Devices:**

```
✅ iPhone 12 (390 x 844)
✅ Samsung Galaxy S21 (360 x 800)
✅ iPad (768 x 1024)
✅ Desktop (1920 x 1080)
```

---

## 🧪 Testing Interactivity

### **Test Data (untuk isi form):**

```
Step 1 - Informasi Dasar:
├─ Nama: Budi & Siti
├─ Kota: Jakarta
├─ Tanggal: 25-12-2024
└─ Tamu: 300 orang (pilih 300-500)

Step 2 - Venue:
└─ Pilih: Hotel (Rp 30-100 Juta)

Step 3 - Catering:
└─ Pilih: Premium (Rp 100.000/pax)
   → Total: 300 × 100.000 = Rp 30 Juta

Step 4 - Vendor:
├─ [x] Wedding Organizer (8 Juta)
├─ [x] Dekorasi (15 Juta)
├─ [x] Fotografi (4 Juta)
├─ [x] MUA (5 Juta)
└─ Total Vendor: 32 Juta

Step 5 - Konsep:
└─ Pilih: Modern (×1.1 multiplier)

Hasil:
├─ Venue: Rp 50 Juta (contoh estimate)
├─ Catering: Rp 30 Juta
├─ Vendor: Rp 32 Juta
├─ Subtotal: Rp 112 Juta
└─ Total (×1.1): Rp 123.2 Juta
```

---

## 🎬 Video Preview (Recommended)

Jika ingin preview tanpa install, buat video screenshot:

```bash
# Di MacOS:
screenrecord --help

# Di Windows:
# Gunakan built-in Xbox Game Bar (Win + G)

# Di Linux:
recordmydesktop --help
```

---

## 🔍 Checking Different Sections

### **Hero Section Checklist:**
- [ ] Logo/Branding visible
- [ ] Headline "Hitung Budget Pernikahan..." terlihat
- [ ] Subheadline readable
- [ ] CTA button "Mulai Hitung Budget" clickable
- [ ] Trust indicators (5000+ pengantin) visible
- [ ] Gradient background smooth
- [ ] Responsive pada mobile

### **Calculator Form Checklist:**
- [ ] Step indicator shows current step
- [ ] Form fields properly aligned
- [ ] Buttons (Kembali/Lanjut) functional
- [ ] Error messages show when validation fails
- [ ] Animations smooth on navigation
- [ ] Mobile form fields accessible

### **Results Page Checklist:**
- [ ] Total budget displayed prominently
- [ ] Breakdown cards show correct values
- [ ] Pie chart renders properly
- [ ] Summary table complete
- [ ] Budget recommendation text appears
- [ ] Modal popup shows on CTA click
- [ ] Hitung Ulang button resets calculator

---

## 🐛 Troubleshooting Preview

### **Port 3000 sudah dipakai?**
```bash
# Gunakan port berbeda:
npm run dev -- -p 3001
# Buka: http://localhost:3001
```

### **Node modules error?**
```bash
# Clear cache & reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### **Environment variables error?**
```bash
# Verify .env.local exists:
ls -la .env.local

# Jika tidak ada, buat:
cp .env.example .env.local
# Edit dengan text editor, isi dummy values
```

### **Build error?**
```bash
# Clean build:
npm run build

# Jika masih error, check TypeScript:
npm run lint
```

---

## 📊 Performance Check

### **Lighthouse Score (DevTools):**

1. Buka http://localhost:3000
2. Press `F12` → DevTools
3. Klik "Lighthouse" tab
4. Klik "Generate report"

**Expected scores:**
- Performance: 85+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## 🎁 Bonus: Screenshots untuk Marketing

Setelah preview, Anda bisa screenshot untuk:
- Social media posts
- Email campaigns
- Landing page
- Portfolio

**Tool recommendations:**
- Mac: Built-in Cmd+Shift+4
- Windows: Snipping Tool atau ShareX
- Online: Screenshot.com atau FireShot

---

## ✅ Summary

**Fastest way (5 menit):**
```bash
git clone https://github.com/greensidewedding/wedding-calculator.git
cd wedding-calculator
npm install
cp .env.example .env.local
npm run dev
# Buka http://localhost:3000
```

**Atau langsung lihat di:**
```
https://wedding-calculator-yourname.vercel.app
(setelah deploy ke Vercel)
```

**Itu saja! Enjoy preview! 🎉**

---

**Butuh bantuan?**
- Error saat jalankan? Cek error message di terminal
- Design issue? Screenshot & kirim
- Fitur request? Tinggal bilang!
