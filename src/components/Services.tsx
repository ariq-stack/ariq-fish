import React from "react";
import { siteConfig } from "@/config/site";

export default function Services() {
  return (
    <section id="layanan" className="w-full py-20 bg-[#fef8f4] border-b border-[#ede7e3]">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#00507d] mb-1">
            Layanan &amp; Solusi Pasokan
          </span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#1d1b19]">
            Layanan Komoditas &amp; Rantai Pasok Ariq Fish
          </h2>
          <div className="w-12 h-1 bg-[#c5a059] mt-3 mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-[#40474f] leading-relaxed">
            Solusi menyeluruh mulai dari penyerapan hasil tangkapan di pelabuhan pendaratan ikan,
            fasilitas pendinginan terakreditasi, hingga distribusi tepat waktu ke lokasi Anda.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {siteConfig.services.map((service) => (
            <div
              key={service.id}
              className="group p-6 sm:p-7 rounded-lg bg-white border border-[#ede7e3] shadow-warm hover:shadow-warm-lg hover:border-[#c5a059] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded bg-[#f3ede9] text-[#00507d] flex items-center justify-center group-hover:bg-[#00507d] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">
                      {service.icon}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider bg-[#f8f2ee] px-2 py-0.5 rounded">
                    {service.code}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-[#1d1b19] mb-2.5 group-hover:text-[#00507d] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#ede7e3]/60 flex items-center justify-between">
                <a
                  href="#kontak"
                  className="text-xs font-semibold text-[#00507d] inline-flex items-center gap-1 group-hover:underline"
                >
                  <span>{service.actionText}</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
                <span className="text-[11px] text-[#707881] font-mono">Ariq Fish Hub</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

