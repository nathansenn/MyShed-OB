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

    const trimColors = await prisma.trimColor.findMany({
      where: { clientId: client.id },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(trimColors);
  } catch (error) {
    console.error("Error fetching trim colors:", error);
    return NextResponse.json(
      { error: "Failed to fetch trim colors" },
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

    const trimColor = await prisma.trimColor.create({
      data: {
        clientId: client.id,
        name: body.name,
        colorCode: body.colorCode || null,
        imageUrl: body.imageUrl || null,
        additionalPrice: body.additionalPrice || 0,
        trimType: body.trimType || null,
        allowedStyles: body.allowedStyles || null,
      },
    });

    return NextResponse.json(trimColor);
  } catch (error) {
    console.error("Error creating trim color:", error);
    return NextResponse.json(
      { error: "Failed to create trim color" },
      { status: 500 }
    );
  }
}
