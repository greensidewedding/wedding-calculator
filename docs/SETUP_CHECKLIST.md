# Supabase Setup Checklist

## ✅ Pre-Setup
- [ ] Buat akun Supabase di https://supabase.com
- [ ] Email verified
- [ ] Credit card (untuk production, tidak perlu untuk development)

## 🚀 Step 1: Create Project
- [ ] Buka Supabase Dashboard
- [ ] Klik "New Project"
- [ ] Isi project name: `greenside-wedding`
- [ ] Set password yang kuat
- [ ] Pilih region: Singapore atau Asia Pacific
- [ ] Tunggu project selesai (2-3 menit)

## 🔑 Step 2: Get Credentials
- [ ] Settings → API
- [ ] Copy Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copy Anon Public Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Save di `.env.local` file

## 📊 Step 3: Setup Database Schema
- [ ] Buka SQL Editor
- [ ] Buat New Query
- [ ] Copy-paste script dari `docs/supabase-schema.sql`
- [ ] Klik Run
- [ ] Verify di Table Editor → leads table muncul

## 🔐 Step 4: Row Level Security
- [ ] Verify RLS enabled di leads table
- [ ] Check policies:
  - [ ] INSERT policy: public can insert
  - [ ] SELECT policy: authenticated only
  - [ ] UPDATE policy: authenticated only
  - [ ] DELETE policy: authenticated only

## 📝 Step 5: Environment Variables
- [ ] Copy `.env.example` → `.env.local`
- [ ] Isi SUPABASE_URL dari Step 2
- [ ] Isi SUPABASE_ANON_KEY dari Step 2
- [ ] Isi WHATSAPP_NUMBER (format: 62xxxxxxxxxx)
- [ ] Isi GA_ID (optional)
- [ ] Isi PIXEL_ID (optional)
- [ ] **JANGAN COMMIT .env.local KE GIT**

## 🧪 Step 6: Test Connection
- [ ] Jalankan: `npm run dev`
- [ ] Buka: http://localhost:3000/calculator
- [ ] Isi form sampai selesai
- [ ] Klik "Dapatkan Konsultasi Gratis"
- [ ] Isi WhatsApp & Instagram
- [ ] Klik "Dapatkan Hasil Lengkap"
- [ ] Verify:
  - [ ] Toast notification "Data berhasil dikirim!"
  - [ ] Redirect ke WhatsApp
  - [ ] Data muncul di Supabase → Table Editor → leads

## 🔍 Step 7: Verify Data
- [ ] Buka Supabase → Table Editor
- [ ] Select table: leads
- [ ] Verify kolom tersedia:
  - [ ] id
  - [ ] bride_groom_name
  - [ ] whatsapp_number
  - [ ] instagram
  - [ ] city
  - [ ] guest_count
  - [ ] total_budget
  - [ ] calculator_data
  - [ ] submitted_at
  - [ ] created_at
- [ ] Check data dari test submission

## 🛡️ Step 8: Security
- [ ] Settings → Backups
  - [ ] Enable "Automatic Daily Backups"
  - [ ] Set retention: 7 or 30 days
- [ ] Settings → API
  - [ ] Setup CORS jika diperlukan
  - [ ] Setup Rate Limiting (1000 req/min)
- [ ] Authentication → Providers
  - [ ] Email provider configured

## 📞 Step 9: WhatsApp Integration (Optional)
- [ ] Get WhatsApp Business API credentials
- [ ] Set WHATSAPP_NUMBER di .env.local
- [ ] Test message sending

## 📊 Step 10: Analytics (Optional)
- [ ] Setup Google Analytics
- [ ] Get GA tracking ID (G-...)
- [ ] Add to NEXT_PUBLIC_GA_ID
- [ ] Setup Meta Pixel
- [ ] Get Pixel ID
- [ ] Add to NEXT_PUBLIC_FACEBOOK_PIXEL_ID

## 🚀 Step 11: Ready for Production
- [ ] Database backup completed
- [ ] All environment variables set
- [ ] RLS policies verified
- [ ] Rate limiting configured
- [ ] CORS configured
- [ ] SSL/TLS enabled
- [ ] Monitoring setup

## 📚 Documentation
- [ ] Save Supabase URL & Keys di password manager
- [ ] Save database backup location
- [ ] Document RLS policies
- [ ] Create runbook untuk disaster recovery

## 🎉 Done!
- [ ] All steps completed
- [ ] Wedding Calculator ready to deploy
- [ ] Lead capture working
- [ ] Data saving to Supabase
- [ ] WhatsApp integration active
