import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-[#fef8f4] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-16 h-16 rounded-full bg-[#f8ddd3] text-[#735e56] flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">sailing</span>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#00507d] font-bold block mb-1">
            Galat 404 • Halaman Tidak Ditemukan
          </span>
          <h1 className="font-display font-semibold text-3xl text-[#1d1b19] mb-3">
            Berlayar Terlalu Jauh
          </h1>
          <p className="text-xs sm:text-sm text-[#40474f] leading-relaxed mb-6">
            Halaman yang Anda tuju mungkin telah dipindahkan, berganti tautan, atau sedang dalam perawatan dermaga kami.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/pesan"
              className="px-5 py-2.5 rounded bg-[#ede7e3] hover:bg-[#e7e1dd] text-[#1d1b19] text-xs font-semibold transition-colors"
            >
              Pesan Ikan
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

