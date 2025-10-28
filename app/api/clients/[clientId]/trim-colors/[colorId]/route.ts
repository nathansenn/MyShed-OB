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

    const trimColor = await prisma.trimColor.update({
      where: { id: colorId },
      data: {
        name: body.name,
        colorCode: body.colorCode,
        imageUrl: body.imageUrl,
        additionalPrice: body.additionalPrice,
        trimType: body.trimType,
        allowedStyles: body.allowedStyles,
      },
    });

    return NextResponse.json(trimColor);
  } catch (error) {
    console.error("Error updating trim color:", error);
    return NextResponse.json(
      { error: "Failed to update trim color" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { colorId } = await params;

    await prisma.trimColor.delete({
      where: { id: colorId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting trim color:", error);
    return NextResponse.json(
      { error: "Failed to delete trim color" },
      { status: 500 }
    );
  }
}
