import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎨 Importing Complete Northwood Outdoor Configuration...\n');

  // Get the Northwood Outdoor client
  const client = await prisma.client.findUnique({
    where: { slug: 'northwood-outdoor' },
  });

  if (!client) {
    console.error('❌ Northwood Outdoor client not found!');
    process.exit(1);
  }

  console.log(`✅ Found client: ${client.companyName}\n`);

  // ============================================
  // D. ROOF DETAILS - Shingle Colors
  // ============================================
  console.log('🏠 Importing Roof/Shingle Colors...');
  const roofColors = [
    {
      name: 'Slate',
      colorCode: '#6B6B5A',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/947/northwood-shingle-color-slate_0-100x9999.png',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Green',
      colorCode: '#4A5A43',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/946/northwood-shingle-color-green_0-100x9999.png',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Gray',
      colorCode: '#8B8B7B',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/945/northwood-shingle-color-gray_0-100x9999.png',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Cedar',
      colorCode: '#A88860',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/943/northwood-shingle-color-cedar_0-100x9999.png',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Charcoal',
      colorCode: '#4A4A4A',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/944/northwood-shingle-color-charcoal_0-100x9999.png',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Bark',
      colorCode: '#5A4A3A',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/941/northwood-shingle-color-bark_0-100x9999.png',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Black',
      colorCode: '#2A2A2A',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/942/northwood-shingle-color-black_0-100x9999.png',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
  ];

  for (const color of roofColors) {
    await prisma.roofColor.upsert({
      where: {
        clientId_name: {
          clientId: client.id,
          name: color.name,
        },
      },
      update: color,
      create: {
        ...color,
        clientId: client.id,
      },
    });
    console.log(`  ✅ Added roof color: ${color.name}`);
  }
  console.log(`✅ Imported ${roofColors.length} roof colors\n`);

  // ============================================
  // E. SIDING DETAILS - Wood Paint Colors
  // ============================================
  console.log('🎨 Importing Wood Siding Paint Colors...');
  const woodSidingColors = [
    {
      name: 'Turf Green',
      colorCode: '#2F5F4F',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/980/shed-building-trim-shutter-turf-green_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Wedgewood Blue',
      colorCode: '#4A7B8C',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/981/shed-building-trim-shutter-wedgewood-blue_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'White',
      colorCode: '#F0F0F0',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1043/shed-building-trim-shutter-white_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Navajo White',
      colorCode: '#F5E6D3',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/979/shed-building-trim-shutter-navajo-white_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Light Gray',
      colorCode: '#C4C0B8',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/978/shed-building-trim-shutter-light-gray_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Dawn Gray',
      colorCode: '#6B7B8C',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/977/shed-building-trim-shutter-dawn-gray_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Charcoal Brown',
      colorCode: '#4A3428',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/974/shed-building-trim-shutter-charcoal-brown_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Chestnut',
      colorCode: '#9B6B43',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/975/shed-building-trim-shutter-chestnut_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Clay',
      colorCode: '#C9B896',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/976/shed-building-trim-shutter-clay_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Almond',
      colorCode: '#E8DCC8',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/970/shed-building-trim-shutter-almond_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Avocado',
      colorCode: '#4A6B4A',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/971/shed-building-trim-shutter-avocado_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Barn Red',
      colorCode: '#8B3A3A',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/972/shed-building-trim-shutter-barn-red_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Beige',
      colorCode: '#DCC89B',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/973/shed-building-trim-shutter-beige_0-100x9999.png',
      material: 'Wood',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
  ];

  for (const color of woodSidingColors) {
    await prisma.sidingColor.upsert({
      where: {
        clientId_name_material: {
          clientId: client.id,
          name: color.name,
          material: color.material,
        },
      },
      update: color,
      create: {
        ...color,
        clientId: client.id,
      },
    });
    console.log(`  ✅ Added wood siding color: ${color.name}`);
  }
  console.log(`✅ Imported ${woodSidingColors.length} wood siding colors\n`);

  // ============================================
  // E. SIDING DETAILS - Vinyl Colors
  // ============================================
  console.log('🎨 Importing Vinyl Siding Colors...');
  const vinylSidingColors = [
    {
      name: 'White',
      colorCode: '#F0F0F0',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1036/shed-vinyl-siding-white_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Sage',
      colorCode: '#A8B89B',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1033/shed-vinyl-siding-sage_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Sandstone',
      colorCode: '#D8C8A8',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1034/shed-vinyl-siding-sandstone_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Slate Blue',
      colorCode: '#7B9BA8',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1035/shed-vinyl-siding-slate-blue_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Prairie Wheat',
      colorCode: '#E8D8B0',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1032/shed-vinyl-siding-prairie-wheat_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Heritage Gray',
      colorCode: '#C0C4C8',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1031/shed-vinyl-siding-heritage-gray_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Antique Ivory',
      colorCode: '#F0E6D8',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1028/shed-vinyl-siding-antique-ivory_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Classic Linen',
      colorCode: '#E8DCC0',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1029/shed-vinyl-siding-classic-linen_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Clay',
      colorCode: '#D4C4A8',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1030/shed-vinyl-siding-clay_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
    {
      name: 'Almond',
      colorCode: '#E8DCC8',
      imageUrl: 'https://northwoodoutdoor.b-cdn.net/wp-content/uploads/bis-images/1027/shed-vinyl-siding-almond_0-100x9999.png',
      material: 'Vinyl',
      additionalPrice: 0,
      allowedStyles: 'Classic, Cape Cod, Villa, Monterey, Dutch Barn',
    },
  ];

  for (const color of vinylSidingColors) {
    await prisma.sidingColor.upsert({
      where: {
        clientId_name_material: {
          clientId: client.id,
          name: color.name,
          material: color.material,
        },
      },
      update: color,
      create: {
        ...color,
        clientId: client.id,
      },
    });
    console.log(`  ✅ Added vinyl siding color: ${color.name}`);
  }
  console.log(`✅ Imported ${vinylSidingColors.length} vinyl siding colors\n`);

  // ============================================
  // L. COMPANY DETAILS
  // ============================================
  console.log('🏢 Importing Company Details...');
  await prisma.companyDetails.upsert({
    where: { clientId: client.id },
    update: {
      mainAddress: '10463 State Road 27, Hayward, WI 54843',
      phoneNumber: '(715) 634-7725 / 800-611-9471',
      emailAddress: 'info@northwoodoutdoor.com',
      timezone: 'Central Standard Time (CST)',
      businessHours: 'Monday - Saturday: 10:00 AM - 4:00 PM CST, Sunday: Closed',
      companyBackground: 'Over 20 years in business. Family-owned and operated. Amish-built storage sheds, garages, and gazebos.',
    },
    create: {
      clientId: client.id,
      mainAddress: '10463 State Road 27, Hayward, WI 54843',
      phoneNumber: '(715) 634-7725 / 800-611-9471',
      emailAddress: 'info@northwoodoutdoor.com',
      timezone: 'Central Standard Time (CST)',
      businessHours: 'Monday - Saturday: 10:00 AM - 4:00 PM CST, Sunday: Closed',
      companyBackground: 'Over 20 years in business. Family-owned and operated. Amish-built storage sheds, garages, and gazebos.',
    },
  });
  console.log('✅ Imported company details\n');

  // ============================================
  // N. DELIVERY OPTIONS
  // ============================================
  console.log('🚚 Importing Delivery Options...');
  await prisma.deliveryOptions.upsert({
    where: { clientId: client.id },
    update: {
      offersDelivery: true,
      freeDeliveryRadius: 50,
      pricePerMile: 4.0,
      deliveryMethod: 'Fully assembled on Northwood Outdoor truck/trailer. Alternative "Mule" delivery available to minimize yard damage.',
      buildTimeline: 'Custom structures: 4-6 weeks. In-stock buildings: 1-2 weeks.',
      siteRequirements: 'Level ground required. Treated skids rated for ground contact (included). Preferred: Crushed rock/stone pad for drainage and leveling. Concrete pads acceptable but not mandatory.',
      serviceArea: JSON.stringify([
        'Wisconsin: Hayward, Eau Claire, Wausau, Rhinelander',
        'Minnesota: Duluth, Grand Rapids, Brainerd, St Cloud, Minneapolis, St Paul',
        'Northern Michigan: Upper Peninsula areas',
      ]),
    },
    create: {
      clientId: client.id,
      offersDelivery: true,
      freeDeliveryRadius: 50,
      pricePerMile: 4.0,
      deliveryMethod: 'Fully assembled on Northwood Outdoor truck/trailer. Alternative "Mule" delivery available to minimize yard damage.',
      buildTimeline: 'Custom structures: 4-6 weeks. In-stock buildings: 1-2 weeks.',
      siteRequirements: 'Level ground required. Treated skids rated for ground contact (included). Preferred: Crushed rock/stone pad for drainage and leveling. Concrete pads acceptable but not mandatory.',
      serviceArea: JSON.stringify([
        'Wisconsin: Hayward, Eau Claire, Wausau, Rhinelander',
        'Minnesota: Duluth, Grand Rapids, Brainerd, St Cloud, Minneapolis, St Paul',
        'Northern Michigan: Upper Peninsula areas',
      ]),
    },
  });
  console.log('✅ Imported delivery options\n');

  // ============================================
  // P. PAYMENT INFORMATION
  // ============================================
  console.log('💳 Importing Payment Information...');
  await prisma.paymentInfo.upsert({
    where: { clientId: client.id },
    update: {
      acceptedMethods: JSON.stringify(['Cash', 'Check', 'All major credit cards']),
      depositPercentage: 50,
      depositRefundable: true,
      cancellationPolicy: '50% deposit is refundable minus 10% office/administrative costs and any special material expenses already incurred.',
    },
    create: {
      clientId: client.id,
      acceptedMethods: JSON.stringify(['Cash', 'Check', 'All major credit cards']),
      depositPercentage: 50,
      depositRefundable: true,
      cancellationPolicy: '50% deposit is refundable minus 10% office/administrative costs and any special material expenses already incurred.',
    },
  });
  console.log('✅ Imported payment information\n');

  console.log('🎉 Complete Northwood Outdoor configuration imported!\n');
  console.log('📊 Summary:');
  console.log(`  - Roof/Shingle Colors: ${roofColors.length}`);
  console.log(`  - Wood Siding Colors: ${woodSidingColors.length}`);
  console.log(`  - Vinyl Siding Colors: ${vinylSidingColors.length}`);
  console.log('  - Company Details: ✅');
  console.log('  - Delivery Options: ✅');
  console.log('  - Payment Information: ✅');
  console.log('\n✨ All configuration data has been imported!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error importing complete configuration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
