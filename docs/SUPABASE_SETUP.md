# Supabase Setup Guide untuk Greenside Wedding Calculator

## 📋 Step-by-Step Supabase Configuration

### 1. Buat Supabase Project

1. Buka https://supabase.com
2. Login dengan akun Anda (atau buat akun baru)
3. Klik **"New Project"**
4. Isi form:
   - **Project Name**: `greenside-wedding`
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih region terdekat (contoh: `Singapore` untuk Indonesia)
5. Klik **"Create new project"** dan tunggu 2-3 menit

---

## 🔑 2. Dapatkan API Credentials

1. Setelah project selesai dibuat, buka project Anda
2. Ke tab **"Settings"** → **"API"**
3. Copy nilai berikut:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Contoh:
```
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 3. Buat Database Schema

### Method A: Menggunakan SQL Editor (Recommended)

1. Di Supabase dashboard, klik **"SQL Editor"** di sidebar kiri
2. Klik **"New Query"**
3. Copy-paste SQL script di bawah ini
4. Klik **"Run"**

```sql
-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  bride_groom_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  instagram TEXT,
  city TEXT NOT NULL,
  guest_count INTEGER NOT NULL,
  total_budget BIGINT NOT NULL,
  calculator_data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_submitted_at ON public.leads(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_city ON public.leads(city);
CREATE INDEX IF NOT EXISTS idx_leads_total_budget ON public.leads(total_budget);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads(whatsapp_number);

-- Set table description
COMMENT ON TABLE public.leads IS 'Leads dari Wedding Calculator';
COMMENT ON COLUMN public.leads.bride_groom_name IS 'Nama calon pengantin';
COMMENT ON COLUMN public.leads.whatsapp_number IS 'Nomor WhatsApp kontak';
COMMENT ON COLUMN public.leads.calculator_data IS 'Data lengkap dari calculator dalam format JSON';

-- Enable RLS (Row Level Security)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting leads (public can insert)
CREATE POLICY "Enable insert for public" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Create policy for reading leads (authenticated users only)
CREATE POLICY "Enable read for authenticated users" ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

---

## 🔐 4. Configure Row Level Security (RLS)

### Opssi 1: Public Insert (untuk lead form)

1. Buka **"Authentication"** → **"Policies"**
2. Pilih table **"leads"**
3. Klik **"New Policy"**
4. Buat policy dengan:
   - **Name**: `Enable insert for all users`
   - **Allowed operation**: `INSERT`
   - **For rows matching**: Kosongkan (allow all)
   - **Code**: 
   ```sql
   true
   ```

### Opssi 2: Admin Read Access

1. Buat policy baru:
   - **Name**: `Enable read for authenticated users`
   - **Allowed operation**: `SELECT`
   - **For rows matching**:
   ```sql
   auth.role() = 'authenticated'
   ```

---

## 🔑 5. Setup Authentication (Optional untuk Admin)

Jika ingin membuat admin dashboard dengan login:

1. Buka **"Authentication"** → **"Providers"**
2. Enable **"Email"** (sudah enabled by default)
3. Klik setting icon → Configure:
   - Enable **"Confirm email"**: OFF (untuk testing)
   - Email confirmation window: 24 hours

---

## 📝 6. Setup Environment Variables di Next.js

1. Buka file `.env.local` di project root
2. Isi dengan credentials dari Supabase:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# WhatsApp (opsional)
WHATSAPP_NUMBER=62xxxxxxxxxx

# Analytics (opsional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789
```

3. **JANGAN COMMIT FILE INI KE GIT!** (sudah di `.gitignore`)

---

## ✅ 7. Test Koneksi

1. Jalankan development server:
```bash
npm run dev
```

2. Buka http://localhost:3000/calculator

3. Isi form lengkap sampai hasil

4. Klik **"Dapatkan Konsultasi Gratis"**

5. Isi WhatsApp & Instagram

6. Klik **"Dapatkan Hasil Lengkap"**

7. Seharusnya:
   - Toast notification "Data berhasil dikirim!"
   - Data muncul di Supabase (cek di Table Editor)
   - Browser redirect ke WhatsApp

---

## 🔍 8. Verifikasi Data di Supabase

1. Buka Supabase Dashboard
2. Klik **"Table Editor"** di sidebar
3. Pilih table **"leads"**
4. Seharusnya melihat data yang baru disimpan dengan kolom:
   - `id` (auto increment)
   - `bride_groom_name`
   - `whatsapp_number`
   - `instagram`
   - `city`
   - `guest_count`
   - `total_budget`
   - `calculator_data` (JSON)
   - `submitted_at`
   - `created_at`

---

## 📊 9. Backup & Security

### Backup Database
1. Buka **"Settings"** → **"Backups"**
2. Enable **"Automatic Daily Backups"**
3. Pilih retention: 7 atau 30 days

### Secure API Keys
1. **JANGAN PERNAH** commit `.env.local` ke GitHub
2. Untuk production, set environment variables di Vercel/hosting
3. Rotate API keys setiap 3 bulan

### Rate Limiting (untuk prevent abuse)
1. Settings → **"API"** → **"Rate Limiting"**
2. Set limit: 1000 requests per minute per IP

---

## 🛠️ 10. Troubleshooting

### Error: "supabase is not defined"
**Solution**: Pastikan `.env.local` sudah ada dan restart dev server
```bash
npm run dev
```

### Error: "CORS error"
**Solution**: Pastikan URL di browser match dengan `NEXT_PUBLIC_SUPABASE_URL`

### Error: "Insert failed - permission denied"
**Solution**: Pastikan RLS policy untuk INSERT sudah di-enable (lihat step 4)

### Data tidak muncul di Supabase
**Solution**: 
1. Check browser console untuk error message
2. Verifikasi WhatsApp number format (harus ada digit saja)
3. Cek RLS policies sudah benar

---

## 🚀 11. Siap untuk Production

Sebelum launch ke production:

✅ Backup database
✅ Test dengan multiple users
✅ Setup monitoring alerts
✅ Configure email notifications
✅ Setup CORS whitelist
✅ Enable 2FA untuk admin account
✅ Regular security audit

---

## 📞 Contoh Query untuk Admin

### Lihat semua leads
```sql
SELECT 
  id,
  bride_groom_name,
  whatsapp_number,
  city,
  guest_count,
  total_budget,
  submitted_at
FROM leads
ORDER BY submitted_at DESC;
```

### Filter by city
```sql
SELECT * FROM leads WHERE city ILIKE '%Jakarta%';
```

### Filter by budget range
```sql
SELECT * FROM leads 
WHERE total_budget >= 75000000 
AND total_budget <= 150000000
ORDER BY total_budget DESC;
```

### Statistics
```sql
SELECT 
  COUNT(*) as total_leads,
  AVG(total_budget) as avg_budget,
  MIN(total_budget) as min_budget,
  MAX(total_budget) as max_budget,
  COUNT(DISTINCT city) as unique_cities,
  AVG(guest_count) as avg_guests
FROM leads;
```

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Setup selesai! Wedding Calculator Anda sudah connected dengan Supabase! 🎉**
