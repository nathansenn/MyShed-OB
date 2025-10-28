import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const doors = await prisma.catalogDoor.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(doors);
  } catch (error) {
    console.error("Error fetching catalog doors:", error);
    return NextResponse.json({ error: "Failed to fetch catalog" }, { status: 500 });
  }
}
