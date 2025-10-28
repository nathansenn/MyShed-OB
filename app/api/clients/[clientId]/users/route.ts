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

    const users = await prisma.systemUser.findMany({
      where: { clientId: client.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
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

    const user = await prisma.systemUser.create({
      data: {
        clientId: client.id,
        role: body.role,
        fullName: body.fullName,
        emailAddress: body.emailAddress,
        phoneNumbers: body.phoneNumbers,
        salesCommission: body.salesCommission,
        assignedStore: body.assignedStore,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
