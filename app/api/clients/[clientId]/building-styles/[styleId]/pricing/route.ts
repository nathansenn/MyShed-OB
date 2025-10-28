import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - List all pricing for a building style
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string; styleId: string }> }
) {
  try {
    const { styleId } = await params;

    const pricingMatrix = await prisma.pricingMatrix.findMany({
      where: { buildingStyleId: styleId },
      orderBy: [
        { material: "asc" },
        { width: "asc" },
        { depth: "asc" },
      ],
    });

    return NextResponse.json(pricingMatrix);
  } catch (error) {
    console.error("Error fetching pricing matrix:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing matrix" },
      { status: 500 }
    );
  }
}

// POST - Create new pricing entry
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string; styleId: string }> }
) {
  try {
    const { styleId } = await params;
    const body = await request.json();

    const pricing = await prisma.pricingMatrix.create({
      data: {
        buildingStyleId: styleId,
        width: body.width || 8,
        depth: body.depth || 8,
        material: body.material || "Wood",
        basePrice: body.basePrice || 0,
        sku: body.sku || "",
      },
    });

    return NextResponse.json(pricing);
  } catch (error) {
    console.error("Error creating pricing:", error);
    return NextResponse.json(
      { error: "Failed to create pricing" },
      { status: 500 }
    );
  }
}
