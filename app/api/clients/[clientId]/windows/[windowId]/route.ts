import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ windowId: string }>;
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { windowId } = await params;
    await prisma.window.delete({ where: { id: windowId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting window:", error);
    return NextResponse.json({ error: "Failed to delete window" }, { status: 500 });
  }
}
