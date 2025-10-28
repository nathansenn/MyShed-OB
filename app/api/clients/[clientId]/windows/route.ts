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

    const windows = await prisma.window.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(windows);
  } catch (error) {
    console.error("Error fetching windows:", error);
    return NextResponse.json({ error: "Failed to fetch windows" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;
    const body = await request.json();
    const client = await prisma.client.findUnique({ where: { slug: clientId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const window = await prisma.window.create({
      data: {
        clientId: client.id,
        ...body,
      },
    });

    return NextResponse.json(window);
  } catch (error) {
    console.error("Error creating window:", error);
    return NextResponse.json({ error: "Failed to create window" }, { status: 500 });
  }
}
