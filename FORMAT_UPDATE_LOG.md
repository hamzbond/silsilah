# 📋 Update Format Google Sheets - New Structure

**Tanggal:** 4 Juni 2026  
**Update:** Format Google Sheets yang lebih lengkap dan informatif

---

## ✨ Format Google Sheets Baru

Anda ingin mengubah struktur Google Sheets menjadi format yang lebih komprehensif. Berikut adalah kolom-kolom baru yang disupport:

### Kolom Baru (15 Kolom)

| No. | Kolom | Tipe | Wajib? | Contoh Data |
|-----|-------|------|--------|------------|
| A | `id` | Angka | ✅ | 1, 2, 3 |
| B | `nama` | Teks | ✅ | Ahmad Hamzah |
| C | `tgl_lahir` | Tanggal | ⭕ | 24 Juli 1996 |
| D | `Umur` | Angka | ⭕ | 29 (auto) |
| E | `jenis_kelamin` | L/P | ⭕ | L atau P |
| F | `id_pasangan` | Angka | ⭕ | 2 |
| G | `id_ayah` | Angka | ⭕ | 1 |
| H | `id_ibu` | Angka | ⭕ | 2 |
| I | `foto` | URL | ⭕ | https://... |
| J | `tgl_kematian` | Tanggal | ⭕ | 15 Juni 2020 |
| K | `telp` | Teks | ⭕ | 08133569517 |
| L | `email` | Email | ⭕ | nama@gmail.com |
| M | `panggilan` | Teks | ⭕ | Ahmad |
| N | `lokasi` | Teks | ⭕ | Gresik |
| O | `catatan` | Teks | ⭕ | Catatan tambahan |

---

## 📝 Penjelasan Perubahan Utama

### Format Tanggal
- **Old Format:** `YYYY-MM-DD` (e.g., `1996-07-24`)
- **New Format:** `DD Bulan YYYY` (e.g., `24 Juli 1996`) 
- **Support:** Kedua format bisa digunakan

### Format Jenis Kelamin
- **Old Format:** `male` / `female`
- **New Format:** `L` (Laki-laki) / `P` (Perempuan)
- **Support:** Kedua format bisa digunakan (case-insensitive)

### Pasangan
- **Old Format:** `pids: 2,5,8` (multiple pasangan dengan koma)
- **New Format:** `id_pasangan: 2` (single ID only)
- **Note:** Untuk poligami, gunakan single ID yang utama

### Kolom Baru
- `tgl_kematian` - Tanggal wafat (opsional)
- `telp` - Nomor telepon (opsional)
- `email` - Alamat email (opsional)
- `catatan` - Keterangan tambahan (opsional)
- `Umur` - Otomatis dihitung dari tgl_lahir

---

## 🔄 Backward Compatibility

**Kabar Baik!** Kode sudah di-update untuk support **KEDUA FORMAT** sekaligus:

### Format Lama (Old Format) - Still Works ✅
```
Kolom: id, name, gender, pids, fid, mid, bdate, photo, panggilan, lokasi
Contoh: 1 | Budi | male | 2 | 3 | 4 | 1990-01-10 | https://... | Budi | Jakarta
```

### Format Baru (New Format) - Recommended ✅
```
Kolom: id, nama, tgl_lahir, Umur, jenis_kelamin, id_pasangan, id_ayah, id_ibu, foto, tgl_kematian, telp, email, panggilan, lokasi, catatan
Contoh: 1 | Budi | 10 Januari 1990 | 34 | L | 2 | 3 | 4 | https://... | | 08... | budi@... | Budi | Jakarta | Catatan
```

---

## 📱 Modal Profile - Field Baru

Ketika user klik profile, modal sekarang menampilkan:

### Field yang Ditampilkan:
- ✅ Nama + Panggilan
- ✅ Foto (atau avatar default)
- ✅ Jenis Kelamin
- ✅ **Tanggal Lahir + Umur (auto-calculated)**
- ✅ **Tanggal Wafat** (jika ada)
- ✅ Lokasi
- ✅ **Telepon** (jika ada)
- ✅ **Email** (jika ada)
- ✅ Keluarga (Orang Tua, Pasangan, Anak)
- ✅ **Catatan** (jika ada)

---

## 🚀 Update Checklist

- ✅ **Code Updated** - `js/data.js` support format baru
- ✅ **Date Parsing** - Support `YYYY-MM-DD` dan `DD Bulan YYYY`
- ✅ **Gender Parsing** - Support `male/female` dan `L/P`
- ✅ **Modal Updated** - Menampilkan kolom baru
- ✅ **Dummy Data** - Updated ke format baru
- ✅ **Documentation** - TAHAP1_PANDUAN_SETUP.md updated
- ✅ **Backward Compatible** - Format lama tetap support

---

## 📋 Template Copy-Paste

Gunakan ini untuk membuat header di Google Sheets baru:

```
id	nama	tgl_lahir	Umur	jenis_kelamin	id_pasangan	id_ayah	id_ibu	foto	tgl_kematian	telp	email	panggilan	lokasi	catatan
```

Paste di cell A1, Google Sheets otomatis split by tab.

---

## 🔗 Contoh Data Format Baru

```
1	Ahmad Hamzah	24 Juli 1996	29	L	2					hamzbond@gmail.com	Ahmad	Gresik	
2	Rizki Sakinah Dewi	8 April 1997	29	P	1					devi@gmail.com	Dewi	Gresik	
3	Ibu Kusuma	10 Januari 1960	64	P	4	1	2			08123456789	ibu@gmail.com	Kusuma	Jakarta	
```

---

## ❓ FAQ

**Q: Boleh mix format (old + new)?**
A: Ya! Bisa. Kode auto-detect format dan adapt.

**Q: Format lama bisa pindah ke format baru?**
A: Ya, tinggal ubah header kolom dan data di Google Sheets.

**Q: Kolom lama (pids dengan koma) masih di-support?**
A: Ya untuk backward compatibility, tapi recommended gunakan single ID (id_pasangan).

**Q: Umur perlu di-isi manual?**
A: Tidak, kosongkan saja. Website auto-hitung dari tgl_lahir.

**Q: Tanggal bisa format berbeda di setiap row?**
A: Ya, bisa mixed (`2024-06-04` dan `4 Juni 2024` dalam sheet yang sama).

---

## 📞 Testing

Sudah tested dengan dummy data:
- ✅ 9 records loaded
- ✅ All fields parsed correctly
- ✅ Date conversion working
- ✅ Gender mapping working
- ✅ Modal displays new fields
- ✅ Birthday calculation working

**Ready for production!** 🚀
