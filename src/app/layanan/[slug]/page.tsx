import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig, ServiceItem } from "@/config/site";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = siteConfig.services.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: `Layanan Tidak Ditemukan | ${siteConfig.name}`,
    };
  }

  return {
    title: `${service.title} | ${siteConfig.name}`,
    description: service.description,
    openGraph: {
      title: `${service.title} - Layanan Ariq Fish`,
      description: service.description,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = siteConfig.services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const otherServices = siteConfig.services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fef8f4] flex flex-col selection:bg-[#cbe4ff] selection:text-[#00507d]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-[56rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
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
              href="/#layanan"
              className="hover:text-[#00507d] transition-colors font-medium"
            >
              Layanan &amp; Solusi
            </Link>
            <span>/</span>
            <span className="text-[#1d1b19] font-medium truncate max-w-[200px] sm:max-w-xs">
              {service.title}
            </span>
          </nav>

          {/* Service Header Section */}
          <header className="mb-10 animate-slide-up">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#00507d] text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
                <span className="material-symbols-outlined text-sm text-[#94ccff]">
                  {service.icon}
                </span>
                <span>{service.code}</span>
              </span>
              <div className="h-1 w-1 rounded-full bg-[#c0c7d1]" />
              <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider bg-[#f8f2ee] px-2.5 py-1 rounded border border-[#ede7e3]">
                Standar KKP &amp; HACCP
              </span>
              <div className="h-1 w-1 rounded-full bg-[#c0c7d1]" />
              <span className="text-xs text-[#6e5a52] font-mono">Ariq Fish Hub PIK 2</span>
            </div>

            <h1 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] text-[#1d1b19] leading-[1.2] tracking-tight mb-4">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-[#00507d] font-medium mb-4">
              {service.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#40474f] leading-relaxed border-l-4 border-[#c5a059] pl-4 sm:pl-5 py-1 bg-[#f8f2ee]/80 rounded-r">
              {service.description}
            </p>
          </header>

          {/* Featured Visual Media */}
          <div className="mb-10 relative overflow-hidden rounded-xl bg-white border border-[#ede7e3] shadow-warm-lg group animate-fade-in">
            <div className="relative h-[280px] sm:h-[420px] w-full overflow-hidden bg-[#00507d]/10">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ffdda1] block mb-1">
                  Operasional Rantai Pasok Terpadu
                </span>
                <p className="font-display text-base sm:text-lg text-white font-medium drop-shadow">
                  PT Ariq Fish Samudra Nusantara • Sejak 1950
                </p>
              </div>
            </div>
          </div>

          {/* Highlights / Keunggulan Layanan */}
          <div className="mb-10 p-6 sm:p-7 rounded-xl bg-white border-2 border-[#c5a059]/40 shadow-warm relative overflow-hidden animate-slide-up">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#c5a059]/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded bg-[#c5a059] text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-lg">verified</span>
              </div>
              <h2 className="font-display font-semibold text-lg sm:text-xl text-[#1d1b19]">
                Keunggulan &amp; Standar Layanan
              </h2>
            </div>
            <ul className="space-y-3">
              {service.highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#40474f] leading-relaxed">
                  <span className="material-symbols-outlined text-base text-[#00507d] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alur Kerja & Tahapan SOP */}
          <div className="mb-12">
            <div className="text-center sm:text-left mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#00507d] block mb-1">
                Transparansi &amp; Integritas Operasional
              </span>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-[#1d1b19]">
                Tahapan Alur Pelaksanaan Layanan
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-white border border-[#ede7e3] shadow-sm hover:border-[#00507d]/40 transition-colors"
                >
                  <h3 className="font-display font-semibold text-sm sm:text-base text-[#00507d] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Spesifikasi Layanan & Ketentuan Pasokan */}
          <div className="mb-12 p-6 sm:p-7 rounded-xl bg-white border border-[#ede7e3] shadow-warm">
            <h2 className="font-display font-semibold text-xl text-[#1d1b19] mb-4 pb-3 border-b border-[#ede7e3] flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-[#00507d]">assignment</span>
              <span>Spesifikasi Layanan &amp; Ketentuan Teknis</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.specs.map((spec, i) => (
                <div key={i} className="p-3.5 rounded bg-[#f8f2ee] border border-[#ede7e3]">
                  <span className="block text-[11px] font-semibold text-[#6e5a52] uppercase tracking-wider mb-1">
                    {spec.label}
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#1d1b19]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Penjelasan Mendalam */}
          <div className="mb-12 prose max-w-none text-[#2d1e18] space-y-6 text-sm sm:text-base leading-relaxed sm:leading-[1.8]">
            <h2 className="font-display font-semibold text-2xl text-[#1d1b19] mb-4">
              Ulasan Mendalam Layanan
            </h2>
            {service.content.map((p, index) => (
              <p key={index} className="text-[#32302e]">
                {p}
              </p>
            ))}
          </div>

          {/* Commercial CTA Card: Pesan / Hubungi WA */}
          <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#00507d] to-[#023755] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/20 text-[#ffdda1] text-[11px] font-semibold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-xs">handshake</span>
                <span>Pusat Kemitraan &amp; Transaksi</span>
              </span>
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-white mb-2">
                Bermitra dengan Ariq Fish untuk Layanan Ini?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed">
                Diskusikan kontrak pasokan rutin, jadwal pengiriman khusus, atau ajukan pesanan komoditas ikan laut segar Anda hari ini.
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
                  `Halo Tim Ariq Fish, saya tertarik berkonsultasi mengenai "${service.title} (${service.code})". Mohon informasi detail kerja sama.`
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

          {/* Other Services Navigation */}
          <div className="mt-14 pt-8 border-t border-[#ede7e3]">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/#layanan"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#00507d] hover:text-[#0284c7] transition-all group"
              >
                <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
                <span>Kembali ke Menu Layanan</span>
              </Link>

              <Link
                href="/layanan"
                className="text-xs font-semibold text-[#6e5a52] hover:text-[#00507d] transition-colors"
              >
                Lihat Seluruh Layanan Ariq Fish &rarr;
              </Link>
            </div>

            <h3 className="font-display font-semibold text-xl text-[#1d1b19] mb-4">
              Layanan Terkait Lainnya
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {otherServices.map((item) => (
                <Link
                  key={item.id}
                  href={`/layanan/${item.slug}`}
                  className="group p-5 rounded-lg bg-white border border-[#ede7e3] shadow-sm hover:shadow-warm hover:border-[#00507d]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded bg-[#f3ede9] text-[#00507d] flex items-center justify-center group-hover:bg-[#00507d] group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">
                          {item.icon}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-[#6e5a52] uppercase tracking-wider bg-[#f8f2ee] px-2 py-0.5 rounded">
                        {item.code}
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-sm text-[#1d1b19] group-hover:text-[#00507d] transition-colors leading-snug mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#40474f] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#ede7e3] flex items-center justify-between text-[11px] font-semibold text-[#00507d]">
                    <span>{item.actionText}</span>
                    <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
