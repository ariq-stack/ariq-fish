# Panduan Deployment ke Vercel - Ariq Fish

Dokumen ini memandu Anda melakukan deployment website **Ariq Fish** ke Vercel agar dapat diakses publik melalui internet dengan performa tinggi, aman, dan stabil.

---

## 1. Persiapan Sebelum Deploy (Pre-flight Checklist)

Pastikan hal-hal berikut sudah terpenuhi di komputer Anda:
- [x] Kode sumber telah diuji secara lokal dan lolos `npm run build`.
- [x] File kredensial dan file sensitif telah dikecualikan oleh `.gitignore`:
  - `.env`, `.env.local`
  - `code.gs` & `setup.gs`
  - `public/uploads/*`
- [x] Google Apps Script telah di-deploy sebagai **Web App**:
  - *Execute as:* **Me (email Anda)**
  - *Who has access:* **Anyone**
  - Fungsi `initTables()` telah dijalankan satu kali di Apps Script sehingga seluruh lembar sheet (`Roles`, `Users`, `News`, `Orders`) sudah terbentuk.

---

## 2. Unggah Kode ke GitHub

1. Buka [GitHub](https://github.com/) dan buat repository baru (misalnya dengan nama `ariq-fish`), pilih mode **Private** atau **Public** sesuai kebutuhan.
2. Di terminal folder proyek `ariq fish`, inisialisasi git dan hubungkan ke repository GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Ariq Fish company profile with ordering & QRIS"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/ariq-fish.git
   git push -u origin main
   ```

---

## 3. Hubungkan ke Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard) (buat akun atau login menggunakan akun GitHub Anda).
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Di daftar repository GitHub, cari repository **`ariq-fish`** lalu klik **"Import"**.
4. Vercel akan secara otomatis mendeteksi Framework Preset sebagai **Next.js**.

---

## 4. Konfigurasi Environment Variables di Vercel

Sebelum menekan tombol *Deploy*, buka bagian **Environment Variables** di halaman konfigurasi proyek Vercel, lalu tambahkan variabel berikut:

| Nama Variabel | Nilai / Deskripsi | Contoh |
|---|---|---|
| `APPS_SCRIPT_URL` | URL Web App Google Apps Script hasil deploy | `https://script.google.com/macros/s/AKfycb.../exec` |
| `APPS_SCRIPT_SECRET` | Kunci rahasia yang sama dengan yang diisi di Script Properties Google Apps Script | `ariq_fish_secret_2026_super_secure` |
| `AUTH_SECRET` | String acak minimal 32 karakter untuk enkripsi token sesi JWT | `kombinasi_acak_huruf_angka_dan_simbol_32_karakter_lebih` |
| `NEXT_PUBLIC_APP_URL` | Domain produksi website Anda di Vercel (bisa diisi setelah URL Vercel terbentuk atau domain kustom Anda) | `https://ariq-fish.vercel.app` |

> **Catatan:** Jangan pernah membagikan nilai `APPS_SCRIPT_SECRET` dan `AUTH_SECRET` ke publik atau menyimpannya di file git.

---

## 5. Jalankan Deploy

1. Klik tombol **"Deploy"**.
2. Tunggu proses build Vercel (biasanya memerlukan waktu 1–2 menit).
3. Setelah selesai, Vercel akan menampilkan status *Congratulations!* beserta tautan domain aktif (misal: `https://ariq-fish.vercel.app`).

---

## 6. Uji Coba Pasca-Deploy (Live Verification)

Setelah website aktif di Vercel, lakukan pengetesan alur utama:
1. **Landing Page:** Buka halaman beranda, periksa foto-foto komoditas, sejarah keluarga 1950, dan peta Google Maps Marketing Gallery PIK 2.
2. **Katalog & Pemesanan:**
   - Masuk ke menu **Pesan Sekarang** (`/pesan`).
   - Pilih produk ikan, isi data pemesan, lalu klik "Buat Pesanan".
   - Verifikasi halaman tiket `/pesanan/[id]` menampilkan barcode QRIS resmi dan tombol konfirmasi WhatsApp.
3. **Login Akun Admin:**
   - Masuk ke `/login` menggunakan email admin awal:
     - Email: `admin@gmail.com`
     - Password: `123456`
   - Verifikasi akses dashboard `/dashboard`.
4. **Kelola Pesanan di Dashboard:**
   - Masuk ke `/dashboard/orders`, periksa apakah tiket pesanan yang baru dibuat tampil di daftar.
   - Klik tombol konfirmasi status pembayaran.
5. **GANTI PASSWORD ADMIN (Wajib):**
   - Masuk ke `/dashboard/profile`.
   - Ubah password bawaan (`123456`) menjadi password yang kuat, unik, dan aman.

---

## 7. Menghubungkan Domain Kustom (Opsional)

Jika Anda sudah memiliki nama domain sendiri (contoh: `ariqfish.com` atau `ariqfish.co.id`):
1. Masuk ke Project Vercel > **Settings** > **Domains**.
2. Masukkan nama domain Anda, lalu klik **Add**.
3. Ikuti panduan DNS Record (A Record atau CNAME) yang disediakan Vercel pada panel penyedia domain Anda (seperti Niagahoster, Rumahweb, Cloudflare, dll.).
4. Sertifikat SSL/HTTPS akan otomatis diterbitkan secara gratis oleh Vercel.

