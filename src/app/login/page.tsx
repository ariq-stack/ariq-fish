"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fillAdminCredentials = () => {
    setEmail("admin@gmail.com");
    setPassword("123456");
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#fef8f4] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded bg-[#00507d] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-2xl">anchor</span>
          </div>
          <div className="text-left">
            <span className="font-display font-semibold text-2xl text-[#1d1b19] block leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[11px] font-semibold text-[#6e5a52] uppercase tracking-widest">
              Portal Akun &amp; Manajemen
            </span>
          </div>
        </Link>
        <h2 className="text-center font-display font-semibold text-2xl text-[#1d1b19]">
          Masuk ke Akun Anda
        </h2>
        <p className="mt-1 text-center text-xs text-[#40474f]">
          Kelola warta, pengadaan ikan, dan administrasi rantai pasok
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-warm rounded-lg border border-[#ede7e3] sm:px-10">
          {error && (
            <div className="mb-5 p-3.5 rounded bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Pill */}
          <div className="mb-5 p-3 rounded bg-[#f8f2ee] border border-[#ede7e3] flex items-center justify-between">
            <div className="text-[11px] text-[#40474f]">
              <span className="font-semibold block text-[#00507d]">Akun Admin Pengujian:</span>
              <span>admin@gmail.com / 123456</span>
            </div>
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#00507d] text-white hover:bg-[#0369a1] transition-colors shadow-sm"
            >
              Isi Otomatis
            </button>
          </div>

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setError(null);
              try {
                const res = await fetch("/api/auth/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                });

                const data = await res.json();
                if (!res.ok) {
                  throw new Error(data.error || "Gagal masuk");
                }

                // Berhasil login
                router.push(data.user.role_name === "admin" ? redirect : "/");
                router.refresh();
              } catch (err: any) {
                setError(err.message || "Email atau password tidak cocok");
              } finally {
                setLoading(false);
              }
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#1d1b19] mb-1"
              >
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@gmail.com"
                className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#1d1b19] mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded bg-[#00507d] hover:bg-[#0369a1] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <span className="material-symbols-outlined text-base">
                {loading ? "sync" : "login"}
              </span>
              <span>{loading ? "Memverifikasi..." : "Masuk Sekarang"}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#ede7e3] text-center text-xs text-[#40474f] space-y-2">
            <p>
              Belum memiliki akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#00507d] hover:underline"
              >
                Daftar akun baru
              </Link>
            </p>
            <p>
              <Link href="/" className="text-[#6e5a52] hover:text-[#00507d]">
                ← Kembali ke Beranda
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fef8f4] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00507d]"></div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
