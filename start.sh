#!/bin/bash
set -e

echo "🚀 Starting MyShed Onboarding Portal deployment..."

echo "📦 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding catalog data..."
npx prisma db seed

echo "🏢 Importing Northwood Outdoor configuration..."
npm run import-northwood-complete

echo "🏗️  Importing Northwood Outdoor building styles..."
npm run import-northwood-styles

echo "✅ Database setup complete. Starting server..."
npm run start
