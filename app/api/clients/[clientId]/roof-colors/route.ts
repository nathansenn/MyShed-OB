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

    const roofColors = await prisma.roofColor.findMany({
      where: { clientId: client.id },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(roofColors);
  } catch (error) {
    console.error("Error fetching roof colors:", error);
    return NextResponse.json(
      { error: "Failed to fetch roof colors" },
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

    const roofColor = await prisma.roofColor.create({
      data: {
        clientId: client.id,
        name: body.name,
        colorCode: body.colorCode || null,
        imageUrl: body.imageUrl || null,
        additionalPrice: body.additionalPrice || 0,
        allowedStyles: body.allowedStyles || null,
      },
    });

    return NextResponse.json(roofColor);
  } catch (error) {
    console.error("Error creating roof color:", error);
    return NextResponse.json(
      { error: "Failed to create roof color" },
      { status: 500 }
    );
  }
}
