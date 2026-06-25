# 📸 Website Screenshots & Visual Guide

## 🎨 Design Preview

### **Color Palette**
```
┌─────────────────┬──────────────┬─────────────────────────┐
│ Color           │ Hex Code     │ Usage                   │
├─────────────────┼──────────────┼─────────────────────────┤
│ Sage Green      │ #A8BBA2      │ Primary buttons, headers│
│ Sage Dark       │ #7A8A72      │ Hover states, accents   │
│ Gold Accent     │ #D4AF37      │ Highlights, emphasis    │
│ Cream           │ #FFFAF0      │ Background, cards       │
│ White           │ #FFFFFF      │ Pure white components   │
│ Dark Gray       │ #1a1a1a      │ Text, dark mode ready   │
└─────────────────┴──────────────┴─────────────────────────┘
```

### **Typography**
```
Headings (H1-H6):
• Font: Playfair Display (serif)
• Weight: 700, 800
• Use: Large, elegant headlines

Body Text:
• Font: Montserrat (sans-serif)
• Weight: 400, 500, 600, 700
• Use: Regular content, buttons, forms
```

---

## 📄 Page Structure Overview

### **1. Home / Landing Page** (http://localhost:3000)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│               HERO SECTION                          │
│                                                     │
│  "Hitung Budget Pernikahan Impianmu"                │
│  "dalam 1 Menit"                                   │
│                                                     │
│  Subheadline penjelasan di sini...                 │
│                                                     │
│  [Mulai Hitung Budget] [Pelajari Lebih Lanjut]    │
│                                                     │
│  Trust Indicators:                                  │
│  5000+ Pengantin | 98% Kepuasan | 24/7 Support    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Design Features:**
- ✅ Gradient background (cream to sage)
- ✅ Large serif headlines
- ✅ Centered layout
- ✅ Two CTA buttons (primary & secondary)
- ✅ Decorative gradient circles (top-right & bottom-left)
- ✅ Smooth fade-in animations

---

### **2. Calculator Page** (http://localhost:3000/calculator)

#### **Step Indicator**
```
🏰 → 🏨 → 🍽️ → ✨ → 💎
Step 1  Step 2  Step 3  Step 4  Step 5

█████░░░░░░░░░░░░  (Progress bar)
```

#### **Step 1: Informasi Dasar**
```
┌──────────────────────────────────────────┐
│ Informasi Dasar                          │
│ Mari kita mulai dengan informasi dasar... │
│                                          │
│ Nama Pengantin                           │
│ [________________________]               │
│                                          │
│ Kota Pernikahan                          │
│ [________________________]               │
│                                          │
│ Tanggal Pernikahan                       │
│ [________] (date picker)                │
│                                          │
│ Jumlah Tamu                              │
│ [____] orang                             │
│                                          │
│ Quick Select:                            │
│ [100-300] [300-500] [500-800] [800+]    │
│                                          │
│ [Kembali] [Lanjut →]                    │
└──────────────────────────────────────────┘
```

**Features:**
- ✅ Clean form layout
- ✅ Helpful placeholder text
- ✅ Quick select buttons
- ✅ Validation error messages
- ✅ Smooth focus states

#### **Step 2: Venue Selection**
```
┌──────────────────────────────────────────┐
│ Pilih Venue Pernikahan                  │
│ Estimasi harga akan disesuaikan...      │
│                                          │
│ ┌─────────────┐  ┌─────────────┐       │
│ │ Gedung      │  │ Hotel ✓     │       │
│ │ Rp 10-30M   │  │ Rp 30-100M  │       │
│ └─────────────┘  │ Selected!   │       │
│                  │ Est: Rp 50M │       │
│ ┌─────────────┐  └─────────────┘       │
│ │ Outdoor     │  ┌─────────────┐       │
│ │ Rp 20-60M   │  │ Ballroom    │       │
│ └─────────────┘  │ Rp 50-150M  │       │
│                  └─────────────┘       │
│ ┌─────────────┐                        │
│ │ Rumah       │                        │
│ │ Rp 5-20M    │                        │
│ └─────────────┘                        │
│                                          │
│ [Kembali] [Lanjut →]                    │
└──────────────────────────────────────────┘
```

**Features:**
- ✅ Card grid layout (2 columns)
- ✅ Price range display
- ✅ Selection highlight (sage border)
- ✅ Auto-calculated estimate
- ✅ Smooth hover animations

