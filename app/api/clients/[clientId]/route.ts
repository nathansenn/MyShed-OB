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
      include: {
        stores: true,
        systemUsers: true,
        buildingStyles: {
          include: {
            pricingMatrix: true,
          },
        },
        doors: true,
        windows: true,
        roofColors: true,
        sidingColors: true,
        trimColors: true,
        interiorOptions: true,
        porchOptions: true,
        companyDetails: true,
        taxInfo: true,
        deliveryOptions: true,
        financingOptions: true,
        paymentInfo: true,
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json(
      { error: "Failed to fetch client" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;
    const body = await request.json();

    const client = await prisma.client.update({
      where: { slug: clientId },
      data: body,
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { clientId } = await params;

    await prisma.client.delete({
      where: { slug: clientId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}
