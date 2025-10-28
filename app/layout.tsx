import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyShed Onboarding Portal",
  description: "Customer onboarding for MyShed 3D configurator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
