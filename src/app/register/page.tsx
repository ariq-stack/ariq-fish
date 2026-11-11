"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Pendaftaran gagal");
      }

      // Berhasil register (role otomatis 'user')
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Gagal membuat akun");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fef8f4] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded bg-[#00507d] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-2xl">anchor</span>
          </div>
          <div className="text-left">
            <span className="font-display font-semibold text-2xl text-[#1d1b19] block leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[11px] font-semibold text-[#6e5a52] uppercase tracking-widest">
              Registrasi Akun Kemitraan
            </span>
          </div>
        </Link>
        <h2 className="text-center font-display font-semibold text-2xl text-[#1d1b19]">
          Daftar Akun Baru
        </h2>
        <p className="mt-1 text-center text-xs text-[#40474f]">
          Bergabung bersama jaringan rantai pasok ikan laut Nusantara
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

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-[#1d1b19] mb-1"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ariq Fathi"
                className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
              />
            </div>

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
                Password (minimal 6 karakter)
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-[#1d1b19] mb-1"
              >
                Ulangi Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? "sync" : "person_add"}
              </span>
              <span>{loading ? "Mendaftarkan..." : "Daftar Akun Baru"}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#ede7e3] text-center text-xs text-[#40474f] space-y-2">
            <p>
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#00507d] hover:underline"
              >
                Masuk di sini
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

