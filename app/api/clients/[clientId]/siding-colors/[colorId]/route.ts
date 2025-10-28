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

    const sidingColor = await prisma.sidingColor.update({
      where: { id: colorId },
      data: {
        name: body.name,
        colorCode: body.colorCode,
        imageUrl: body.imageUrl,
        additionalPrice: body.additionalPrice,
        material: body.material,
        allowedStyles: body.allowedStyles,
      },
    });

    return NextResponse.json(sidingColor);
  } catch (error) {
    console.error("Error updating siding color:", error);
    return NextResponse.json(
      { error: "Failed to update siding color" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { colorId } = await params;

    await prisma.sidingColor.delete({
      where: { id: colorId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting siding color:", error);
    return NextResponse.json(
      { error: "Failed to delete siding color" },
      { status: 500 }
    );
  }
}
