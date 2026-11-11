"use client";

import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) setCurrentUser(d.user);
      });
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Konfirmasi password baru tidak cocok" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password baru minimal 6 karakter" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage({
        type: "success",
        text: "Password berhasil diganti! Akun Anda kini lebih aman.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal mengubah password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[#1d1b19]">
          Profil Akun &amp; Keamanan
        </h1>
        <p className="text-xs sm:text-sm text-[#40474f] mt-1">
          Kelola informasi administrator dan perbarui kata sandi secara berkala
        </p>
      </div>

      {/* Security Callout */}
      <div className="p-5 rounded-lg bg-[#fff8e1] border-l-4 border-[#c5a059] shadow-sm flex items-start gap-3">
        <span className="material-symbols-outlined text-[#7e5f1f] text-2xl mt-0.5">
          verified_user
        </span>
        <div>
          <span className="text-xs font-bold text-[#7e5f1f] uppercase tracking-wider block">
            Pemberitahuan Wajib Keamanan Sistem
          </span>
          <p className="text-xs text-[#1d1b19] mt-0.5 leading-relaxed">
            Akun admin awal dibuat dengan kombinasi publik <code>admin@gmail.com</code> dan <code>123456</code>. Pastikan Anda mengganti password tersebut melalui form di bawah ini sebelum proyek disebarluaskan.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded text-xs flex items-center justify-between ${
            message.type === "success"
              ? "bg-[#e0f2fe] border border-[#94ccff] text-[#00507d]"
              : "bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a]"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Current Info Card */}
      <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm space-y-4">
        <h3 className="font-display font-semibold text-lg text-[#1d1b19]">
          Informasi Akun Saat Ini
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#6e5a52] font-semibold block uppercase tracking-wider text-[11px]">
              Nama Pengguna:
            </span>
            <span className="text-sm font-medium text-[#1d1b19] mt-0.5 block">
              {currentUser?.name || "Administrator Ariq Fish"}
            </span>
          </div>
          <div>
            <span className="text-[#6e5a52] font-semibold block uppercase tracking-wider text-[11px]">
              Alamat Email:
            </span>
            <span className="text-sm font-medium text-[#1d1b19] font-mono mt-0.5 block">
              {currentUser?.email || "admin@gmail.com"}
            </span>
          </div>
          <div>
            <span className="text-[#6e5a52] font-semibold block uppercase tracking-wider text-[11px]">
              Tingkat Hak Akses:
            </span>
            <span className="inline-block px-2.5 py-0.5 rounded bg-[#00507d] text-white font-semibold text-[11px] uppercase tracking-wider mt-1">
              {currentUser?.role_name || "admin"}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password Form Card */}
      <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#ede7e3] shadow-warm">
        <h3 className="font-display font-semibold text-lg text-[#1d1b19] mb-4">
          Ganti Kata Sandi (Password)
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
              Password Saat Ini
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Masukkan password saat ini (cth: 123456)"
              className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
              Password Baru (minimal 6 karakter)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password baru yang kuat"
              className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password baru"
              className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
            >
              <span className="material-symbols-outlined text-base">
                {loading ? "sync" : "lock_reset"}
              </span>
              <span>{loading ? "Menyimpan..." : "Perbarui Password"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

