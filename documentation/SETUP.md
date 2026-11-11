# Panduan Setup Database Google Spreadsheet & Apps Script (Ariq Fish)

Dokumen ini memandu Anda menghubungkan website Ariq Fish dengan **Google Spreadsheet** sebagai database melalui **Google Apps Script**.

---

## Mengapa Menggunakan Arsitektur Ini?
```
Browser Pengguna -> Server Next.js (API / Server Action) -> Google Apps Script Web App -> Google Spreadsheet
```
- **Keamanan:** Browser pengguna **tidak pernah** mengakses Apps Script atau Spreadsheet secara langsung.
- **Kerahasiaan:** Komunikasi antara Next.js dan Apps Script dilindungi dengan **secret token** rahasia bersama.
- **Biaya Nol & Mudah:** Spreadsheet dapat dibuka dan ditinjau langsung oleh tim bisnis layaknya Excel.

---

## Langkah 1: Buat Spreadsheet & Buka Apps Script
1. Buka [Google Sheets](https://sheets.new) di browser Anda dengan akun Google Anda.
2. Beri judul spreadsheet: **`Ariq Fish Database`**.
3. Di menu atas, klik **Extensions (Ekstensi)** > **Apps Script**.
4. Akan terbuka editor Google Apps Script di tab baru. Beri nama proyek di kiri atas: **`Ariq Fish Backend API`**.

---

## Langkah 2: Salin File `setup.gs` dan `code.gs`
1. Di editor Apps Script, buka file bawaan `Code.gs`.
2. Hapus semua teks di dalamnya, lalu salin seluruh isi dari file [`code.gs`](file:///c:/Users/ariqf/OneDrive/Documents/ariq%20fish/code.gs) lokal proyek ke editor tersebut.
3. Buat file baru di Apps Script dengan klik tanda **`+` (Add a file)** > **Script**, beri nama: **`setup`**.
4. Salin seluruh isi dari file [`setup.gs`](file:///c:/Users/ariqf/OneDrive/Documents/ariq%20fish/setup.gs) lokal proyek ke file `setup.gs` di editor Apps Script.
5. Klik ikon disket **Save project** (Ctrl + S).

---

## Langkah 3: Jalankan Inisiasi Tabel Otomatis (`initTables`)
1. Di bagian atas editor Apps Script, pilih fungsi **`initTables`** dari menu dropdown fungsi.
2. Klik tombol **Run (Jalankan)**.
3. Saat pertama kali dijalankan, Google akan meminta izin akses (*Authorization Required*):
   - Klik **Review permissions (Tinjau izin)**.
   - Pilih akun Google Anda.
   - Klik **Advanced (Lanjutan)** > **Go to Ariq Fish Backend API (unsafe)**.
   - Klik **Allow (Izinkan)**.
4. Periksa spreadsheet Google Anda:
   - Sheet `Roles`, `Users`, `News`, dan `Orders` otomatis terbentuk rapi dengan header biru navy.
   - Akun admin awal dan 3 berita maritim otomatis terisi.
   > *Catatan:* Fungsi ini **idempoten** (aman dijalankan berulang kali tanpa membuat duplikasi data).

---

## Langkah 4: Atur Secret Token (Script Properties)
1. Di menu sebelah kiri editor Apps Script, klik ikon roda gigi **Project Settings (Setelan Project)**.
2. Gulir ke bawah ke bagian **Script Properties (Properti Skrip)**.
3. Klik **Add script property (Tambahkan properti skrip)**:
   - **Property:** `SCRIPT_SECRET`
   - **Value:** Buat kata kunci rahasia (misalnya: `ariq_fish_secret_token_1950_secure`)
4. Klik **Save script properties**.

---

## Langkah 5: Deploy sebagai Web App
1. Di kanan atas editor Apps Script, klik tombol biru **Deploy** > **New deployment**.
2. Klik ikon gerigi *Select type* > pilih **Web app**.
3. Isi konfigurasi berikut:
   - **Description:** `Production API v1`
   - **Execute as:** **Me (email Anda)** *(Sangat penting)*
   - **Who has access:** **Anyone (Siapa saja)** *(Sangat penting agar server Next.js bisa memanggil API)*
4. Klik **Deploy**.
5. Salin **Web app URL** yang muncul (berakhiran `/exec`).

---

## Langkah 6: Masukkan ke `.env.local` di Proyek Next.js
Buka file `.env.local` di root proyek dan tempelkan URL serta Secret yang telah Anda buat:

```env
APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx_DEPLOYMENT_ID_ANDA/exec
APPS_SCRIPT_SECRET=ariq_fish_secret_token_1950_secure
JWT_SECRET=super_secret_session_jwt_key_ariq_fish_family_heritage_1950
```

---

## Cara Memperbarui Deployment Jika Kode Berubah Nanti
Setiap kali Anda mengubah kode di `code.gs`:
1. Klik **Deploy** > **Manage deployments**.
2. Klik ikon pensil **Edit** pada deployment aktif.
3. Pada dropdown **Version**, pilih **New version**.
4. Klik **Deploy**. (URL Web App tidak akan berubah).

---

## Peringatan Keamanan Kredensial Awal
Akun admin awal dibuat secara default dengan kredensial:
- **Email:** `admin@gmail.com`
- **Password:** `123456`

> **PERINGATAN PENTING:** Kredensial ini bersifat publik dan mudah ditebak. **Segera login ke dashboard dan ubah password admin** di menu Profil/Ganti Password sebelum website dipublikasikan ke production!

---

## Catatan Penting Mengenai Penyimpanan Media (Upload)
Pada tahap ini (Step 2), thumbnail berita disimpan secara lokal di folder `public/uploads/`.
- Penyimpanan lokal ini berfungsi sempurna untuk pengujian di komputer sendiri (*local development*).
- Namun disk di hosting Vercel bersifat *read-only* (sementara). File lokal yang diupload di Vercel tidak akan bertahan lama.
- Di **Step 4**, kita akan menyediakan opsi migrasi penyimpanan ke cloud (seperti Cloudinary atau Vercel Blob) dengan satu saklar konfigurasi di modul `src/lib/storage.ts`.

