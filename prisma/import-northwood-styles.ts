import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏗️  Importing Northwood Outdoor Building Styles with Pricing...\n');

  // Get the Northwood Outdoor client
  const client = await prisma.client.findUnique({
    where: { slug: 'northwood-outdoor' },
  });

  if (!client) {
    console.error('❌ Northwood Outdoor client not found!');
    process.exit(1);
  }

  console.log(`✅ Found client: ${client.companyName} (ID: ${client.id})\n`);

  // Check if building styles already exist for this client
  const existingStyles = await prisma.buildingStyle.count({
    where: { clientId: client.id },
  });

  if (existingStyles > 0) {
    console.log(`⏭️  Building styles already exist (${existingStyles} found). Skipping import to avoid duplicates.\n`);
    return;
  }

  // Building Style 1: Classic Shed
  console.log('Adding Classic Shed...');
  const classicShed = await prisma.buildingStyle.create({
    data: {
      name: 'Classic Shed',
      myshedCatalogCode: 'CLASSIC',
      description: 'Our classic storage shed offers great custom styling and design options. This storage shed has the steepest roof pitch of all the peak styles with lower walls to accommodate the roof. Standard features include double entry door and 2 windows.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1587/classic-wood-storage-buildings-for-sale-in-rochester-minnesota-1600x1600.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1584/classic-storage-buildings-with-dormer-near-me-ashland-wisconsin-1600x600-f50_50.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1594/vinyl-storage-buildings-for-sale-in-brainerd-minnesota-scaled-1600x1600.jpg',
      ]),
      clientId: client.id,
    },
  });

  // Classic Shed Pricing Matrix
  const classicPrices = [
    { width: 6, depth: 6, material: 'Wood', basePrice: 3695 },
    { width: 6, depth: 6, material: 'Vinyl', basePrice: 4540 },
    { width: 6, depth: 8, material: 'Wood', basePrice: 3995 },
    { width: 6, depth: 8, material: 'Vinyl', basePrice: 4785 },
    { width: 8, depth: 8, material: 'Wood', basePrice: 4195 },
    { width: 8, depth: 8, material: 'Vinyl', basePrice: 5135 },
    { width: 8, depth: 10, material: 'Wood', basePrice: 4695 },
    { width: 8, depth: 10, material: 'Vinyl', basePrice: 5660 },
    { width: 8, depth: 12, material: 'Wood', basePrice: 5195 },
    { width: 8, depth: 12, material: 'Vinyl', basePrice: 6180 },
    { width: 8, depth: 14, material: 'Wood', basePrice: 5595 },
    { width: 8, depth: 14, material: 'Vinyl', basePrice: 6685 },
    { width: 8, depth: 16, material: 'Wood', basePrice: 6195 },
    { width: 8, depth: 16, material: 'Vinyl', basePrice: 7165 },
    { width: 10, depth: 10, material: 'Wood', basePrice: 5195 },
    { width: 10, depth: 10, material: 'Vinyl', basePrice: 6885 },
    { width: 10, depth: 12, material: 'Wood', basePrice: 5295 },
    { width: 10, depth: 12, material: 'Vinyl', basePrice: 7415 },
    { width: 10, depth: 14, material: 'Wood', basePrice: 6195 },
    { width: 10, depth: 14, material: 'Vinyl', basePrice: 8025 },
    { width: 10, depth: 16, material: 'Wood', basePrice: 6595 },
    { width: 10, depth: 16, material: 'Vinyl', basePrice: 8330 },
    { width: 10, depth: 18, material: 'Wood', basePrice: 7395 },
    { width: 10, depth: 18, material: 'Vinyl', basePrice: 9400 },
    { width: 10, depth: 20, material: 'Wood', basePrice: 8195 },
    { width: 10, depth: 20, material: 'Vinyl', basePrice: 10290 },
  ];

  for (const price of classicPrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: classicShed.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `CLASSIC-${price.width}x${price.depth}-${price.material.toUpperCase()}`,
      },
    });
  }
  console.log(`  ✅ Added Classic Shed with ${classicPrices.length} price points\n`);

  // Building Style 2: Cape Cod Garden Shed (Most Popular)
  console.log('Adding Cape Cod Garden Shed...');
  const capecodShed = await prisma.buildingStyle.create({
    data: {
      name: 'Cape Cod Garden Shed',
      myshedCatalogCode: 'CAPECOD',
      description: 'The Cape Cod Garden Shed has an elegant and classy design with large overhangs and a higher roof design creating a "cottage" look. This is our most popular storage shed. Standard features include entry door and 2 windows.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/18100/8x8-garden-shed-wood-siding-red-with-double-doors-windows-with-shutters-1600x1600.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/26942/10x16-cape-cod-1600x1600.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/18104/12x30-cape-cod-garden-shed-scania-minnesota-1600x1600.jpg',
      ]),
      clientId: client.id,
    },
  });

  const capecodPrices = [
    { width: 6, depth: 6, material: 'Wood', basePrice: 3595 },
    { width: 6, depth: 6, material: 'Vinyl', basePrice: 4470 },
    { width: 6, depth: 8, material: 'Wood', basePrice: 3895 },
    { width: 6, depth: 8, material: 'Vinyl', basePrice: 4700 },
    { width: 8, depth: 8, material: 'Wood', basePrice: 4195 },
    { width: 8, depth: 8, material: 'Vinyl', basePrice: 5015 },
    { width: 8, depth: 10, material: 'Wood', basePrice: 4595 },
    { width: 8, depth: 10, material: 'Vinyl', basePrice: 5565 },
    { width: 8, depth: 12, material: 'Wood', basePrice: 5095 },
    { width: 8, depth: 12, material: 'Vinyl', basePrice: 6045 },
    { width: 8, depth: 14, material: 'Wood', basePrice: 5495 },
    { width: 8, depth: 14, material: 'Vinyl', basePrice: 6530 },
    { width: 8, depth: 16, material: 'Wood', basePrice: 5995 },
    { width: 8, depth: 16, material: 'Vinyl', basePrice: 7100 },
    { width: 10, depth: 10, material: 'Wood', basePrice: 5095 },
    { width: 10, depth: 10, material: 'Vinyl', basePrice: 6645 },
    { width: 10, depth: 12, material: 'Wood', basePrice: 5195 },
    { width: 10, depth: 12, material: 'Vinyl', basePrice: 7260 },
    { width: 10, depth: 14, material: 'Wood', basePrice: 6095 },
    { width: 10, depth: 14, material: 'Vinyl', basePrice: 7875 },
    { width: 10, depth: 16, material: 'Wood', basePrice: 6895 },
    { width: 10, depth: 16, material: 'Vinyl', basePrice: 8415 },
    { width: 10, depth: 18, material: 'Wood', basePrice: 7295 },
    { width: 10, depth: 18, material: 'Vinyl', basePrice: 8760 },
    { width: 10, depth: 20, material: 'Wood', basePrice: 7795 },
    { width: 10, depth: 20, material: 'Vinyl', basePrice: 9485 },
    { width: 12, depth: 12, material: 'Wood', basePrice: 5795 },
    { width: 12, depth: 12, material: 'Vinyl', basePrice: 8425 },
    { width: 12, depth: 14, material: 'Wood', basePrice: 6495 },
    { width: 12, depth: 14, material: 'Vinyl', basePrice: 9315 },
    { width: 12, depth: 16, material: 'Wood', basePrice: 7195 },
    { width: 12, depth: 16, material: 'Vinyl', basePrice: 10035 },
    { width: 12, depth: 18, material: 'Wood', basePrice: 7895 },
    { width: 12, depth: 18, material: 'Vinyl', basePrice: 10865 },
    { width: 12, depth: 20, material: 'Wood', basePrice: 8195 },
    { width: 12, depth: 20, material: 'Vinyl', basePrice: 11325 },
    { width: 12, depth: 24, material: 'Wood', basePrice: 9695 },
    { width: 12, depth: 24, material: 'Vinyl', basePrice: 13090 },
    { width: 12, depth: 28, material: 'Wood', basePrice: 10995 },
    { width: 12, depth: 28, material: 'Vinyl', basePrice: 14690 },
    { width: 12, depth: 30, material: 'Wood', basePrice: 11495 },
    { width: 12, depth: 30, material: 'Vinyl', basePrice: 15385 },
  ];

  for (const price of capecodPrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: capecodShed.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `CAPECOD-${price.width}x${price.depth}-${price.material.toUpperCase()}`,
      },
    });
  }
  console.log(`  ✅ Added Cape Cod Garden Shed with ${capecodPrices.length} price points\n`);

  // Building Style 3: Villa Shed
  console.log('Adding Villa Shed...');
  const villaShed = await prisma.buildingStyle.create({
    data: {
      name: 'Villa Shed',
      myshedCatalogCode: 'VILLA',
      description: 'The contemporary-styled Villa Shed has a hip roof and unique standard features that set it apart from other backyard buildings. This building blends well into a variety of settings and is a good choice for waterfront properties or areas with potentially high winds.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1604/villa-10x16-outdoor-shed-with-double-doors-custom-built-by-shed-company-in-hayward-wisconsin-1600x1600.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1605/outdoor-shed-villa-style-by-northwood-industries-mounds-view-minnesota-1600x600-f50_50.jpg',
      ]),
      clientId: client.id,
    },
  });

  const villaPrices = [
    { width: 8, depth: 10, material: 'Wood', basePrice: 4995 },
    { width: 8, depth: 10, material: 'Vinyl', basePrice: 5975 },
    { width: 8, depth: 12, material: 'Wood', basePrice: 5495 },
    { width: 8, depth: 12, material: 'Vinyl', basePrice: 6500 },
    { width: 8, depth: 14, material: 'Wood', basePrice: 5995 },
    { width: 8, depth: 14, material: 'Vinyl', basePrice: 7005 },
    { width: 8, depth: 16, material: 'Wood', basePrice: 6395 },
    { width: 8, depth: 16, material: 'Vinyl', basePrice: 7540 },
    { width: 10, depth: 10, material: 'Wood', basePrice: 5495 },
    { width: 10, depth: 10, material: 'Vinyl', basePrice: 7195 },
    { width: 10, depth: 12, material: 'Wood', basePrice: 5595 },
    { width: 10, depth: 12, material: 'Vinyl', basePrice: 7765 },
    { width: 10, depth: 14, material: 'Wood', basePrice: 6495 },
    { width: 10, depth: 14, material: 'Vinyl', basePrice: 8330 },
    { width: 10, depth: 16, material: 'Wood', basePrice: 6895 },
    { width: 10, depth: 16, material: 'Vinyl', basePrice: 8790 },
    { width: 10, depth: 18, material: 'Wood', basePrice: 7695 },
    { width: 10, depth: 18, material: 'Vinyl', basePrice: 9790 },
    { width: 10, depth: 20, material: 'Wood', basePrice: 8195 },
    { width: 10, depth: 20, material: 'Vinyl', basePrice: 10210 },
    { width: 12, depth: 12, material: 'Wood', basePrice: 6295 },
    { width: 12, depth: 12, material: 'Vinyl', basePrice: 9005 },
    { width: 12, depth: 14, material: 'Wood', basePrice: 6995 },
    { width: 12, depth: 14, material: 'Vinyl', basePrice: 9795 },
    { width: 12, depth: 16, material: 'Wood', basePrice: 7495 },
    { width: 12, depth: 16, material: 'Vinyl', basePrice: 10455 },
    { width: 12, depth: 18, material: 'Wood', basePrice: 8295 },
    { width: 12, depth: 18, material: 'Vinyl', basePrice: 11450 },
    { width: 12, depth: 20, material: 'Wood', basePrice: 8695 },
    { width: 12, depth: 20, material: 'Vinyl', basePrice: 11935 },
    { width: 12, depth: 24, material: 'Wood', basePrice: 10095 },
    { width: 12, depth: 24, material: 'Vinyl', basePrice: 13550 },
    { width: 12, depth: 28, material: 'Wood', basePrice: 11495 },
    { width: 12, depth: 28, material: 'Vinyl', basePrice: 15195 },
    { width: 12, depth: 30, material: 'Wood', basePrice: 12095 },
    { width: 12, depth: 30, material: 'Vinyl', basePrice: 15905 },
  ];

  for (const price of villaPrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: villaShed.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `VILLA-${price.width}x${price.depth}-${price.material.toUpperCase()}`,
      },
    });
  }
  console.log(`  ✅ Added Villa Shed with ${villaPrices.length} price points\n`);

  // Building Style 4: Monterey/Quaker Shed
  console.log('Adding Monterey Shed (Quaker)...');
  const montereyShed = await prisma.buildingStyle.create({
    data: {
      name: 'Monterey Shed (Quaker)',
      myshedCatalogCode: 'QUAKER',
      description: 'With its off-center roofline, the Monterey shed gets a distinctive look while providing the opportunity to have a full-length loft along the back wall. Sometimes known as a carriage shed or Quaker shed. Standard features include double entry door and 2 windows.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1601/quaker-shed-with-double-doors-for-sale-in-cross-lake-minnesota-1600x600-f50_50.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/19502/saltbox-storage-shed-for-sale-near-duluth-minnesota-800x533.jpg',
      ]),
      clientId: client.id,
    },
  });

  const montereyPrices = [
    { width: 8, depth: 8, material: 'Wood', basePrice: 4395 },
    { width: 8, depth: 10, material: 'Wood', basePrice: 4995 },
    { width: 8, depth: 12, material: 'Wood', basePrice: 5395 },
    { width: 8, depth: 14, material: 'Wood', basePrice: 5895 },
    { width: 8, depth: 16, material: 'Wood', basePrice: 6495 },
    { width: 10, depth: 10, material: 'Wood', basePrice: 5495 },
    { width: 10, depth: 12, material: 'Wood', basePrice: 5595 },
    { width: 10, depth: 14, material: 'Wood', basePrice: 6495 },
    { width: 10, depth: 16, material: 'Wood', basePrice: 6995 },
    { width: 10, depth: 18, material: 'Wood', basePrice: 7795 },
    { width: 10, depth: 20, material: 'Wood', basePrice: 8595 },
    { width: 12, depth: 12, material: 'Wood', basePrice: 6295 },
    { width: 12, depth: 14, material: 'Wood', basePrice: 7195 },
    { width: 12, depth: 16, material: 'Wood', basePrice: 7795 },
    { width: 12, depth: 18, material: 'Wood', basePrice: 8495 },
    { width: 12, depth: 20, material: 'Wood', basePrice: 8995 },
    { width: 12, depth: 24, material: 'Wood', basePrice: 10595 },
    { width: 12, depth: 28, material: 'Wood', basePrice: 11995 },
    { width: 12, depth: 30, material: 'Wood', basePrice: 12495 },
  ];

  for (const price of montereyPrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: montereyShed.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `QUAKER-${price.width}x${price.depth}-${price.material.toUpperCase()}`,
      },
    });
  }
  console.log(`  ✅ Added Monterey Shed with ${montereyPrices.length} price points\n`);

  // Building Style 5: Dutch Barn
  console.log('Adding Dutch Barn...');
  const dutchBarn = await prisma.buildingStyle.create({
    data: {
      name: 'Dutch Barn',
      myshedCatalogCode: 'DUTCH',
      description: 'The Dutch Barn features a traditional barn-style gambrel roof that provides maximum storage space and a lot of headroom while maintaining visual appeal. High sidewalls accommodate standard double doors and allow plenty of room for loft additions.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1611/wood-storage-barn-for-sale-in-hayward-wisconsin-scaled-1600x600-f50_50.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1609/gray-dutch-style-wood-storage-barn-in-central-minnesota-800x533.jpg',
      ]),
      clientId: client.id,
    },
  });

  const dutchPrices = [
    { width: 8, depth: 10, material: 'Wood', basePrice: 4995 },
    { width: 8, depth: 10, material: 'Vinyl', basePrice: 5975 },
    { width: 8, depth: 12, material: 'Wood', basePrice: 5395 },
    { width: 8, depth: 12, material: 'Vinyl', basePrice: 6340 },
    { width: 8, depth: 14, material: 'Wood', basePrice: 5995 },
    { width: 8, depth: 14, material: 'Vinyl', basePrice: 7100 },
    { width: 8, depth: 16, material: 'Wood', basePrice: 6395 },
    { width: 8, depth: 16, material: 'Vinyl', basePrice: 7540 },
    { width: 10, depth: 10, material: 'Wood', basePrice: 5395 },
    { width: 10, depth: 10, material: 'Vinyl', basePrice: 7110 },
    { width: 10, depth: 12, material: 'Wood', basePrice: 5495 },
    { width: 10, depth: 12, material: 'Vinyl', basePrice: 7615 },
    { width: 10, depth: 14, material: 'Wood', basePrice: 6395 },
    { width: 10, depth: 14, material: 'Vinyl', basePrice: 8180 },
    { width: 10, depth: 16, material: 'Wood', basePrice: 6895 },
    { width: 10, depth: 16, material: 'Vinyl', basePrice: 8760 },
    { width: 10, depth: 18, material: 'Wood', basePrice: 7395 },
    { width: 10, depth: 18, material: 'Vinyl', basePrice: 9335 },
    { width: 10, depth: 20, material: 'Wood', basePrice: 7895 },
    { width: 10, depth: 20, material: 'Vinyl', basePrice: 9715 },
    { width: 12, depth: 12, material: 'Wood', basePrice: 5995 },
    { width: 12, depth: 12, material: 'Vinyl', basePrice: 8660 },
    { width: 12, depth: 14, material: 'Wood', basePrice: 6695 },
    { width: 12, depth: 14, material: 'Vinyl', basePrice: 9490 },
    { width: 12, depth: 16, material: 'Wood', basePrice: 7395 },
    { width: 12, depth: 16, material: 'Vinyl', basePrice: 10035 },
    { width: 12, depth: 18, material: 'Wood', basePrice: 7895 },
    { width: 12, depth: 18, material: 'Vinyl', basePrice: 12395 },
    { width: 12, depth: 20, material: 'Wood', basePrice: 8295 },
    { width: 12, depth: 20, material: 'Vinyl', basePrice: 12700 },
    { width: 12, depth: 24, material: 'Wood', basePrice: 9595 },
    { width: 12, depth: 24, material: 'Vinyl', basePrice: 13005 },
    { width: 12, depth: 28, material: 'Wood', basePrice: 10695 },
    { width: 12, depth: 28, material: 'Vinyl', basePrice: 14385 },
    { width: 12, depth: 30, material: 'Wood', basePrice: 11295 },
    { width: 12, depth: 30, material: 'Vinyl', basePrice: 16720 },
  ];

  for (const price of dutchPrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: dutchBarn.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `DUTCH-${price.width}x${price.depth}-${price.material.toUpperCase()}`,
      },
    });
  }
  console.log(`  ✅ Added Dutch Barn with ${dutchPrices.length} price points\n`);

  // Building Style 6: Steel Garden Shed
  console.log('Adding Steel Garden Shed...');
  const steelGarden = await prisma.buildingStyle.create({
    data: {
      name: 'Steel Garden Shed',
      myshedCatalogCode: 'STEEL-CAPECOD',
      description: 'Our steel garden shed combines the look of the Cape Cod storage shed with long-lasting and maintenance-free metal siding and roof. This is our most economical model. Features 40-year limited warranty on metal.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1617/10x12-steel-garden-shed-for-sale-in-grand-rapids-minnesota-scaled-800x533.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1619/steel-garden-shed-for-sale-near-me-in-Minnesota-scaled-1600x600-f50_50.jpg',
      ]),
      clientId: client.id,
    },
  });

  const steelGardenPrices = [
    { width: 8, depth: 8, material: 'Metal', basePrice: 3195 },
    { width: 8, depth: 12, material: 'Metal', basePrice: 3895 },
    { width: 8, depth: 16, material: 'Metal', basePrice: 4495 },
    { width: 10, depth: 12, material: 'Metal', basePrice: 4495 },
    { width: 10, depth: 16, material: 'Metal', basePrice: 5195 },
    { width: 10, depth: 20, material: 'Metal', basePrice: 6295 },
    { width: 12, depth: 16, material: 'Metal', basePrice: 6795 },
    { width: 12, depth: 20, material: 'Metal', basePrice: 7495 },
    { width: 12, depth: 24, material: 'Metal', basePrice: 7895 },
  ];

  for (const price of steelGardenPrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: steelGarden.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `STEEL-${price.width}x${price.depth}-METAL`,
      },
    });
  }
  console.log(`  ✅ Added Steel Garden Shed with ${steelGardenPrices.length} price points\n`);

  // Building Style 7: Cape Cod Garage
  console.log('Adding Cape Cod Garage...');
  const capecodGarage = await prisma.buildingStyle.create({
    data: {
      name: 'Cape Cod Garage',
      myshedCatalogCode: 'GARAGE-CAPECOD',
      description: 'The Cape Cod Garage is crafted from the popular Cape Cod Garden Shed with the addition of a steel overhead door and a heavy duty floor support system. Features substantial structural capacity to store vehicles and equipment securely.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1643/portable-garage-cape-cod-12x24-with-overhead-door-and-ramp-for-sale-in-minneapolis-minnesota-1600x600-f50_50.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1641/12x28-portable-garage-by-northwood-industries-for-sale-in-midwest-scaled-800x533.jpg',
      ]),
      clientId: client.id,
    },
  });

  const capecodGaragePrices = [
    { width: 12, depth: 16, material: 'Wood', basePrice: 8995 },
    { width: 12, depth: 16, material: 'Vinyl', basePrice: 11825 },
    { width: 12, depth: 18, material: 'Wood', basePrice: 9795 },
    { width: 12, depth: 18, material: 'Vinyl', basePrice: 12695 },
    { width: 12, depth: 20, material: 'Wood', basePrice: 9995 },
    { width: 12, depth: 20, material: 'Vinyl', basePrice: 13240 },
    { width: 12, depth: 24, material: 'Wood', basePrice: 11395 },
    { width: 12, depth: 24, material: 'Vinyl', basePrice: 14915 },
    { width: 12, depth: 28, material: 'Wood', basePrice: 12795 },
    { width: 12, depth: 28, material: 'Vinyl', basePrice: 16510 },
    { width: 12, depth: 30, material: 'Wood', basePrice: 13395 },
    { width: 12, depth: 30, material: 'Vinyl', basePrice: 17215 },
  ];

  for (const price of capecodGaragePrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: capecodGarage.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `GARAGE-CAPECOD-${price.width}x${price.depth}-${price.material.toUpperCase()}`,
      },
    });
  }
  console.log(`  ✅ Added Cape Cod Garage with ${capecodGaragePrices.length} price points\n`);

  // Building Style 8: Steel Garage
  console.log('Adding Steel Garage...');
  const steelGarage = await prisma.buildingStyle.create({
    data: {
      name: 'Steel Garage',
      myshedCatalogCode: 'GARAGE-METAL',
      description: 'Maintenance-free boat, ATV, and car storage structure designed for Northern Wisconsin and Minnesota climates. Metal-only construction with steel siding and roofing. Features 40-year limited warranty on metal.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1648/12x20-steel-garage-northwood-industries-scaled-1600x600-f50_50.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1655/northwood-industries-steel-garage-storage-shed-for-sale-in-wisconsin-scaled-800x533.jpg',
      ]),
      clientId: client.id,
    },
  });

  const steelGaragePrices = [
    { width: 12, depth: 16, material: 'Metal', basePrice: 7200 },
    { width: 12, depth: 20, material: 'Metal', basePrice: 8195 },
    { width: 12, depth: 24, material: 'Metal', basePrice: 9500 },
  ];

  for (const price of steelGaragePrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: steelGarage.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `GARAGE-METAL-${price.width}x${price.depth}-METAL`,
      },
    });
  }
  console.log(`  ✅ Added Steel Garage with ${steelGaragePrices.length} price points\n`);

  // Building Style 9: Cape Cod Cabin
  console.log('Adding Cape Cod Cabin...');
  const capecodCabin = await prisma.buildingStyle.create({
    data: {
      name: 'Cape Cod Cabin',
      myshedCatalogCode: 'CABIN-CAPECOD',
      description: 'The Cape Cod Prefab Cabins are perfect for vacation properties, built from the popular Cape Cod Garden Shed with an added front porch to create a getaway space. Designed for vacation cabins, guest cabins, camping cabins, and hobby spaces.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/15570/cape-cod-prefab-cabin-shed-for-sale-in-Wisconsin-1600x600-f50_50.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/15024/spooner-wisconsin-cabin-shed-retail-store-1600x1600.jpg',
      ]),
      clientId: client.id,
    },
  });

  const capecodCabinPrices = [
    { width: 12, depth: 16, material: 'Wood', basePrice: 9795 },
    { width: 12, depth: 18, material: 'Wood', basePrice: 10595 },
    { width: 12, depth: 20, material: 'Wood', basePrice: 10895 },
    { width: 12, depth: 24, material: 'Wood', basePrice: 12295 },
    { width: 12, depth: 28, material: 'Wood', basePrice: 13695 },
    { width: 12, depth: 30, material: 'Wood', basePrice: 14195 },
  ];

  for (const price of capecodCabinPrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: capecodCabin.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `CABIN-CAPECOD-${price.width}x${price.depth}-WOOD`,
      },
    });
  }
  console.log(`  ✅ Added Cape Cod Cabin with ${capecodCabinPrices.length} price points\n`);

  // Building Style 10: Bunkhouse
  console.log('Adding Bunkhouse...');
  const bunkhouse = await prisma.buildingStyle.create({
    data: {
      name: 'Bunkhouse',
      myshedCatalogCode: 'CABIN-STUDIO',
      description: 'The Bunkhouse is a prefab cabin designed for use as a guest cabin, home office or studio, playhouse, or multipurpose space. Standard features include 9-light steel entry door, two 24"x36" aluminum windows, architectural shingles on roof.',
      images: JSON.stringify([
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1675/bunkhouse-for-vacation-cabin-in-minneapolis-minnesota-scaled-1600x600-f50_50.jpg',
        'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1681/portable-bunkhouse-for-vacation-property-cross-lake-minnesota-800x533.jpg',
      ]),
      clientId: client.id,
    },
  });

  const bunkhousePrices = [
    { width: 10, depth: 10, material: 'Wood', basePrice: 6575 },
    { width: 10, depth: 12, material: 'Wood', basePrice: 7175 },
    { width: 10, depth: 16, material: 'Wood', basePrice: 8235 },
  ];

  for (const price of bunkhousePrices) {
    await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: bunkhouse.id,
        width: price.width,
        depth: price.depth,
        material: price.material,
        basePrice: price.basePrice,
        sku: `BUNKHOUSE-${price.width}x${price.depth}-WOOD`,
      },
    });
  }
  console.log(`  ✅ Added Bunkhouse with ${bunkhousePrices.length} price points\n`);

  console.log('🎉 All Northwood building styles and pricing imported!\n');
  console.log('📊 Summary:');
  console.log(`  - Building Styles: 10`);
  console.log(`  - Total Price Points: ${classicPrices.length + capecodPrices.length + villaPrices.length + montereyPrices.length + dutchPrices.length + steelGardenPrices.length + capecodGaragePrices.length + steelGaragePrices.length + capecodCabinPrices.length + bunkhousePrices.length}`);
  console.log('\n✨ Visit http://localhost:3000/client/northwood-outdoor/building-styles to view!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error importing building styles:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
