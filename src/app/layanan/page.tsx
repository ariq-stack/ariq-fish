import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Katalog Layanan & Solusi Rantai Pasok | ${siteConfig.name}`,
  description:
    "Enam pilar solusi komprehensif perdagangan ikan laut, fasilitas cold storage -25°C, suplai horeka harian, pemrosesan fillet higienis, dan pengurusan ekspor hasil laut.",
};

export default function ServicesIndexPage() {
  const services = siteConfig.services;

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
            <span className="text-[#1d1b19] font-medium">Layanan Kami</span>
          </nav>

          {/* Header */}
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#00507d] mb-1.5 block">
              Ekosistem Terintegrasi Bahari
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl text-[#1d1b19] leading-tight mb-3">
              Layanan Komoditas &amp; Rantai Pasok Ariq Fish
            </h1>
            <div className="w-16 h-1 bg-[#c5a059] rounded-full mb-4" />
            <p className="text-sm text-[#40474f] leading-relaxed">
              Mulai dari penyerapan langsung di dermaga pendaratan nelayan, cold storage berteknologi IoT, hingga pengiriman terjadwal dan sertifikasi karantina ekspor internasional.
            </p>
          </div>

          {/* 6 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group p-7 rounded-xl bg-white border border-[#ede7e3] shadow-warm hover:shadow-warm-lg hover:border-[#00507d]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <Link href={`/layanan/${service.slug}`} className="block">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#f3ede9] text-[#00507d] flex items-center justify-center group-hover:bg-[#00507d] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">
                        {service.icon}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider bg-[#f8f2ee] px-2.5 py-1 rounded border border-[#ede7e3]">
                      {service.code}
                    </span>
                  </div>

                  <h2 className="font-display font-semibold text-xl text-[#1d1b19] mb-2 group-hover:text-[#00507d] transition-colors leading-snug">
                    {service.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#ede7e3]/70 mb-4">
                    {service.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-[#6e5a52]">
                        <span className="material-symbols-outlined text-xs text-[#00507d] mt-0.5 shrink-0">check</span>
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </Link>

                <div className="pt-4 border-t border-[#ede7e3] flex items-center justify-between">
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="text-xs font-semibold text-[#00507d] inline-flex items-center gap-1.5 group-hover:text-[#0284c7] transition-colors"
                  >
                    <span>{service.actionText}</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1.5 transition-transform duration-300">
                      arrow_forward
                    </span>
                  </Link>
                  <span className="text-[11px] text-[#707881] font-mono">Ariq Fish Hub</span>
                </div>
              </div>
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
