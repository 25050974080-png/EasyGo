// =====================================================================
//  EasyGo - tiket.cpp
//  Demonstrasi tugas: STRUCT, ARRAY, POINTER, BUBBLE SORT, LINEAR SEARCH
//  Data tiket sama persis dengan array TIKET di script.js.
//  Program ini BERDIRI SENDIRI (terpisah dari website) dan menjadi tempat
//  semua log langkah algoritma untuk keperluan presentasi.
//  Kompilasi : g++ -std=c++11 -Wall tiket.cpp -o tiket
//  Jalankan  : ./tiket   (Windows: tiket.exe)
// =====================================================================
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

// ---------- STRUCT: mengelompokkan atribut tiket dalam satu tipe data ----------
struct Tiket {
    string id;
    string jenis;        // Pesawat / Kereta Api / Bus
    string namaOperator; // maskapai / operator
    string asal;
    string tujuan;
    string tanggal;      // YYYY-MM-DD
    string berangkat;    // "HH:MM"
    int    durasi;       // menit
    int    harga;        // rupiah (angka asli)
    int    kursi;        // kursi tersedia
};

// ---------- ARRAY: 51 tiket simulasi (T01-T18 domestik, T19-T51 internasional ke semua benua) (indeks 0 sampai 50) ----------
const int JUMLAH = 51;
Tiket dataTiket[JUMLAH] = {
    {"T01","Pesawat",   "Garuda Indonesia",  "Jakarta",   "Surabaya",  "2026-10-20","06:30",100,1150000,12},
    {"T02","Pesawat",   "Lion Air",          "Jakarta",   "Surabaya",  "2026-10-20","09:15",105, 780000,24},
    {"T03","Pesawat",   "Citilink",          "Jakarta",   "Denpasar",  "2026-10-21","11:00",165,1350000, 8},
    {"T04","Pesawat",   "Batik Air",         "Surabaya",  "Medan",     "2026-10-22","13:40",215,1900000,15},
    {"T05","Pesawat",   "Super Air Jet",     "Bandung",   "Denpasar",  "2026-10-21","07:50",150,1050000,20},
    {"T06","Kereta Api","Argo Bromo Anggrek","Jakarta",   "Surabaya",  "2026-10-20","08:20",540, 620000,30},
    {"T07","Kereta Api","Taksaka",           "Jakarta",   "Yogyakarta","2026-10-23","20:45",485, 480000,18},
    {"T08","Kereta Api","Argo Wilis",        "Bandung",   "Surabaya",  "2026-10-22","07:00",570, 550000,22},
    {"T09","Kereta Api","Gajayana",          "Malang",    "Jakarta",   "2026-10-24","16:50",900, 710000,10},
    {"T10","Kereta Api","Mutiara Selatan",   "Bandung",   "Yogyakarta","2026-10-23","19:30",520, 330000,26},
    {"T11","Kereta Api","Sembrani",          "Semarang",  "Jakarta",   "2026-10-21","05:40",330, 390000,14},
    {"T12","Bus",       "Sinar Jaya",        "Jakarta",   "Bandung",   "2026-10-20","06:00",180, 120000,35},
    {"T13","Bus",       "Rosalia Indah",     "Yogyakarta","Semarang",  "2026-10-22","10:30",200,  95000,28},
    {"T14","Bus",       "Harapan Jaya",      "Surabaya",  "Malang",    "2026-10-20","08:00",120,  70000,40},
    {"T15","Bus",       "Pahala Kencana",    "Jakarta",   "Semarang",  "2026-10-21","19:00",420, 210000,22},
    {"T16","Bus",       "Gunung Harta",      "Surabaya",  "Denpasar",  "2026-10-23","17:30",600, 250000, 3},
    {"T17","Bus",       "Lorena",            "Malang",    "Yogyakarta","2026-10-24","21:00",480, 185000,16},
    {"T18","Pesawat",   "Garuda Indonesia",  "Yogyakarta","Denpasar",  "2026-10-22","14:10",100, 890000, 9},
    {"T19","Pesawat","Singapore Airlines","Jakarta","Singapura","2026-10-25","07:10",110,2150000,14},
    {"T20","Pesawat","Scoot","Surabaya","Singapura","2026-10-25","10:20",135,1650000,18},
    {"T21","Pesawat","AirAsia","Denpasar","Singapura","2026-10-26","12:30",165,1450000,22},
    {"T22","Pesawat","Malaysia Airlines","Jakarta","Kuala Lumpur","2026-10-25","08:45",125,1850000,16},
    {"T23","Pesawat","AirAsia","Surabaya","Kuala Lumpur","2026-10-26","14:05",170,1350000,25},
    {"T24","Pesawat","Thai Airways","Jakarta","Bangkok","2026-10-27","09:30",210,3200000,10},
    {"T25","Pesawat","Garuda Indonesia","Denpasar","Tokyo","2026-10-27","23:15",460,7450000,8},
    {"T26","Pesawat","Japan Airlines","Jakarta","Tokyo","2026-10-28","21:50",465,8900000,12},
    {"T27","Pesawat","Korean Air","Jakarta","Seoul","2026-10-28","22:30",420,7200000,9},
    {"T28","Pesawat","Qantas","Denpasar","Sydney","2026-10-29","06:15",380,5600000,11},
    {"T29","Pesawat","Emirates","Jakarta","Dubai","2026-10-29","02:40",500,9800000,7},
    {"T30","Pesawat","Singapore Airlines","Singapura","Tokyo","2026-10-30","08:00",400,6900000,13},
    {"T31","Pesawat","Philippine Airlines","Jakarta","Manila","2026-10-26","09:00",235,2650000,15},
    {"T32","Pesawat","Cathay Pacific","Jakarta","Hong Kong","2026-10-27","10:40",330,4300000,12},
    {"T33","Pesawat","Air India","Jakarta","New Delhi","2026-10-28","23:10",360,5900000,10},
    {"T34","Pesawat","SriLankan Airlines","Jakarta","Kolombo","2026-10-29","13:20",300,4800000,14},
    {"T35","Pesawat","Uzbekistan Airways","Jakarta","Tashkent","2026-10-30","01:30",780,9400000,6},
    {"T36","Pesawat","Air Astana","Jakarta","Almaty","2026-10-30","04:15",840,10200000,5},
    {"T37","Pesawat","Qatar Airways","Jakarta","Doha","2026-10-28","20:05",600,8700000,11},
    {"T38","Pesawat","Saudia","Jakarta","Jeddah","2026-10-29","17:45",540,8100000,13},
    {"T39","Pesawat","Turkish Airlines","Jakarta","Istanbul","2026-10-29","22:30",720,10800000,9},
    {"T40","Pesawat","KLM","Jakarta","Amsterdam","2026-10-30","14:25",800,11900000,8},
    {"T41","Pesawat","British Airways","Jakarta","London","2026-10-30","23:50",960,13200000,6},
    {"T42","Pesawat","Air France","Jakarta","Paris","2026-10-31","00:40",900,12500000,0},
    {"T43","Pesawat","EgyptAir","Jakarta","Kairo","2026-10-31","11:05",780,9900000,7},
    {"T44","Pesawat","South African Airways","Jakarta","Cape Town","2026-11-01","15:30",960,12800000,5},
    {"T45","Pesawat","Delta Air Lines","Jakarta","New York","2026-11-01","06:00",1380,14200000,4},
    {"T46","Pesawat","United Airlines","Jakarta","Los Angeles","2026-11-01","12:20",1260,13400000,6},
    {"T47","Pesawat","LATAM Airlines","Jakarta","Sao Paulo","2026-11-02","02:10",1500,14800000,3},
    {"T48","Pesawat","Aerolineas Argentinas","Jakarta","Buenos Aires","2026-11-02","05:30",1560,14900000,2},
    {"T49","Pesawat","Qantas","Denpasar","Melbourne","2026-10-30","07:45",400,5900000,14},
    {"T50","Pesawat","Air New Zealand","Jakarta","Auckland","2026-10-31","09:10",640,8300000,9},
    {"T51","Pesawat","Garuda Indonesia","Jakarta","Amsterdam","2026-11-01","11:15",790,12400000,10}
};

