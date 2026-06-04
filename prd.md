# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Nama Proyek:** Website Silsilah Keluarga (Family Tree)  
**Platform:** Web (Static Hosting)  
**Status Dokumen:** Draf Awal  
**Target Rilis:** *TBD (To Be Determined)*  

---

## 1. Pendahuluan

### 1.1 Latar Belakang
Mendokumentasikan silsilah keluarga besar seringkali terkendala oleh pencatatan manual yang sulit diakses bersama dan sulit divisualisasikan, terutama ketika ada relasi kompleks seperti pernikahan ganda atau anak sambung. Diperlukan sebuah platform digital yang mudah diakses, tanpa biaya pemeliharaan (*zero-cost*), namun memiliki visualisasi hierarki yang rapi dan interaktif.

### 1.2 Tujuan Proyek
*   Menyediakan website silsilah keluarga yang bisa diakses secara *online* oleh seluruh anggota keluarga.
*   Memastikan biaya operasional *server* dan *database* adalah Rp0 (sepenuhnya gratis).
*   Memudahkan proses *input* data oleh pihak non-teknis tanpa harus berurusan dengan koding atau *database query*.

---

## 2. Pengguna & Hak Akses (Roles)

Proyek ini menggunakan model otorisasi sederhana berdasarkan akses sumber data:
*   **Administrator / Editor (Data Entry):** Anggota keluarga yang memiliki akses *edit* ke file Google Sheets. Mereka bertugas menambah, mengubah, atau menghapus data profil dan relasi.
*   **Viewer (Pengunjung Web):** Seluruh anggota keluarga yang memiliki tautan website (GitHub Pages). Hanya memiliki akses *read-only* (melihat bagan, mencari nama, dan melihat detail profil).

---

## 3. Spesifikasi Fitur Utama (Core Features)

### 3.1 Visualisasi Pohon Keluarga (Interactive Tree)
*   **Deskripsi:** Layar utama yang menampilkan bagan hierarki keluarga.
*   **Kebutuhan Teknis:**
    *   Mendukung fungsi *Zoom In, Zoom Out, Pan & Drag*.
    *   Mendukung *Collapsible Nodes* (menyembunyikan/menampilkan cabang keturunan).
    *   Mampu merender relasi kompleks: Suami/Istri tunggal, poligami/pernikahan berulang, garis ayah, dan garis ibu tanpa membuat garis silsilah saling tumpang tindih.

### 3.2 Profil Detail Anggota (Detail Form)
*   **Deskripsi:** Panel yang muncul ketika pengunjung mengklik foto/nama salah satu anggota keluarga di dalam bagan.
*   **Data yang ditampilkan:** Nama lengkap, nama panggilan, tempat & tanggal lahir, foto wajah, status (hidup/wafat), dan kontak/sosmed (opsional).

### 3.3 Pencarian Cerdas (Smart Search)
*   **Deskripsi:** *Search bar* terintegrasi untuk mencari anggota keluarga.
*   **Kebutuhan Teknis:** Fitur pencarian otomatis menyorot (*auto-focus*) dan menggeser layar ke posisi kotak anggota yang dicari. Pencarian minimal berdasarkan parameter `name` (Nama).

### 3.4 Widget "Ulang Tahun Bulan Ini" (Custom Timeline)
*   **Deskripsi:** Sebuah modul/kotak kecil di sudut UI (atau *modal pop-up*) yang menampilkan daftar anggota keluarga yang berulang tahun pada bulan berjalan.
*   **Kebutuhan Teknis:** JavaScript melakukan filter pada data JSON (berdasarkan kolom `bdate`) dan mencocokkannya dengan `new Date().getMonth()` pada saat web diakses.

---

## 4. Arsitektur & Teknologi (Tech Stack)

