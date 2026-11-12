import React from "react";
import Link from "next/link";
import { siteConfig, NewsItem } from "@/config/site";

interface NewsSectionProps {
  newsList?: NewsItem[];
}

export default function NewsSection({
  newsList = siteConfig.initialNews,
}: NewsSectionProps) {
  return (
    <section id="warta" className="w-full py-20 bg-[#f8f2ee] border-b border-[#ede7e3]">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#00507d] mb-1 block">
              Info Pasar &amp; Industri Bahari
            </span>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#1d1b19]">
              Warta Tangkapan &amp; Pasar Ikan Terkini
            </h2>
            <div className="w-12 h-1 bg-[#c5a059] mt-3 rounded-full" />
          </div>
          <p className="text-xs sm:text-sm text-[#40474f] max-w-md">
            Informasi berkala mengenai dinamika hasil lelang dermaga, tren permintaan komoditas ekspor,
            serta inovasi teknologi pendinginan hasil perikanan laut.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {newsList.map((article, idx) => (
            <article
              key={article.id}
              className="rounded-lg bg-white border border-[#ede7e3] overflow-hidden shadow-warm hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <Link href={`/berita/${article.slug}`} className="block">
                {/* Visual Header / Banner with zoom animation */}
                <div className="relative h-48 bg-[#00507d] overflow-hidden">
                  {article.thumbnail ? (
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1b19]/80 via-transparent to-black/30" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-0.5 rounded bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider border border-white/10 shadow-sm">
                      {article.category || "Warta"}
                    </span>
                    <span className="text-xs text-white/90 font-mono bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      {article.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-[#6e5a52] font-medium mb-2">
                    <span className="material-symbols-outlined text-xs text-[#c5a059]">schedule</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-[#1d1b19] mb-2.5 group-hover:text-[#00507d] transition-colors duration-200 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </Link>

              {/* Action */}
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

        {/* Centralized Action Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/berita"
            className="px-6 py-3 rounded bg-white border border-[#ede7e3] text-[#1d1b19] hover:bg-[#ede7e3] hover:border-[#00507d]/30 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm inline-flex items-center gap-2 group"
          >
            <span>Arsip Warta Maritim Lengkap</span>
            <span className="material-symbols-outlined text-base text-[#00507d] group-hover:translate-x-1 transition-transform">
              menu_book
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
