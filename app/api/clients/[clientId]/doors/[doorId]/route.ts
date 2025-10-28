import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ doorId: string }>;
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { doorId } = await params;
    await prisma.door.delete({ where: { id: doorId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting door:", error);
    return NextResponse.json({ error: "Failed to delete door" }, { status: 500 });
  }
}
