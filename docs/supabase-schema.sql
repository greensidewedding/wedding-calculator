-- =====================================================
-- GREENSIDE WEDDING CALCULATOR - SUPABASE SQL SETUP
-- =====================================================
-- Jalankan SQL ini di Supabase SQL Editor
-- Path: SQL Editor → New Query → Paste script ini → Run

-- Enable UUID extension (jika belum)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: LEADS (Calon Pengantin)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.leads (
  -- Primary Key
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  
  -- Contact Information
  bride_groom_name TEXT NOT NULL COMMENT 'Nama calon pengantin (contoh: Budi & Siti)',
  whatsapp_number TEXT NOT NULL COMMENT 'Nomor WhatsApp untuk contact (format: 62xxxxxxxxxx)',
  instagram TEXT COMMENT 'Handle Instagram (opsional)',
  
  -- Wedding Details
  city TEXT NOT NULL COMMENT 'Kota pernikahan',
  guest_count INTEGER NOT NULL CHECK (guest_count > 0) COMMENT 'Jumlah tamu pernikahan',
  
  -- Budget Information
  total_budget BIGINT NOT NULL CHECK (total_budget > 0) COMMENT 'Total budget estimasi (dalam IDR)',
  
  -- Full Calculator Data (JSON)
  calculator_data JSONB NOT NULL COMMENT 'Data lengkap dari calculator',
  
  -- Timestamps
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL COMMENT 'Waktu submission',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL COMMENT 'Waktu record dibuat',
  
  -- Metadata (untuk future use)
  notes TEXT COMMENT 'Catatan internal',
  status TEXT DEFAULT 'new' COMMENT 'Status lead: new, contacted, converted, rejected',
  source TEXT DEFAULT 'calculator' COMMENT 'Source dari lead',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) COMMENT 'Terakhir diupdate'
);

-- =====================================================
-- INDEXES (untuk performa query)
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_leads_submitted_at 
  ON public.leads(submitted_at DESC) 
  COMMENT 'For sorting leads by submission date';

CREATE INDEX IF NOT EXISTS idx_leads_city 
  ON public.leads(city) 
  COMMENT 'For filtering leads by city';

CREATE INDEX IF NOT EXISTS idx_leads_total_budget 
  ON public.leads(total_budget) 
  COMMENT 'For budget range queries';

CREATE INDEX IF NOT EXISTS idx_leads_whatsapp 
  ON public.leads(whatsapp_number) 
  COMMENT 'For finding leads by WhatsApp number';

CREATE INDEX IF NOT EXISTS idx_leads_status 
  ON public.leads(status) 
  COMMENT 'For filtering leads by status';

CREATE INDEX IF NOT EXISTS idx_leads_guest_count 
  ON public.leads(guest_count) 
  COMMENT 'For guest count statistics';

-- =====================================================
-- TABLE COMMENTS
-- =====================================================
COMMENT ON TABLE public.leads IS 'Tabel untuk menyimpan leads dari Wedding Calculator';
COMMENT ON COLUMN public.leads.id IS 'Unique identifier untuk setiap lead';
COMMENT ON COLUMN public.leads.bride_groom_name IS 'Nama lengkap calon pengantin';
COMMENT ON COLUMN public.leads.whatsapp_number IS 'Nomor WhatsApp untuk komunikasi';
COMMENT ON COLUMN public.leads.instagram IS 'Username Instagram (opsional)';
COMMENT ON COLUMN public.leads.city IS 'Kota tempat pernikahan akan diselenggarakan';
COMMENT ON COLUMN public.leads.guest_count IS 'Estimasi jumlah tamu yang akan hadir';
COMMENT ON COLUMN public.leads.total_budget IS 'Total budget estimasi untuk pernikahan';
COMMENT ON COLUMN public.leads.calculator_data IS 'Data lengkap calculator dalam format JSON termasuk breakdown venue, catering, vendor, dll';
COMMENT ON COLUMN public.leads.submitted_at IS 'Waktu ketika lead mengisi form';
COMMENT ON COLUMN public.leads.status IS 'Status follow-up: new (baru), contacted (sudah dihubungi), converted (jadi klien), rejected';

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Enable RLS pada tabel
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public dapat INSERT (untuk form submission)
CREATE POLICY "Enable insert for public" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Policy 2: Hanya authenticated users yang bisa SELECT
CREATE POLICY "Enable read for authenticated users" ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy 3: Hanya authenticated users yang bisa UPDATE
CREATE POLICY "Enable update for authenticated users" ON public.leads
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 4: Hanya authenticated users yang bisa DELETE
CREATE POLICY "Enable delete for authenticated users" ON public.leads
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- =====================================================
-- VIEWS (untuk common queries)
-- =====================================================