#### **Step 3: Catering**
```
┌──────────────────────────────────────────┐
│ Pilih Paket Catering                     │
│ Harga per orang × Jumlah tamu = Total   │
│                                          │
│ ┌──────────────┐  ┌──────────────┐     │
│ │ Economical   │  │ Standard     │     │
│ │ Rp 50K/pax   │  │ Rp 75K/pax   │     │
│ │              │  │              │     │
│ │ (300 tamu)   │  │ (300 tamu)   │     │
│ │ Rp 15M total │  │ Rp 22.5M     │     │
│ └──────────────┘  └──────────────┘     │
│                                          │
│ ┌──────────────┐  ┌──────────────┐     │
│ │ Premium ✓    │  │ Luxury       │     │
│ │ Rp 100K/pax  │  │ Rp 150K/pax  │     │
│ │ Selected!    │  │              │     │
│ │ Rp 30M total │  │ Rp 45M total │     │
│ └──────────────┘  └──────────────┘     │
│                                          │
│ Summary Box:                             │
│ ├─ Harga per pax: Rp 100.000           │
│ ├─ Jumlah tamu: 300 orang              │
│ └─ Total Catering: Rp 30.000.000       │
│                                          │
│ [Kembali] [Lanjut →]                    │
└──────────────────────────────────────────┘
```

#### **Step 4: Vendors**
```
┌──────────────────────────────────────────┐
│ Pilih Vendor Pernikahan                  │
│ Pilih vendor yang ingin Anda gunakan    │
│                                          │
│ ☑ Wedding Organizer          Rp 8M     │
│ ☑ Dekorasi                  Rp 15M     │
│ ☐ Makeup & Hair (MUA)        Rp 5M     │
│ ☑ Attire / Busana            Rp 6M     │
│ ☑ Fotografi                  Rp 4M     │
│ ☑ Videografi                 Rp 5M     │
│ ☐ Music & Entertainment      Rp 5M     │
│ ☐ Master of Ceremony         Rp 2.5M   │
│ ☐ Wedding Cake               Rp 1.5M   │
│ ☐ Photobooth                 Rp 3M     │
│                                          │
│ Vendor Terpilih (5):                    │
│ ├─ WO: Rp 8M                           │
│ ├─ Dekorasi: Rp 15M                    │
│ ├─ Attire: Rp 6M                       │
│ ├─ Foto: Rp 4M                         │
│ └─ Video: Rp 5M                        │
│ Total Vendor: Rp 38.000.000             │
│                                          │
│ [Kembali] [Lanjut →]                    │
└──────────────────────────────────────────┘
```

#### **Step 5: Wedding Concept**
```
┌──────────────────────────────────────────┐
│ Pilih Konsep Pernikahan                  │
│ Konsep akan mempengaruhi harga...       │
│                                          │
│ ┌──────────────┐  ┌──────────────┐     │
│ │ Intimate     │  │ Traditional  │     │
│ │ Sederhana... │  │ Tradisional..│     │
│ │ ×0.9        │  │ ×1.0        │     │
│ └──────────────┘  └──────────────┘     │
│                                          │
│ ┌──────────────┐  ┌──────────────┐     │
│ │ Modern ✓     │  │ Luxury       │     │
│ │ Kontemporer  │  │ Mewah...     │     │
│ │ ×1.1        │  │ ×1.3        │     │
│ │ Selected!    │  │              │     │
│ └──────────────┘  └──────────────┘     │
│                                          │
│ ℹ️ Multiplier akan diterapkan pada      │
│    total biaya sebelumnya                │
│                                          │
│ [Kembali] [Lihat Hasil →]               │
└──────────────────────────────────────────┘
```

---

### **3. Results Page** (Auto-shown after Step 5)

