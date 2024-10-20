import type { Metadata } from "next";
import "./globals.css";
import EcoBackground from "@/components/ecoBG";

export const metadata: Metadata = {
  title: "EcoWare Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body ><EcoBackground />
        <main className="relative z-10">
          {children}
        </main></body>
    </html>
  );
}