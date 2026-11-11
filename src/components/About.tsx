import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function About() {
  return (
    <section id="tentang-kami" className="w-full py-20 bg-[#f8f2ee] border-b border-[#ede7e3]">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#00507d] mb-1">
            Tentang Ariq Fish
          </span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#1d1b19]">
            Dedikasi Tiga Generasi Sejak 1950 Menghadirkan Ikan Laut Terbaik
          </h2>
          <div className="w-12 h-1 bg-[#c5a059] mt-3 mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-[#40474f] leading-relaxed">
            Menyerap hasil tangkapan nelayan pesisir Nusantara dengan harga yang adil,
            menjaga mutu kesegaran melalui fasilitas modern, dan menyuplai kebutuhan
            pasar nasional hingga mancanegara.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#ede7e3] shadow-warm">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#7e5f1f] bg-[#f8ddd3] px-2.5 py-1 rounded mb-3">
                Warisan Keluarga Ariq (Established 1950)
              </span>
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#1d1b19] mb-4">
                Komitmen Nyata Membeli &amp; Mendistribusikan Ikan Laut Bermutu Tinggi
              </h3>
              <p className="text-sm sm:text-base text-[#40474f] leading-relaxed mb-4">
                Didirikan pertama kali oleh keluarga Ariq pada tahun 1950 dari dermaga pesisir tradisional,
                kini Ariq Fish telah bertransformasi menjadi salah satu jaringan perdagangan dan rantai pasok hasil laut
                terbesar se-Asia. Kami bermitra langsung dengan ribuan kapal nelayan di lebih dari 12 sentra pelabuhan tangkapan
                strategis Nusantara.
              </p>
              <p className="text-sm sm:text-base text-[#40474f] leading-relaxed mb-6">
                Setiap ton ikan yang masuk melalui timbangan kami melalui inspeksi visual, uji organoleptik,
                dan langsung masuk ke unit pendingin instan (*air blast freezing*) demi mengunci rasa segar alami laut.
              </p>

              {/* Quote Block */}
              <blockquote className="p-4 sm:p-5 rounded bg-[#f3ede9] border-l-4 border-[#00507d] text-[#1d1b19]">
                <p className="text-sm sm:text-base italic text-[#6e5a52] leading-relaxed">
                  “{siteConfig.quote.text}”
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00507d]" />
                  <span className="text-xs font-bold text-[#1d1b19]">
                    {siteConfig.quote.author}
                  </span>
                </div>
              </blockquote>
            </div>
          </div>

          {/* Visual Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden bg-white border border-[#ede7e3] shadow-warm">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#dfd9d5]">
                <Image
                  src="/images/about-fishermen.png"
                  alt="Nelayan Tradisional Nusantara Menarik Jaring Tangkapan Ikan Segar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold text-[#00507d] tracking-wider">
                    Jaminan Mutu &amp; Kemitraan
                  </span>
                  <span className="material-symbols-outlined text-[#c5a059]">
                    verified
                  </span>
                </div>
                <p className="text-xs text-[#40474f] leading-relaxed">
                  Pengadaan langsung di dermaga pendaratan ikan dengan seleksi kualitas ketat,
                  pengujian laboratorium berkala, serta sertifikasi resmi dari Kementerian Kelautan dan Perikanan (KKP).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm hover:shadow-warm-lg transition-shadow">
            <div className="w-12 h-12 rounded bg-[#00507d] text-white flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">handshake</span>
            </div>
            <h4 className="font-display font-semibold text-lg text-[#1d1b19] mb-2">
              Kemitraan Adil Nelayan
            </h4>
            <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
              Sistem pembelian tunai dan harga lelang kompetitif yang menjunjung keterbukaan,
              menyejahterakan komunitas nelayan di pesisir Nusantara.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm hover:shadow-warm-lg transition-shadow">
            <div className="w-12 h-12 rounded bg-[#7e5f1f] text-white flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl text-[#ffdda1]">
                ac_unit
              </span>
            </div>
            <h4 className="font-display font-semibold text-lg text-[#1d1b19] mb-2">
              Cold Storage Higienis
            </h4>
            <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
              Kapasitas gudang beku bersuhu hingga -25°C dengan sensor pemantau suhu 24 jam nonstop
              untuk menjamin kesegaran Grade A tanpa bahan pengawet kimia.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm hover:shadow-warm-lg transition-shadow">
            <div className="w-12 h-12 rounded bg-[#f5dad0] text-[#735e56] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl text-[#00507d]">
                local_shipping
              </span>
            </div>
            <h4 className="font-display font-semibold text-lg text-[#1d1b19] mb-2">
              Distribusi &amp; Pasokan Cepat
            </h4>
            <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
              Armada truk reefer berpendingin terpadu yang siap mengirimkan pasokan harian
              ke pabrik pengolahan, hotel, restoran seafood, dan kargo ekspor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