// ---------- Fungsi bantu ----------
string rupiah(int n) {                       // 1150000 -> "Rp1.150.000"
    string s = to_string(n), hasil = "";
    int hitung = 0;
    for (int i = (int)s.size() - 1; i >= 0; i--) {
        hasil = s[i] + hasil;
        if (++hitung % 3 == 0 && i > 0) hasil = "." + hasil;
    }
    return "Rp" + hasil;
}
string durasiTeks(int menit) {
    string s = "";
    if (menit / 60 > 0) s += to_string(menit / 60) + " j ";
    if (menit % 60 > 0) s += to_string(menit % 60) + " m";
    if (!s.empty() && s[s.size() - 1] == ' ') s.erase(s.size() - 1);
    return s;
}
int keMenit(const string& jam) {             // "06:30" -> 390
    return stoi(jam.substr(0, 2)) * 60 + stoi(jam.substr(3, 2));
}
string huruf_kecil(string s) {
    for (size_t i = 0; i < s.size(); i++) s[i] = (char)tolower((unsigned char)s[i]);
    return s;
}
// Mengambil nilai numerik sesuai kriteria (1=harga, 2=berangkat, 3=durasi) lewat POINTER
int nilaiKriteria(const Tiket* p, int kriteria) {
    if (kriteria == 2) return keMenit(p->berangkat);
    if (kriteria == 3) return p->durasi;
    return p->harga;
}
string teksNilai(const Tiket* p, int kriteria) {
    if (kriteria == 2) return p->berangkat;
    if (kriteria == 3) return durasiTeks(p->durasi);
    return rupiah(p->harga);
}
void cetakBaris(const Tiket* p, int indeks) {
    cout << "  [" << indeks << "] " << p->id << " | " << p->jenis << " | " << p->namaOperator
         << " | " << p->asal << " -> " << p->tujuan << " | " << p->berangkat
         << " | " << durasiTeks(p->durasi) << " | " << rupiah(p->harga) << " | kursi " << p->kursi << "\n";
}
// Mencetak seluruh array dengan aritmatika pointer
void cetakSemua(Tiket* arr, int n) {
    for (Tiket* p = arr; p < arr + n; p++) cetakBaris(p, (int)(p - arr));
}
// Menyalin array lewat pointer agar data asli tidak berubah
void salinArray(const Tiket* sumber, Tiket* tujuan, int n) {
    for (int i = 0; i < n; i++) *(tujuan + i) = *(sumber + i);
}