-- View: Leads dengan summary statistics
CREATE OR REPLACE VIEW public.vw_leads_summary AS
SELECT 
  id,
  bride_groom_name,
  whatsapp_number,
  instagram,
  city,
  guest_count,
  total_budget,
  status,
  submitted_at,
  DATE_TRUNC('day', submitted_at) as submission_date
FROM public.leads
ORDER BY submitted_at DESC;

COMMENT ON VIEW public.vw_leads_summary IS 'View untuk melihat summary leads dengan formatting';

-- View: Statistics agregat
CREATE OR REPLACE VIEW public.vw_leads_statistics AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(DISTINCT city) as unique_cities,
  COUNT(DISTINCT DATE(submitted_at)) as submission_days,
  AVG(guest_count)::INTEGER as avg_guest_count,
  AVG(total_budget)::BIGINT as avg_budget,
  MIN(total_budget) as min_budget,
  MAX(total_budget) as max_budget,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
  COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted_leads,
  COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted_leads
FROM public.leads;

COMMENT ON VIEW public.vw_leads_statistics IS 'View untuk melihat statistik keseluruhan leads';

-- View: Leads by city
CREATE OR REPLACE VIEW public.vw_leads_by_city AS
SELECT 
  city,
  COUNT(*) as total_leads,
  AVG(guest_count)::INTEGER as avg_guests,
  AVG(total_budget)::BIGINT as avg_budget,
  MIN(total_budget) as min_budget,
  MAX(total_budget) as max_budget
FROM public.leads
GROUP BY city
ORDER BY total_leads DESC;

COMMENT ON VIEW public.vw_leads_by_city IS 'View untuk melihat leads berdasarkan kota';

-- View: Budget distribution
CREATE OR REPLACE VIEW public.vw_budget_distribution AS
SELECT 
  CASE 
    WHEN total_budget < 50000000 THEN 'Budget: < 50 Juta'
    WHEN total_budget < 75000000 THEN 'Budget: 50-75 Juta'
    WHEN total_budget < 150000000 THEN 'Budget: 75-150 Juta'
    ELSE 'Budget: > 150 Juta'
  END as budget_range,
  COUNT(*) as total_leads,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM public.leads), 2) as percentage
FROM public.leads
GROUP BY budget_range
ORDER BY COUNT(*) DESC;

COMMENT ON VIEW public.vw_budget_distribution IS 'View untuk melihat distribusi budget leads';

-- =====================================================
-- FUNCTIONS (untuk automation)
-- =====================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::TEXT, now());
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.update_updated_at IS 'Trigger function untuk auto-update updated_at column';

-- Trigger: Auto-update updated_at
CREATE TRIGGER tr_leads_update_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- =====================================================
-- INSERTION EXAMPLES (untuk testing)
-- =====================================================

-- Example data (commented out, uncomment untuk test)
/*
INSERT INTO public.leads (
  bride_groom_name,
  whatsapp_number,
  instagram,
  city,
  guest_count,
  total_budget,
  calculator_data,
  status
) VALUES (
  'Budi & Siti',
  '6281234567890',
  '@budi_siti',
  'Jakarta',
  300,
  125000000,
  '{
    "brideGroomName": "Budi & Siti",
    "weddingCity": "Jakarta",
    "weddingDate": "2024-12-25",
    "guestCount": 300,
    "venueType": "hotel",
    "venuePrice": 50000000,
    "cateringPrice": 75000,
    "weddingConcept": "modern",
    "total": 125000000
  }',
  'new'
);
*/

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Schema berhasil dibuat dengan:
-- ✅ Table leads dengan kolom lengkap
-- ✅ Indexes untuk performa optimal
-- ✅ RLS policies untuk security
-- ✅ Views untuk common queries
-- ✅ Functions untuk automation
-- ✅ Triggers untuk data consistency
