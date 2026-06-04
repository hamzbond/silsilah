# TAHAP 1: Panduan Setup Google Sheets & Publish CSV
## Website Silsilah Keluarga

**Status:** Panduan Setup Phase 1  
**Target Audience:** Semi-teknis (pernah menggunakan Google Sheets)  
**Perkiraan Waktu:** 15-20 menit  
**Terakhir Diupdate:** Mei 2026  

---

## 📋 Daftar Isi

1. [Pengantar & Persyaratan](#pengantar--persyaratan)
2. [Langkah 1: Membuat Google Sheets](#langkah-1-membuat-google-sheets)
3. [Langkah 2: Menambahkan Header Kolom](#langkah-2-menambahkan-header-kolom)
4. [Langkah 3: Memasukkan Data Keluarga](#langkah-3-memasukkan-data-keluarga)
5. [Langkah 4: Publish sebagai CSV](#langkah-4-publish-sebagai-csv)
6. [Langkah 5: Verifikasi & Testing](#langkah-5-verifikasi--testing)
7. [Troubleshooting & FAQ](#troubleshooting--faq)
8. [Best Practices & Tips](#best-practices--tips)
9. [Template Data Dummy](#template-data-dummy)

---

## Pengantar & Persyaratan

### Tujuan Tahap 1
Tahap 1 bertujuan untuk **mempersiapkan infrastruktur data** yang akan menjadi "database" untuk website silsilah keluarga. Data akan disimpan di **Google Sheets** dan di-publish dalam format **CSV**, sehingga website frontend bisa membacanya secara otomatis.

### Mengapa Google Sheets?
- ✅ **Gratis selamanya** — tidak perlu biaya hosting database
- ✅ **Mudah diedit** — admin keluarga bisa langsung input data tanpa coding
- ✅ **Aman & tersinkronisasi** — Google backup otomatis
- ✅ **Terintegrasi dengan web** — bisa di-publish sebagai CSV yang bisa diakses online

### Persyaratan Sebelum Mulai
- [ ] **Akun Google** (Gmail) — untuk membuat/edit Google Sheets
- [ ] **Browser modern** (Chrome, Firefox, Safari, Edge)
- [ ] **Akses ke Google Sheets** — pastikan tidak terblokir di network Anda
- [ ] **Pemahaman dasar** tentang:
  - Membuat dokumen baru di Google Workspace
  - Menambahkan/mengedit baris dan kolom
  - Membagikan file dengan orang lain

---

## Langkah 1: Membuat Google Sheets

### 1.1 Akses Google Sheets
1. Buka browser dan kunjungi **https://sheets.google.com**
2. Login dengan akun Google Anda (jika belum login)

### 1.2 Buat File Baru
1. Klik tombol **+ (Buat)** di bagian kiri
2. Pilih **Spreadsheet kosong**
3. Browser akan membuka file baru dengan nama default "Spreadsheet tanpa judul"

### 1.3 Rename File
1. Klik nama file di bagian atas (tengah)
2. Ubah menjadi nama yang deskriptif, contoh:
   - **"Silsilah Keluarga - Data Master"**
   - **"Family Tree - Data"**
   - **"Data Silsilah [Nama Keluarga]"**
3. Tekan **Enter** untuk menyimpan nama baru

> **💡 Tips:** Gunakan nama yang jelas agar mudah dikenali saat sharing dengan keluarga

---

## Langkah 2: Menambahkan Header Kolom

Header adalah baris pertama yang berisi nama-nama kolom. Struktur ini **wajib** sesuai dengan standar BALKAN FamilyTree JS (library yang akan menampilkan pohon silsilah di website).

### 2.1 Siapkan Row 1 sebagai Header
1. Pastikan Anda berada di **Sheet1** (default)
2. Klik cell **A1** (sudut kiri atas)
3. Mulai masukkan header sesuai tabel di bawah

### 2.2 Header Kolom (Format Lengkap)

| No. | Kolom | Tipe | Wajib? | Penjelasan |
|-----|-------|------|--------|-----------|
| A | `id` | Angka | ✅ **WAJIB** | ID unik setiap orang (1, 2, 3, ...) |
| B | `nama` | Teks | ✅ **WAJIB** | Nama lengkap |
| C | `tgl_lahir` | Tanggal | ⭕ Opsional | Tanggal lahir (format: DD Bulan YYYY, contoh: 24 Juli 1996) |
| D | `Umur` | Angka | ⭕ Auto | Umur (dihitung otomatis dari tgl_lahir, bisa kosong) |
| E | `jenis_kelamin` | Teks | ⭕ Opsional | `L` (Laki-laki) atau `P` (Perempuan) |
| F | `id_pasangan` | Angka | ⭕ Opsional | ID suami/istri (mereferensi kolom id orang lain) |
| G | `id_ayah` | Angka | ⭕ Opsional | ID ayah kandung |
| H | `id_ibu` | Angka | ⭕ Opsional | ID ibu kandung |
| I | `foto` | URL | ⭕ Opsional | Link ke foto profil |
| J | `tgl_kematian` | Tanggal | ⭕ Opsional | Tanggal wafat (jika ada) |
| K | `telp` | Teks | ⭕ Opsional | Nomor telepon |
| L | `email` | Teks | ⭕ Opsional | Alamat email |
| M | `panggilan` | Teks | ⭕ Opsional | Nama panggilan sehari-hari |
| N | `lokasi` | Teks | ⭕ Opsional | Kota domisili |
| O | `catatan` | Teks | ⭕ Opsional | Catatan tambahan/keterangan |

### 2.3 Cara Memasukkan Header
1. Ketik di cell **A1**: `id`
2. Tekan **Tab** untuk pindah ke cell **B1**, ketik: `nama`
3. Tekan **Tab** untuk pindah ke cell **C1**, ketik: `tgl_lahir`
4. Lanjutkan untuk semua 15 kolom hingga **O1**: `catatan`

**Atau** gunakan cara cepat - copy-paste seluruh header sekaligus:
```
id	nama	tgl_lahir	Umur	jenis_kelamin	id_pasangan	id_ayah	id_ibu	foto	tgl_kematian	telp	email	panggilan	lokasi	catatan
```
(Paste di A1, Google Sheets otomatis split by tab)

### 2.4 Format Header (Opsional tapi Recommended)
Untuk membuat header lebih terlihat dan mudah dibaca:
1. Pilih **Row 1** (klik nomor baris "1" di sebelah kiri)
2. Klik menu **Format** → **Number** → **Bold** (atau Ctrl+B)
3. Klik menu **Format** → **Color** → Pilih warna background (misal: biru muda atau hijau muda)
4. Klik menu **Format** → **Alignment** → **Center** untuk meratakan teks

---

## Langkah 3: Memasukkan Data Keluarga

### 3.1 Struktur Data dan Aturan Pengisian

#### **Kolom `id` (Wajib)**
- Harus **unik** (tidak boleh sama)
- Isi dengan **angka** (1, 2, 3, ...) - paling mudah

**Contoh:**
```
id: 1
id: 2
id: 3
```

#### **Kolom `nama` (Wajib)**
- Gunakan **nama lengkap**
- Konsisten dengan capitalization
- Misal: "Ahmad Hamzah", "Rizki Sakinah Dewi"

**Contoh:**
```
nama: Ahmad Hamzah
nama: Rizki Sakinah Dewi
nama: Ibu Retno Wulandari
```

#### **Kolom `tgl_lahir` (Opsional)**
- Format: **DD Bulan YYYY** (dengan nama bulan)
- Misal: "24 Juli 1996", "8 April 1997"
- Google Sheets akan otomatis format sebagai tanggal

**Contoh:**
```
tgl_lahir: 24 Juli 1996
tgl_lahir: 8 April 1997
tgl_lahir: 15 Maret 1985
```

#### **Kolom `Umur` (Auto)**
- Kosongkan! Umur akan dihitung otomatis dari tgl_lahir di sisi website
- Atau bisa isi manual jika ingin

**Contoh:**
```
Umur: (kosong - akan dihitung otomatis)
```

#### **Kolom `jenis_kelamin` (Opsional)**
- Hanya dua nilai: `L` (Laki-laki) atau `P` (Perempuan)
- **Case-sensitive** (harus besar)

**Contoh:**
```
jenis_kelamin: L
jenis_kelamin: P
```

#### **Kolom `id_pasangan` (Opsional)**
- Berisi ID suami/istri (mereferensi kolom `id` orang lain)
- Jika belum menikah: kosongkan

**Contoh:**
```
id_pasangan: 2       (married to person with id 2)
id_pasangan: (blank) (single/belum menikah)
```

#### **Kolom `id_ayah` (Opsional)**
- Berisi ID ayah kandung
- Kosongkan jika ayah tidak diketahui

**Contoh:**
```
id_ayah: 1           (father is person with id 1)
id_ayah: (blank)     (father unknown)
```

#### **Kolom `id_ibu` (Opsional)**
- Berisi ID ibu kandung
- Kosongkan jika ibu tidak diketahui

**Contoh:**
```
id_ibu: 2            (mother is person with id 2)
id_ibu: (blank)      (mother unknown)
```

#### **Kolom `foto` (Opsional)**
- URL lengkap ke foto profil
- Harus direct link (bukan Google Drive share link)
- Format: `https://...`

**Contoh yang BENAR:**
```
foto: https://example.com/ahmad.jpg
foto: https://imgur.com/abc123.png
```

**Contoh yang SALAH (jangan gunakan):**
```
foto: https://drive.google.com/file/d/1abc2def3ghi/view    ❌ (Google Drive share link)
```

#### **Kolom `tgl_kematian` (Opsional)**
- Tanggal wafat jika sudah meninggal
- Format sama: **DD Bulan YYYY**
- Kosongkan jika masih hidup

**Contoh:**
```
tgl_kematian: 15 Juni 2020
tgl_kematian: (blank - masih hidup)
```

#### **Kolom `telp` (Opsional)**
- Nomor telepon dengan format standar
- Misal: "08133569517", "085855065607"

**Contoh:**
```
telp: 08133569517
telp: 085855065607
```

#### **Kolom `email` (Opsional)**
- Alamat email
- Format: `nama@domain.com`

**Contoh:**
```
email: hamzbond@gmail.com
email: rizki.sakinah@gmail.com
```

#### **Kolom `panggilan` (Opsional)**
- Nama panggilan sehari-hari
- Misal: nama lengkap "Ahmad Hamzah" → panggilan "Ahmad"

**Contoh:**
```
panggilan: Ahmad
panggilan: Dewi
```

#### **Kolom `lokasi` (Opsional)**
- Kota domisili saat ini
- Cukup mention kota saja

**Contoh:**
```
lokasi: Gresik
lokasi: Jakarta
lokasi: Surabaya
```

#### **Kolom `catatan` (Opsional)**
- Keterangan tambahan apa saja
- Misal: pekerjaan, agama, status kesehatan, dll

**Contoh:**
```
catatan: Bekerja sebagai guru
catatan: Status pensiunan
catatan: Aktif di organisasi keluarga
```

### 3.2 Contoh Data: Keluarga (Format Baru)

### 4.2 Publish ke Web (Format CSV)

1. Klik menu **File** → **Share** — **BUKAN "Share" button**
2. Dari dropdown menu File, pilih **Publish to web**
3. Dialog baru akan muncul: "Publish to the web"
4. Pastikan **"Link"** tab dipilih (default)
5. Di dropdown "Sheet", pilih **Sheet1** (atau nama sheet Anda, jika custom)
6. Di dropdown "Format", pilih **Comma-separated values (.csv)** 
   - Jangan pilih "Web page" atau format lainnya
7. Klik **Publish** untuk confirm
8. Dialog akan menampilkan **URL CSV yang published**. Contoh:
   ```
   https://docs.google.com/spreadsheets/d/ABC123.../export?format=csv&gid=0
   ```

### 4.3 Copy & Simpan CSV URL

1. Di dialog "Publish to the web", copy URL yang muncul
2. **Simpan URL ini di tempat yang aman** (misal: file notes, atau dokumentasi proyek)
3. URL ini akan digunakan oleh website frontend untuk **membaca data keluarga**

**Contoh struktur URL:**
```
https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/export?format=csv&gid={SHEET_ID}
```

- `{SPREADSHEET_ID}` = ID unik Google Sheet Anda
- `{SHEET_ID}` = ID sheet (default: 0 untuk Sheet1)

---

## Langkah 5: Verifikasi & Testing

Sebelum mengatakan "Tahap 1 selesai", lakukan pengecekan ini untuk memastikan semuanya bekerja:

### ✅ Checklist Verifikasi

- [ ] **Header lengkap?** Pastikan semua 10 kolom ada di Row 1:
  - `id`, `name`, `gender`, `pids`, `fid`, `mid`, `bdate`, `photo`, `panggilan`, `lokasi`

- [ ] **Data minimal sudah ada?** Minimal masukkan:
  - [ ] 3 baris data (bukan header) untuk test
  - [ ] Minimal 3 generasi (kakek/nenek, orang tua, anak)
  - [ ] Contoh relasi: married couple, parent-child relationship

- [ ] **Format data benar?**
  - [ ] Semua `id` unik (tidak ada duplikat)
  - [ ] Semua `gender` hanya "male" atau "female"
  - [ ] Semua `bdate` dalam format YYYY-MM-DD
  - [ ] Semua `photo` adalah URL (atau kosong)
  - [ ] Semua `pids`, `fid`, `mid` merujuk ke `id` yang ada

- [ ] **CSV URL sudah digenerate?**
  - [ ] File sudah di-publish ke web dengan format CSV
  - [ ] CSV URL sudah dicopy dan disimpan

- [ ] **CSV URL bisa diakses?**
  - [ ] Buka CSV URL di tab browser baru
  - [ ] Lihat apakah file menampilkan data dalam format CSV (bukan HTML table)
  - [ ] Data terlihat readable dan terstruktur dengan benar

---

## Troubleshooting & FAQ

### ❓ Q1: Saat buka CSV URL, tampilnya HTML table bukan plain CSV!

**Penyebab:** Format yang dipilih saat "Publish to web" adalah "Web page" bukan "Comma-separated values".

**Solusi:**
1. Kembali ke Google Sheets
2. Klik **File** → **Publish to web**
3. Di dropdown "Format", pastikan **"Comma-separated values (.csv)"** dipilih
4. Klik **Update** (bukan Publish)
5. Copy URL baru dan test lagi

---

### ❓ Q2: Data saya ada, tapi CSV URL ketika dibuka hanya menampilkan header (baris 1 saja)!

**Penyebab:** Data Anda mungkin baru dimasukkan dan Google belum tersinkronisasi, atau sheet yang dipublish bukan sheet tempat data Anda berada.

**Solusi:**
1. Tunggu 5-10 detik untuk Google sinkronisasi
2. Refresh browser (Ctrl+R)
3. Atau, buka CSV URL di tab baru dan refresh
4. Jika masih tidak muncul, pastikan Anda publish **Sheet1** yang benar (bukan sheet lain)

---

### ❓ Q3: Foto tidak muncul di website nanti, meskipun URL sudah benar!

**Penyebab Umum:**
- URL adalah **Google Drive share link**, bukan direct image link
- URL menunjuk ke halaman web, bukan file gambar langsung
- URL image memiliki akses restriction (harus login)

**Solusi:**
1. Gunakan **image hosting service** yang public-accessible:
   - **Imgur.com** (free, no login required)
   - **ImgBB.com** (free, no login required)
   - **Cloudinary** (free tier tersedia)
   - **Any public CDN** yang mendukung image
2. Upload foto Anda ke service tsb
3. Copy **direct image link** (biasanya format: `https://domain.com/image.jpg`)
4. Paste ke kolom `photo`
5. Test: buka link tsb di browser, harusnya langsung tampil gambar (bukan download dialog)

**Untuk Google Drive Share Link (JANGAN gunakan):**
- ❌ `https://drive.google.com/file/d/1abc23/view`
- ✅ `https://lh3.googleusercontent.com/d/1abc23` (extracted dari Drive, tapi tetap risky)

**Best practice:** Gunakan image hosting eksternal aja untuk kemudahan.

---

### ❓ Q4: Kolom `pids` saya isi "2" tapi di CSV muncul "2.0"!

**Penyebab:** Google Sheets secara default menginterpretasi angka sebagai number, bukan text.

**Solusi:**
1. Pilih kolom **pids** (A1:A1000 atau sesuai range data Anda)
2. Klik **Format** → **Number** → **123** (Plain text)
3. Atau, sebelum memasukkan data, format kolom sebagai **Text**

Alternatif cepat: Ketik `'2` (apostrophe di awal) agar Google tahu itu text.

---

### ❓ Q5: Tanggal lahir saya "1985-03-15" tapi di CSV muncul "45400" atau format lainnya!

**Penyebab:** Google Sheets auto-formatting tanggal menjadi format serial number.

**Solusi:**
1. Pilih kolom **bdate** (atau sel individual)
2. Klik **Format** → **Number** → **Custom number format**
3. Masukkan format: `yyyy-mm-dd`
4. Klik **Apply**

Atau, sebelum input, format kolom sebagai **Text** jika ingin text plain "1985-03-15" (tidak formatnya tanggal).

---

### ❓ Q6: Berapa banyak data yang bisa saya input?

**Jawab:** Google Sheets gratis bisa sampai **5 juta cells** per spreadsheet. Untuk silsilah keluarga (biasanya ratusan orang), tidak akan masalah. Tapi untuk best practice:
- Maksimal **500-1000 orang** per sheet untuk performa optimal
- Jika lebih, bisa split ke multiple sheets atau struktur lainnya

---

### ❓ Q7: Bisakah saya edit data kapan saja?

**Jawab:** **Ya!** Keuntungan Google Sheets. Kapanpun Anda edit data, Google otomatis update CSV yang published. Website akan auto-read data terbaru (tergantung cache browser, biasanya real-time atau dalam hitungan menit).

---

### ❓ Q8: Bisakah multiple admin mengedit data bersamaan?

**Jawab:** **Ya!** Share Google Sheets dengan akses **Editor** ke keluarga lain yang ingin input data. Mereka bisa edit tanpa harus coding atau access database.

**Cara share:**
1. Klik **Share** button
2. Masukkan email mereka
3. Pilih **Editor** permission
4. Klik **Share**
5. Mereka akan dapat email dan bisa langsung edit

---

## Best Practices & Tips

### 1️⃣ Backup Reguler
- Google Sheets sudah auto-backup, tapi jangan ragu untuk manual backup
- Sekali-kali (misal: monthly), download data sebagai Excel atau CSV:
  - **File** → **Download** → **Microsoft Excel** atau **Comma-separated values**

### 2️⃣ Data Validation untuk Kolom Gender
Agar tidak ada yang salah ketik di kolom `gender`:
1. Pilih kolom C (gender) dari C2 ke bawah
2. **Data** → **Data validation**
3. Pilih **List of items**
4. Masukkan: `male,female` (separated by comma)
5. Centang **Show dropdown arrow**
6. Klik **Done**

Sekarang orang hanya bisa pilih dari dropdown, tidak bisa asal ketik.

### 3️⃣ Konvensi Nama Konsisten
- Gunakan format **Nama Lengkap** yang konsisten (Title Case)
  - ✅ "Budi Santoso" (bukan "budi santoso" atau "BUDI SANTOSO")
- Untuk orang yang sama, gunakan nama yang sama di semua row
  - Jangan ada "Budi", "Budio", "Budi Santoso" (3 varian untuk 1 orang)

### 4️⃣ ID Generation Tips
- **Jika keluarga kecil (< 100 orang):** gunakan sequential (1, 2, 3, ...)
- **Jika keluarga besar:** gunakan alphanumeric untuk easier tracking (P001, P002, ...)
- **Jangan gunakan:** nama, email, atau data sensitif sebagai ID

### 5️⃣ Relationship Data Accuracy
Sebelum set `fid` / `mid` / `pids`:
- Pastikan mereka **actually exist** di data (ada `id`-nya)
- Pastikan **relasi timbal balik benar** (jika A adalah partner B, maka B juga harus list A)
  - Contoh: Jika person 1 `pids: 2`, maka person 2 juga harus `pids: 1`

### 6️⃣ Comment untuk Relasi Kompleks
Jika ada relasi kompleks (poligami, adopsi, mantan pasangan), gunakan **Comments** di Google Sheets:
1. Klik cell yang ingin diberi keterangan
2. **Insert** → **Comment**
3. Tulis catatan (misal: "Adopted by parent ID 5")
4. Orang lain yang edit bisa lihat keterangan ini

### 7️⃣ Kolom Opsional bisa Ditambah
Struktur 10 kolom di atas adalah **minimal yang required**. Anda bisa tambah kolom lainnya:
- `email`, `phone`, `occupation`, `married_date`, dll.
- Tapi pastikan **tidak mengubah urutan 10 kolom utama** (untuk kompatibilitas dengan website nantinya)

### 8️⃣ Security & Privacy
- **Jangan share URL CSV** ke publik (cukup share ke keluarga saja)
- Data "Viewer" access means orang bisa baca tapi tidak edit — ini sudah aman
- Jangan put sensitive data (SSN, bank account, dll) — treat ini sebagai public contact list

---

## Template Data Dummy

Di bawah ini adalah contoh struktur lengkap dengan data dummy yang bisa Anda **copy-paste langsung ke Google Sheets**:

### Cara Copy Template:
1. Copy tabel di bawah (select semua, Ctrl+C)
2. Buka Google Sheets Anda
3. Klik cell **A1**
4. Paste (Ctrl+V)
5. Otomatis akan split menjadi kolom-kolom

---

### Template: Keluarga 4 Generasi (Dengan Contoh Kompleks)

```
id	name	gender	pids	fid	mid	bdate	photo	panggilan	lokasi
1	Kakek Mardjo	male	2			1935-02-14		Kakek	Yogyakarta
2	Nenek Samsiyah	female			1937-09-22		Nenek	Yogyakarta
3	Ayah Haryanto	male	4	1	2	1960-01-10		Pak Hary	Yogyakarta
4	Ibu Sriwijaya	female		1	2	1962-05-20		Ibu Sri	Yogyakarta
5	Paman Sutrisno	male	6	1	2	1958-08-15		Pak Sutrisno	Yogyakarta
6	Bibi Nur Azizah	female		1	2	1965-03-10		Bu Nur	Jakarta
7	Budi Santoso	male	8	3	4	1985-06-25	https://example.com/budi.jpg	Budi	Jakarta
8	Siti Nurhaliza	female		3	4	1987-11-30	https://example.com/siti.jpg	Siti	Jakarta
9	Rina Santoso	female		3	4	1990-04-18		Rina	Surabaya
10	Ahmad Pratama	male		5	6	1988-07-22	https://example.com/ahmad.jpg	Ahmad	Bandung
11	Ahmad Santoso	male		7	8	2010-01-15		Mas Ahmad	Jakarta
12	Nuri Santoso	female		7	8	2012-09-10		Nuri	Jakarta
13	Reza Santoso	male		7	8	2015-03-05		Reza	Jakarta
14	Vina Kusuma	female	11			1988-12-20	https://example.com/vina.jpg	Vina	Jakarta
15	Bambang Setiawan	male		5	6	1987-05-12	https://example.com/bambang.jpg	Bambang	Surabaya
16	Eka Lestari	female	15		5	6	1992-08-25	https://example.com/eka.jpg	Eka	Surabaya
17	Dani Setiawan	male		15	16	2018-04-10		Dani	Surabaya
18	Dinda Setiawan	female		15	16	2020-11-22		Dinda	Surabaya
```

---

### Penjelasan Template Dummy:

| ID | Relasi | Catatan |
|----|--------|---------|
| 1-2 | Kakek & Nenek | Generasi 1 (root) |
| 3-4 | Ayah & Ibu Kandung (child dari 1-2) | Generasi 2 |
| 5-6 | Paman & Bibi (siblings dari 3, partner dari 5-6) | Generasi 2 |
| 7-8 | Budi & Siti (child dari 3-4, married couple 7-8) | Generasi 3 |
| 9 | Rina (child dari 3-4, single) | Generasi 3 |
| 10 | Ahmad (child dari 5-6) | Generasi 3 |
| 11-13 | Ahmad, Nuri, Reza (children dari 7-8, Budi's kids) | Generasi 4 |
| 14 | Vina (partner dari 11, Ahmad's wife) | Generasi 4 |
| 15-16 | Bambang & Eka (couple, Bambang child dari 5-6) | Generasi 3-4 |
| 17-18 | Dani & Dinda (children dari 15-16, Bambang's kids) | Generasi 4 |

**Features yang ditunjukkan:**
- ✅ Multi-generasi (kakek → cucu)
- ✅ Married couples (`pids` field)
- ✅ Parent-child relationships (`fid`, `mid`)
- ✅ Photo URLs (some populated, some empty)
- ✅ Optional fields (panggilan, lokasi)
- ✅ Complex family tree (siblings, cousins, in-laws)

---

## Ringkasan Tahap 1

Setelah menyelesaikan semua langkah di atas, Anda telah:

✅ **Membuat Google Sheets** dengan struktur data yang sesuai standar BALKAN  
✅ **Memasukkan data keluarga** dengan format yang benar  
✅ **Publish ke web** dalam format CSV  
✅ **Mendapatkan CSV URL** yang bisa diakses oleh website  
✅ **Verifikasi data** dengan checklist  
✅ **Siap untuk Tahap 2** (Development Frontend)

---

## Next Steps: Tahap 2 (Coming Soon)

Setelah Tahap 1 selesai, langkah berikutnya adalah **Tahap 2: Pengembangan Frontend** dimana akan:
- Membuat `index.html` dengan CDN PapaParse & BALKAN FamilyTree
- Menulis JavaScript untuk fetch CSV, parsing, dan render bagan
- Implementasi fitur pencarian dan "Ulang Tahun Bulan Ini"
- Deploy ke GitHub Pages

Tapi untuk sekarang, **Tahap 1 sudah complete!** 🎉

---

## Referensi & Dokumentasi

- **BALKAN FamilyTree JS:** https://balkan.app/FamilyTreeJS/Docs (untuk structure data yang compatible)
- **PapaParse:** https://www.papaparse.com/ (CSV parser library)
- **Google Sheets Help:** https://support.google.com/sheets/
- **GitHub Pages Docs:** https://pages.github.com/ (untuk fase berikutnya)

---

**Dokumen ini dibuat untuk Project Silsilah Keluarga (Family Tree) — Mei 2026**

Jika ada pertanyaan atau kendala, pastikan cek **Troubleshooting & FAQ** section terlebih dahulu. Jika masih belum terjawab, hubungi tech support / admin proyek.
