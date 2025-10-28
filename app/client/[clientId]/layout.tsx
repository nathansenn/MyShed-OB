import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import OnboardingSidebar from "@/components/OnboardingSidebar";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    clientId: string;
  }>;
}

async function getClient(slug: string) {
  const client = await prisma.client.findUnique({
    where: { slug },
    include: {
      stores: true,
      systemUsers: true,
      buildingStyles: true,
      doors: true,
      windows: true,
      roofColors: true,
      sidingColors: true,
      trimColors: true,
      interiorOptions: true,
      porchOptions: true,
      companyDetails: true,
      taxInfo: true,
      deliveryOptions: true,
      financingOptions: true,
      paymentInfo: true,
    },
  });

  return client;
}

export default async function ClientLayout({ children, params }: LayoutProps) {
  const { clientId } = await params;
  const client = await getClient(clientId);

  if (!client) {
    redirect("/");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <OnboardingSidebar clientId={client.slug} />
      <main className="flex-1 overflow-y-auto bg-gray-50 ml-80">{children}</main>
    </div>
  );
}