// ---------- BUBBLE SORT manual + log (pointer ke elemen array) ----------
void bubbleSort(Tiket* arr, int n, int kriteria, bool naik) {
    int totalBanding = 0, totalTukar = 0;
    cout << "\n=== DATA AWAL (sebelum sorting) ===\n";
    cetakSemua(arr, n);
    for (int tahap = 1; tahap < n; tahap++) {
        bool adaTukar = false;
        cout << "\n--- Tahap " << tahap << " ---\n";
        for (int j = 0; j < n - tahap; j++) {
            Tiket* a = arr + j;          // pointer ke elemen ke-j
            Tiket* b = arr + j + 1;      // pointer ke elemen ke-(j+1)
            int va = nilaiKriteria(a, kriteria), vb = nilaiKriteria(b, kriteria);
            totalBanding++;
            bool tukar = naik ? (va > vb) : (va < vb);
            string rel = va > vb ? "lebih besar daripada" : (va < vb ? "lebih kecil daripada" : "sama dengan");
            cout << "Tahap " << tahap << ": Membandingkan elemen indeks " << j << " dan " << j + 1 << "\n"
                 << "  Nilai elemen pertama (" << a->id << "): " << teksNilai(a, kriteria) << "\n"
                 << "  Nilai elemen kedua   (" << b->id << "): " << teksNilai(b, kriteria) << "\n"
                 << "  Hasil: " << teksNilai(a, kriteria) << " " << rel << " " << teksNilai(b, kriteria) << "\n"
                 << "  Aksi : " << (tukar ? "Tukar posisi kedua elemen" : "Tidak perlu ditukar") << "\n";
            if (tukar) {
                Tiket sementara = *a;    // pertukaran lewat pointer
                *a = *b;
                *b = sementara;
                totalTukar++;
                adaTukar = true;
                cout << "  Status: Pertukaran berhasil. Urutan sekarang: ";
                for (Tiket* p = arr; p < arr + n; p++) cout << p->id << (p < arr + n - 1 ? "," : "");
                cout << "\n";
            }
        }
        if (!adaTukar) { cout << "Tidak ada pertukaran pada tahap ini, sorting berhenti.\n"; break; }
    }
    cout << "\n=== DATA AKHIR (setelah sorting) ===\n";
    cetakSemua(arr, n);
    bool benar = true;
    for (int i = 0; i < n - 1; i++) {
        int p = nilaiKriteria(arr + i, kriteria), q = nilaiKriteria(arr + i + 1, kriteria);
        if (naik ? p > q : p < q) benar = false;
    }
    cout << "Total perbandingan: " << totalBanding << "\nTotal pertukaran  : " << totalTukar
         << "\nPemeriksaan urutan: " << (benar ? "BENAR, data terurut" : "SALAH") << "\n";
}

