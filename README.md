# EasyGo - Your Journey, Made Easy.

Website simulasi pemesanan tiket (pesawat, kereta api, bus) untuk tugas kuliah.
Seluruh data adalah **data simulasi**, bukan jadwal atau harga real-time, dan tidak ada pembayaran sungguhan.

## Arsitektur: website dan program C++ terpisah

| File | Fungsi |
|---|---|
| `index.html`, `style.css`, `script.js` | Website untuk pengguna (HTML, CSS, JavaScript). Jalan langsung di browser, tanpa server. Tidak menampilkan log algoritma. |
| `tiket.cpp` | Program C++ mandiri untuk demonstrasi **struct, array, pointer, Bubble Sort, Linear Search** lengkap dengan log langkah. |

**Penting (jujur):** website **tidak terhubung** ke program C++. Browser tidak bisa menjalankan C++ dan tidak ada backend.
Di `script.js`, pencarian dan pengurutan ditulis ulang dalam JavaScript (logika dan data sama dengan `tiket.cpp`) dan berjalan di balik layar; pengguna hanya melihat hasilnya.
Objek JavaScript bukan struct C++ dan JavaScript tidak punya pointer, sehingga bukti Struct/Array/Pointer hanya ada di `tiket.cpp`.

```
EasyGo/
├── index.html
├── style.css
├── script.js
├── tiket.cpp
└── README.md
```

## Menjalankan website

1. Simpan kelima file dalam satu folder.
2. Klik dua kali `index.html` (atau seret ke browser). Tidak perlu server.
3. Font (Fredoka, Nunito) dan foto destinasi butuh internet. Tanpa internet, font diganti font sistem dan gambar destinasi tetap tampil sebagai ilustrasi SVG bawaan.

### Foto destinasi
Foto asli destinasi diambil browser dari Wikipedia (foto utama artikel seperti Tanah Lot, Prambanan, Marina Bay Sands) saat halaman dibuka. Judul artikelnya ada di `const DEST` pada `script.js` (properti `wiki`); ganti bila ingin foto lain. Jika offline atau gagal, ilustrasi SVG pastel otomatis tampil. Foto tidak disimpan di proyek ini.

## Mengompilasi dan menjalankan program C++

Butuh compiler C++ (g++). Windows: MinGW-w64 atau MSYS2. macOS: `xcode-select --install`. Linux: `sudo apt install g++`.

```
g++ -std=c++11 -Wall tiket.cpp -o tiket
./tiket          (Windows: tiket.exe)
```

Menu: 1 Demo Struct/Array/Pointer, 2 Daftar tiket, 3 Bubble Sort (dengan log), 4 Linear Search (dengan log), 0 Keluar.

## Konsep tugas di `tiket.cpp`

- **Struct:** `struct Tiket` menggabungkan 10 atribut dalam satu tipe data.
- **Array:** `Tiket dataTiket[51]`, indeks 0 sampai 50, contoh akses `dataTiket[2].harga`.
- **Pointer:** `Tiket* ptr = &dataTiket[0];`, `ptr->id`, `*ptr`, `ptr + 3`. Bubble Sort memakai `Tiket* a = arr + j`, Linear Search berjalan dengan `for (Tiket* p = arr; p < arr + n; p++)`.
- **Bubble Sort:** membandingkan elemen bersebelahan dan menukar bila urutan salah, O(n²). Log menampilkan tiap perbandingan dan pertukaran.
- **Linear Search:** memeriksa dari indeks 0 sampai akhir, cocok bila nilai atribut mengandung kata kunci (tidak peka huruf besar/kecil), O(n).

## Fitur website

Pencarian tiket (jenis, kota asal, kota tujuan) untuk rute domestik dan internasional (8 kota Indonesia, 27 kota luar negeri di semua benua; pesawat memakai ikon lepas landas/mendarat dan opsi pulang pergi, kereta api dan bus hanya rute nasional), filter harga maksimal dan jumlah penumpang, pengurutan (termurah, termahal, paling awal, tercepat), detail dan pemesanan dengan validasi, total harga, kode booking `EG-XXXXXXXX`, riwayat di localStorage, pembatalan dengan pengembalian kursi, serta atur ulang filter.

## Data tiket

51 tiket simulasi: T01-T18 domestik, T19-T51 penerbangan internasional ke semua benua. Satu tiket (T42) sengaja berkursi 0 untuk menguji label Sudah habis. Data di `script.js` dan `tiket.cpp` identik. Jam tiba dihitung dari durasi tanpa zona waktu.

## Skenario pengujian

| Uji | Langkah | Hasil yang benar |
|---|---|---|
| Pencarian | Beranda: Pesawat, Jakarta, Surabaya, pilih tanggal, Cari Tiket | 2 tiket (T01, T02) |
| Validasi kota | Asal dan tujuan sama | Pesan "tidak boleh sama" |
| Urut harga | Atur ulang, Urutkan: Harga termurah | T14 (Rp70.000), lalu T13 |
| Urut waktu | Urutkan: Keberangkatan paling awal | T11 (05:40), lalu T12 (06:00) |
| Rute internasional | Pesawat, Jakarta, Tokyo | 1 tiket (T26) |
| Kartu destinasi | Klik kartu Singapura di beranda | 3 tiket menuju Singapura |
| Pemesanan | Pesan tiket, data valid, 2 penumpang | Kode booking, total 2 x harga, muncul di Riwayat, kursi berkurang 2 |
| Validasi booking | Penumpang melebihi kursi (T16 maksimal 3), email salah | Pesan error per kolom |
| Pembatalan | Riwayat, Batalkan | Status "Dibatalkan", kursi kembali |
| Rute tidak ada | Kereta Api, Jakarta, Denpasar | Pesan "Tidak ada rute" plus tombol alternatif |
| Tiket habis | Pesawat, Jakarta, Paris | Kartu berlabel "Sudah habis", tombol nonaktif |
| C++ | Menu 3, harga termurah | 810 perbandingan, 224 pertukaran (data 51 tiket) |
| C++ | Menu 4, atribut Kota tujuan, `surabaya` | 51 elemen diperiksa, 4 tiket ditemukan |
| C++ | Menu 1 | Alamat `ptr` sama dengan `&dataTiket[0]`; `ptr + 3` menunjuk T04 |

## Saran alur presentasi

1. Tunjukkan website: cari tiket, filter, urutkan, pesan, riwayat, batalkan.
2. Jelaskan bahwa algoritma di website berjalan di balik layar.
3. Buka `tiket.cpp` di IDE, jelaskan struct, array, pointer, lalu jalankan menu 1, 3, dan 4 untuk menunjukkan log.

## Keterbatasan

- Data simulasi; jadwal dianggap berlaku harian dan tanggal pilihan pengguna dipakai sebagai tanggal keberangkatan.
- Sisa kursi dihitung per tiket (bukan per tanggal) dan disimpan di localStorage browser ini.
- Tidak ada pembayaran, login, atau server.