```
┌──────────────────────────────────────────┐
│                                          │
│      ESTIMASI BUDGET ANDA                │
│                                          │
│  ╔═══════════════════════════╗          │
│  ║  Rp 123.200.000          ║          │
│  ╚═══════════════════════════╝          │
│                                          │
│  Untuk Budi & Siti di Jakarta            │
│  dengan 300 tamu                         │
│                                          │
│  ┌────────────┐ ┌────────────┐ ┌────┐ │
│  │ VENUE      │ │ CATERING   │ │VND │ │
│  │ Rp 50M     │ │ Rp 30M     │ │Rp32│ │
│  │ 33%        │ │ 24%        │ │41% │ │
│  │ [████░░░░] │ │ [███░░░░░░] │ │[██]│ │
│  └────────────┘ └────────────┘ └────┘ │
│                                          │
│              PIE CHART                   │
│            (Doughnut style)              │
│          Venue 33%                       │
│          Catering 24%                    │
│          Vendor 41%                      │
│                                          │
│  💡 REKOMENDASI KONSEP                   │
│  ┌──────────────────────────────────────┐│
│  │ Konsep Modern Wedding sangat ideal   ││
│  │ untuk budget Anda. Anda bisa        ││
│  │ menciptakan pernikahan kontemporer  ││
│  │ yang elegan dan berkesan.           ││
│  └──────────────────────────────────────┘│
│                                          │
│  RINGKASAN LENGKAP                       │
│  ├─ Nama: Budi & Siti                  │
│  ├─ Kota: Jakarta                       │
│  ├─ Tanggal: 25-12-2024                │
│  ├─ Tamu: 300 orang                    │
│  ├─ Venue: Hotel                        │
│  └─ Harga/pax: Rp 100.000              │
│                                          │
│  COST BREAKDOWN TABLE                    │
│  ├─ Venue:        Rp 50.000.000        │
│  ├─ Catering:     Rp 30.000.000        │
│  ├─ Vendor:       Rp 38.000.000        │
│  ├─ Subtotal:     Rp 118.000.000       │
│  └─ Total (×1.1): Rp 129.800.000       │
│                                          │
│  [📧 Dapatkan Konsultasi] [🔄 Hitung Ulang]│
│                                          │
└──────────────────────────────────────────┘
```

**Features:**
- ✅ Large prominent budget display
- ✅ 3 breakdown cards with progress bars
- ✅ Interactive pie chart
- ✅ Budget recommendation box
- ✅ Detailed summary section
- ✅ Complete cost breakdown table
- ✅ Call-to-action buttons

---

## 🎬 Animation Details

### **Fade-in (Hero Section)**
```
0% ────── opacity: 0
       ↓
100% ─── opacity: 1 (0.8s ease-in-out)
```

### **Slide-up (Cards & Sections)**
```
0% ────── translateY(20px), opacity: 0
       ↓
100% ─── translateY(0), opacity: 1 (0.8s ease-out)
```

### **Float (Decorative Elements)**
```
0%, 100% ─ translateY(0px)
50% ────── translateY(-10px) (infinite 3s)
```

### **Hover Effects**
```
Button:     scale(1.05) + shadow increase
Card:       border-color change + shadow
Input:      ring + focus state
```

---

## 📐 Layout Breakpoints

### **Mobile** (320px - 640px)
```
- Single column layout
- Full-width buttons
- Stacked cards
- Touch-friendly spacing (min 48px tap target)
- Readable font sizes (min 16px)
```

### **Tablet** (641px - 1024px)
```
- 2 column grid
- Balanced spacing
- Medium sized components
- Landscape & portrait modes
```

### **Desktop** (1025px+)
```
- 2-3 column grid
- Max-width container (1200px)
- Comfortable spacing
- Full feature set visible
```

---

## 🎯 Interactive Elements

### **Form Validation**
```
User Input → Real-time Validation
                    ↓
         Valid? → Continue
         Invalid? → Show error message (red text)
```

### **Budget Calculation**
```
Venue + Catering + Vendor = Subtotal
         ↓
Subtotal × Concept Multiplier = Total
         ↓
Update all display elements in real-time
```

### **Navigation Flow**
```
Hero → Step1 → Step2 → Step3 → Step4 → Step5 → Results
 ↑                                              ↓
 └──────────── Hitung Ulang (Reset) ───────────┘
```

---

## 🎨 Component Library

### **Buttons**
- Primary: Sage background, white text, hover darker
- Secondary: Sage border, sage text, hover sage background
- Disabled: Reduced opacity

### **Form Fields**
- Border: 2px sage-light
- Focus: 2px sage border + ring
- Error: Red text below field

### **Cards**
- White background
- 2px border (sage-light default)
- Rounded corners (12px)
- Box shadow on hover

### **Progress Bar**
- Full width container
- Filled portion in sage
- Smooth animation on progress

---

**Ready to see it live? Follow the PREVIEW_GUIDE.md! 🚀**
