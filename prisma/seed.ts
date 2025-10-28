import { PrismaClient } from '@prisma/client'
import catalogData from '../myshed_catalog_data.json'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding MyShed catalog data...')

  // Seed Catalog Doors
  console.log('📂 Seeding doors...')
  for (const door of catalogData.doors.items) {
    await prisma.catalogDoor.upsert({
      where: { code: door.code },
      update: {},
      create: {
        code: door.code,
        name: door.name,
        imageUrl: `https://myshed.io/${encodeURIComponent(door.image)}`,
        category: 'doors',
      },
    })
  }
  console.log(`✅ Seeded ${catalogData.doors.items.length} doors`)

  // Seed Catalog Windows
  console.log('📂 Seeding windows...')
  for (const window of catalogData.windows.items) {
    await prisma.catalogWindow.upsert({
      where: { code: window.code },
      update: {},
      create: {
        code: window.code,
        name: window.name,
        imageUrl: `https://myshed.io/${encodeURIComponent(window.image)}`,
        category: 'windows',
      },
    })
  }
  console.log(`✅ Seeded ${catalogData.windows.items.length} windows`)

  // Seed Catalog Building Styles
  console.log('📂 Seeding building styles...')
  for (const style of catalogData['building-styles'].items) {
    await prisma.catalogBuildingStyle.upsert({
      where: { code: style.code },
      update: {},
      create: {
        code: style.code,
        name: style.name,
        imageUrl: `https://myshed.io/${encodeURIComponent(style.image)}`,
        category: 'building-styles',
      },
    })
  }
  console.log(`✅ Seeded ${catalogData['building-styles'].items.length} building styles`)

  // Seed Catalog Porches
  console.log('📂 Seeding porches...')
  for (const porch of catalogData.porches.items) {
    await prisma.catalogPorch.upsert({
      where: { code: porch.code },
      update: {},
      create: {
        code: porch.code,
        name: porch.name,
        imageUrl: `https://myshed.io/${encodeURIComponent(porch.image)}`,
        category: 'porches',
      },
    })
  }
  console.log(`✅ Seeded ${catalogData.porches.items.length} porches`)

  // Seed Catalog Siding Options
  console.log('📂 Seeding siding options...')
  for (const siding of catalogData['siding-options'].items) {
    await prisma.catalogSiding.upsert({
      where: { code: siding.code },
      update: {},
      create: {
        code: siding.code,
        name: siding.name,
        imageUrl: `https://myshed.io/${encodeURIComponent(siding.image)}`,
        category: 'siding-options',
      },
    })
  }
  console.log(`✅ Seeded ${catalogData['siding-options'].items.length} siding options`)

  // Seed Catalog Trim Options
  console.log('📂 Seeding trim options...')
  for (const trim of catalogData['trim-options'].items) {
    await prisma.catalogTrim.upsert({
      where: { code: trim.code },
      update: {},
      create: {
        code: trim.code,
        name: trim.name,
        imageUrl: `https://myshed.io/${encodeURIComponent(trim.image)}`,
        category: 'trim-options',
      },
    })
  }
  console.log(`✅ Seeded ${catalogData['trim-options'].items.length} trim options`)

  // Seed Catalog Roofing Options
  console.log('📂 Seeding roofing options...')
  for (const roofing of catalogData['roofing-options'].items) {
    await prisma.catalogRoofing.upsert({
      where: { code: roofing.code },
      update: {},
      create: {
        code: roofing.code,
        name: roofing.name,
        imageUrl: `https://myshed.io/${encodeURIComponent(roofing.image)}`,
        category: 'roofing-options',
      },
    })
  }
  console.log(`✅ Seeded ${catalogData['roofing-options'].items.length} roofing options`)

  // Seed Catalog Shelves & Storage
  console.log('📂 Seeding shelves & storage...')
  for (const shelf of catalogData['shelves-storage'].items) {
    await prisma.catalogShelf.upsert({
      where: { code: shelf.code },
      update: {},
      create: {
        code: shelf.code,
        name: shelf.name,
        imageUrl: `https://myshed.io/${encodeURIComponent(shelf.image)}`,
        category: 'shelves-storage',
      },
    })
  }
  console.log(`✅ Seeded ${catalogData['shelves-storage'].items.length} shelves & storage options`)

  console.log('✨ MyShed catalog seeding complete!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
