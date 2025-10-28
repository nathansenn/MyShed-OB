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
    const client = await prisma.client.findUnique({ where: { slug: clientId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const styles = await prisma.buildingStyle.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(styles);
  } catch (error) {
    console.error("Error fetching building styles:", error);
    return NextResponse.json({ error: "Failed to fetch building styles" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;
    const body = await request.json();
    const client = await prisma.client.findUnique({ where: { slug: clientId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const style = await prisma.buildingStyle.create({
      data: {
        clientId: client.id,
        name: body.name,
        myshedCatalogCode: body.myshedCatalogCode,
        description: body.description,
        images: body.images,
      },
    });

    return NextResponse.json(style);
  } catch (error) {
    console.error("Error creating building style:", error);
    return NextResponse.json({ error: "Failed to create building style" }, { status: 500 });
  }
}