*   **Hosting:** GitHub Pages (Static Hosting)
*   **Frontend (UI/UX):** Vanilla JavaScript & HTML5 (Tanpa framework berat).
*   **Database:** Google Sheets (dipublikasikan sebagai Web / format CSV).
*   **Library Parser:** PapaParse (Mengubah format CSV dari Google Sheets menjadi struktur JSON).
*   **Library Visualisasi:** BALKAN FamilyTree JS (Merender JSON menjadi bagan hierarki interaktif di DOM).

---

## 5. Struktur Data (Database Schema)

Struktur di bawah ini adalah kolom (*header*) wajib yang harus ada di Baris 1 pada lembar kerja Google Sheets.

| Nama Kolom | Tipe Data | Keterangan | Wajib/Opsional |
| :--- | :--- | :--- | :--- |
| `id` | String/Int | ID Unik untuk setiap orang (contoh: 1, 2, 3, dst). | **Wajib** |
| `name` | String | Nama lengkap yang akan tampil di bagan utama. | **Wajib** |
| `gender` | String | Diisi `male` (laki-laki) atau `female` (perempuan). Menentukan warna kotak bawaan. | **Wajib** |
| `pids` | String | Partner IDs (Suami/Istri). Jika lebih dari 1, pisahkan dengan koma (contoh: 2, 5). | Opsional |
| `fid` | String/Int | Father ID. Merujuk pada `id` Ayah kandung. | Opsional |
| `mid` | String/Int | Mother ID. Merujuk pada `id` Ibu kandung. | Opsional |
| `bdate` | Date | Tanggal lahir (Format YYYY-MM-DD). Digunakan untuk widget ulang tahun. | Opsional |
| `photo` | URL | Tautan URL foto profil. | Opsional |
| `panggilan`| String | Nama panggilan sehari-hari. | Opsional |
| `lokasi` | String | Kota domisili saat ini. | Opsional |

---

## 6. Alur Sistem (System Flow)

1.  **Data Entry:** Admin memasukkan data keluarga baru di baris terbawah Google Sheets. Google Sheets otomatis memperbarui tautan CSV *Publish to Web*.
2.  **Client Request:** Viewer membuka tautan GitHub Pages melalui *browser*.
3.  **Data Fetching:** JavaScript melakukan fungsi `fetch()` ke URL CSV Google Sheets.
4.  **Parsing:** PapaParse mengonversi teks CSV menjadi *Array of Objects* (JSON).
5.  **Filtering (Custom):** JavaScript memisahkan data spesifik untuk merender Widget Ulang Tahun.
6.  **Rendering:** BALKAN FamilyTree membaca JSON utama dan menggambar pohon silsilah secara visual di layar.

---

## 7. Rencana Eksekusi (Milestones)

*   **Tahap 1: Persiapan Infrastruktur (Setup)**
    *   [ ] Membuat repository di GitHub & mengaktifkan fitur GitHub Pages.
    *   [ ] Membuat file Google Sheets dengan *header* yang sesuai standar BALKAN.
    *   [ ] Mengaktifkan *Publish to web* (format CSV) di Google Sheets.

*   **Tahap 2: Pengembangan Frontend (Development)**
    *   [ ] Membuat `index.html` dan menyematkan CDN untuk PapaParse dan BALKAN FamilyTree.
    *   [ ] Menulis fungsi JavaScript untuk *fetch* data CSV, *parsing*, dan *render* bagan utama.
    *   [ ] Menulis logika kustom JavaScript untuk fitur "Ulang Tahun Bulan Ini".

*   **Tahap 3: Uji Coba & Deployment (Testing)**
    *   [ ] Memasukkan data *dummy* minimal 3 generasi (termasuk kasus poligami/anak sambung) ke Google Sheets.
    *   [ ] Memastikan bagan dirender dengan sempurna tanpa *error* di *console*.
    *   [ ] Uji coba performa dan UI/UX di perangkat *mobile* (responsivitas).
    *   [ ] Rilis tautan web ke keluarga dan memulai proses *input* data riil.