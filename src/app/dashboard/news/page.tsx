"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function NewsCrudPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");
  const [thumbnailPath, setThumbnailPath] = useState("/images/hero-fish-platter.png");
  const [uploading, setUploading] = useState(false);

  const loadNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      if (data.success) setNewsList(data.news);
    } catch {
      setMessage({ type: "error", text: "Gagal memuat artikel berita" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setStatus("published");
    setThumbnailPath("/images/hero-fish-platter.png");
    setIsModalOpen(true);
  };

  const openEditModal = (article: any) => {
    setEditingArticle(article);
    setTitle(article.title);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setStatus(article.status || "published");
    setThumbnailPath(article.thumbnail_path || "/images/hero-fish-platter.png");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setThumbnailPath(data.filePath);
      setMessage({ type: "success", text: "Thumbnail gambar berhasil diunggah ke storage lokal!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal mengunggah gambar" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      excerpt,
      content,
      status,
      thumbnail_path: thumbnailPath,
    };

    try {
      if (editingArticle) {
        // Update
        const res = await fetch(`/api/admin/news/${editingArticle.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setMessage({ type: "success", text: "Berita berhasil diperbarui" });
      } else {
        // Create
        const res = await fetch("/api/admin/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setMessage({ type: "success", text: "Berita baru berhasil diterbitkan" });
      }

      setIsModalOpen(false);
      loadNews();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal menyimpan berita" });
    }
  };

  const handleDelete = async (article: any) => {
    if (!confirm(`Hapus artikel berita "${article.title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/news/${article.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage({ type: "success", text: "Berita berhasil dihapus" });
      loadNews();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal menghapus berita" });
    }
  };

  const filteredNews = newsList.filter((n) => {
    const matchesSearch =
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || n.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[#1d1b19]">
            Manajemen Berita &amp; Warta Maritim
          </h1>
          <p className="text-xs sm:text-sm text-[#40474f] mt-1">
            Publikasikan analisis pasar, lelang dermaga, dan update operasional Ariq Fish
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>Tulis Berita Baru</span>
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

      {/* Filter and Search */}
      <div className="p-4 rounded-lg bg-white border border-[#ede7e3] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul atau ringkasan berita..."
            className="w-full pl-9 pr-3 py-2 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-base text-[#707881]">
            search
          </span>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <span className="text-xs font-semibold text-[#6e5a52]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
          >
            <option value="all">Semua Status</option>
            <option value="published">Tayang (Published)</option>
            <option value="draft">Draf (Draft)</option>
          </select>
        </div>
      </div>

      {/* News Table */}
      <div className="rounded-lg bg-white border border-[#ede7e3] shadow-warm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#40474f]">
            <span className="material-symbols-outlined text-3xl animate-spin text-[#00507d] mb-2 block">
              refresh
            </span>
            Memuat data berita dari Google Spreadsheet...
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#40474f]">
            Belum ada artikel berita yang ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1d1b19]">
              <thead className="bg-[#f8f2ee] border-b border-[#ede7e3] text-[#6e5a52] uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3.5">Thumbnail &amp; Judul</th>
                  <th className="px-6 py-3.5">Ringkasan</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Tanggal</th>
                  <th className="px-6 py-3.5 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede7e3]">
                {filteredNews.map((article) => (
                  <tr key={article.id} className="hover:bg-[#fef8f4]/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-[#ede7e3] overflow-hidden shrink-0 relative border border-[#ede7e3]">
                          <img
                            src={article.thumbnail_path || "/images/hero-fish-platter.png"}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="max-w-xs">
                          <span className="font-semibold text-sm text-[#1d1b19] block leading-snug line-clamp-2">
                            {article.title}
                          </span>
                          <span className="text-[10px] text-[#707881] font-mono block mt-0.5">
                            /{article.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <p className="text-xs text-[#40474f] line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                          article.status === "published"
                            ? "bg-[#dcfce7] text-[#15803d]"
                            : "bg-[#fef3c7] text-[#b45309]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            article.status === "published" ? "bg-[#15803d]" : "bg-[#b45309]"
                          }`}
                        />
                        {article.status === "published" ? "Tayang" : "Draf"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#6e5a52] font-mono text-[11px]">
                      {article.created_at
                        ? new Date(article.created_at).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(article)}
                        className="px-2.5 py-1 rounded bg-[#f8f2ee] hover:bg-[#ede7e3] text-[#00507d] font-semibold text-[11px] border border-[#ede7e3]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article)}
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#ede7e3] my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#ede7e3] mb-5">
              <h3 className="font-display font-semibold text-xl text-[#1d1b19]">
                {editingArticle ? "Edit Artikel Berita" : "Tulis Artikel Berita Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#707881] hover:text-[#1d1b19]"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                  Judul Berita
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pasokan Tuna Segar Sentra Dermaga Mengalami Lonjakan"
                  className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                  Ringkasan Singkat (Excerpt)
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat yang tampil di kartu depan..."
                  className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                  Isi Konten Berita
                </label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan isi berita secara lengkap di sini..."
                  className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                    Status Publikasi
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                  >
                    <option value="published">Tayang Langsung (Published)</option>
                    <option value="draft">Simpan Sebagai Draf (Draft)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                    Upload Gambar Thumbnail (JPG / PNG / WebP)
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="w-full text-xs text-[#40474f] file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#00507d] file:text-white hover:file:bg-[#0369a1]"
                  />
                  {uploading && (
                    <span className="text-[11px] text-[#00507d] mt-1 block">
                      Sedang mengunggah file...
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Preview */}
              <div>
                <span className="block text-xs font-semibold text-[#6e5a52] mb-1">
                  Pratinjau Thumbnail Terpilih:
                </span>
                <div className="flex items-center gap-3 p-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3]">
                  <div className="w-16 h-12 rounded overflow-hidden bg-white shrink-0 relative">
                    <img
                      src={thumbnailPath}
                      alt="Pratinjau"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-mono text-[#40474f] truncate">
                    {thumbnailPath}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ede7e3] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded bg-[#ede7e3] text-xs font-semibold text-[#1d1b19] hover:bg-[#e7e1dd]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded bg-[#00507d] hover:bg-[#0369a1] text-xs font-semibold text-white shadow-sm"
                >
                  {editingArticle ? "Simpan Perubahan" : "Terbitkan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

