import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { dbGetNews } from "@/lib/sheets";

export const revalidate = 60; // Refresh data setiap 60 detik

export default async function HomePage() {
  // Ambil berita published dari database (Google Spreadsheet / Fallback)
  let liveNews: any[] = [];
  try {
    const rawNews = await dbGetNews("published");
    liveNews = rawNews.map((n) => ({
      id: n.id,
      title: n.title,
      slug: n.slug,
      category: "Warta Maritim",
      date: n.created_at
        ? new Date(n.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Terkini",
      readTime: "3 mnt baca",
      excerpt: n.excerpt,
      thumbnail: n.thumbnail_path || "/images/hero-fish-platter.png",
    }));
  } catch (e) {
    liveNews = [];
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <NewsSection newsList={liveNews.length > 0 ? liveNews : undefined} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
