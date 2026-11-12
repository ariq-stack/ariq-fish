"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NewsItem, siteConfig } from "@/config/site";

interface ArticleContentProps {
  article: NewsItem;
  relatedNews: NewsItem[];
}

export default function ArticleContent({
  article,
  relatedNews,
}: ArticleContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Calculate scroll progress for reading indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(
        `*${article.title}*\n\nBaca ulasan lengkap warta maritim di Ariq Fish:\n${window.location.href}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  const paragraphs = article.content || [article.excerpt];
  const firstParagraph = paragraphs[0];
  const restParagraphs = paragraphs.slice(1);

  return (
    <>
      {/* Scroll Reading Progress Bar (Fixed Top) */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#ede7e3] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#00507d] via-[#0284c7] to-[#c5a059] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-[54rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6e5a52] mb-8 animate-fade-in">
          <Link
            href="/"
            className="hover:text-[#00507d] transition-colors flex items-center gap-1 font-medium"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Beranda</span>
          </Link>
          <span>/</span>
          <Link
            href="/#warta"
            className="hover:text-[#00507d] transition-colors font-medium"
          >
            Warta Maritim
          </Link>
          <span>/</span>
          <span className="text-[#1d1b19] font-medium truncate max-w-[200px] sm:max-w-xs">
            {article.category}
          </span>
        </nav>

        {/* Article Header Card */}
        <header className="mb-10 animate-slide-up">
          {/* Category & Read Time */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#00507d] text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
              <span className="material-symbols-outlined text-xs text-[#cbe4ff]">
                label
              </span>
              <span>{article.category}</span>
            </span>
            <div className="h-1 w-1 rounded-full bg-[#c0c7d1]" />
            <span className="text-xs font-medium text-[#6e5a52] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#c5a059]">
                calendar_today
              </span>
              <span>{article.date}</span>
            </span>
            <div className="h-1 w-1 rounded-full bg-[#c0c7d1]" />
            <span className="text-xs font-medium text-[#6e5a52] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#00507d]">
                schedule
              </span>
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[44px] text-[#1d1b19] leading-[1.25] tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Subtitle / Excerpt Lead */}
          <p className="text-base sm:text-lg text-[#40474f] leading-relaxed border-l-4 border-[#c5a059] pl-4 sm:pl-5 py-1 italic bg-[#f8f2ee]/60 rounded-r">
            {article.excerpt}
          </p>

          {/* Author Byline */}
          <div className="mt-6 pt-5 border-t border-[#ede7e3] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00507d] text-white flex items-center justify-center font-display font-bold text-sm shadow-sm">
                AF
              </div>
              <div>
                <span className="block text-sm font-semibold text-[#1d1b19]">
                  {article.author || "Redaksi Maritim Ariq Fish"}
                </span>
                <span className="block text-xs text-[#6e5a52]">
                  {article.authorRole || "Pusat Riset & Rantai Pasok PIK 2 Jakarta"}
                </span>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-semibold transition-all shadow-sm"
                title="Bagikan ke WhatsApp"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span className="hidden sm:inline">WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-[#ede7e3] border border-[#ede7e3] text-[#1d1b19] text-xs font-semibold transition-all shadow-sm"
                title="Salin Tautan"
              >
                <span className="material-symbols-outlined text-base text-[#00507d]">
                  {copied ? "check" : "link"}
                </span>
                <span>{copied ? "Tersalin!" : "Salin Link"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Visual Media with smooth zoom container */}
        <div className="mb-10 relative overflow-hidden rounded-xl bg-white border border-[#ede7e3] shadow-warm-lg group animate-fade-in">
          <div className="relative h-[300px] sm:h-[440px] w-full overflow-hidden bg-[#00507d]/10">
            {article.thumbnail ? (
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="p-3.5 bg-white border-t border-[#ede7e3] flex items-center justify-between text-xs text-[#6e5a52]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#00507d]">
                photo_camera
              </span>
              <span>Dokumentasi Rantai Pasok Ariq Fish Samudra Nusantara</span>
            </span>
            <span className="font-mono text-[11px] text-[#707881]">PIK 2 Hub</span>
          </div>
        </div>

        {/* Highlights / Key Takeaway Callout Box */}
        {article.highlights && article.highlights.length > 0 && (
          <div className="mb-10 p-6 rounded-xl bg-white border-2 border-[#c5a059]/40 shadow-warm relative overflow-hidden animate-slide-up">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-7 h-7 rounded bg-[#c5a059] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-base">verified</span>
              </div>
              <h2 className="font-display font-semibold text-lg text-[#1d1b19]">
                Poin Kunci Kajian &amp; Warta
              </h2>
            </div>
            <ul className="space-y-2.5">
              {article.highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#40474f] leading-relaxed">
                  <span className="material-symbols-outlined text-base text-[#00507d] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Full Editorial Body */}
        <div className="prose max-w-none text-[#2d1e18] space-y-6 sm:space-y-7 text-sm sm:text-base leading-relaxed sm:leading-[1.8] font-normal">
          {/* First Paragraph with Heritage Drop Cap */}
          {firstParagraph && (
            <p className="first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:text-[#00507d] first-letter:mr-3 first-letter:float-left first-letter:leading-none text-[#1d1b19]">
              {firstParagraph}
            </p>
          )}

          {/* Rest of the article paragraphs */}
          {restParagraphs.map((para, idx) => (
            <React.Fragment key={idx}>
              <p className="text-[#32302e]">{para}</p>

              {/* In-content Pull Quote on second paragraph */}
              {idx === 0 && (
                <blockquote className="my-8 p-5 sm:p-6 rounded-lg bg-[#f8f2ee] border-l-4 border-[#00507d] shadow-sm">
                  <p className="font-display italic text-base sm:text-lg text-[#1d1b19] leading-snug mb-2">
                    &ldquo;Konsistensi kualitas tangkapan laut berstandar ekspor bermula dari disiplin rantai dingin sejak detik pertama ikan terangkat ke permukaan air.&rdquo;
                  </p>
                  <cite className="block text-xs font-semibold text-[#6e5a52] uppercase tracking-wider not-italic">
                    — Standar Mutu Ariq Fish Cold Chain System
                  </cite>
                </blockquote>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Article Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[#ede7e3] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider mr-1">
              Topik Terkait:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white border border-[#ede7e3] text-xs font-medium text-[#00507d] shadow-sm hover:border-[#00507d] transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Commercial CTA: Pesan Komoditas Terkait */}
        <div className="mt-12 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#00507d] to-[#023755] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/20 text-[#ffdda1] text-[11px] font-semibold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-xs">storefront</span>
              <span>Layanan Pengadaan &amp; Distribusi</span>
            </span>
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-white mb-2">
              Butuh Pasokan Komoditas Ikan Berkualitas?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed">
              Dapatkan kuota pasokan rutin Tuna, Cakalang, Tongkol, dan varietas hasil laut segar dengan sistem pesanan bergaransi dan pembayaran QRIS resmi.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/pesan"
              className="w-full sm:w-auto px-6 py-3 rounded bg-[#c5a059] hover:bg-[#d8b268] text-[#1d1b19] font-semibold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Pesan Sekarang</span>
              <span className="material-symbols-outlined text-sm">shopping_cart</span>
            </Link>
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                `Halo Admin Ariq Fish, saya membaca warta tentang "${article.title}" dan tertarik berkonsultasi mengenai pasokan komoditas ini.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>Konsultasi WA</span>
            </a>
          </div>
        </div>

        {/* Back and Related Navigation */}
        <div className="mt-14 pt-8 border-t border-[#ede7e3]">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/#warta"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#00507d] hover:text-[#0284c7] transition-all group"
            >
              <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span>Kembali ke Warta Utama</span>
            </Link>

            <Link
              href="/berita"
              className="text-xs font-semibold text-[#6e5a52] hover:text-[#00507d] transition-colors"
            >
              Lihat Seluruh Arsip Berita &rarr;
            </Link>
          </div>

          {/* Related News Cards Grid */}
          <h3 className="font-display font-semibold text-xl text-[#1d1b19] mb-4">
            Warta Maritim Lainnya
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedNews.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="group p-4 rounded-lg bg-white border border-[#ede7e3] shadow-sm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 rounded overflow-hidden bg-[#00507d]/10 mb-3">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-sm sm:text-base text-[#1d1b19] group-hover:text-[#00507d] transition-colors leading-snug mb-1.5 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#40474f] line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#ede7e3] flex items-center justify-between text-[11px] text-[#6e5a52]">
                  <span>{item.date}</span>
                  <span className="font-semibold text-[#00507d] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Baca</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}

