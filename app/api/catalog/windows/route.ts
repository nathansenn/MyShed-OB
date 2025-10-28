import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const windows = await prisma.catalogWindow.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(windows);
  } catch (error) {
    console.error("Error fetching catalog windows:", error);
    return NextResponse.json({ error: "Failed to fetch catalog" }, { status: 500 });
  }
}
