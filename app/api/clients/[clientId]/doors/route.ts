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

    const doors = await prisma.door.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(doors);
  } catch (error) {
    console.error("Error fetching doors:", error);
    return NextResponse.json({ error: "Failed to fetch doors" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;
    const body = await request.json();
    const client = await prisma.client.findUnique({ where: { slug: clientId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const door = await prisma.door.create({
      data: {
        clientId: client.id,
        ...body,
      },
    });

    return NextResponse.json(door);
  } catch (error) {
    console.error("Error creating door:", error);
    return NextResponse.json({ error: "Failed to create door" }, { status: 500 });
  }
}
