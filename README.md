# 🌳 Silsilah Keluarga - Interactive Family Tree Website

Website pohon silsilah keluarga yang interaktif, responsif, dan gratis. Data disimpan di Google Sheets dan ditampilkan sebagai bagan pohon keluarga yang dinamis dengan fitur pencarian dan widget ulang tahun.

---

## ✨ Fitur Utama

- **🌲 Pohon Silsilah Interaktif** — Visualisasi hierarki keluarga dengan BALKAN FamilyTree JS
  - Zoom in/out, pan & drag untuk navigasi
  - Collapse/expand nodes untuk menyembunyikan cabang
  - Support relasi kompleks (poligami, anak sambung, multi-generasi)

- **🔍 Pencarian Cerdas** — Cari anggota keluarga by name atau panggilan
  - Real-time search dengan highlighting
  - Auto-focus pada hasil pencarian
  - Navigasi antar hasil dengan Enter key

- **👤 Profile Detail** — Modal popup dengan informasi lengkap
  - Nama, panggilan, foto, tanggal lahir, lokasi
  - Hubungan keluarga (orang tua, pasangan, anak)
  - Hitung usia otomatis dari tanggal lahir

- **🎂 Widget Ulang Tahun** — Daftar orang yang berulang tahun bulan ini
  - Fixed widget di top-right corner
  - Collapse/expand untuk menghemat space
  - Click untuk fokus dan lihat detail

- **📱 Responsive Design** — Optimal untuk desktop, tablet, dan mobile
  - Touch-friendly interface
  - Zoom works on mobile devices
  - Minimal/clean design untuk performa optimal

---

## 🚀 Quick Start

### 1. Clone/Download Repository
```bash
# Clone dari GitHub (atau download as ZIP)
git clone <your-github-repo-url>
cd silsilah
```

### 2. Siapkan Data di Google Sheets
Ikuti panduan di **TAHAP1_PANDUAN_SETUP.md** untuk:
- Membuat Google Sheets dengan struktur data yang benar
- Publish ke web dalam format CSV
- Copy URL CSV yang published

### 3. Update CSV URL di Kode
Edit file `js/data.js`, ubah URL di bagian:
```javascript
class DataManager {
    constructor() {
        this.csvUrl = 'YOUR_GOOGLE_SHEETS_CSV_URL_HERE'; // ← Update ini
        // ...
    }
}
```

Ganti dengan URL CSV Anda dari Google Sheets (format: `https://docs.google.com/spreadsheets/d/.../export?format=csv&gid=0`)

### 4. Open in Browser
Buka `index.html` dengan browser lokal:
- Buka file manager, navigate ke folder project
- Double-click `index.html`
- Browser akan membuka website secara otomatis

**Atau** gunakan local server (recommended):
```bash
# Dengan Python 3
python -m http.server 8000

# Dengan Node.js (npm)
npx http-server

# Dengan VS Code Live Server extension
# Klik "Go Live" di bottom-right
```

Kemudian akses: `http://localhost:8000`

---

## 📋 Data Schema

Struktur data di Google Sheets harus sesuai dengan schema ini:

| Kolom | Tipe | Required? | Keterangan |
|-------|------|-----------|-----------|
| `id` | String/Int | ✅ | ID unik setiap orang (1, 2, 3, atau P001, P002, ...) |
| `name` | String | ✅ | Nama lengkap yang tampil di pohon |
| `gender` | String | ✅ | `male` atau `female` saja |
| `pids` | String | ⭕ | Partner IDs (suami/istri), pisahkan koma: "2,5" |
| `fid` | String/Int | ⭕ | Father ID (ID ayah kandung) |
| `mid` | String/Int | ⭕ | Mother ID (ID ibu kandung) |
| `bdate` | Date | ⭕ | Tanggal lahir (format: YYYY-MM-DD) |
| `photo` | URL | ⭕ | URL ke foto profil |
| `panggilan` | String | ⭕ | Nama panggilan sehari-hari |
| `lokasi` | String | ⭕ | Kota domisili |

Contoh data:
```
id  | name             | gender | pids | fid | mid | bdate      | photo | panggilan | lokasi
----|------------------|--------|------|-----|-----|------------|-------|-----------|--------
1   | Kakek Mardjo     | male   |      |     |     | 1935-02-14 |       | Kakek     | Yogya
2   | Nenek Samsiyah   | female |      |     |     | 1937-09-22 |       | Nenek     | Yogya
3   | Ayah Haryanto    | male   | 4    | 1   | 2   | 1960-01-10 |       | Pak Hary  | Yogya
4   | Ibu Sriwijaya    | female |      | 1   | 2   | 1962-05-20 |       | Ibu Sri   | Yogya
5   | Budi Santoso     | male   | 6    | 3   | 4   | 1985-06-25 | URL.. | Budi      | Jakarta
```

