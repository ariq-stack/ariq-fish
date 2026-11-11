"use client";

import React, { useState, useEffect } from "react";

export default function RoleManagementPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState("view_dashboard");

  const loadRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/roles");
      const data = await res.json();
      if (data.success) setRoles(data.roles);
    } catch {
      setMessage({ type: "error", text: "Gagal memuat peran" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, permissions }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage({ type: "success", text: `Peran baru "${name}" berhasil dibuat` });
      setIsModalOpen(false);
      setName("");
      setDescription("");
      loadRoles();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal membuat peran" });
    }
  };

  const handleDeleteRole = async (role: any) => {
    if (!confirm(`Yakin ingin menghapus peran "${role.name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/roles/${role.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage({ type: "success", text: `Peran "${role.name}" berhasil dihapus` });
      loadRoles();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal menghapus peran" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[#1d1b19]">
            Manajemen Peran &amp; Hak Akses
          </h1>
          <p className="text-xs sm:text-sm text-[#40474f] mt-1">
            Konfigurasi tingkatan hak akses sistem perikanan (admin, user, dan peran kustom)
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Tambah Peran Baru</span>
        </button>
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

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-12 text-center text-xs text-[#40474f]">
            <span className="material-symbols-outlined text-3xl animate-spin text-[#00507d] mb-2 block">
              refresh
            </span>
            Memuat daftar peran...
          </div>
        ) : (
          roles.map((role) => {
            const isSystem = role.is_system === true || role.is_system === "TRUE";
            return (
              <div
                key={role.id}
                className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-semibold text-lg text-[#1d1b19] capitalize">
                      {role.name}
                    </span>
                    {isSystem ? (
                      <span className="px-2.5 py-0.5 rounded bg-[#f5dad0] text-[#735e56] text-[10px] font-bold uppercase tracking-wider">
                        Peran Sistem
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded bg-[#e0f2fe] text-[#00507d] text-[10px] font-bold uppercase tracking-wider">
                        Kustom
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#40474f] leading-relaxed mb-4">
                    {role.description || "Tidak ada deskripsi tambahan"}
                  </p>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#6e5a52] uppercase tracking-wider block">
                      Izin Hak Akses:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.permissions
                        ?.split(",")
                        .map((perm: string) => perm.trim())
                        .filter(Boolean)
                        .map((perm: string) => (
                          <span
                            key={perm}
                            className="px-2 py-0.5 rounded bg-[#f8f2ee] text-[#00507d] text-[10px] font-mono border border-[#ede7e3]"
                          >
                            {perm}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[#ede7e3] flex items-center justify-between">
                  <span className="text-[10px] text-[#707881] font-mono">
                    ID: {role.id}
                  </span>
                  {!isSystem && (
                    <button
                      onClick={() => handleDeleteRole(role)}
                      className="px-3 py-1 rounded bg-[#ffdad6] hover:bg-[#ba1a1a] hover:text-white text-[#93000a] text-xs font-semibold transition-colors"
                    >
                      Hapus Peran
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-[#ede7e3]">
            <h3 className="font-display font-semibold text-lg text-[#1d1b19] mb-1">
              Tambah Peran Hak Akses Baru
            </h3>
            <p className="text-xs text-[#40474f] mb-4">
              Definisikan peran baru untuk membatasi atau memberikan akses fitur
            </p>

            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                  Nama Peran (huruf kecil tanpa spasi)
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="editor / staff_gudang / manajer"
                  className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                  Deskripsi Peran
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Contoh: Mengelola publikasi warta berita maritim"
                  className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                  Hak Akses (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={permissions}
                  onChange={(e) => setPermissions(e.target.value)}
                  placeholder="manage_news,view_dashboard"
                  className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs font-mono text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-[#ede7e3] text-xs font-semibold text-[#1d1b19]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#00507d] text-xs font-semibold text-white shadow-sm"
                >
                  Buat Peran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

