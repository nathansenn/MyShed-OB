import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    clientId: string;
    storeId: string;
  }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { storeId } = await params;
    const body = await request.json();

    const store = await prisma.store.update({
      where: { id: storeId },
      data: body,
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("Error updating store:", error);
    return NextResponse.json(
      { error: "Failed to update store" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { storeId } = await params;

    await prisma.store.delete({
      where: { id: storeId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting store:", error);
    return NextResponse.json(
      { error: "Failed to delete store" },
      { status: 500 }
    );
  }
}
