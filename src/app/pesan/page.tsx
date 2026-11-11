"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig, ProductItem } from "@/config/site";

export default function OrderPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Cart State: Map productId -> quantity
  const [cart, setCart] = useState<{ [productId: string]: number }>({
    "prod-1": 5, // default 5kg Tuna Loin
  });

  // Customer Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setCurrentUser(data.user);
          setCustomerName(data.user.name || "");
        }
      })
      .finally(() => setAuthChecked(true));
  }, []);

  const updateQuantity = (product: ProductItem, delta: number) => {
    const current = cart[product.id] || 0;
    const next = Math.max(0, current + delta);
    setCart((prev) => {
      const updated = { ...prev };
      if (next === 0) {
        delete updated[product.id];
      } else {
        updated[product.id] = next;
      }
      return updated;
    });
  };

  // Calculate Subtotals & Total
  const selectedItems = siteConfig.products
    .filter((p) => (cart[p.id] || 0) > 0)
    .map((p) => {
      const qty = cart[p.id];
      return {
        product: p,
        quantity: qty,
        subtotal: p.price * qty,
      };
    });

  const grandTotal = selectedItems.reduce((acc, item) => acc + item.subtotal, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentUser) {
      router.push("/login?redirect=/pesan");
      return;
    }

    if (selectedItems.length === 0) {
      setError("Pilih minimal satu komoditas ikan terlebih dahulu.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        notes,
        items: selectedItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Redirect ke halaman tiket pembayaran QRIS
      router.push(`/pesanan/${data.order.id}`);
    } catch (err: any) {
      setError(err.message || "Gagal membuat pesanan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-[#fef8f4]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-2xl mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#00507d] text-white text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-sm text-[#94ccff]">
                shopping_cart_checkout
              </span>
              Pemesanan Komoditas Ikan &amp; Hasil Laut
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl text-[#1d1b19] mt-2">
              Formulir Pembelian Hasil Laut
            </h1>
            <p className="text-sm text-[#40474f] mt-1.5">
              Pilih komoditas segar berkualitas tangkapan dermaga Nusantara, isi detail pengiriman, dan selesaikan pembayaran via QRIS resmi.
            </p>
          </div>

          {!currentUser && authChecked && (
            <div className="mb-8 p-4 rounded-lg bg-[#fff8e1] border-l-4 border-[#c5a059] flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-[#7e5f1f]">
                <span className="material-symbols-outlined text-xl">account_circle</span>
                <span>
                  <strong>Perhatian:</strong> Anda belum masuk ke akun. Silakan login terlebih dahulu untuk menyimpan tiket pesanan ke riwayat Anda.
                </span>
              </div>
              <Link
                href="/login?redirect=/pesan"
                className="px-3.5 py-1.5 rounded bg-[#00507d] text-white font-semibold hover:bg-[#0369a1] shrink-0"
              >
                Masuk Akun
              </Link>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Product Selection (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm">
                <h2 className="font-display font-semibold text-xl text-[#1d1b19] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00507d]">set_meal</span>
                  <span>1. Pilih Komoditas Ikan &amp; Hasil Laut</span>
                </h2>

                <div className="space-y-4">
                  {siteConfig.products.map((product) => {
                    const qty = cart[product.id] || 0;
                    return (
                      <div
                        key={product.id}
                        className={`p-4 rounded-lg border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          qty > 0
                            ? "bg-[#fef8f4] border-[#00507d] shadow-sm"
                            : "bg-[#f8f2ee]/50 border-[#ede7e3] hover:border-[#dfd9d5]"
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6e5a52] bg-[#ede7e3] px-2 py-0.5 rounded">
                            {product.category}
                          </span>
                          <h3 className="font-display font-semibold text-base text-[#1d1b19]">
                            {product.name}
                          </h3>
                          <p className="text-xs text-[#40474f] max-w-md">
                            {product.description}
                          </p>
                          <div className="text-xs font-semibold text-[#00507d] pt-1">
                            Rp {product.price.toLocaleString("id-ID")} / {product.unit}
                            <span className="text-[11px] text-[#6e5a52] font-normal ml-2">
                              (Min: {product.minOrder} {product.unit})
                            </span>
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product, -1)}
                            className="w-8 h-8 rounded bg-white border border-[#ede7e3] text-[#1d1b19] hover:bg-[#ede7e3] flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-mono font-bold text-sm text-[#1d1b19]">
                            {qty} {product.unit}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product, 1)}
                            className="w-8 h-8 rounded bg-[#00507d] text-white hover:bg-[#0369a1] flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Customer Info & Order Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Customer Details Card */}
              <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm space-y-4">
                <h2 className="font-display font-semibold text-lg text-[#1d1b19] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00507d]">local_shipping</span>
                  <span>2. Detail Penerima &amp; Pengiriman</span>
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                    Nama Penerima / Perusahaan
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Bpk. Hendra Wijaya / Resto Bahari"
                    className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                    Nomor WhatsApp Aktif (untuk konfirmasi pesanan)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                    Alamat Lengkap Pengiriman
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Nama jalan, nomor gudang/ruko, kecamatan, kota..."
                    className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1d1b19] mb-1">
                    Catatan Tambahan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contoh: Minta fillet bersih / kirim jam 07:00 pagi"
                    className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                  />
                </div>
              </div>

              {/* Order Summary & QRIS Preview Card */}
              <div className="p-6 rounded-lg bg-white border border-[#ede7e3] shadow-warm space-y-4">
                <h3 className="font-display font-semibold text-lg text-[#1d1b19] pb-2 border-b border-[#ede7e3]">
                  Ringkasan Pesanan Anda
                </h3>

                {selectedItems.length === 0 ? (
                  <p className="text-xs text-[#707881] italic">
                    Belum ada komoditas ikan yang dipilih. Silakan tambah jumlah di kolom sebelah kiri.
                  </p>
                ) : (
                  <div className="space-y-2 text-xs">
                    {selectedItems.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between text-[#1d1b19]">
                        <span>
                          {item.product.name} ({item.quantity} {item.product.unit})
                        </span>
                        <span className="font-semibold font-mono">
                          Rp {item.subtotal.toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-[#ede7e3] flex items-center justify-between text-sm font-bold text-[#00507d]">
                      <span>Total Pembayaran:</span>
                      <span className="text-base font-mono">
                        Rp {grandTotal.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-3 rounded bg-[#f8f2ee] border border-[#ede7e3] text-[11px] text-[#40474f] space-y-1">
                  <div className="font-semibold text-[#00507d] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">qr_code_2</span>
                    Metode Pembayaran: QRIS Nasional (Gopay, BCA, Mandiri, dll)
                  </div>
                  <p>
                    Setelah menekan tombol di bawah, Anda akan diarahkan ke tiket pembayaran yang memuat barcode QRIS resmi kami.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting || selectedItems.length === 0}
                  className="w-full py-3.5 rounded bg-[#00507d] hover:bg-[#0369a1] text-white font-semibold text-sm transition-all shadow-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-base">
                    {submitting ? "sync" : "confirmation_number"}
                  </span>
                  <span>
                    {submitting ? "Memproses Tiket..." : "Buat Tiket Pesanan & Bayar QRIS"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

