import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH - Update pricing entry
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string; styleId: string; pricingId: string }> }
) {
  try {
    const { pricingId } = await params;
    const body = await request.json();

    const updatedPricing = await prisma.pricingMatrix.update({
      where: { id: pricingId },
      data: body,
    });

    return NextResponse.json(updatedPricing);
  } catch (error) {
    console.error("Error updating pricing:", error);
    return NextResponse.json(
      { error: "Failed to update pricing" },
      { status: 500 }
    );
  }
}

// DELETE - Delete pricing entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ clientId: string; styleId: string; pricingId: string }> }
) {
  try {
    const { pricingId } = await params;

    await prisma.pricingMatrix.delete({
      where: { id: pricingId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting pricing:", error);
    return NextResponse.json(
      { error: "Failed to delete pricing" },
      { status: 500 }
    );
  }
}
