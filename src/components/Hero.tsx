import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative w-full pt-32 pb-20 overflow-hidden bg-[#fef8f4] border-b border-[#ede7e3]"
    >
      {/* Ambient subtle maritime compass geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <svg
          className="w-full h-full"
          fill="none"
          viewBox="0 0 1440 900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="text-[#00507d]"
            cx="720"
            cy="450"
            r="380"
            stroke="currentColor"
            strokeDasharray="8 6"
            strokeWidth="1.5"
          />
          <circle
            className="text-[#c5a059]"
            cx="720"
            cy="450"
            r="240"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            className="text-[#6e5a52]"
            stroke="currentColor"
            strokeWidth="0.75"
            x1="100"
            x2="1340"
            y1="450"
            y2="450"
          />
          <line
            className="text-[#6e5a52]"
            stroke="currentColor"
            strokeWidth="0.75"
            x1="720"
            x2="720"
            y1="50"
            y2="850"
          />
        </svg>
      </div>

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Eyebrow Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#00507d] text-white text-xs font-semibold tracking-wider uppercase shadow-sm">
            <span className="material-symbols-outlined text-sm text-[#94ccff]">
              set_meal
            </span>
            <span>JUAL BELI IKAN TERBESAR SE-ASIA • SEJAK 1950</span>
          </span>
          <div className="h-[1px] w-12 bg-[#c0c7d1] hidden sm:block" />
          <span className="text-xs font-medium text-[#6e5a52] hidden sm:inline-block">
            {siteConfig.license.kkpPermit}
          </span>
        </div>

        {/* Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Text Column (7 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <h1 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] text-[#1d1b19] leading-[1.2] tracking-tight">
              Mitra Utama Pengadaan &amp; Perdagangan Ikan Laut Berkualitas Se-Asia
            </h1>
            <p className="font-body text-base sm:text-lg text-[#40474f] leading-relaxed max-w-xl">
              Didirikan oleh keluarga Ariq pada tahun 1950, menghubungkan tangkapan segar
              ribuan nelayan Nusantara ke pasar industri pengolahan, restoran premium,
              serta kargo ekspor dengan teknologi rantai pasok dingin (cold chain) standar internasional.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#kontak"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-[#00507d] text-white font-semibold text-sm hover:bg-[#0369a1] transition-all shadow-md group"
              >
                <span>Penawaran Jual / Pasok Ikan</span>
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
              <a
                href="#layanan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-[#ede7e3] text-[#1d1b19] font-semibold text-sm hover:bg-[#e7e1dd] transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base text-[#6e5a52]">
                  inventory_2
                </span>
                <span>Katalog Layanan &amp; Komoditas</span>
              </a>
            </div>

            {/* Metrics Strip */}
            <div className="pt-4 grid grid-cols-3 gap-3">
              {siteConfig.metrics.slice(0, 3).map((metric) => (
                <div
                  key={metric.label}
                  className="p-3.5 rounded bg-[#f8f2ee] border border-[#ede7e3] shadow-sm"
                >
                  <span className="block font-display font-bold text-xl sm:text-2xl text-[#00507d]">
                    {metric.value}
                  </span>
                  <span className="block text-[11px] font-semibold text-[#6e5a52] uppercase tracking-wider mt-0.5">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Commodity Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider mr-1">
                Komoditas Utama:
              </span>
              {siteConfig.mainCommodities.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f3ede9] text-[#00507d] text-xs font-medium border border-[#ede7e3]"
                >
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Hero Media Column (6 cols on lg) */}
          <div className="lg:col-span-6 relative">
            {/* Double Layered Frame mimicking archival ledger */}
            <div className="relative p-2.5 rounded-lg bg-white border border-[#ede7e3] shadow-warm-lg">
              <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden rounded bg-[#dfd9d5]">
                <Image
                  src="/images/hero-fish-platter.png"
                  alt="Komoditas Ikan Laut Segar Ariq Fish di Atas Es Kristal"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1b19]/80 via-transparent to-transparent" />

                {/* Overlay Floating Credential Plaque */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-white/95 backdrop-blur-md border border-[#ede7e3] shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded bg-[#7e5f1f] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl text-[#ffdda1]">
                        ac_unit
                      </span>
                    </div>
                    <div>
                      <h2 className="font-display font-semibold text-sm sm:text-base text-[#1d1b19]">
                        Ariq Fish Cold Chain Hub
                      </h2>
                      <p className="text-xs text-[#6e5a52]">
                        Standar HACCP &amp; Sertifikat Kelayakan Pengolahan (SKP)
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-bold text-[#00507d] uppercase tracking-wider">
                      Grade Ekspor
                    </span>
                    <span className="text-[11px] text-[#40474f]">
                      PIK 2 Hub Jakarta
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Badge */}
            <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-[#00507d] text-white flex items-center justify-center shadow-primary hidden md:flex border-2 border-white">
              <span className="material-symbols-outlined text-2xl">
                verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