Lihat **TAHAP1_PANDUAN_SETUP.md** untuk detail lengkap.

---

## 🌐 Deploy ke GitHub Pages

### Prerequisites
- GitHub account
- Git installed

### Langkah-langkah

1. **Buat Repository di GitHub**
   - Go to github.com
   - Click "New repository"
   - Name: `silsilah` (atau nama lain)
   - Public repository
   - Click "Create repository"

2. **Push Kode ke GitHub**
   ```bash
   # Dari folder project root
   git init
   git add .
   git commit -m "Initial commit: Family tree website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/silsilah.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go ke repository settings
   - Scroll to "GitHub Pages" section
   - Source: Branch `main`, folder `/ (root)`
   - Click "Save"
   - Wait 1-2 minutes untuk build

4. **Access Website**
   - Website akan tersedia di: `https://YOUR_USERNAME.github.io/silsilah/`
   - Share link dengan keluarga!

### Update Data
Setiap kali data di Google Sheets diupdate:
1. Data otomatis akan sync ke website (real-time atau cache refresh)
2. Tidak perlu push ke GitHub lagi
3. Hanya butuh klik refresh di browser

---

## ⚙️ Customization

### Ubah CSV URL
Edit `js/data.js`:
```javascript
this.csvUrl = 'YOUR_NEW_CSV_URL';
```

### Ubah Warna
Edit `css/style.css` di bagian `:root`:
```css
:root {
    --primary-blue: #2563eb;      /* Tree male color */
    --primary-pink: #ec4899;      /* Tree female color */
    --text-dark: #1f2937;         /* Text color */
    /* ... etc */
}
```

### Ubah Font
Edit `css/style.css`:
```css
--font-family: 'Your Font Name', sans-serif;
```

### Ubah Layout
Edit `css/style.css` atau `index.html` untuk mengatur posisi widgets, ukuran, dll.

---

## 🐛 Troubleshooting

### Q: Website tidak loading, blank screen
**A:** Cek console di browser (F12 → Console) untuk errors:
- Pastikan CSV URL benar di `js/data.js`
- Pastikan URL CSV accessible (buka di tab baru)
- Pastikan BALKAN library CDN link valid

### Q: Data tidak muncul
**A:**
- Pastikan Google Sheets di-publish ke web dalam format CSV
- Check console untuk parse errors
- Pastikan header kolom di Google Sheets match dengan schema (exact names)
- Refresh browser (Ctrl+R atau Cmd+R)

### Q: Pohon tidak render dengan benar
**A:**
- Pastikan semua data valid:
  - ID unik (tidak ada duplikat)
  - Gender hanya "male" atau "female"
  - Dates dalam format YYYY-MM-DD
  - `pids`, `fid`, `mid` merujuk ke ID yang ada
- Jika masih error, buka console dan cari error message spesifik

### Q: Photos tidak muncul
**A:**
- Pastikan URL foto adalah direct link ke image (bukan Google Drive share link)
- Buka URL di browser untuk test apakah accessible
- Gunakan image hosting public (Imgur, ImgBB, dll)

### Q: Search tidak bekerja
**A:**
- Pastikan data sudah loaded (check console)
- Ketik exact atau partial nama (case-insensitive)
- Try searching dengan panggilan (nickname) juga

### Q: Birthday widget tidak tampil
**A:**
- Pastikan ada orang dengan `bdate` di bulan ini
- Check format `bdate` adalah YYYY-MM-DD
- Refresh page dan check console untuk errors

---

## 📚 Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Tree Visualization:** BALKAN FamilyTree JS
- **Data Parsing:** PapaParse (CSV → JSON)
- **Hosting:** GitHub Pages (static)
- **Data Source:** Google Sheets (CSV export)

---

## 📖 Dokumentasi

- **Tahap 1 Guide:** [TAHAP1_PANDUAN_SETUP.md](TAHAP1_PANDUAN_SETUP.md) — Panduan membuat Google Sheets & publish CSV
- **BALKAN Docs:** https://balkan.app/FamilyTreeJS/Docs
- **PapaParse Docs:** https://www.papaparse.com/docs

---

## 🎯 Fitur Planned untuk Masa Depan

- [ ] Export to PDF/Image
- [ ] Print-friendly view
- [ ] Edit mode (admin login)
- [ ] Multiple tree roots
- [ ] Timeline view
- [ ] Statistics & analytics
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Mobile app (PWA)

---

## 📝 License

Bebas digunakan untuk project pribadi/keluarga.

---

## ❓ Support

Jika ada masalah atau pertanyaan:
1. Baca troubleshooting section di atas
2. Check browser console (F12) untuk error details
3. Cek data di Google Sheets (format, spelling, dll)
4. Refresh browser dan try again

---

**Made with ❤️ for Family Tree Documentation**

Dibuat untuk Project Silsilah Keluarga — Mei 2026
