import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#00507d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "Ariq Fish",
    "Jual Beli Ikan",
    "Distributor Ikan Laut Terbesar Asia",
    "Cold Storage Ikan Jakarta",
    "Suplai Ikan Tuna Cakalang",
    "Pengadaan Hasil Laut PIK 2",
    "Ekspor Ikan Laut Indonesia",
  ],
  authors: [{ name: "Ariq Fish Heritage" }],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    url: "https://ariqfish.co.id",
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300507d'><circle cx='12' cy='12' r='10' fill='%23f5dad0'/><path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 15h-2v-2h2zm0-4h-2V7h2z' fill='%2300507d'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-background text-on-surface antialiased flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}

