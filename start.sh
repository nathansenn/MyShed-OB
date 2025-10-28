#!/bin/bash
set -e

echo "🚀 Starting MyShed Onboarding Portal deployment..."

echo "📦 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding catalog data..."
npx prisma db seed

echo "🏗️  Importing Northwood building styles with pricing..."
npm run import-northwood-styles

echo "🎨 Importing Northwood colors and company details..."
npm run import-northwood-complete

echo "🏪 Importing Northwood stores, users, doors, and windows..."
npm run import-northwood

echo "✅ Database setup complete. Starting server..."
npm run start
