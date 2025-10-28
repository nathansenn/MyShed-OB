import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, ownerName, contactNumber, emailAddress, websiteLink, fullAddress } = body;

    // Create slug from company name
    const slug = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug already exists
    const existing = await prisma.client.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A client with this name already exists" },
        { status: 400 }
      );
    }

    // Create client
    const client = await prisma.client.create({
      data: {
        slug,
        companyName,
        ownerName,
        contactNumber,
        emailAddress,
        websiteLink,
        fullAddress,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        slug: true,
        companyName: true,
        ownerName: true,
        overallProgress: true,
        completedFields: true,
        totalFields: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
