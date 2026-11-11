"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export default function OrderTicketPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/orders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data tiket pesanan");
        return res.json();
      })
      .then((data) => {
        if (data.success) setOrder(data.order);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const items = Array.isArray(order?.items)
    ? order.items
    : typeof order?.items === "string"
    ? JSON.parse(order.items || "[]")
    : [];

  const waMessage = encodeURIComponent(
    `Halo Admin Ariq Fish, saya ingin mengonfirmasi pembayaran untuk Tiket Pesanan ID: ${order?.id} sebesar Rp ${order?.total_amount?.toLocaleString("id-ID")}. Atas nama: ${order?.customer_name}.`
  );

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-[#fef8f4]">
        <div className="max-w-[70rem] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center text-sm text-[#40474f]">
              <span className="material-symbols-outlined text-4xl animate-spin text-[#00507d] mb-2 block">
                refresh
              </span>
              Memuat data tiket pesanan...
            </div>
          ) : error || !order ? (
            <div className="py-16 text-center max-w-md mx-auto">
              <span className="material-symbols-outlined text-5xl text-[#ba1a1a] mb-2 block">
                receipt_long
              </span>
              <h1 className="font-display font-semibold text-2xl text-[#1d1b19] mb-2">
                Tiket Tidak Ditemukan
              </h1>
              <p className="text-xs text-[#40474f] mb-6">
                {error || "Tiket pesanan ini tidak tersedia atau Anda tidak memiliki akses."}
              </p>
              <Link
                href="/pesanan-anda"
                className="px-5 py-2.5 rounded bg-[#00507d] text-white text-xs font-semibold shadow-sm"
              >
                Lihat Semua Pesanan Anda
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Ticket Top Header */}
              <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#ede7e3] shadow-warm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider">
                      Tiket Pemesanan Hasil Laut
                    </span>
                    <span className="text-[#c0c7d1]">•</span>
                    <span className="text-xs font-mono text-[#00507d] font-bold">
                      {order.id}
                    </span>
                  </div>
                  <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[#1d1b19]">
                    Pesanan a.n. {order.customer_name}
                  </h1>
                  <span className="text-xs text-[#40474f] block mt-0.5">
                    Dibuat pada:{" "}
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "-"}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="self-start sm:self-center">
                  {order.status === "menunggu_konfirmasi" && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fef3c7] text-[#b45309] text-xs font-bold uppercase tracking-wider border border-[#fde68a]">
                      <span className="w-2 h-2 rounded-full bg-[#b45309] animate-pulse" />
                      Menunggu Konfirmasi
                    </span>
                  )}
                  {order.status === "dikonfirmasi" && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-bold uppercase tracking-wider border border-[#bbf7d0]">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      Pembayaran Dikonfirmasi
                    </span>
                  )}
                  {order.status === "ditolak" && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fee2e2] text-[#b91c1c] text-xs font-bold uppercase tracking-wider border border-[#fecaca]">
                      <span className="material-symbols-outlined text-base">cancel</span>
                      Pesanan Dibatalkan
                    </span>
                  )}
                  {order.status === "selesai" && (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e0f2fe] text-[#00507d] text-xs font-bold uppercase tracking-wider border border-[#bae6fd]">
                      <span className="material-symbols-outlined text-base">verified</span>
                      Pesanan Selesai
                    </span>
                  )}
                </div>
              </div>

              {/* Status Message Alert */}
              {order.status === "dikonfirmasi" ? (
                <div className="p-5 rounded-lg bg-[#dcfce7] border-l-4 border-[#15803d] shadow-sm flex items-start gap-3">
                  <span className="material-symbols-outlined text-2xl text-[#15803d] mt-0.5">
                    task_alt
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#15803d]">
                      Selamat, pembayaran Anda telah dikonfirmasi!
                    </h3>
                    <p className="text-xs text-[#14532d] mt-1 leading-relaxed">
                      Silakan tunggu informasi pengiriman selanjutnya dari tim admin kami melalui email atau WhatsApp. Armada reefer kami sedang menyiapkan pesanan Anda dengan suhu rantai dingin optimal.
                    </p>
                  </div>
                </div>
              ) : order.status === "ditolak" ? (
                <div className="p-5 rounded-lg bg-[#fee2e2] border-l-4 border-[#b91c1c] shadow-sm flex items-start gap-3">
                  <span className="material-symbols-outlined text-2xl text-[#b91c1c] mt-0.5">
                    error
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#b91c1c]">
                      Pesanan Anda Dibatalkan / Ditolak
                    </h3>
                    <p className="text-xs text-[#7f1d1d] mt-1">
                      {order.admin_notes || "Silakan hubungi customer support kami untuk informasi lebih lanjut."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-lg bg-[#fff8e1] border-l-4 border-[#c5a059] shadow-sm flex items-start gap-3">
                  <span className="material-symbols-outlined text-2xl text-[#7e5f1f] mt-0.5">
                    schedule
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#7e5f1f]">
                      Status Tiket: Menunggu Konfirmasi Pembayaran
                    </h3>
                    <p className="text-xs text-[#1d1b19] mt-1 leading-relaxed">
                      Silakan lakukan pembayaran sesuai total tagihan di bawah ini dengan memindai kode <strong>QRIS Ariq Fish</strong>. Setelah transfer, Anda dapat langsung mengabari admin melalui tombol WhatsApp di bawah.
                    </p>
                  </div>
                </div>
              )}

              {/* Grid 2 Columns: QRIS Box & Order Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* QRIS Box (5 cols) */}
                <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-[#ede7e3] shadow-warm text-center space-y-4">
                  <div className="border-b border-[#ede7e3] pb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00507d] block">
                      Metode Pembayaran QRIS Resmi
                    </span>
                    <span className="text-xs text-[#6e5a52] block mt-0.5">
                      Scan via BCA, Mandiri, BRI, BNI, Gopay, OVO, Dana, dll
                    </span>
                  </div>

                  {/* QRIS Image Container */}
                  <div className="relative w-full max-w-[280px] mx-auto aspect-[3/4] rounded-lg overflow-hidden border-2 border-[#00507d]/20 shadow-md bg-white">
                    <Image
                      src={siteConfig.qrisImage || "/images/qris.jpg"}
                      alt="QRIS Pembayaran Ariq Fish - Mohammad Ammar Ayyasy"
                      fill
                      className="object-contain p-1"
                      priority
                    />
                  </div>

                  {/* Amount to pay */}
                  <div className="p-4 rounded-lg bg-[#f8f2ee] border border-[#ede7e3]">
                    <span className="text-xs text-[#6e5a52] block uppercase tracking-wider font-semibold">
                      Total yang Harus Dibayar:
                    </span>
                    <span className="font-display font-bold text-2xl sm:text-3xl text-[#00507d] mt-1 block font-mono">
                      Rp {order.total_amount?.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* WhatsApp Confirmation Button */}
                  <a
                    href={`https://wa.me/6285156256177?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg bg-[#25d366] hover:bg-[#20ba5a] text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Konfirmasi Pembayaran via WhatsApp</span>
                  </a>
                </div>

                {/* Order Details (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Item List */}
                  <div className="p-6 rounded-xl bg-white border border-[#ede7e3] shadow-warm">
                    <h2 className="font-display font-semibold text-lg text-[#1d1b19] mb-4 pb-3 border-b border-[#ede7e3] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00507d]">inventory_2</span>
                      <span>Rincian Komoditas Ikan</span>
                    </h2>

                    <div className="divide-y divide-[#ede7e3] text-xs">
                      {items.map((item: any, idx: number) => (
                        <div key={idx} className="py-3 flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-sm text-[#1d1b19] block">
                              {item.productName}
                            </span>
                            <span className="text-[#6e5a52] block mt-0.5">
                              {item.quantity} {item.unit} × Rp {item.price?.toLocaleString("id-ID")}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-[#00507d] text-sm">
                            Rp {item.subtotal?.toLocaleString("id-ID")}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 mt-4 border-t-2 border-[#ede7e3] flex items-center justify-between text-sm font-bold text-[#1d1b19]">
                      <span>Grand Total:</span>
                      <span className="text-lg font-mono text-[#00507d]">
                        Rp {order.total_amount?.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Delivery & Notes */}
                  <div className="p-6 rounded-xl bg-white border border-[#ede7e3] shadow-warm text-xs space-y-4">
                    <h3 className="font-display font-semibold text-base text-[#1d1b19] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00507d]">location_on</span>
                      <span>Alamat &amp; Kontak Penerima</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[#6e5a52] font-semibold block uppercase tracking-wider text-[11px]">
                          Nama Kontak:
                        </span>
                        <span className="font-medium text-[#1d1b19] block mt-0.5">
                          {order.customer_name}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#6e5a52] font-semibold block uppercase tracking-wider text-[11px]">
                          Nomor WhatsApp:
                        </span>
                        <span className="font-mono text-[#00507d] font-bold block mt-0.5">
                          {order.customer_phone}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[#6e5a52] font-semibold block uppercase tracking-wider text-[11px]">
                        Alamat Pengiriman:
                      </span>
                      <p className="text-[#1d1b19] mt-0.5 leading-relaxed">
                        {order.delivery_address || "-"}
                      </p>
                    </div>

                    {order.notes && (
                      <div>
                        <span className="text-[#6e5a52] font-semibold block uppercase tracking-wider text-[11px]">
                          Catatan Khusus:
                        </span>
                        <p className="text-[#1d1b19] italic mt-0.5">
                          “{order.notes}”
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href="/pesanan-anda"
                      className="text-xs font-semibold text-[#00507d] hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      <span>Lihat Riwayat Semua Pesanan Anda</span>
                    </Link>
                    <Link
                      href="/pesan"
                      className="text-xs font-semibold text-[#6e5a52] hover:text-[#00507d]"
                    >
                      + Pesan Komoditas Lain
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

