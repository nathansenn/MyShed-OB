import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string; styleId: string }> }
) {
  try {
    const { clientId: clientSlug, styleId } = await params;

    // Look up client by slug to get the actual ID
    const client = await prisma.client.findUnique({
      where: { slug: clientSlug },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    const buildingStyle = await prisma.buildingStyle.findUnique({
      where: {
        id: styleId,
      },
      include: {
        pricingMatrix: {
          orderBy: [{ width: 'asc' }, { depth: 'asc' }],
        },
      },
    });

    if (!buildingStyle) {
      return NextResponse.json(
        { error: 'Building style not found' },
        { status: 404 }
      );
    }

    // Verify the building style belongs to this client
    if (buildingStyle.clientId !== client.id) {
      return NextResponse.json(
        { error: 'Building style not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(buildingStyle);
  } catch (error) {
    console.error('Error fetching building style:', error);
    return NextResponse.json(
      { error: 'Failed to fetch building style' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string; styleId: string }> }
) {
  try {
    const { clientId: clientSlug, styleId } = await params;
    const body = await request.json();

    // Look up client by slug to get the actual ID
    const client = await prisma.client.findUnique({
      where: { slug: clientSlug },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    // Verify the building style belongs to this client
    const buildingStyle = await prisma.buildingStyle.findFirst({
      where: {
        id: styleId,
        clientId: client.id,
      },
    });

    if (!buildingStyle) {
      return NextResponse.json(
        { error: 'Building style not found' },
        { status: 404 }
      );
    }

    // Update the building style
    const updated = await prisma.buildingStyle.update({
      where: { id: styleId },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating building style:', error);
    return NextResponse.json(
      { error: 'Failed to update building style' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string; styleId: string }> }
) {
  try {
    const { clientId: clientSlug, styleId } = await params;

    // Look up client by slug to get the actual ID
    const client = await prisma.client.findUnique({
      where: { slug: clientSlug },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    // Verify the building style belongs to this client
    const buildingStyle = await prisma.buildingStyle.findFirst({
      where: {
        id: styleId,
        clientId: client.id,
      },
    });

    if (!buildingStyle) {
      return NextResponse.json(
        { error: 'Building style not found' },
        { status: 404 }
      );
    }

    // Delete the building style (pricing matrix will cascade delete)
    await prisma.buildingStyle.delete({
      where: { id: styleId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting building style:', error);
    return NextResponse.json(
      { error: 'Failed to delete building style' },
      { status: 500 }
    );
  }
}
