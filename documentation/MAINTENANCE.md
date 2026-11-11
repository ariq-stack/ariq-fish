# Maintenance Log - Ariq Fish

Dokumen ini mencatat rencana pengembangan lanjutan, laporan bug, serta riwayat perubahan pada sistem website **Ariq Fish**.

---

## 1. Backlog Fitur (Rencana Lanjutan)

Daftar kebutuhan penambahan fitur di masa mendatang:

- [ ] **Payment Gateway Otomatis (Midtrans / Xendit):**
  - Menggantikan verifikasi tiket manual dengan verifikasi transaksi instan via webhook.
  - Mendukung QRIS dinamis, Virtual Account Bank (BCA, Mandiri, BRI, BNI), dan e-Wallet.
- [ ] **Notifikasi Transaksi Otomatis:**
  - Integrasi email transactional (Resend / SendGrid) saat pesanan baru dibuat dan saat pesanan dikonfirmasi.
  - Integrasi WhatsApp Gateway (WhatsApp Cloud API / Fonnte / Waha) untuk notifikasi otomatis ke nomor WA pelanggan & admin.
- [ ] **Migrasi Media ke Cloud Storage:**
  - Memindahkan penyimpanan file gambar berita dari disk lokal (`public/uploads/`) ke cloud storage permanen (Vercel Blob / Cloudinary / Supabase Storage) agar unggahan gambar di Vercel production tidak hilang saat re-deploy.
- [ ] **Export Laporan Pesanan:**
  - Fitur unduh rekap data pesanan bulanan ke format CSV/Excel langsung dari dashboard admin.
- [ ] **Dukungan Multi-Bahasa (ID/EN):**
  - Opsi pergantian bahasa Indonesia - Inggris untuk calon mitra dan pembeli komoditas ekspor se-Asia.

---

## 2. Bug Diketahui (Known Issues)

*Belum ada bug kritis yang dilaporkan.*

| ID | Tanggal | Deskripsi Masalah | Langkah Reproduksi | Status / Prioritas |
|---|---|---|---|---|
| - | - | - | - | - |

---

## 3. Riwayat Perubahan (Changelog)

### [2026-11-11] - Rilis Awal Versi 1.0.0
- **Step 1 - Landing Page Publik:**
  - Implementasi tema desain *Heritage Editorial* (Navy `#00507d`, Espresso `#2D1E18`, Parchment `#fef8f4`, Gold `#c5a059`).
  - Bagian Hero, Tentang Kami (sejarah keluarga 1950 & cold chain), Katalog Komoditas Ikan, Berita Maritim, dan Lokasi Marketing Gallery PIK 2 (embed Google Maps).
  - Tampilan responsif mobile (375px), tablet (768px), desktop (1280px+), dan ramah aksesibilitas.
- **Step 2 - User Management & Google Spreadsheet Database:**
  - Arsitektur Google Apps Script (`code.gs` & `setup.gs`) sebagai backend API database Google Spreadsheet terisolasi token rahasia.
  - Sistem autentikasi berbasis JWT httpOnly cookie dan hashing bcrypt.
  - Dashboard Admin lengkap: Manajemen Pengguna, Manajemen Peran, CRUD Berita dengan thumbnail, dan Profil Admin.
- **Step 3 - Sistem Pemesanan & Pembayaran QRIS:**
  - Halaman katalog & form pesanan interaktif (`/pesan`) dengan proteksi validasi server.
  - Halaman tiket pembayaran `/pesanan/[id]` dilengkapi gambar QRIS resmi merchant pengguna (*Mohammad Ammar Ayyasy, NMID: ID1026545853032*).
  - Halaman riwayat pemesanan pelanggan (`/pesanan-anda`).
  - Panel kelola tiket pesanan di Dashboard Admin (`/dashboard/orders`) dengan tombol status konfirmasi dan pintas WhatsApp.
- **Step 4 - Deploy & Pemeliharaan:**
  - Halaman 404 kustom bertema Ariq Fish.
  - Panduan deploy Vercel di `/documentation/DEPLOYMENT.md`.
  - Log pemeliharaan di `/documentation/MAINTENANCE.md`.
  - Pembaruan status di `/documentation/PROGRESS.md`.

---

## 4. Prosedur Pemeliharaan Rutin

1. **Pembaruan Kode Google Apps Script:**
   - Jika mengubah `code.gs` atau `setup.gs`, buka editor Google Apps Script, perbarui kode, lalu klik **Deploy > Manage deployments > Edit > New version > Deploy**.
2. **Pencadangan (Backup) Data Spreadsheet:**
   - Lakukan duplikasi lembar Google Spreadsheet secara berkala (misal tiap minggu/bulan) melalui menu *File > Make a copy* di Google Sheets.
3. **Pembaruan Dependensi:**
   - Jalankan `npm audit` secara berkala untuk mengecek kerentanan keamanan pustaka pihak ketiga.

