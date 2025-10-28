import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const styles = await prisma.catalogBuildingStyle.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(styles);
  } catch (error) {
    console.error("Error fetching catalog building styles:", error);
    return NextResponse.json({ error: "Failed to fetch catalog" }, { status: 500 });
  }
}
