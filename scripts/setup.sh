#!/bin/bash

# =====================================================
# GREENSIDE WEDDING CALCULATOR - QUICK SETUP SCRIPT
# =====================================================
# Script untuk setup Supabase credentials dan environment

echo "🎉 Greenside Wedding Calculator - Setup Script"
echo "================================================"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local sudah ada. Backup dibuat ke .env.local.backup"
    cp .env.local .env.local.backup
else
    echo "📝 Membuat .env.local baru..."
    cp .env.example .env.local
fi

echo ""
echo "📋 Silakan isi informasi Supabase Anda:"
echo ""

read -p "🔗 Masukkan Supabase URL (https://...supabase.co): " SUPABASE_URL
read -p "🔑 Masukkan Supabase ANON KEY: " SUPABASE_KEY
read -p "📱 Masukkan WhatsApp Business Number (62...): " WHATSAPP_NUMBER
read -p "📊 Masukkan Google Analytics ID (G-...): " GA_ID
read -p "📸 Masukkan Meta Pixel ID (optional, tekan Enter jika skip): " PIXEL_ID

# Update .env.local
sed -i.bak "s|your_supabase_url|${SUPABASE_URL}|g" .env.local
sed -i.bak "s|your_supabase_anon_key|${SUPABASE_KEY}|g" .env.local
sed -i.bak "s|62xxxxxxxxxxx|${WHATSAPP_NUMBER}|g" .env.local
sed -i.bak "s|your_google_analytics_id|${GA_ID}|g" .env.local

if [ ! -z "$PIXEL_ID" ]; then
    sed -i.bak "s|your_facebook_pixel_id|${PIXEL_ID}|g" .env.local
fi

echo ""
echo "✅ .env.local berhasil diupdate!"
echo ""
echo "📦 Menginstall dependencies..."
npm install

echo ""
echo "🚀 Setup selesai! Jalankan:"
echo ""
echo "   npm run dev"
echo ""
echo "Kemudian buka: http://localhost:3000"
echo ""
