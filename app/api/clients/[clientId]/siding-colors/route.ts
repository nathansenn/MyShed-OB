import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    clientId: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;

    const client = await prisma.client.findUnique({
      where: { slug: clientId },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const sidingColors = await prisma.sidingColor.findMany({
      where: { clientId: client.id },
      orderBy: [{ material: "asc" }, { name: "asc" }],
    });

    return NextResponse.json(sidingColors);
  } catch (error) {
    console.error("Error fetching siding colors:", error);
    return NextResponse.json(
      { error: "Failed to fetch siding colors" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;
    const body = await request.json();

    const client = await prisma.client.findUnique({
      where: { slug: clientId },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const sidingColor = await prisma.sidingColor.create({
      data: {
        clientId: client.id,
        name: body.name,
        colorCode: body.colorCode || null,
        imageUrl: body.imageUrl || null,
        additionalPrice: body.additionalPrice || 0,
        material: body.material, // Wood, Vinyl, Metal
        allowedStyles: body.allowedStyles || null,
      },
    });

    return NextResponse.json(sidingColor);
  } catch (error) {
    console.error("Error creating siding color:", error);
    return NextResponse.json(
      { error: "Failed to create siding color" },
      { status: 500 }
    );
  }
}
