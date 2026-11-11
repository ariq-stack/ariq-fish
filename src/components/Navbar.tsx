"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.reload();
  };

  const navLinks = [
    { label: "Beranda", href: "/#beranda" },
    { label: "Tentang Kami", href: "/#tentang-kami" },
    { label: "Layanan", href: "/#layanan" },
    { label: "Pesan Ikan", href: "/pesan" },
    { label: "Warta Pasar", href: "/#warta" },
    { label: "Kontak & Lokasi", href: "/#kontak" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fef8f4]/95 backdrop-blur-md border-b border-[#ede7e3] shadow-[0_1px_8px_rgba(45,30,24,0.05)]">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/#beranda"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00507d] rounded p-1"
        >
          <div className="w-10 h-10 rounded bg-[#00507d] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-2xl">anchor</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-xl text-[#1d1b19] leading-tight tracking-tight">
              {siteConfig.name}
            </span>
            <span className="text-[10px] font-semibold text-[#6e5a52] uppercase tracking-widest hidden sm:block">
              Sejak {siteConfig.foundedYear} • Hasil Laut Terbesar
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-6 lg:gap-7"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#40474f] hover:text-[#00507d] transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-[#00507d] rounded"
            >
              {link.label}
            </Link>
          ))}

          {/* Menu "Pesanan Anda" - Hanya muncul jika pengguna sudah login */}
          {user && (
            <Link
              href="/pesanan-anda"
              className="text-sm font-semibold text-[#00507d] hover:underline flex items-center gap-1 py-1"
            >
              <span className="material-symbols-outlined text-base">receipt_long</span>
              <span>Pesanan Anda</span>
            </Link>
          )}
        </nav>

        {/* Action / Auth Button */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              {user.role_name === "admin" && (
                <Link
                  href="/dashboard"
                  className="text-xs uppercase tracking-wider font-semibold px-3.5 py-2 rounded bg-[#00507d] hover:bg-[#0369a1] text-white transition-all shadow-sm flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">dashboard</span>
                  <span>Dashboard</span>
                </Link>
              )}
              <Link
                href="/pesanan-anda"
                className="text-xs font-semibold px-3 py-2 rounded bg-[#f8f2ee] hover:bg-[#ede7e3] text-[#1d1b19] border border-[#ede7e3]"
              >
                {user.name?.split(" ")[0] || "Akun"}
              </Link>
              <button
                onClick={handleLogout}
                title="Keluar"
                className="p-2 rounded text-[#707881] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded bg-[#00507d] hover:bg-[#0369a1] text-white transition-all shadow-sm flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00507d]"
            >
              <span className="material-symbols-outlined text-base">lock</span>
              <span>Masuk Akun</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-[#1d1b19] hover:bg-[#f3ede9] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
            aria-label="Buka navigasi menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fef8f4] border-b border-[#ede7e3] px-6 py-6 shadow-xl space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#1d1b19] hover:text-[#00507d] py-2 border-b border-[#ede7e3]/60 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-sm text-[#707881]">
                  chevron_right
                </span>
              </Link>
            ))}

            {user && (
              <Link
                href="/pesanan-anda"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#00507d] py-2 border-b border-[#ede7e3]/60 flex items-center justify-between"
              >
                <span>Pesanan Anda</span>
                <span className="material-symbols-outlined text-sm">receipt_long</span>
              </Link>
            )}
          </nav>

          <div className="pt-2">
            {user ? (
              <div className="space-y-2">
                {user.role_name === "admin" && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded bg-[#00507d] text-white font-medium text-xs block shadow-sm"
                  >
                    Masuk ke Dashboard Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2.5 rounded bg-[#fee2e2] text-[#b91c1c] font-medium text-xs block"
                >
                  Keluar Akun ({user.name})
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded bg-[#00507d] text-white font-medium text-xs block shadow-sm"
              >
                Masuk ke Akun
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
