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

    const paymentInfo = await prisma.paymentInfo.findUnique({
      where: { clientId: client.id },
    });
    return NextResponse.json(paymentInfo);
  } catch (error) {
    console.error("Error fetching payment info:", error);
    return NextResponse.json({ error: "Failed to fetch payment info" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;
    const body = await request.json();
    const client = await prisma.client.findUnique({ where: { slug: clientId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    const paymentInfo = await prisma.paymentInfo.upsert({
      where: { clientId: client.id },
      update: body,
      create: { clientId: client.id, ...body },
    });
    return NextResponse.json(paymentInfo);
  } catch (error) {
    console.error("Error updating payment info:", error);
    return NextResponse.json({ error: "Failed to update payment info" }, { status: 500 });
  }
}
