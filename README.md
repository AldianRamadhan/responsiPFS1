# Dashboard Data Mahasiswa & Akademik

Aplikasi Dashboard Admin CRUD berbasis web (SPA) untuk **Responsi 1 Pemrograman Fullstack**, Universitas 'Aisyiyah Yogyakarta.

## Teknologi
- Vite
- React 19
- Bootstrap 5
- jQuery 3 (efek visual saja, di luar state React)
- Penyimpanan data: state lokal React + localStorage browser (tanpa backend)

## Fitur
- **Read**: Tabel daftar mahasiswa (No, NIM, Nama, Prodi, IPK, Status, Aksi)
- **Search**: Pencarian real-time berdasarkan NIM, Nama, atau Prodi
- **Create**: Modal form tambah data mahasiswa
- **Update**: Modal form edit data mahasiswa
- **Delete**: Dialog konfirmasi sebelum menghapus data
- **Responsif**: Tampilan desktop, tablet, dan mobile

## Cara Menjalankan

```bash
# 1. Install dependensi
npm install

# 2. Jalankan mode development
npm run dev
```

Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`).

## Build Production

```bash
npm run build
npm run preview
```
