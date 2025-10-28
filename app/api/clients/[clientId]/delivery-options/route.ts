import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ clientId: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;
    const client = await prisma.client.findUnique({ where: { slug: clientId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const deliveryOptions = await prisma.deliveryOptions.findUnique({
      where: { clientId: client.id },
    });
    return NextResponse.json(deliveryOptions);
  } catch (error) {
    console.error("Error fetching delivery options:", error);
    return NextResponse.json({ error: "Failed to fetch delivery options" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;
    const body = await request.json();
    const client = await prisma.client.findUnique({ where: { slug: clientId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const deliveryOptions = await prisma.deliveryOptions.upsert({
      where: { clientId: client.id },
      update: body,
      create: { clientId: client.id, ...body },
    });
    return NextResponse.json(deliveryOptions);
  } catch (error) {
    console.error("Error updating delivery options:", error);
    return NextResponse.json({ error: "Failed to update delivery options" }, { status: 500 });
  }
}
