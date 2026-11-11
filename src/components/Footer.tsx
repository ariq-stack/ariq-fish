import React from "react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="w-full bg-[#ede7e3] border-t border-[#dfd9d5] text-[#1d1b19] pt-16 pb-12">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#dfd9d5]">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#00507d] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-2xl">
                  set_meal
                </span>
              </div>
              <div>
                <span className="font-display font-semibold text-xl text-[#1d1b19] block leading-tight">
                  {siteConfig.name}
                </span>
                <span className="text-[11px] font-semibold text-[#6e5a52] uppercase tracking-widest">
                  Perusahaan Jual Beli Ikan Terbesar Se-Asia
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed max-w-sm">
              Dibangun oleh keluarga Ariq pada tahun 1950. Berkomitmen menghadirkan rantai pasok ikan laut
              berkelanjutan, segar, dan berstandar internasional dari perairan Nusantara ke seluruh Asia.
            </p>

            {/* Social / Contact Badges */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat WhatsApp Ariq Fish"
                className="w-9 h-9 rounded bg-white text-[#00507d] hover:bg-[#00507d] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                aria-label="Kirim Email ke Ariq Fish"
                className="w-9 h-9 rounded bg-white text-[#00507d] hover:bg-[#00507d] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
              <a
                href="#kontak"
                aria-label="Lihat Peta dan Kontak"
                className="w-9 h-9 rounded bg-white text-[#00507d] hover:bg-[#00507d] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">pin_drop</span>
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-[#1d1b19] uppercase tracking-wider mb-3">
              Komoditas &amp; Layanan
            </h4>
            <ul className="space-y-2 text-xs text-[#40474f]">
              {siteConfig.mainCommodities.map((item) => (
                <li key={item}>
                  <a href="#layanan" className="hover:text-[#00507d] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="#layanan" className="hover:text-[#00507d] transition-colors">
                  Sewa Cold Storage &amp; Blast Freezing
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-[#00507d] transition-colors">
                  Kargo Ekspor &amp; Karantina CITES
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#1d1b19] uppercase tracking-wider mb-3">
              Legalitas &amp; Sertifikasi
            </h4>
            <div className="p-3.5 rounded bg-white border border-[#dfd9d5] shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-[#00507d] uppercase tracking-wider block">
                {siteConfig.license.skpCertificate}
              </span>
              <p className="text-xs text-[#40474f]">
                Rantai pasok dingin terverifikasi Balai Karantina Ikan dan Standar Mutu KKP RI.
              </p>
            </div>
            <div className="text-[11px] text-[#6e5a52] font-mono space-y-0.5">
              <p>NIB: {siteConfig.license.nib}</p>
              <p>{siteConfig.license.kkpPermit}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#40474f] gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a href="#beranda" className="hover:text-[#00507d] transition-colors">
              Kembali ke Atas
            </a>
            <span className="text-[#c0c7d1]">•</span>
            <span className="text-[#6e5a52]">Heritage Editorial Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

