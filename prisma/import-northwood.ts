import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Northwood Outdoor data import...\n');

  // 1. Create or update the client
  console.log('📋 Creating/updating Northwood Outdoor client...');
  const client = await prisma.client.upsert({
    where: { slug: 'northwood-outdoor' },
    update: {
      companyName: 'Northwood Outdoor',
      ownerName: 'Elvie Martin',
      contactNumber: '(715) 634-7725 / (715) 699-0732',
      emailAddress: 'info@northwoodoutdoor.com',
      websiteLink: 'www.northwoodoutdoor.com',
      fullAddress: '10463 State Road 27, Hayward, WI 54843',
      primaryColor: '#FFFFFF',
      secondaryColor: '#fe8f01',
    },
    create: {
      companyName: 'Northwood Outdoor',
      slug: 'northwood-outdoor',
      ownerName: 'Elvie Martin',
      contactNumber: '(715) 634-7725 / (715) 699-0732',
      emailAddress: 'info@northwoodoutdoor.com',
      websiteLink: 'www.northwoodoutdoor.com',
      fullAddress: '10463 State Road 27, Hayward, WI 54843',
      primaryColor: '#FFFFFF',
      secondaryColor: '#fe8f01',
    },
  });
  console.log(`✅ Client created: ${client.companyName} (ID: ${client.id})\n`);

  // 2. Import stores
  console.log('🏪 Importing store locations...');
  const stores = [
    {
      name: 'Northwood Outdoor - Hayward',
      address: '10463 State Road 27, Hayward, WI 54843',
      zipCode: '54843',
      phoneNumber: '(715) 634-7725 / 800-611-9471',
      storeHours: 'Monday - Saturday: 10:00 AM - 4:00 PM, Sunday: Closed',
    },
    {
      name: 'Outdoor Designs',
      address: '698 Middletown Rd, Fairmont, WV',
      zipCode: '',
      phoneNumber: '(304) 592-9047',
      storeHours: 'To be provided',
    },
    {
      name: 'Rock Creek IDS',
      address: '6861 MN-70, Pine City, MN',
      zipCode: '',
      phoneNumber: '(763) 244-0137',
      storeHours: 'To be provided',
    },
    {
      name: 'Waterside Outdoor Furniture',
      address: '12901 W Hills Boror Avenue, Tampa, FL 33635',
      zipCode: '33635',
      phoneNumber: '(727) 641-3093 / (813) 420-4441',
      storeHours: 'To be provided',
    },
    {
      name: 'Greenscape Innovations',
      address: '4435 Tamiami Trail, Port Charlotte, FL 33980',
      zipCode: '33980',
      phoneNumber: '(941) 628-0012',
      storeHours: 'To be provided',
    },
    {
      name: 'Greenscape Innovations - Arcadia',
      address: '11402 County Road 769, Arcadia, FL',
      zipCode: '',
      phoneNumber: '(941) 628-0012',
      storeHours: 'To be provided',
    },
    {
      name: "Tutt's Bait & Tackle",
      address: '27358 MN-18, Garrison, MN 56450',
      zipCode: '56450',
      phoneNumber: '(320) 692-4341',
      storeHours: 'To be provided',
    },
  ];

  for (const storeData of stores) {
    const store = await prisma.store.create({
      data: {
        ...storeData,
        clientId: client.id,
      },
    });
    console.log(`  ✅ Created store: ${store.name}`);
  }
  console.log(`✅ Imported ${stores.length} stores\n`);

  // 3. Import system users
  console.log('👥 Importing system users...');
  const mainStore = await prisma.store.findFirst({
    where: { clientId: client.id, name: 'Northwood Outdoor - Hayward' },
  });

  if (mainStore) {
    const user = await prisma.systemUser.create({
      data: {
        role: 'Administrator',
        fullName: 'Elvie Martin',
        emailAddress: 'Elvie@northwoodoutdoor.com',
        phoneNumbers: 'Mobile: (715) 699-0732, Main Office: (715) 634-7725, Toll Free: 800-611-9471',
        assignedStore: mainStore.name,
        clientId: client.id,
      },
    });
    console.log(`  ✅ Created user: ${user.fullName} (${user.role})`);
  }
  console.log('✅ Imported system users\n');

  // 4. Import building styles (link to catalog)
  console.log('🏗️  Importing building styles...');
  const buildingStyleMappings = [
    { code: 'CLASSIC', name: 'Classic Shed' },
    { code: 'CAPECOD', name: 'Cape Cod Garden Shed' },
    { code: 'VILLA', name: 'Villa Shed' },
    { code: 'QUAKER', name: 'Monterey Shed (Quaker)' },
    { code: 'DUTCH', name: 'Dutch Barn' },
    { code: 'CAPECOD', name: 'Steel Garden Shed' }, // Metal variant
    // Note: Garages and Cabins might not be in catalog, will check
  ];

  for (const mapping of buildingStyleMappings) {
    const catalogStyle = await prisma.catalogBuildingStyle.findFirst({
      where: { code: mapping.code },
    });

    if (catalogStyle) {
      // Check if already exists
      const existing = await prisma.buildingStyle.findFirst({
        where: {
          clientId: client.id,
          myshedCatalogCode: catalogStyle.code,
          name: mapping.name,
        },
      });

      if (!existing) {
        const buildingStyle = await prisma.buildingStyle.create({
          data: {
            name: mapping.name,
            myshedCatalogCode: catalogStyle.code,
            images: catalogStyle.imageUrl ? JSON.stringify([catalogStyle.imageUrl]) : null,
            clientId: client.id,
          },
        });
        console.log(`  ✅ Created building style: ${buildingStyle.name}`);
      } else {
        console.log(`  ⏭️  Skipped (exists): ${mapping.name}`);
      }
    } else {
      console.log(`  ⚠️  Catalog style not found: ${mapping.code} (${mapping.name})`);
    }
  }
  console.log('✅ Imported building styles\n');

  // 5. Import doors (link to catalog)
  console.log('🚪 Importing door selections...');
  const doorCodes = [
    'STDD',
    'STDDTW',
    '9LFWI',
    'GBDT',
    'BARNSSD',
    '7XDSD',
    'GBD',
    'FWIDO',
    '3X7ED',
    '7XDSDT',
    'SWBARN',
    'SINGLE',
    'OVERHEAD',
    'DELUXEBARN',
    '6X7RUD',
    'RSD9x7',
    'C6LITEDOOR',
    'DDOOR-M',
    'CBSINDOOR',
  ];

  for (const code of doorCodes) {
    const catalogDoor = await prisma.catalogDoor.findFirst({
      where: { code: code },
    });

    if (catalogDoor) {
      // Check if already exists
      const existing = await prisma.door.findFirst({
        where: {
          clientId: client.id,
          myshedCatalogCode: catalogDoor.code,
        },
      });

      if (!existing) {
        const door = await prisma.door.create({
          data: {
            name: catalogDoor.name,
            myshedCatalogCode: catalogDoor.code,
            myshedCatalogImage: catalogDoor.imageUrl,
            clientId: client.id,
          },
        });
        console.log(`  ✅ Created door: ${door.name}`);
      } else {
        console.log(`  ⏭️  Skipped (exists): ${catalogDoor.name}`);
      }
    } else {
      console.log(`  ⚠️  Catalog door not found: ${code}`);
    }
  }
  console.log('✅ Imported door selections\n');

  // 6. Import windows (link to catalog)
  console.log('🪟 Importing window selections...');
  const windowCodes = [
    '3X3SW',
    '3x3grid',
    'CB2X3W',
    'TRANSOM',
    'TRANSOM1036',
    'TRANSOM1030',
    'TRANSOM1018',
    'TRANSOM1024',
    '2X3SW',
    'SHUT',
    'FLOWB',
    'DORM',
    'DORM4W',
  ];

  for (const code of windowCodes) {
    const catalogWindow = await prisma.catalogWindow.findFirst({
      where: { code: code },
    });

    if (catalogWindow) {
      // Check if already exists
      const existing = await prisma.window.findFirst({
        where: {
          clientId: client.id,
          myshedCatalogCode: catalogWindow.code,
        },
      });

      if (!existing) {
        const window = await prisma.window.create({
          data: {
            name: catalogWindow.name,
            myshedCatalogCode: catalogWindow.code,
            myshedCatalogImage: catalogWindow.imageUrl,
            clientId: client.id,
          },
        });
        console.log(`  ✅ Created window: ${window.name}`);
      } else {
        console.log(`  ⏭️  Skipped (exists): ${catalogWindow.name}`);
      }
    } else {
      console.log(`  ⚠️  Catalog window not found: ${code}`);
    }
  }
  console.log('✅ Imported window selections\n');

  console.log('🎉 Northwood Outdoor data import complete!\n');
  console.log('📊 Summary:');
  console.log(`  - Client: ${client.companyName}`);
  console.log(`  - Stores: ${stores.length}`);
  console.log(`  - Users: 1 (Administrator)`);
  console.log(`  - Building Styles: ${buildingStyleMappings.length}`);
  console.log(`  - Doors: ${doorCodes.length}`);
  console.log(`  - Windows: ${windowCodes.length}`);
  console.log('\n✨ Visit http://localhost:3000/client/northwood-outdoor to view!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error importing data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