// ---------- LINEAR SEARCH manual + log ----------
void linearSearch(Tiket* arr, int n, int atribut, const string& kata) {
    string q = huruf_kecil(kata);
    string namaAtribut[] = {"", "Kota asal", "Kota tujuan", "Nama operator", "Jenis transportasi"};
    int ketemu[JUMLAH], jumlahKetemu = 0, diperiksa = 0;   // array hasil berisi indeks
    cout << "\nKata kunci: " << kata << "\nAtribut   : " << namaAtribut[atribut] << "\n\n";
    for (Tiket* p = arr; p < arr + n; p++) {
        int i = (int)(p - arr);
        string nilai = atribut == 1 ? p->asal : atribut == 2 ? p->tujuan : atribut == 3 ? p->namaOperator : p->jenis;
        diperiksa++;
        bool cocok = huruf_kecil(nilai).find(q) != string::npos;
        if (cocok) ketemu[jumlahKetemu++] = i;
        cout << "Pemeriksaan indeks " << i << ": " << namaAtribut[atribut] << " = " << nilai
             << " (" << p->id << ")\n  Hasil: " << (cocok ? "Cocok" : "Tidak cocok") << "\n";
    }
    cout << "\nJumlah elemen diperiksa: " << diperiksa << "\n";
    if (jumlahKetemu == 0) { cout << "Status: Tiket tidak ditemukan.\n"; return; }
    cout << "Status: " << jumlahKetemu << " tiket ditemukan:\n";
    for (int k = 0; k < jumlahKetemu; k++) cetakBaris(arr + ketemu[k], ketemu[k]);
}

