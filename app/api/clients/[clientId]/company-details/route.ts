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

    const companyDetails = await prisma.companyDetails.findUnique({
      where: { clientId: client.id },
    });

    return NextResponse.json(companyDetails);
  } catch (error) {
    console.error("Error fetching company details:", error);
    return NextResponse.json(
      { error: "Failed to fetch company details" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;
    const body = await request.json();

    const client = await prisma.client.findUnique({
      where: { slug: clientId },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const companyDetails = await prisma.companyDetails.upsert({
      where: { clientId: client.id },
      update: body,
      create: {
        clientId: client.id,
        ...body,
      },
    });

    return NextResponse.json(companyDetails);
  } catch (error) {
    console.error("Error updating company details:", error);
    return NextResponse.json(
      { error: "Failed to update company details" },
      { status: 500 }
    );
  }
}
