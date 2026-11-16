import FishCatalogCheckoutPage from "../pesan/page";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Katalog Ikan Segar & Checkout Online | ${siteConfig.name}`,
  description:
    "Katalog komoditas ikan laut segar tangkapan nelayan Nusantara: Tuna Loin, Cakalang, Tongkol, Kakap Merah, Kerapu, Cumi Sero, Udang Vaname, dan Salmon dengan sistem checkout QRIS resmi.",
};

export default FishCatalogCheckoutPage;
