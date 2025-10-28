import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  try {
    const { clientId } = await params;

    // clientId is actually a slug in the URL
    // First, get the client by slug to get the actual ID
    const client = await prisma.client.findUnique({ 
      where: { slug: clientId } 
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Fetch all data in parallel using the actual client ID
    const [
      stores,
      users,
      buildingStyles,
      roofColors,
      sidingColors,
      trimColors,
      doors,
      windows,
    ] = await Promise.all([
      prisma.store.findMany({ where: { clientId: client.id } }),
      prisma.systemUser.findMany({ where: { clientId: client.id } }),
      prisma.buildingStyle.findMany({ where: { clientId: client.id } }),
      prisma.roofColor.findMany({ where: { clientId: client.id } }),
      prisma.sidingColor.findMany({ where: { clientId: client.id } }),
      prisma.trimColor.findMany({ where: { clientId: client.id } }),
      prisma.door.findMany({ where: { clientId: client.id } }),
      prisma.window.findMany({ where: { clientId: client.id } }),
    ]);

    // Calculate progress for each section
    const companyInfoComplete = client.ownerName && client.contactNumber && client.emailAddress && client.websiteLink && client.fullAddress;
    const colorSchemeComplete = client.primaryColor && client.secondaryColor;

    // Store information progress
    const storesComplete = stores.filter((s: any) => 
      s.name && s.address && s.phoneNumber && s.storeHours
    ).length;
    const storesItems = stores.map((s: any) => ({
      name: s.name || "Unnamed Store",
      status: (s.name && s.address && s.phoneNumber && s.storeHours) ? "complete" as const : 
              (s.name || s.address || s.phoneNumber) ? "partial" as const : "empty" as const
    }));

    // Users progress
    const usersComplete = users.filter((u: any) => 
      u.fullName && u.emailAddress && u.role
    ).length;

    // Building styles progress
    const buildingStylesComplete = buildingStyles.filter((bs: any) => 
      bs.name && bs.myshedCatalogCode
    ).length;
    const buildingStylesItems = buildingStyles.map((bs: any) => ({
      name: bs.name || "Unnamed Style",
      status: (bs.name && bs.myshedCatalogCode) ? "complete" as const : 
              bs.name ? "partial" as const : "empty" as const
    }));

    // Doors progress - count doors with pricing configured
    const doorsComplete = doors.filter((d: any) => d.basePrice > 0).length;

    // Windows progress - count windows with pricing configured
    const windowsComplete = windows.filter((w: any) => w.basePrice > 0).length;

    // Roof colors progress
    const roofColorsComplete = roofColors.length;

    // Siding colors progress (wood + vinyl colors)
    const sidingColorsComplete = sidingColors.length;

    // Trim colors progress
    const trimColorsComplete = trimColors.length;

    // Calculate overall progress
    const totalFields = 84;
    let completedFields = 0;

    // Company info (5 fields)
    if (companyInfoComplete) completedFields += 5;
    else if (client.ownerName || client.emailAddress) completedFields += Math.ceil((client.ownerName ? 1 : 0) + (client.emailAddress ? 1 : 0));

    // Color scheme (2 fields)
    if (colorSchemeComplete) completedFields += 2;
    else if (client.primaryColor || client.secondaryColor) completedFields += 1;

    // Stores (7 stores max)
    completedFields += storesComplete;

    // Users (5 users max)
    completedFields += Math.min(usersComplete, 5);

    // Building styles (10 styles target)
    completedFields += Math.min(buildingStylesComplete, 10);

    // Roof colors (7 colors target)
    completedFields += Math.min(roofColorsComplete, 7);

    // Siding colors (23 colors target - 13 wood + 10 vinyl)
    completedFields += Math.min(sidingColorsComplete, 23);

    // Trim colors (1 field)
    completedFields += Math.min(trimColorsComplete, 1);

    // Doors (19 doors target)
    completedFields += Math.min(doorsComplete, 19);

    // Windows (13 windows target)
    completedFields += Math.min(windowsComplete, 13);

    const overallPercentage = Math.round((completedFields / totalFields) * 100);

    // Build response
    const progressData = {
      overall: {
        completed: completedFields,
        total: totalFields,
        percentage: overallPercentage,
      },
      companyInfo: {
        completed: companyInfoComplete ? 5 : (client.ownerName ? 1 : 0) + (client.emailAddress ? 1 : 0),
        total: 5,
        percentage: companyInfoComplete ? 100 : Math.round(((client.ownerName ? 1 : 0) + (client.emailAddress ? 1 : 0)) / 5 * 100),
      },
      colorScheme: {
        completed: colorSchemeComplete ? 2 : (client.primaryColor ? 1 : 0) + (client.secondaryColor ? 1 : 0),
        total: 2,
        percentage: colorSchemeComplete ? 100 : Math.round(((client.primaryColor ? 1 : 0) + (client.secondaryColor ? 1 : 0)) / 2 * 100),
      },
      stores: {
        completed: storesComplete,
        total: Math.max(stores.length, 7),
        percentage: stores.length > 0 ? Math.round((storesComplete / stores.length) * 100) : 0,
        items: storesItems,
      },
      users: {
        completed: usersComplete,
        total: 5,
        percentage: Math.round((usersComplete / 5) * 100),
      },
      buildingStyles: {
        completed: buildingStylesComplete,
        total: 10,
        percentage: Math.round((buildingStylesComplete / 10) * 100),
        items: buildingStylesItems,
      },
      roofDetails: {
        completed: roofColorsComplete,
        total: 7,
        percentage: Math.round((roofColorsComplete / 7) * 100),
      },
      sidingDetails: {
        completed: sidingColorsComplete,
        total: 23,
        percentage: Math.round((sidingColorsComplete / 23) * 100),
      },
      trimDetails: {
        completed: trimColorsComplete,
        total: 1,
        percentage: trimColorsComplete > 0 ? 100 : 0,
      },
      doors: {
        completed: doorsComplete,
        total: 19,
        percentage: Math.round((doorsComplete / 19) * 100),
      },
      windows: {
        completed: windowsComplete,
        total: 13,
        percentage: Math.round((windowsComplete / 13) * 100),
      },
      interiorOptions: {
        completed: 0,
        total: 3,
        percentage: 0,
      },
      porchOptions: {
        completed: 0,
        total: 1,
        percentage: 0,
      },
      non3dOptions: {
        completed: 0,
        total: 4,
        percentage: 0,
      },
      companyDetails: {
        completed: 0,
        total: 8,
        percentage: 0,
      },
      taxInfo: {
        completed: 0,
        total: 2,
        percentage: 0,
      },
      deliveryOptions: {
        completed: 0,
        total: 1,
        percentage: 0,
      },
      financingOptions: {
        completed: 0,
        total: 1,
        percentage: 0,
      },
      paymentInfo: {
        completed: 0,
        total: 3,
        percentage: 0,
      },
    };

    return NextResponse.json(progressData);
  } catch (error) {
    console.error("Error calculating progress:", error);
    return NextResponse.json(
      { error: "Failed to calculate progress" },
      { status: 500 }
    );
  }
}
