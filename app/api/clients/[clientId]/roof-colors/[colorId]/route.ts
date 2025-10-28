import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    clientId: string;
    colorId: string;
  }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { colorId } = await params;
    const body = await request.json();

    const roofColor = await prisma.roofColor.update({
      where: { id: colorId },
      data: {
        name: body.name,
        colorCode: body.colorCode,
        imageUrl: body.imageUrl,
        additionalPrice: body.additionalPrice,
        allowedStyles: body.allowedStyles,
      },
    });

    return NextResponse.json(roofColor);
  } catch (error) {
    console.error("Error updating roof color:", error);
    return NextResponse.json(
      { error: "Failed to update roof color" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { colorId } = await params;

    await prisma.roofColor.delete({
      where: { id: colorId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting roof color:", error);
    return NextResponse.json(
      { error: "Failed to delete roof color" },
      { status: 500 }
    );
  }
}
