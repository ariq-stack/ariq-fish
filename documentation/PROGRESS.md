# Progres Proyek - Ariq Fish

Terakhir diperbarui: 11 November 2026  
Posisi saat ini: **Step 4 - Deploy ke Vercel & Maintenance (Siap Dikonfirmasi)**

## Checklist
- [x] Inisiasi (data usaha & referensi desain terkumpul)
- [x] STEP 1 - Landing page
  - [x] Setup pondasi Next.js App Router + Tailwind CSS dengan token Heritage Editorial
  - [x] Hero section (headline, subjudul, CTA, badge izin KKP, metrik kapasitas)
  - [x] About section (sejarah keluarga Ariq 1950, kutipan nilai, jaringan nelayan, komitmen cold chain)
  - [x] Service section (6 katalog komoditas & layanan perikanan)
  - [x] Berita/Warta maritim (terintegrasi dengan data live database)
  - [x] Contact & Google Maps embed (Marketing Gallery PIK 2, Penjaringan, Jakarta Utara)
  - [x] Header/Navbar responsif & Footer lengkap
  - [x] Responsif & Aksesibilitas (WCAG) dicek
  - [x] Dikonfirmasi pengguna
- [x] STEP 2 - User management & dashboard
  - [x] Apps Script (`code.gs`, `setup.gs`) dengan inisiasi tabel idempoten (`initTables()`)
  - [x] Panduan setup lengkap di `/documentation/SETUP.md`
  - [x] Halaman Login & Register dengan validasi, hashing bcrypt, & sesi cookie JWT httpOnly
  - [x] Proteksi rute middleware (`/dashboard` & `/api/admin/*`) khusus role `admin`
  - [x] Dashboard Admin:
    - [x] Ringkasan metrik (pengguna, berita, status database)
    - [x] Manajemen Pengguna (cari, filter, ubah role, toggle aktif/nonaktif, proteksi hapus diri sendiri / admin terakhir)
    - [x] Manajemen Peran (daftar peran sistem & tambah peran kustom, proteksi peran sistem)
    - [x] CRUD Berita (tambah, edit, hapus, status draft/publish, upload thumbnail)
    - [x] Modul media lokal (`src/lib/storage.ts`) ke `public/uploads/`
    - [x] Halaman profil & fitur ganti password admin
  - [x] Dikonfirmasi pengguna
- [x] STEP 3 - Pemesanan & Pembayaran QRIS
  - [x] Katalog produk komoditas ikan di `src/config/site.ts` (Tuna Loin, Cakalang, Tongkol, Kakap, Kerapu, Cumi, Udang)
  - [x] Form pemesanan interaktif (`/pesan`) dengan pemilihan jumlah, kalkulasi otomatis, dan proteksi server
  - [x] Halaman tiket pembayaran QRIS (`/pesanan/[id]`) dengan barcode QRIS resmi merchant pengguna
  - [x] Halaman riwayat "Pesanan Anda" (`/pesanan-anda`) khusus pengguna terdaftar
  - [x] Menu "Pesanan Anda" di navbar (hanya muncul saat pengguna telah login)
  - [x] Dashboard Admin: menu **Pesanan & Tiket QRIS** (`/dashboard/orders`) untuk konfirmasi pembayaran, tolak/batalkan, dan tombol pintas WhatsApp
  - [x] Notifikasi status konfirmasi: *"Selamat, pembayaran Anda telah dikonfirmasi! Silakan tunggu informasi selanjutnya dari admin melalui email/WhatsApp."*
  - [x] Proteksi keamanan server (pengguna hanya melihat pesanan miliknya, validasi input harga & nomor WA)
  - [x] Dikonfirmasi pengguna
- [x] STEP 4 - Deploy & maintenance
  - [x] Halaman 404 Kustom bertema Ariq Fish (`src/app/not-found.tsx`)
  - [x] Panduan Deploy Vercel lengkap langkah demi langkah (`/documentation/DEPLOYMENT.md`)
  - [x] Maintenance Log & alur penanganan bug/fitur (`/documentation/MAINTENANCE.md`)
  - [x] Pengecekan keamanan repository (`.gitignore` menutup `.env*`, `code.gs`, `setup.gs`, `public/uploads/*`)
  - [x] Pengajuan pertanyaan kebutuhan lanjutan (Payment Gateway, Notifikasi Otomatis, Cloud Storage)
  - [ ] Dikonfirmasi pengguna

## Catatan & Keputusan Teknis
- **Gambar QRIS Resmi:** Telah disematkan dari gambar yang diunggah pengguna (`images/qris.jpg` / `public/images/qris.jpg` - *MOHAMMAD AMMAR AYYASY, DIGITAL & KREATIF*, NMID: ID1026545853032).
- **Alur Tiket Pembayaran:**
  1. Pelanggan memilih produk di `/pesan` -> Server memverifikasi input dan menghitung grand total.
  2. Pesanan disimpan sebagai tiket status `menunggu_konfirmasi` di tabel `Orders`.
  3. Pelanggan melihat barcode QRIS dan petunjuk pembayaran di `/pesanan/[id]`.
  4. Pelanggan dapat mengonfirmasi pembayaran langsung via WhatsApp (`https://wa.me/...`).
  5. Admin mengonfirmasi pembayaran di Dashboard Admin (`/dashboard/orders`) -> status berubah menjadi `dikonfirmasi`.
  6. Pelanggan melihat status pesanan telah dikonfirmasi di menu **Pesanan Anda** (`/pesanan-anda`).
- **Penyimpanan Media di Vercel:**
  - Saat ini media disimpan lokal di `public/uploads/`.
  - Telah disiapkan abstraksi di `src/lib/storage.ts` agar mudah dialihkan ke Vercel Blob / Cloudinary jika pengguna menginginkan penyimpanan cloud permanen di production.
- **Peringatan Keamanan Kredensial:**
  - Akun admin bawaan (`admin@gmail.com` / `123456`) **wajib diganti password-nya** melalui menu Profil (`/dashboard/profile`) setelah website di-deploy ke Vercel.
