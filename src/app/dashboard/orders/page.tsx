"use client";

import React, { useState, useEffect } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Selected order for detail modal
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch {
      setMessage({ type: "error", text: "Gagal memuat daftar pesanan" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (
    orderId: string,
    nextStatus: "menunggu_konfirmasi" | "dikonfirmasi" | "ditolak" | "selesai"
  ) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus, admin_notes: adminNotes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage({
        type: "success",
        text: `Pesanan ${orderId} berhasil diubah statusnya menjadi "${nextStatus}"`,
      });
      setSelectedOrder(null);
      setAdminNotes("");
      loadOrders();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Gagal mengubah status pesanan" });
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone?.includes(search);
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[#1d1b19]">
            Manajemen Tiket Pesanan &amp; Pembayaran QRIS
          </h1>
          <p className="text-xs sm:text-sm text-[#40474f] mt-1">
            Konfirmasi pembayaran tiket komoditas ikan dan hubungi pelanggan via WhatsApp
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

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-lg bg-white border border-[#ede7e3] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID tiket, nama, atau no. WA..."
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
            <option value="menunggu_konfirmasi">Menunggu Konfirmasi</option>
            <option value="dikonfirmasi">Dikonfirmasi (Lunas)</option>
            <option value="selesai">Selesai (Terkirim)</option>
            <option value="ditolak">Dibatalkan / Ditolak</option>
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
            Memuat data tiket pesanan...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#40474f]">
            Tidak ada pesanan yang sesuai dengan filter pencarian.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1d1b19]">
              <thead className="bg-[#f8f2ee] border-b border-[#ede7e3] text-[#6e5a52] uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3.5">ID &amp; Tanggal</th>
                  <th className="px-6 py-3.5">Pelanggan</th>
                  <th className="px-6 py-3.5">Komoditas Dipesan</th>
                  <th className="px-6 py-3.5">Total Tagihan</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede7e3]">
                {filteredOrders.map((order) => {
                  const items = Array.isArray(order.items)
                    ? order.items
                    : typeof order.items === "string"
                    ? JSON.parse(order.items || "[]")
                    : [];

                  const cleanPhone = (order.customer_phone || "").replace(/[^0-9]/g, "");
                  const waUrl = `https://wa.me/${cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(
                    `Halo ${order.customer_name}, kami dari tim admin Ariq Fish terkait tiket pesanan ${order.id}.`
                  )}`;

                  return (
                    <tr key={order.id} className="hover:bg-[#fef8f4]/60 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-[#00507d] block text-xs">
                          {order.id}
                        </span>
                        <span className="text-[11px] text-[#6e5a52]">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString("id-ID")
                            : "-"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold block text-[#1d1b19]">
                          {order.customer_name}
                        </span>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#00507d] hover:underline flex items-center gap-1 font-mono mt-0.5"
                        >
                          <span className="material-symbols-outlined text-xs text-[#25d366]">chat</span>
                          <span>{order.customer_phone}</span>
                        </a>
                      </td>

                      <td className="px-6 py-4 max-w-xs">
                        <div className="space-y-0.5">
                          {items.map((i: any, idx: number) => (
                            <div key={idx} className="text-[11px] text-[#40474f]">
                              • {i.productName} ({i.quantity} {i.unit})
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-mono font-bold text-[#00507d] text-xs">
                        Rp {order.total_amount?.toLocaleString("id-ID")}
                      </td>

                      <td className="px-6 py-4">
                        {order.status === "menunggu_konfirmasi" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#fef3c7] text-[#b45309]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]" />
                            Menunggu Konfirmasi
                          </span>
                        )}
                        {order.status === "dikonfirmasi" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#dcfce7] text-[#15803d]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                            Dikonfirmasi
                          </span>
                        )}
                        {order.status === "ditolak" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#fee2e2] text-[#b91c1c]">
                            Dibatalkan
                          </span>
                        )}
                        {order.status === "selesai" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e0f2fe] text-[#00507d]">
                            Selesai
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setAdminNotes(order.admin_notes || "");
                          }}
                          className="px-3 py-1 rounded bg-[#00507d] hover:bg-[#0369a1] text-white font-semibold text-[11px] shadow-sm"
                        >
                          Kelola Pesanan
                        </button>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-[#25d366] hover:bg-[#20ba5a] text-white font-semibold text-[11px] inline-flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs">chat</span>
                          <span>WA</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail & Konfirmasi Pesanan */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#ede7e3] space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#ede7e3]">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#00507d] uppercase">
                  Detail Tiket #{selectedOrder.id}
                </span>
                <h3 className="font-display font-semibold text-xl text-[#1d1b19]">
                  Pesanan {selectedOrder.customer_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#707881] hover:text-[#1d1b19]"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Info Strip */}
            <div className="p-4 rounded-lg bg-[#f8f2ee] text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[#6e5a52] block text-[10px] uppercase font-semibold">Nomor WhatsApp:</span>
                  <span className="font-mono font-bold text-[#00507d]">{selectedOrder.customer_phone}</span>
                </div>
                <div>
                  <span className="text-[#6e5a52] block text-[10px] uppercase font-semibold">Email:</span>
                  <span>{selectedOrder.customer_email || "-"}</span>
                </div>
              </div>
              <div>
                <span className="text-[#6e5a52] block text-[10px] uppercase font-semibold">Alamat Pengiriman:</span>
                <span className="text-[#1d1b19]">{selectedOrder.delivery_address}</span>
              </div>
              {selectedOrder.notes && (
                <div>
                  <span className="text-[#6e5a52] block text-[10px] uppercase font-semibold">Catatan Pembeli:</span>
                  <span className="italic text-[#1d1b19]">“{selectedOrder.notes}”</span>
                </div>
              )}
            </div>

            {/* Items Table */}
            <div className="text-xs">
              <span className="font-bold text-[#1d1b19] block mb-2">Daftar Komoditas Dipesan:</span>
              <div className="divide-y divide-[#ede7e3] border rounded-lg p-3 bg-white">
                {(Array.isArray(selectedOrder.items)
                  ? selectedOrder.items
                  : JSON.parse(selectedOrder.items || "[]")
                ).map((item: any, idx: number) => (
                  <div key={idx} className="py-1.5 flex items-center justify-between">
                    <span>
                      {item.productName} ({item.quantity} {item.unit})
                    </span>
                    <span className="font-mono font-semibold text-[#00507d]">
                      Rp {item.subtotal?.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
                <div className="pt-2 mt-1 flex items-center justify-between font-bold text-sm text-[#00507d]">
                  <span>Total Tagihan:</span>
                  <span>Rp {selectedOrder.total_amount?.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                  Catatan Admin (Alasan penolakan / instruksi pengiriman):
                </label>
                <input
                  type="text"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Contoh: Pembayaran valid via QRIS, timbangan siap kirim jam 08.00"
                  className="w-full px-3 py-2 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus(selectedOrder.id, "dikonfirmasi")}
                  className="flex-1 py-2.5 rounded bg-[#15803d] hover:bg-[#166534] text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Konfirmasi Pembayaran</span>
                </button>

                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus(selectedOrder.id, "selesai")}
                  className="py-2.5 px-4 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Selesaikan</span>
                </button>

                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleUpdateStatus(selectedOrder.id, "ditolak")}
                  className="py-2.5 px-4 rounded bg-[#fee2e2] hover:bg-[#b91c1c] text-[#b91c1c] hover:text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">cancel</span>
                  <span>Tolak / Batalkan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

