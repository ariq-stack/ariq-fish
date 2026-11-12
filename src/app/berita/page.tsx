import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Warta & Analisis Pasar Maritim | ${siteConfig.name}`,
  description:
    "Kumpulan analisis hasil lelang tangkapan dermaga, teknologi cold chain, serta dinamika pasokan industri perikanan laut PT Ariq Fish Samudra Nusantara.",
};

export default function NewsArchivePage() {
  const articles = siteConfig.initialNews;

  return (
    <div className="min-h-screen bg-[#fef8f4] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#6e5a52] mb-6">
            <Link
              href="/"
              className="hover:text-[#00507d] transition-colors flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              <span>Beranda</span>
            </Link>
            <span>/</span>
            <span className="text-[#1d1b19] font-medium">Warta Maritim</span>
          </nav>

          {/* Header */}
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#00507d] mb-1.5 block">
              Publikasi &amp; Riset Rantai Pasok
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl text-[#1d1b19] leading-tight mb-3">
              Warta Tangkapan &amp; Dinamika Pasar Bahari
            </h1>
            <div className="w-16 h-1 bg-[#c5a059] rounded-full mb-4" />
            <p className="text-sm text-[#40474f] leading-relaxed">
              Kajian berkala seputar dinamika lelang dermaga pendaratan ikan, inovasi teknologi pembekuan, regulasi ekspor mutu pangan KKP, dan laporan operasional rantai pasok PT Ariq Fish Samudra Nusantara.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="rounded-lg bg-white border border-[#ede7e3] overflow-hidden shadow-warm hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <Link href={`/berita/${article.slug}`} className="block">
                  <div className="relative h-52 bg-[#00507d] overflow-hidden">
                    {article.thumbnail ? (
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1d1b19]/80 via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-0.5 rounded bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider border border-white/10">
                        {article.category}
                      </span>
                      <span className="text-xs text-white/90 font-mono bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        {article.date}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-[#6e5a52] font-medium mb-2">
                      <span className="material-symbols-outlined text-xs text-[#c5a059]">schedule</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h2 className="font-display font-semibold text-lg text-[#1d1b19] mb-2.5 group-hover:text-[#00507d] transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/berita/${article.slug}`}
                    className="text-xs font-semibold text-[#00507d] inline-flex items-center gap-1.5 group-hover:text-[#0284c7] transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1.5 transition-transform duration-300">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Back Home Link */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white border border-[#ede7e3] hover:bg-[#ede7e3] text-xs font-semibold text-[#1d1b19] uppercase tracking-wider transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-base text-[#00507d]">
                arrow_back
              </span>
              <span>Kembali ke Beranda Utama</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

