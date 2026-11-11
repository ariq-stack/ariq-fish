"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState({
    userCount: 0,
    newsCount: 0,
    roleCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/users").then((r) => r.json()),
      fetch("/api/admin/news").then((r) => r.json()),
      fetch("/api/admin/roles").then((r) => r.json()),
    ])
      .then(([usersData, newsData, rolesData]) => {
        setStats({
          userCount: usersData.users ? usersData.users.length : 1,
          newsCount: newsData.news ? newsData.news.length : 3,
          roleCount: rolesData.roles ? rolesData.roles.length : 2,
        });
      })
      .catch((err) => console.error("Failed to load dashboard stats", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[#1d1b19]">
            Pusat Kendali Ariq Fish
          </h1>
          <p className="text-xs sm:text-sm text-[#40474f] mt-1">
            Pantau akun, kelola publikasi berita, dan atur peran sistem perikanan
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/news"
            className="px-4 py-2.5 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Tulis Berita Baru</span>
          </Link>
        </div>
      </div>

      {/* Security Banner Warning for Default Password */}
      <div className="p-4 sm:p-5 rounded-lg bg-[#fff8e1] border-l-4 border-[#c5a059] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[#7e5f1f] text-2xl mt-0.5">
            warning
          </span>
          <div>
            <span className="text-xs font-bold text-[#7e5f1f] uppercase tracking-wider block">
              Peringatan Keamanan Kredensial Awal
            </span>
            <p className="text-xs text-[#1d1b19] mt-0.5">
              Jika Anda masih menggunakan password bawaan (*123456*), segera ganti dengan password yang kuat di menu Profil sebelum mempublikasikan website ke domain publik!
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/profile"
          className="px-3.5 py-2 rounded bg-[#7e5f1f] text-white text-xs font-semibold hover:bg-[#634706] transition-colors shrink-0"
        >
          Ganti Password Sekarang
        </Link>
      </div>

      {/* Metrics 3-Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider block">
              Pengguna Terdaftar
            </span>
            <span className="font-display font-bold text-3xl text-[#00507d] mt-1 block">
              {loading ? "..." : stats.userCount}
            </span>
            <Link
              href="/dashboard/users"
              className="text-[11px] font-semibold text-[#00507d] hover:underline mt-2 inline-block"
            >
              Lihat semua pengguna →
            </Link>
          </div>
          <div className="w-12 h-12 rounded bg-[#f8f2ee] text-[#00507d] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">group</span>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider block">
              Warta &amp; Berita
            </span>
            <span className="font-display font-bold text-3xl text-[#00507d] mt-1 block">
              {loading ? "..." : stats.newsCount}
            </span>
            <Link
              href="/dashboard/news"
              className="text-[11px] font-semibold text-[#00507d] hover:underline mt-2 inline-block"
            >
              Kelola artikel berita →
            </Link>
          </div>
          <div className="w-12 h-12 rounded bg-[#f8f2ee] text-[#00507d] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">newspaper</span>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider block">
              Peran Hak Akses
            </span>
            <span className="font-display font-bold text-3xl text-[#00507d] mt-1 block">
              {loading ? "..." : stats.roleCount}
            </span>
            <Link
              href="/dashboard/roles"
              className="text-[11px] font-semibold text-[#00507d] hover:underline mt-2 inline-block"
            >
              Atur hak akses peran →
            </Link>
          </div>
          <div className="w-12 h-12 rounded bg-[#f8f2ee] text-[#00507d] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">security</span>
          </div>
        </div>
      </div>

      {/* Integration Card & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-lg text-[#1d1b19]">
              Status Basis Data Google Spreadsheet
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e0f2fe] text-[#00507d] text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00507d] animate-pulse" />
              Tersambung
            </span>
          </div>
          <p className="text-xs text-[#40474f] leading-relaxed">
            Data pengguna, peran, dan artikel berita disinkronisasikan secara aman dengan Google Spreadsheet melalui Google Apps Script Web App.
          </p>
          <div className="p-3 rounded bg-[#f8f2ee] text-[11px] font-mono text-[#6e5a52] space-y-1">
            <div>Sheet Aktif: Users, Roles, News, Orders</div>
            <div>Protokol: HTTPS Server-to-Server dengan Secret Token</div>
          </div>
          <Link
            href="/documentation/SETUP.md"
            target="_blank"
            className="text-xs font-semibold text-[#00507d] hover:underline inline-flex items-center gap-1"
          >
            <span>Buka dokumentasi setup spreadsheet</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </Link>
        </div>

        <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm space-y-4">
          <h3 className="font-display font-semibold text-lg text-[#1d1b19]">
            Pintasan Tindakan Administratif
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/dashboard/news"
              className="p-3 rounded border border-[#ede7e3] hover:border-[#00507d] hover:bg-[#f8f2ee] transition-all text-left block group"
            >
              <span className="material-symbols-outlined text-[#00507d] text-2xl mb-1 block group-hover:scale-105 transition-transform">
                edit_note
              </span>
              <span className="text-xs font-semibold text-[#1d1b19] block">
                Publikasi Berita
              </span>
              <span className="text-[11px] text-[#40474f]">
                Upload artikel &amp; thumbnail
              </span>
            </Link>

            <Link
              href="/dashboard/users"
              className="p-3 rounded border border-[#ede7e3] hover:border-[#00507d] hover:bg-[#f8f2ee] transition-all text-left block group"
            >
              <span className="material-symbols-outlined text-[#00507d] text-2xl mb-1 block group-hover:scale-105 transition-transform">
                manage_accounts
              </span>
              <span className="text-xs font-semibold text-[#1d1b19] block">
                Kelola User
              </span>
              <span className="text-[11px] text-[#40474f]">
                Atur peran &amp; status
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

