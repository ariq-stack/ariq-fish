"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (!data.authenticated) {
          router.push("/login?redirect=/pesanan-anda");
          return;
        }
        setCurrentUser(data.user);
        return fetch("/api/orders");
      })
      .then((res) => res?.json())
      .then((data) => {
        if (data?.success) setOrders(data.orders);
      })
      .catch(() => router.push("/login?redirect=/pesanan-anda"))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-[#fef8f4]">
        <div className="max-w-[70rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#00507d] block mb-1">
                Riwayat Tiket &amp; Pembayaran
              </span>
              <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[#1d1b19]">
                Pesanan Anda
              </h1>
              <p className="text-xs sm:text-sm text-[#40474f] mt-1">
                Pantau status konfirmasi tiket dan bukti pembayaran QRIS pesanan Anda
              </p>
            </div>
            <Link
              href="/pesan"
              className="px-5 py-2.5 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm inline-flex items-center gap-2 self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-base">add_shopping_cart</span>
              <span>Buat Pesanan Baru</span>
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center text-sm text-[#40474f]">
              <span className="material-symbols-outlined text-4xl animate-spin text-[#00507d] mb-2 block">
                refresh
              </span>
              Memuat riwayat pesanan Anda...
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-white border border-[#ede7e3] shadow-warm max-w-lg mx-auto">
              <span className="material-symbols-outlined text-5xl text-[#c5a059] mb-3 block">
                receipt_long
              </span>
              <h3 className="font-display font-semibold text-lg text-[#1d1b19] mb-1">
                Belum Ada Pesanan
              </h3>
              <p className="text-xs text-[#40474f] mb-6">
                Anda belum memiliki riwayat pesanan komoditas ikan. Silakan pilih komoditas segar dan buat pesanan pertama Anda.
              </p>
              <Link
                href="/pesan"
                className="px-6 py-3 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold shadow-sm inline-flex items-center gap-2"
              >
                <span>Mulai Pesan Ikan Sekarang</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const items = Array.isArray(order.items)
                  ? order.items
                  : typeof order.items === "string"
                  ? JSON.parse(order.items || "[]")
                  : [];

                return (
                  <div
                    key={order.id}
                    className="p-6 rounded-xl bg-white border border-[#ede7e3] shadow-warm hover:shadow-warm-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono font-bold text-xs text-[#00507d] bg-[#f8f2ee] px-2.5 py-1 rounded border border-[#ede7e3]">
                          {order.id}
                        </span>
                        <span className="text-xs text-[#6e5a52]">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "-"}
                        </span>
                        {/* Status Badge */}
                        {order.status === "menunggu_konfirmasi" && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] text-[11px] font-bold">
                            Menunggu Konfirmasi
                          </span>
                        )}
                        {order.status === "dikonfirmasi" && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-bold">
                            Dikonfirmasi
                          </span>
                        )}
                        {order.status === "ditolak" && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#fee2e2] text-[#b91c1c] text-[11px] font-bold">
                            Dibatalkan
                          </span>
                        )}
                        {order.status === "selesai" && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#e0f2fe] text-[#00507d] text-[11px] font-bold">
                            Selesai
                          </span>
                        )}
                      </div>

                      {/* Items Brief */}
                      <div className="text-xs text-[#1d1b19] font-medium">
                        {items.map((i: any) => `${i.productName} (${i.quantity} ${i.unit})`).join(", ")}
                      </div>

                      <div className="text-xs text-[#6e5a52]">
                        Penerima: <strong>{order.customer_name}</strong> • Alamat: {order.delivery_address}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-4 sm:pt-0 border-[#ede7e3] gap-3">
                      <div>
                        <span className="text-[11px] text-[#6e5a52] block uppercase tracking-wider">
                          Total Pembayaran
                        </span>
                        <span className="font-display font-bold text-lg text-[#00507d] font-mono">
                          Rp {order.total_amount?.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <Link
                        href={`/pesanan/${order.id}`}
                        className="px-4 py-2 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">qr_code_2</span>
                        <span>Lihat Tiket QRIS</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

