"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    inquiryType: "Permintaan Pasokan Ikan",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        businessName: "",
        inquiryType: "Permintaan Pasokan Ikan",
        notes: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="kontak" className="w-full py-20 bg-[#fef8f4] border-b border-[#ede7e3]">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#00507d] mb-1">
            Pusat Kemitraan &amp; Transaksi
          </span>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#1d1b19]">
            Hubungi Tim Perdagangan Ariq Fish
          </h2>
          <div className="w-12 h-1 bg-[#c5a059] mt-3 mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-[#40474f] leading-relaxed">
            Tawarkan hasil tangkapan laut kapal Anda, konsultasikan kebutuhan rutin horeka/industri,
            atau diskusikan kontrak pengadaan ikan skala besar bersama tim kami.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Information Strip & Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-lg bg-white border border-[#ede7e3] shadow-warm">
              {/* Info 4-grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6 border-b border-[#ede7e3]">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#00507d] text-2xl mt-0.5">
                    pin_drop
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider block">
                      Kantor Pemasaran Utama
                    </span>
                    <p className="text-xs sm:text-sm text-[#1d1b19] font-medium leading-snug mt-0.5">
                      {siteConfig.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#00507d] text-2xl mt-0.5">
                    call
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider block">
                      Telepon / WhatsApp
                    </span>
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-[#00507d] font-bold hover:underline block mt-0.5"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#00507d] text-2xl mt-0.5">
                    mail
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider block">
                      Surel Resmi
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-xs sm:text-sm text-[#00507d] font-medium hover:underline block mt-0.5"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#00507d] text-2xl mt-0.5">
                    schedule
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-[#6e5a52] uppercase tracking-wider block">
                      Jam Layanan
                    </span>
                    <p className="text-xs sm:text-sm text-[#1d1b19] font-medium leading-snug mt-0.5">
                      {siteConfig.contact.operatingHours}
                    </p>
                    <span className="text-[11px] text-[#6e5a52]">
                      {siteConfig.contact.operatingDays}
                    </span>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="pt-6 space-y-4">
                <h3 className="font-display font-semibold text-lg text-[#1d1b19]">
                  Kirim Pesan atau Permintaan Pasokan
                </h3>

                {submitted && (
                  <div className="p-4 rounded bg-[#e0f2fe] border border-[#94ccff] text-[#00507d] text-xs sm:text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">
                      check_circle
                    </span>
                    <span>
                      Terima kasih! Pesan dan penawaran Anda telah berhasil dikirim ke tim perdagangan Ariq Fish.
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#1d1b19] mb-1"
                    >
                      Nama Lengkap / PIC
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Contoh: Hendra Wijaya"
                      className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#1d1b19] mb-1"
                    >
                      Alamat Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="nama@perusahaan.com"
                      className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-business"
                      className="block text-xs font-semibold text-[#1d1b19] mb-1"
                    >
                      Badan Usaha / Resto / Koperasi
                    </label>
                    <input
                      id="contact-business"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      placeholder="Contoh: Resto Seafood Nusantara"
                      className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-type"
                      className="block text-xs font-semibold text-[#1d1b19] mb-1"
                    >
                      Jenis Keperluan
                    </label>
                    <select
                      id="contact-type"
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiryType: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                    >
                      <option value="Permintaan Pasokan Ikan">
                        Permintaan Pasokan Ikan Segar / Beku
                      </option>
                      <option value="Penawaran Hasil Tangkapan Nelayan">
                        Penawaran Jual Hasil Tangkapan Nelayan
                      </option>
                      <option value="Sewa Cold Storage">
                        Sewa Cold Storage &amp; Blast Freezing
                      </option>
                      <option value="Konsultasi Ekspor">
                        Konsultasi Ekspor &amp; Karantina
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-notes"
                    className="block text-xs font-semibold text-[#1d1b19] mb-1"
                  >
                    Rincian Kebutuhan (Volume, Jenis Ikan &amp; Jadwal)
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={4}
                    required
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Sebutkan jenis komoditas (misal: Cakalang beku 5 ton/minggu), lokasi kirim/serah terima, serta spesifikasi..."
                    className="w-full px-3 py-2.5 rounded bg-[#f8f2ee] border border-[#ede7e3] text-sm text-[#1d1b19] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00507d]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded bg-[#00507d] hover:bg-[#0369a1] text-white font-semibold text-sm transition-all shadow-primary flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00507d] disabled:opacity-70"
                >
                  <span className="material-symbols-outlined text-base">
                    {isSubmitting ? "sync" : "send"}
                  </span>
                  <span>
                    {isSubmitting
                      ? "Mengirimkan Pesan..."
                      : "Kirim Permintaan Pasokan / Penawaran Ikan"}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Google Maps & Location Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="h-full rounded-lg bg-white border border-[#ede7e3] p-6 shadow-warm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00507d]">
                      domain
                    </span>
                    <h3 className="font-display font-semibold text-lg text-[#1d1b19]">
                      Marketing Gallery PIK 2
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-[#f5dad0] text-[#735e56] text-[11px] font-semibold uppercase tracking-wider">
                    Kantor Pusat
                  </span>
                </div>
                <p className="text-xs text-[#40474f] leading-relaxed mb-4">
                  {siteConfig.address.accessibilityNotes}
                </p>
              </div>

              {/* Embedded Google Maps Container */}
              <div className="w-full min-h-[300px] sm:min-h-[360px] rounded overflow-hidden border border-[#ede7e3] relative shadow-inner bg-[#f8f2ee]">
                <iframe
                  title="Peta Lokasi Kantor Pemasaran Utama Ariq Fish PIK 2"
                  src={siteConfig.address.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "320px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Action and Coordinates Strip */}
              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#00507d] uppercase tracking-wider block">
                    Koordinat Lokasi PIK 2
                  </span>
                  <span className="text-xs font-mono text-[#1d1b19]">
                    {siteConfig.address.coordinates}
                  </span>
                </div>
                <a
                  href={siteConfig.address.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded bg-[#00507d] hover:bg-[#0369a1] text-white text-xs font-semibold transition-all inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">
                    directions
                  </span>
                  <span>Buka Peta</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

