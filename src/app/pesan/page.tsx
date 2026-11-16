"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig, ProductItem } from "@/config/site";

export default function FishCatalogCheckoutPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Cart State: Map productId -> quantity
  const [cart, setCart] = useState<{ [productId: string]: number }>({
    "prod-1": 5, // Default item: 5kg Tuna Loin
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
      .catch(() => {})
      .finally(() => setAuthChecked(true));
  }, []);

  const categories = [
    "Semua",
    "Ikan Laut Pelagis",
    "Ikan Demersal / Karang",
    "Cephalopoda & Crustacea",
    "Fillet & Olahan",
  ];

  const filteredProducts = useMemo(() => {
    return siteConfig.products.filter((p) => {
      const matchCat =
        selectedCategory === "Semua" || p.category === selectedCategory;
      const matchQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const updateQuantity = (product: ProductItem, delta: number) => {
    const current = cart[product.id] || 0;
    let next = current + delta;
    if (next < 0) next = 0;

    // If starting from 0 and adding, default to minOrder
    if (current === 0 && delta > 0 && next < product.minOrder) {
      next = product.minOrder;
    }

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

  const setExactQuantity = (product: ProductItem, val: number) => {
    const next = Math.max(0, val);
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

  // Selected Cart Items calculation
  const selectedItems = useMemo(() => {
    return siteConfig.products
      .filter((p) => (cart[p.id] || 0) > 0)
      .map((p) => {
        const qty = cart[p.id];
        return {
          product: p,
          quantity: qty,
          subtotal: p.price * qty,
        };
      });
  }, [cart]);

  const totalKg = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
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

    // Check minimum order limits
    for (const item of selectedItems) {
      if (item.quantity < item.product.minOrder) {
        setError(
          `Jumlah minimum order untuk ${item.product.name} adalah ${item.product.minOrder} ${item.product.unit}.`
        );
        return;
      }
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

      // Redirect ke halaman tiket pembayaran QRIS resmi
      router.push(`/pesanan/${data.order.id}`);
    } catch (err: any) {
      setError(err.message || "Gagal membuat pesanan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fef8f4] flex flex-col selection:bg-[#cbe4ff] selection:text-[#00507d]">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header Banner */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs text-[#6e5a52] mb-3">
              <Link href="/" className="hover:text-[#00507d] transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-[#1d1b19] font-medium">Katalog &amp; Checkout Ikan</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#00507d] text-white text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm">
                  <span className="material-symbols-outlined text-sm text-[#94ccff]">
                    set_meal
                  </span>
                  <span>Katalog Komoditas Ikan &amp; Checkout QRIS</span>
                </span>
                <h1 className="font-display font-semibold text-3xl sm:text-4xl text-[#1d1b19] leading-tight">
                  Pilih Hasil Laut Segar &amp; Checkout Langsung
                </h1>
                <p className="text-xs sm:text-sm text-[#40474f] mt-1.5 max-w-2xl leading-relaxed">
                  Semua komoditas ditimbang secara presisi, dijaga dalam rantai pendingin -25°C, dan diverifikasi tiket pembayarannya melalui QRIS resmi.
                </p>
              </div>

              {/* Quick Specs Pill */}
              <div className="flex items-center gap-2 text-xs text-[#6e5a52] font-semibold bg-white p-3 rounded-lg border border-[#ede7e3] shadow-sm shrink-0">
                <span className="material-symbols-outlined text-base text-[#00507d]">
                  verified
                </span>
                <span>Standar KKP • Bebas Pengawet • Garansi Segar</span>
              </div>
            </div>
          </div>

          {/* User Auth Banner Alert */}
          {!currentUser && authChecked && (
            <div className="mb-8 p-4 rounded-xl bg-[#fff8e1] border-l-4 border-[#c5a059] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-[#7e5f1f]">
                <span className="material-symbols-outlined text-xl text-[#c5a059]">
                  account_circle
                </span>
                <span>
                  <strong>Perhatian:</strong> Anda belum masuk ke akun. Anda tetap dapat memilih komoditas, namun harap login saat menekan tombol checkout agar tiket pesanan tersimpan di menu <strong>Pesanan Anda</strong>.
                </span>
              </div>
              <Link
                href="/login?redirect=/pesan"
                className="px-4 py-2 rounded bg-[#00507d] text-white font-semibold hover:bg-[#0369a1] text-center shrink-0 transition-colors shadow-sm"
              >
                Masuk Akun Sekarang
              </Link>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* 2-Column Storefront Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Filter & Fish Catalog Grid (7 or 8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Search & Category Filter Toolbar */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#ede7e3] shadow-sm space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-xl">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari jenis ikan (Tuna, Cakalang, Kakap, Udang, Fillet...)"
                    className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#707881] hover:text-[#1d1b19]"
                    >
                      Hapus
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? "bg-[#00507d] text-white shadow-sm"
                          : "bg-[#f8f2ee] text-[#6e5a52] hover:bg-[#ede7e3]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fish Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredProducts.map((fish) => {
                  const qty = cart[fish.id] || 0;
                  const isSelected = qty > 0;

                  return (
                    <div
                      key={fish.id}
                      className={`rounded-xl bg-white border overflow-hidden transition-all duration-300 flex flex-col justify-between group ${
                        isSelected
                          ? "border-[#00507d] ring-2 ring-[#00507d]/10 shadow-warm-lg"
                          : "border-[#ede7e3] shadow-warm hover:shadow-warm-lg hover:border-[#c5a059]"
                      }`}
                    >
                      <div>
                        {/* Image Thumbnail Container */}
                        <div className="relative h-44 w-full bg-[#f8f2ee] overflow-hidden">
                          <img
                            src={fish.image}
                            alt={fish.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                            {fish.tag ? (
                              <span className="px-2.5 py-0.5 rounded bg-[#c5a059] text-[#1d1b19] font-bold text-[10px] uppercase tracking-wider shadow">
                                {fish.tag}
                              </span>
                            ) : (
                              <span />
                            )}
                            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white font-mono text-[10px]">
                              Min. {fish.minOrder} {fish.unit}
                            </span>
                          </div>

                          {/* Bottom Grade Tag */}
                          {fish.freshnessGrade && (
                            <span className="absolute bottom-2 left-2.5 text-[10px] text-white/95 font-semibold bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                              {fish.freshnessGrade}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-5">
                          <span className="text-[11px] font-semibold text-[#00507d] uppercase tracking-wider block mb-1">
                            {fish.category}
                          </span>
                          <h3 className="font-display font-semibold text-base sm:text-lg text-[#1d1b19] leading-snug group-hover:text-[#00507d] transition-colors mb-2">
                            {fish.name}
                          </h3>
                          <p className="text-xs text-[#40474f] line-clamp-2 leading-relaxed mb-3">
                            {fish.description}
                          </p>

                          {/* Price Tag */}
                          <div className="flex items-baseline gap-1 pt-2 border-t border-[#ede7e3]">
                            <span className="font-display font-bold text-xl text-[#00507d]">
                              Rp {fish.price.toLocaleString("id-ID")}
                            </span>
                            <span className="text-xs text-[#6e5a52]">
                              / {fish.unit}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom: Quantity & Add Button */}
                      <div className="p-4 sm:p-5 pt-0">
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={() => updateQuantity(fish, fish.minOrder)}
                            className="w-full py-2.5 rounded-lg bg-[#00507d] hover:bg-[#0369a1] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 group-hover:shadow"
                          >
                            <span className="material-symbols-outlined text-base">
                              add_shopping_cart
                            </span>
                            <span>Tambah ke Pesanan</span>
                          </button>
                        ) : (
                          <div className="bg-[#f8f2ee] p-2 rounded-lg border border-[#ede7e3] space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-[#6e5a52]">
                                Jumlah ({fish.unit}):
                              </span>
                              <span className="text-xs font-bold text-[#00507d]">
                                Subtotal: Rp {(qty * fish.price).toLocaleString("id-ID")}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(fish, -1)}
                                className="w-8 h-8 rounded bg-white hover:bg-[#ede7e3] border border-[#ede7e3] text-[#1d1b19] font-bold text-base flex items-center justify-center transition-colors shadow-sm"
                                title="Kurangi 1 kg"
                              >
                                -
                              </button>

                              <div className="flex-1 text-center font-display font-bold text-sm text-[#1d1b19] bg-white py-1 rounded border border-[#ede7e3]">
                                {qty} {fish.unit}
                              </div>

                              <button
                                type="button"
                                onClick={() => updateQuantity(fish, 1)}
                                className="w-8 h-8 rounded bg-[#00507d] hover:bg-[#0369a1] text-white font-bold text-base flex items-center justify-center transition-colors shadow-sm"
                                title="Tambah 1 kg"
                              >
                                +
                              </button>

                              <button
                                type="button"
                                onClick={() => setExactQuantity(fish, 0)}
                                className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded transition-colors"
                                title="Hapus dari pesanan"
                              >
                                <span className="material-symbols-outlined text-lg">
                                  delete
                                </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-[#ede7e3] p-8">
                  <span className="material-symbols-outlined text-4xl text-[#707881] mb-2">
                    search_off
                  </span>
                  <h3 className="font-display font-semibold text-lg text-[#1d1b19]">
                    Komoditas Tidak Ditemukan
                  </h3>
                  <p className="text-xs text-[#40474f] mt-1 max-w-sm mx-auto">
                    Tidak ada hasil pencarian untuk &ldquo;{searchQuery}&rdquo;. Silakan reset kata kunci atau hubungi admin via WhatsApp untuk pasokan khusus.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Semua");
                    }}
                    className="mt-4 px-4 py-2 rounded bg-[#00507d] text-white text-xs font-semibold"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Integrated Checkout & Cart Summary (4 or 5 cols, Sticky) */}
            <div
              id="checkout-box"
              className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-6"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-[#ede7e3] shadow-warm p-6 sm:p-7 space-y-6"
              >
                {/* Checkout Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#ede7e3]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-[#00507d] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">
                        shopping_bag
                      </span>
                    </div>
                    <div>
                      <h2 className="font-display font-semibold text-base text-[#1d1b19]">
                        Keranjang &amp; Checkout
                      </h2>
                      <span className="text-[11px] text-[#6e5a52]">
                        {selectedItems.length} komoditas dipilih
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs font-bold text-[#00507d] font-mono">
                    {totalKg} kg
                  </span>
                </div>

                {/* Selected Items List */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {selectedItems.length === 0 ? (
                    <div className="text-center py-6 text-[#707881]">
                      <span className="material-symbols-outlined text-3xl mb-1 text-[#c0c7d1]">
                        shopping_cart
                      </span>
                      <p className="text-xs">Keranjang Anda masih kosong.</p>
                      <p className="text-[11px] text-[#6e5a52] mt-0.5">
                        Pilih ikan dari katalog di sebelah kiri untuk checkout.
                      </p>
                    </div>
                  ) : (
                    selectedItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-2.5 rounded-lg bg-[#f8f2ee] border border-[#ede7e3] flex items-center justify-between text-xs"
                      >
                        <div className="flex-1 pr-2">
                          <span className="font-semibold block text-[#1d1b19] line-clamp-1">
                            {item.product.name}
                          </span>
                          <span className="text-[11px] text-[#6e5a52]">
                            {item.quantity} {item.product.unit} × Rp {item.product.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-[#00507d] block font-mono">
                            Rp {item.subtotal.toLocaleString("id-ID")}
                          </span>
                          <button
                            type="button"
                            onClick={() => setExactQuantity(item.product, 0)}
                            className="text-[10px] text-[#ba1a1a] hover:underline"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-[#ede7e3] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6e5a52]">
                    <span>Total Berat Komoditas:</span>
                    <span className="font-semibold text-[#1d1b19]">{totalKg} kg</span>
                  </div>
                  <div className="flex justify-between text-[#6e5a52]">
                    <span>Estimasi Ongkos Kirim:</span>
                    <span className="text-[#15803d] font-semibold">
                      Dikonfirmasi Admin
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#ede7e3] flex justify-between items-baseline">
                    <span className="font-display font-semibold text-sm text-[#1d1b19]">
                      Total Pembayaran:
                    </span>
                    <span className="font-display font-bold text-xl text-[#00507d]">
                      Rp {grandTotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Form Data Pemesan */}
                <div className="pt-4 border-t border-[#ede7e3] space-y-3.5">
                  <span className="text-xs font-bold text-[#00507d] uppercase tracking-wider block">
                    Data Pengiriman &amp; Penerima:
                  </span>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1b19] mb-1">
                      Nama Pemesan / Restoran / PT *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Pak Budi (Restoran Samudra)"
                      className="w-full px-3 py-2 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1b19] mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full px-3 py-2 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1b19] mb-1">
                      Alamat Pengiriman Lengkap *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Alamat dapur/gudang, nama jalan, nomor ruko/rumah, kota..."
                      className="w-full px-3 py-2 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1d1b19] mb-1">
                      Catatan Tambahan (Opsional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Kirim jam 07:00 pagi dengan es basah"
                      className="w-full px-3 py-2 rounded bg-[#f8f2ee] border border-[#ede7e3] text-xs text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                    />
                  </div>
                </div>

                {/* QRIS Payment Security Badge */}
                <div className="p-3 rounded-lg bg-[#f8f2ee] border border-[#ede7e3] flex items-center gap-2.5 text-[11px] text-[#40474f]">
                  <span className="material-symbols-outlined text-lg text-[#00507d]">
                    qr_code_2
                  </span>
                  <span>
                    Pembayaran via <strong>QRIS Resmi</strong> setelah tombol ditekan.
                  </span>
                </div>

                {/* Checkout Action Button */}
                <button
                  type="submit"
                  disabled={submitting || selectedItems.length === 0}
                  className="w-full py-3.5 rounded-xl bg-[#00507d] hover:bg-[#0369a1] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="material-symbols-outlined text-lg">
                    {submitting ? "sync" : "lock"}
                  </span>
                  <span>
                    {submitting
                      ? "Membuat Tiket Pesanan..."
                      : `Checkout & Bayar QRIS (Rp ${grandTotal.toLocaleString("id-ID")})`}
                  </span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Floating Bottom Bar for Checkout */}
      {selectedItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#ede7e3] p-3 px-4 shadow-2xl z-40 flex items-center justify-between gap-3 animate-slide-up">
          <div>
            <span className="text-[11px] text-[#6e5a52] block font-medium">
              {totalKg} kg ({selectedItems.length} jenis ikan)
            </span>
            <span className="font-display font-bold text-base text-[#00507d]">
              Rp {grandTotal.toLocaleString("id-ID")}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("checkout-box");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2.5 rounded-lg bg-[#00507d] text-white font-semibold text-xs flex items-center gap-1.5 shadow"
          >
            <span>Isi Data &amp; Checkout</span>
            <span className="material-symbols-outlined text-sm">arrow_downward</span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