// ---------- Demo Struct, Array, Pointer ----------
void demoStrukturData() {
    cout << "\n=== DEMO STRUCT ===\n";
    cout << "sizeof(Tiket) = " << sizeof(Tiket) << " byte. Satu variabel Tiket memuat 10 atribut.\n";
    Tiket contoh = dataTiket[2];
    cout << "Variabel struct 'contoh': " << contoh.id << ", " << contoh.namaOperator << ", " << rupiah(contoh.harga) << "\n";

    cout << "\n=== DEMO ARRAY ===\n";
    cout << "Tiket dataTiket[" << JUMLAH << "]; indeks valid: 0 sampai " << JUMLAH - 1 << "\n";
    cout << "dataTiket[0] -> " << dataTiket[0].id << ", " << dataTiket[0].asal << " -> " << dataTiket[0].tujuan << "\n";
    cout << "dataTiket[5] -> " << dataTiket[5].id << ", " << dataTiket[5].namaOperator << "\n";
    cout << "dataTiket[" << JUMLAH - 1 << "] -> " << dataTiket[JUMLAH - 1].id << " (elemen terakhir)\n";

    cout << "\n=== DEMO POINTER ===\n";
    Tiket* ptr = &dataTiket[0];     // & = ambil alamat; ptr menunjuk elemen indeks 0
    cout << "ptr = &dataTiket[0]\n";
    cout << "Alamat yang disimpan ptr   : " << (void*)ptr << "\n";
    cout << "Alamat &dataTiket[0]       : " << (void*)&dataTiket[0] << "  (sama)\n";
    cout << "ptr->id                    : " << ptr->id << "\n";
    cout << "(*ptr).harga  (* = isi)    : " << rupiah((*ptr).harga) << "\n";
    ptr = ptr + 3;                  // pindah 3 elemen ke depan
    cout << "Setelah ptr = ptr + 3      : ptr->id = " << ptr->id << ", indeks = " << (ptr - dataTiket) << "\n";
    cout << "Selisih alamat ptr dan awal: " << (long)((char*)ptr - (char*)dataTiket) << " byte (3 x " << sizeof(Tiket) << ")\n";

    int* pHarga = &dataTiket[1].harga;  // pointer ke satu atribut (int)
    cout << "pHarga = &dataTiket[1].harga -> *pHarga = " << rupiah(*pHarga) << "\n";

    Tiket salinan[JUMLAH];          // ubah data lewat pointer pada SALINAN (data asli aman)
    salinArray(dataTiket, salinan, JUMLAH);
    Tiket* q = &salinan[0];
    cout << "\nHarga salinan[0] sebelum : " << rupiah(q->harga) << "\n";
    q->harga = q->harga - 100000;   // diskon lewat pointer
    cout << "Harga salinan[0] sesudah diskon lewat pointer: " << rupiah(salinan[0].harga) << "\n";
    cout << "Harga dataTiket[0] asli tetap : " << rupiah(dataTiket[0].harga) << "\n";
}

// ---------- Input aman ----------
int bacaInt(const string& pesan, int minV, int maxV) {
    while (true) {
        cout << pesan; string s; getline(cin, s);
        try { int v = stoi(s); if (v >= minV && v <= maxV) return v; } catch (...) {}
        cout << "Input tidak valid. Masukkan angka " << minV << " sampai " << maxV << ".\n";
    }
}

int main() {
    while (true) {
        cout << "\n==============================\n EasyGo - Demo Tugas C++\n==============================\n"
             << "1. Demo Struct, Array, Pointer\n2. Tampilkan semua tiket\n3. Bubble Sort (dengan log)\n"
             << "4. Linear Search (dengan log)\n0. Keluar\n";
        int pilih = bacaInt("Pilih menu: ", 0, 4);
        if (pilih == 0) { cout << "Terima kasih.\n"; break; }
        if (pilih == 1) demoStrukturData();
        else if (pilih == 2) { cout << "\nDaftar tiket (data simulasi):\n"; cetakSemua(dataTiket, JUMLAH); }
        else if (pilih == 3) {
            cout << "Kriteria: 1) Harga termurah  2) Harga termahal  3) Berangkat paling awal  4) Durasi tercepat\n";
            int k = bacaInt("Pilih kriteria: ", 1, 4);
            Tiket salinan[JUMLAH];
            salinArray(dataTiket, salinan, JUMLAH);     // sorting dilakukan pada salinan
            int kode = (k == 1 || k == 2) ? 1 : (k == 3 ? 2 : 3);
            bubbleSort(salinan, JUMLAH, kode, k != 2);
        } else {
            cout << "Atribut: 1) Kota asal  2) Kota tujuan  3) Nama operator  4) Jenis transportasi\n";
            int a = bacaInt("Pilih atribut: ", 1, 4);
            cout << "Kata kunci: "; string kata; getline(cin, kata);
            if (kata.empty()) { cout << "Kata kunci tidak boleh kosong.\n"; continue; }
            linearSearch(dataTiket, JUMLAH, a, kata);
        }
    }
    return 0;
}
