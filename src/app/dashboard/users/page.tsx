"use client";

import React, { useState, useEffect } from "react";

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State for editing role
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newRoleId, setNewRoleId] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [uRes, rRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/roles"),
      ]);
      const uData = await uRes.json();
      const rData = await rRes.json();

      if (uData.success) setUsers(uData.users);
      if (rData.success) setRoles(rData.roles);
    } catch {
      setMessage({ type: "error", text: "Gagal memuat data pengguna" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (user: any) => {
    const nextStatus = user.status === "active" ? "inactive" : "active";
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage({ type: "success", text: `Status pengguna ${user.name} berhasil diubah` });
      loadData();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal mengubah status" });
    }
  };

  const handleDeleteUser = async (user: any) => {
    if (!confirm(`Yakin ingin menghapus pengguna "${user.name}" (${user.email})?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage({ type: "success", text: `Pengguna ${user.name} berhasil dihapus` });
      loadData();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal menghapus pengguna" });
    }
  };

  const handleSaveRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role_id: newRoleId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage({ type: "success", text: `Peran untuk ${editingUser.name} berhasil diperbarui` });
      setEditingUser(null);
      loadData();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal mengubah peran" });
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role_id === roleFilter || u.role_name === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[#1d1b19]">
          Manajemen Pengguna
        </h1>
        <p className="text-xs sm:text-sm text-[#40474f] mt-1">
          Daftar akun terdaftar, pengaturan status keaktifan, dan pembagian peran pengguna
        </p>
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

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-lg bg-white border border-[#ede7e3] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email pengguna..."
            className="w-full pl-9 pr-3 py-2 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-base text-[#707881]">
            search
          </span>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <span className="text-xs font-semibold text-[#6e5a52]">Filter Peran:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
          >
            <option value="all">Semua Peran</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-lg bg-white border border-[#ede7e3] shadow-warm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#40474f]">
            <span className="material-symbols-outlined text-3xl animate-spin text-[#00507d] mb-2 block">
              refresh
            </span>
            Memuat data pengguna dari database...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#40474f]">
            Tidak ada pengguna yang cocok dengan kriteria pencarian.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1d1b19]">
              <thead className="bg-[#f8f2ee] border-b border-[#ede7e3] text-[#6e5a52] uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3.5">Nama &amp; Email</th>
                  <th className="px-6 py-3.5">Peran (Role)</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Terdaftar</th>
                  <th className="px-6 py-3.5 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede7e3]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#fef8f4]/60 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold block text-[#1d1b19]">
                        {user.name}
                      </span>
                      <span className="text-[11px] text-[#40474f] font-mono">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                          user.role_name === "admin"
                            ? "bg-[#00507d] text-white"
                            : "bg-[#ede7e3] text-[#1d1b19]"
                        }`}
                      >
                        {user.role_name || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          user.status === "active"
                            ? "bg-[#dcfce7] text-[#15803d]"
                            : "bg-[#fee2e2] text-[#b91c1c]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.status === "active" ? "bg-[#15803d]" : "bg-[#b91c1c]"
                          }`}
                        />
                        {user.status === "active" ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#6e5a52] font-mono text-[11px]">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setNewRoleId(user.role_id || "role-user-default");
                        }}
                        className="px-2.5 py-1 rounded bg-[#f8f2ee] hover:bg-[#ede7e3] text-[#00507d] font-semibold text-[11px] border border-[#ede7e3]"
                      >
                        Ubah Peran
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className="px-2.5 py-1 rounded bg-[#f8f2ee] hover:bg-[#ede7e3] text-[#6e5a52] font-semibold text-[11px] border border-[#ede7e3]"
                      >
                        {user.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="px-2.5 py-1 rounded bg-[#ffdad6] hover:bg-[#ba1a1a] hover:text-white text-[#93000a] font-semibold text-[11px] transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-[#ede7e3]">
            <h3 className="font-display font-semibold text-lg text-[#1d1b19] mb-1">
              Ubah Peran Pengguna
            </h3>
            <p className="text-xs text-[#40474f] mb-4">
              Pilih peran hak akses baru untuk <strong>{editingUser.name}</strong> ({editingUser.email})
            </p>

            <form onSubmit={handleSaveRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                  Pilihan Peran:
                </label>
                <select
                  value={newRoleId}
                  onChange={(e) => setNewRoleId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} - {r.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded bg-[#ede7e3] text-xs font-semibold text-[#1d1b19]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#00507d] text-xs font-semibold text-white shadow-sm"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

