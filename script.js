'use strict';
/* =====================================================================
   EasyGo - script.js
   Antarmuka (HTML/CSS/JS). Pencarian (Linear Search) dan pengurutan
   (Bubble Sort) berjalan di balik layar; hanya hasilnya yang tampil.
   Demonstrasi Struct/Array/Pointer + log algoritma ada di tiket.cpp (C++).
   ===================================================================== */

/* ---------- DATA (harus sama persis dengan dataTiket[] di tiket.cpp) ---------- */
const REGIONS = [
  {id:'id', nama:'Indonesia', kota:['Jakarta','Surabaya','Bandung','Yogyakarta','Semarang','Malang','Denpasar','Medan']},
  {id:'asia-tenggara', nama:'Asia Tenggara', kota:['Singapura','Kuala Lumpur','Bangkok','Manila']},
  {id:'asia-timur', nama:'Asia Timur', kota:['Tokyo','Seoul','Hong Kong']},
  {id:'asia-selatan', nama:'Asia Selatan', kota:['New Delhi','Kolombo']},
  {id:'asia-tengah', nama:'Asia Tengah', kota:['Tashkent','Almaty']},
  {id:'timur-tengah', nama:'Timur Tengah', kota:['Dubai','Doha','Jeddah']},
  {id:'eropa', nama:'Eropa', kota:['Istanbul','Amsterdam','London','Paris']},
  {id:'afrika', nama:'Afrika', kota:['Kairo','Cape Town']},
  {id:'amerika-utara', nama:'Amerika Utara', kota:['New York','Los Angeles']},
  {id:'amerika-selatan', nama:'Amerika Selatan', kota:['Sao Paulo','Buenos Aires']},
  {id:'oseania', nama:'Oseania', kota:['Sydney','Melbourne','Auckland']}
];
const KOTA_ID = REGIONS[0].kota;                       // rute kereta api dan bus hanya di kota-kota ini
const KOTA = [].concat(...REGIONS.map(r => r.kota));
const MAKS_HARGA = 15000000;
const JENIS = ['Pesawat','Kereta Api','Bus'];
const ic = p => '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
const IKON = {
  'Pesawat': ic('<path d="M12 2c.8 0 1.5 1 1.5 2.5V9l8 4.5V16l-8-2v4l2 1.5V22L12 21l-3.5 1v-1.5l2-1.5v-4l-8 2v-2.5L10.5 9V4.5C10.5 3 11.2 2 12 2z"/>'),
  'Kereta Api': ic('<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M8 17l-2 4M16 17l2 4M9 14h.01M15 14h.01"/>'),
  'Bus': ic('<rect x="3" y="4" width="18" height="13" rx="3"/><path d="M3 11h18M7 17v3M17 17v3M7 14h.01M17 14h.01"/>')
};
const IKON_CARI = ic('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'), IKON_TIKET = ic('<path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 0 0 4v1h18v-1a2 2 0 0 1 0-4v0a2 2 0 0 1 0-4V7H3z"/><path d="M14 7v10" stroke-dasharray="2 2.5"/>');
const IKON_TAKEOFF = ic('<path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18z"/>');
const IKON_LANDING = ic('<path d="M2 22h20"/><path d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.39.68-.01 1.54-.76 1.73L4.77 15.77a2 2 0 0 1-1.22-.18z"/>');
const IKON_PP = ic('<path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="M7 21l-4-4 4-4"/><path d="M21 17H3"/>');
const TIKET = [
  {id:'T01',jenis:'Pesawat',   operator:'Garuda Indonesia',  asal:'Jakarta',   tujuan:'Surabaya',  tanggal:'2026-10-20',berangkat:'06:30',durasi:100,harga:1150000,kursi:12},
  {id:'T02',jenis:'Pesawat',   operator:'Lion Air',          asal:'Jakarta',   tujuan:'Surabaya',  tanggal:'2026-10-20',berangkat:'09:15',durasi:105,harga:780000, kursi:24},
  {id:'T03',jenis:'Pesawat',   operator:'Citilink',          asal:'Jakarta',   tujuan:'Denpasar',  tanggal:'2026-10-21',berangkat:'11:00',durasi:165,harga:1350000,kursi:8},
  {id:'T04',jenis:'Pesawat',   operator:'Batik Air',         asal:'Surabaya',  tujuan:'Medan',     tanggal:'2026-10-22',berangkat:'13:40',durasi:215,harga:1900000,kursi:15},
  {id:'T05',jenis:'Pesawat',   operator:'Super Air Jet',     asal:'Bandung',   tujuan:'Denpasar',  tanggal:'2026-10-21',berangkat:'07:50',durasi:150,harga:1050000,kursi:20},
  {id:'T06',jenis:'Kereta Api',operator:'Argo Bromo Anggrek',asal:'Jakarta',   tujuan:'Surabaya',  tanggal:'2026-10-20',berangkat:'08:20',durasi:540,harga:620000, kursi:30},
  {id:'T07',jenis:'Kereta Api',operator:'Taksaka',           asal:'Jakarta',   tujuan:'Yogyakarta',tanggal:'2026-10-23',berangkat:'20:45',durasi:485,harga:480000, kursi:18},
  {id:'T08',jenis:'Kereta Api',operator:'Argo Wilis',        asal:'Bandung',   tujuan:'Surabaya',  tanggal:'2026-10-22',berangkat:'07:00',durasi:570,harga:550000, kursi:22},
  {id:'T09',jenis:'Kereta Api',operator:'Gajayana',          asal:'Malang',    tujuan:'Jakarta',   tanggal:'2026-10-24',berangkat:'16:50',durasi:900,harga:710000, kursi:10},
  {id:'T10',jenis:'Kereta Api',operator:'Mutiara Selatan',   asal:'Bandung',   tujuan:'Yogyakarta',tanggal:'2026-10-23',berangkat:'19:30',durasi:520,harga:330000, kursi:26},
  {id:'T11',jenis:'Kereta Api',operator:'Sembrani',          asal:'Semarang',  tujuan:'Jakarta',   tanggal:'2026-10-21',berangkat:'05:40',durasi:330,harga:390000, kursi:14},
  {id:'T12',jenis:'Bus',       operator:'Sinar Jaya',        asal:'Jakarta',   tujuan:'Bandung',   tanggal:'2026-10-20',berangkat:'06:00',durasi:180,harga:120000, kursi:35},
  {id:'T13',jenis:'Bus',       operator:'Rosalia Indah',     asal:'Yogyakarta',tujuan:'Semarang',  tanggal:'2026-10-22',berangkat:'10:30',durasi:200,harga:95000,  kursi:28},
  {id:'T14',jenis:'Bus',       operator:'Harapan Jaya',      asal:'Surabaya',  tujuan:'Malang',    tanggal:'2026-10-20',berangkat:'08:00',durasi:120,harga:70000,  kursi:40},
  {id:'T15',jenis:'Bus',       operator:'Pahala Kencana',    asal:'Jakarta',   tujuan:'Semarang',  tanggal:'2026-10-21',berangkat:'19:00',durasi:420,harga:210000, kursi:22},
  {id:'T16',jenis:'Bus',       operator:'Gunung Harta',      asal:'Surabaya',  tujuan:'Denpasar',  tanggal:'2026-10-23',berangkat:'17:30',durasi:600,harga:250000, kursi:3},
  {id:'T17',jenis:'Bus',       operator:'Lorena',            asal:'Malang',    tujuan:'Yogyakarta',tanggal:'2026-10-24',berangkat:'21:00',durasi:480,harga:185000, kursi:16},
  {id:'T18',jenis:'Pesawat',   operator:'Garuda Indonesia',  asal:'Yogyakarta',tujuan:'Denpasar',  tanggal:'2026-10-22',berangkat:'14:10',durasi:100,harga:890000, kursi:9},
  {id:'T19',jenis:'Pesawat',   operator:'Singapore Airlines',asal:'Jakarta',   tujuan:'Singapura', tanggal:'2026-10-25',berangkat:'07:10',durasi:110,harga:2150000,kursi:14},
  {id:'T20',jenis:'Pesawat',   operator:'Scoot',             asal:'Surabaya',  tujuan:'Singapura', tanggal:'2026-10-25',berangkat:'10:20',durasi:135,harga:1650000,kursi:18},
  {id:'T21',jenis:'Pesawat',   operator:'AirAsia',           asal:'Denpasar',  tujuan:'Singapura', tanggal:'2026-10-26',berangkat:'12:30',durasi:165,harga:1450000,kursi:22},
  {id:'T22',jenis:'Pesawat',   operator:'Malaysia Airlines', asal:'Jakarta',   tujuan:'Kuala Lumpur',tanggal:'2026-10-25',berangkat:'08:45',durasi:125,harga:1850000,kursi:16},
  {id:'T23',jenis:'Pesawat',   operator:'AirAsia',           asal:'Surabaya',  tujuan:'Kuala Lumpur',tanggal:'2026-10-26',berangkat:'14:05',durasi:170,harga:1350000,kursi:25},
  {id:'T24',jenis:'Pesawat',   operator:'Thai Airways',      asal:'Jakarta',   tujuan:'Bangkok',   tanggal:'2026-10-27',berangkat:'09:30',durasi:210,harga:3200000,kursi:10},
  {id:'T25',jenis:'Pesawat',   operator:'Garuda Indonesia',  asal:'Denpasar',  tujuan:'Tokyo',     tanggal:'2026-10-27',berangkat:'23:15',durasi:460,harga:7450000,kursi:8},
  {id:'T26',jenis:'Pesawat',   operator:'Japan Airlines',    asal:'Jakarta',   tujuan:'Tokyo',     tanggal:'2026-10-28',berangkat:'21:50',durasi:465,harga:8900000,kursi:12},
  {id:'T27',jenis:'Pesawat',   operator:'Korean Air',        asal:'Jakarta',   tujuan:'Seoul',     tanggal:'2026-10-28',berangkat:'22:30',durasi:420,harga:7200000,kursi:9},
  {id:'T28',jenis:'Pesawat',   operator:'Qantas',            asal:'Denpasar',  tujuan:'Sydney',    tanggal:'2026-10-29',berangkat:'06:15',durasi:380,harga:5600000,kursi:11},
  {id:'T29',jenis:'Pesawat',   operator:'Emirates',          asal:'Jakarta',   tujuan:'Dubai',     tanggal:'2026-10-29',berangkat:'02:40',durasi:500,harga:9800000,kursi:7},
  {id:'T30',jenis:'Pesawat',   operator:'Singapore Airlines',asal:'Singapura', tujuan:'Tokyo',     tanggal:'2026-10-30',berangkat:'08:00',durasi:400,harga:6900000,kursi:13},
  {id:'T31',jenis:'Pesawat',   operator:'Philippine Airlines',asal:'Jakarta',tujuan:'Manila',tanggal:'2026-10-26',berangkat:'09:00',durasi:235,harga:2650000,kursi:15},
  {id:'T32',jenis:'Pesawat',   operator:'Cathay Pacific',asal:'Jakarta',tujuan:'Hong Kong',tanggal:'2026-10-27',berangkat:'10:40',durasi:330,harga:4300000,kursi:12},
  {id:'T33',jenis:'Pesawat',   operator:'Air India',asal:'Jakarta',tujuan:'New Delhi',tanggal:'2026-10-28',berangkat:'23:10',durasi:360,harga:5900000,kursi:10},
  {id:'T34',jenis:'Pesawat',   operator:'SriLankan Airlines',asal:'Jakarta',tujuan:'Kolombo',tanggal:'2026-10-29',berangkat:'13:20',durasi:300,harga:4800000,kursi:14},
  {id:'T35',jenis:'Pesawat',   operator:'Uzbekistan Airways',asal:'Jakarta',tujuan:'Tashkent',tanggal:'2026-10-30',berangkat:'01:30',durasi:780,harga:9400000,kursi:6},
  {id:'T36',jenis:'Pesawat',   operator:'Air Astana',asal:'Jakarta',tujuan:'Almaty',tanggal:'2026-10-30',berangkat:'04:15',durasi:840,harga:10200000,kursi:5},
  {id:'T37',jenis:'Pesawat',   operator:'Qatar Airways',asal:'Jakarta',tujuan:'Doha',tanggal:'2026-10-28',berangkat:'20:05',durasi:600,harga:8700000,kursi:11},
  {id:'T38',jenis:'Pesawat',   operator:'Saudia',asal:'Jakarta',tujuan:'Jeddah',tanggal:'2026-10-29',berangkat:'17:45',durasi:540,harga:8100000,kursi:13},
  {id:'T39',jenis:'Pesawat',   operator:'Turkish Airlines',asal:'Jakarta',tujuan:'Istanbul',tanggal:'2026-10-29',berangkat:'22:30',durasi:720,harga:10800000,kursi:9},
  {id:'T40',jenis:'Pesawat',   operator:'KLM',asal:'Jakarta',tujuan:'Amsterdam',tanggal:'2026-10-30',berangkat:'14:25',durasi:800,harga:11900000,kursi:8},
  {id:'T41',jenis:'Pesawat',   operator:'British Airways',asal:'Jakarta',tujuan:'London',tanggal:'2026-10-30',berangkat:'23:50',durasi:960,harga:13200000,kursi:6},
  {id:'T42',jenis:'Pesawat',   operator:'Air France',asal:'Jakarta',tujuan:'Paris',tanggal:'2026-10-31',berangkat:'00:40',durasi:900,harga:12500000,kursi:0},
  {id:'T43',jenis:'Pesawat',   operator:'EgyptAir',asal:'Jakarta',tujuan:'Kairo',tanggal:'2026-10-31',berangkat:'11:05',durasi:780,harga:9900000,kursi:7},
  {id:'T44',jenis:'Pesawat',   operator:'South African Airways',asal:'Jakarta',tujuan:'Cape Town',tanggal:'2026-11-01',berangkat:'15:30',durasi:960,harga:12800000,kursi:5},
  {id:'T45',jenis:'Pesawat',   operator:'Delta Air Lines',asal:'Jakarta',tujuan:'New York',tanggal:'2026-11-01',berangkat:'06:00',durasi:1380,harga:14200000,kursi:4},
  {id:'T46',jenis:'Pesawat',   operator:'United Airlines',asal:'Jakarta',tujuan:'Los Angeles',tanggal:'2026-11-01',berangkat:'12:20',durasi:1260,harga:13400000,kursi:6},
  {id:'T47',jenis:'Pesawat',   operator:'LATAM Airlines',asal:'Jakarta',tujuan:'Sao Paulo',tanggal:'2026-11-02',berangkat:'02:10',durasi:1500,harga:14800000,kursi:3},
  {id:'T48',jenis:'Pesawat',   operator:'Aerolineas Argentinas',asal:'Jakarta',tujuan:'Buenos Aires',tanggal:'2026-11-02',berangkat:'05:30',durasi:1560,harga:14900000,kursi:2},
  {id:'T49',jenis:'Pesawat',   operator:'Qantas',asal:'Denpasar',tujuan:'Melbourne',tanggal:'2026-10-30',berangkat:'07:45',durasi:400,harga:5900000,kursi:14},
  {id:'T50',jenis:'Pesawat',   operator:'Air New Zealand',asal:'Jakarta',tujuan:'Auckland',tanggal:'2026-10-31',berangkat:'09:10',durasi:640,harga:8300000,kursi:9},
  {id:'T51',jenis:'Pesawat',   operator:'Garuda Indonesia',asal:'Jakarta',tujuan:'Amsterdam',tanggal:'2026-11-01',berangkat:'11:15',durasi:790,harga:12400000,kursi:10}
];

/* ---------- Helper umum ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rupiah = n => 'Rp' + Number(n).toLocaleString('id-ID');
const toMenit = jam => { const [h, m] = jam.split(':').map(Number); return h * 60 + m; };
const durTxt = d => { const h = Math.floor(d / 60), m = d % 60; return ((h ? h + ' j ' : '') + (m ? m + ' m' : '')).trim() || '0 m'; };
const tiba = t => { const x = toMenit(t.berangkat) + t.durasi; const mm = x % 1440;
  return String(Math.floor(mm / 60)).padStart(2, '0') + ':' + String(mm % 60).padStart(2, '0') + (x >= 1440 ? ' (+1 hari)' : ''); };
const tglID = iso => iso ? new Date(iso + 'T00:00:00').toLocaleDateString('id-ID', {weekday:'short', day:'numeric', month:'short', year:'numeric'}) : '-';
const isoLokal = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const hariIni = () => isoLokal(new Date());
const besok = () => { const d = new Date(); d.setDate(d.getDate() + 1); return isoLokal(d); };
const cariById = id => { for (let i = 0; i < TIKET.length; i++) if (TIKET[i].id === id) return TIKET[i]; return null; };

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { toast('Penyimpanan browser tidak tersedia.', 'err'); } }
};
const sisaKursi = t => t.kursi - (store.get('easygo_kursi', {})[t.id] || 0);
function ubahKursi(id, delta) { const m = store.get('easygo_kursi', {}); m[id] = Math.max(0, (m[id] || 0) + delta); store.set('easygo_kursi', m); }

function toast(pesan, tipe) {
  const el = document.createElement('div');
  el.className = 'toast' + (tipe ? ' ' + tipe : '');
  el.textContent = pesan;
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), 3400);
}

/* ---------- Navigasi ---------- */
function go(page) {
  $$('.page').forEach(p => p.classList.toggle('on', p.id === 'page-' + page));
  $$('.links a').forEach(a => a.classList.toggle('on', a.dataset.page === page));
  $('#links').classList.remove('open');
  $('#burger').setAttribute('aria-expanded', 'false');
  if (page === 'hasil') jalankanCari(true);
  if (page === 'riwayat') renderRiwayat();
  history.replaceState(null, '', '#' + page);
  window.scrollTo(0, 0);
}

/* ---------- Pengurutan & pencarian (di balik layar, tanpa log) ---------- */
const KRITERIA = {
  'harga-asc':     {key:'harga',     asc:true,  label:'Harga termurah ke termahal'},
  'harga-desc':    {key:'harga',     asc:false, label:'Harga termahal ke termurah'},
  'berangkat-asc': {key:'berangkat', asc:true,  label:'Waktu keberangkatan paling awal'},
  'durasi-asc':    {key:'durasi',    asc:true,  label:'Durasi perjalanan tercepat'}
};
const nilai = (t, key) => key === 'berangkat' ? toMenit(t.berangkat) : t[key];   // nilai numerik asli

function bubbleSort(data, k) {          // padanan JS dari bubbleSort() di tiket.cpp
  const a = data.slice(), n = a.length;
  for (let pass = 1; pass < n; pass++) {
    let adaTukar = false;
    for (let j = 0; j < n - pass; j++) {
      const vx = nilai(a[j], k.key), vy = nilai(a[j + 1], k.key);
      if (k.asc ? vx > vy : vx < vy) { const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; adaTukar = true; }
    }
    if (!adaTukar) break;
  }
  return a;
}
function linearSearch(data, attr, kata) {   // padanan JS dari linearSearch() di tiket.cpp
  const q = kata.trim().toLowerCase(), hasil = [];
  for (let i = 0; i < data.length; i++) if (data[i][attr].toLowerCase().indexOf(q) !== -1) hasil.push(data[i]);
  return hasil;
}

/* ---------- Visual destinasi: foto asli (diambil dari Wikipedia saat online) + ilustrasi SVG sebagai fallback ---------- */
// Judul artikel Wikipedia dipakai untuk mengambil foto utamanya. Tanpa internet atau jika gagal, ilustrasi SVG tetap tampil.
const fotoCache = {};
function muatFoto(root) {
  $$('.vis[data-wiki]', root || document).forEach(el => {
    const t = el.dataset.wiki;
    fotoCache[t] = fotoCache[t] || fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(t))
      .then(r => r.ok ? r.json() : null).then(j => j && j.thumbnail ? j.thumbnail.source : null).catch(() => null);
    fotoCache[t].then(src => {
      if (!src) return;
      const img = new Image(); img.alt = el.dataset.alt;
      img.onerror = () => { img.onerror = null; img.src = src; };            // jika ukuran besar tidak ada, pakai ukuran asli thumbnail
      img.onload = () => el.appendChild(img);
      img.src = src.replace(/\/\d+px-/, '/960px-');
    });
  });
}
const SCENE = {pantai:['#FFE3D3','#FFC7A8','#7FB9F0','#BFE0FA'], gunung:['#CFE6FB','#EAF4FF','#9BB7F0','#C9B8F2'],
               kota:['#FFEBD6','#FFD2C2','#8FB4EE','#B7C9F5'], candi:['#FFE0CF','#FFCBB8','#B9A7EA','#E6B7A5']};
function sceneSvg(k) {
  const [a, b, c, d] = SCENE[k]; let g = '';
  if (k === 'pantai') g = `<circle cx="290" cy="90" r="38" fill="#FF8F7A"/><rect y="165" width="400" height="80" fill="${c}"/><rect y="195" width="400" height="50" fill="${d}"/><path d="M0 235Q120 205 260 236T400 222V300H0z" fill="#FFE9C9"/><path d="M90 250Q95 180 112 125" stroke="#8B6B5A" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M112 125Q82 102 52 120M112 125Q142 96 176 114M112 125Q100 92 124 74" stroke="#5DB59A" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  else if (k === 'gunung') g = `<circle cx="320" cy="70" r="26" fill="#FFF3C9"/><path d="M-20 250L120 90 240 250z" fill="${c}"/><path d="M120 250L280 70 430 250z" fill="${d}"/><path d="M280 70l-30 42 20-8 10 14 12-14 20 8z" fill="#fff"/><path d="M120 90l-24 34 16-6 8 12 10-12 14 6z" fill="#fff"/><path d="M0 235Q100 195 200 228T400 215V300H0z" fill="#B7E0C8"/><ellipse cx="70" cy="60" rx="34" ry="12" fill="#fff" opacity=".85"/>`;
  else if (k === 'kota') g = `<circle cx="80" cy="80" r="28" fill="#FFF3C9"/><rect x="40" y="150" width="50" height="110" rx="4" fill="${c}"/><rect x="100" y="120" width="44" height="140" rx="4" fill="${d}"/><rect x="255" y="130" width="50" height="130" rx="4" fill="${c}"/><rect x="315" y="165" width="55" height="95" rx="4" fill="${d}"/><rect x="194" y="80" width="12" height="150" fill="#fff"/><circle cx="200" cy="70" r="11" fill="#FFB86B"/><rect y="245" width="400" height="55" fill="#B7E0C8"/>`;
  else g = `<circle cx="300" cy="80" r="34" fill="#FFF3C9"/><rect x="95" y="215" width="210" height="40" rx="5" fill="${c}"/><rect x="125" y="180" width="150" height="38" rx="5" fill="${d}"/><rect x="155" y="148" width="90" height="34" rx="5" fill="${c}"/><path d="M165 148a35 35 0 0 1 70 0z" fill="${d}"/><rect x="196" y="95" width="8" height="22" fill="${c}"/><rect y="250" width="400" height="50" fill="#B7E0C8"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="300" fill="url(#s)"/>${g}</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
const visual = (k, alt, wiki) => '<div class="vis" data-wiki="' + wiki + '" data-alt="' + alt + '" style="background-image:url(&quot;' + sceneSvg(k) + '&quot;)"></div>';

/* =====================================================================
   BERANDA
   ===================================================================== */
let jenisHome = 'Pesawat', homePP = false;
const kriteria = {jenis:'Semua', asal:'Semua', tujuan:'Semua', tanggal:'', pulang:'', pp:false, penumpang:1, maksHarga:MAKS_HARGA, urut:'harga-asc'};

const opsi = a => a.map(i => '<option>' + i + '</option>').join('');
// Pesawat: semua benua, dikelompokkan per wilayah. Kereta api dan bus: hanya kota di Indonesia.
function isiKota(sel, jenis, placeholder, semua, nilai) {
  const cur = nilai !== undefined ? nilai : sel.value, pes = jenis === 'Pesawat' || jenis === 'Semua';
  sel.innerHTML = (placeholder ? '<option value="">' + placeholder + '</option>' : '') + (semua ? '<option>Semua</option>' : '') +
    (pes ? REGIONS.map(r => '<optgroup label="' + r.nama + '">' + opsi(r.kota) + '</optgroup>').join('') : opsi(KOTA_ID));
  sel.value = Array.from(sel.options).some(o => o.value === cur) ? cur : (semua ? 'Semua' : '');
}
function labelKota(p, jenis) {            // pesawat: ikon lepas landas dan mendarat; kereta/bus: teks biasa
  const pes = jenis === 'Pesawat';
  $('#' + p + '-asal-lb').innerHTML = pes ? IKON_TAKEOFF : 'Kota asal';
  $('#' + p + '-tujuan-lb').innerHTML = pes ? IKON_LANDING : 'Kota tujuan';
}
const ppAktif = () => kriteria.jenis === 'Pesawat' && kriteria.pp;
const mult = () => ppAktif() ? 2 : 1;      // pulang pergi = 2 x harga sekali jalan
const tambahHari = (iso, n) => { const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return isoLokal(d); };
function renderSeg() {
  const pes = jenisHome === 'Pesawat';
  $('#homeJenis').innerHTML = JENIS.map(j => '<button type="button" class="' + (j === jenisHome ? 'on' : '') + '" data-j="' + j + '">' + IKON[j] + ' ' + j + '</button>').join('');
  $('#homeTrip').hidden = !pes;
  $('#homeTrip').innerHTML = [[false, 'Sekali jalan', IKON_TAKEOFF], [true, 'Pulang pergi', IKON_PP]].map(([v, t, i]) =>
    '<button type="button" class="' + (homePP === v ? 'on' : '') + '" data-trip="' + v + '">' + i + ' ' + t + '</button>').join('');
  $('#h-pulang-wrap').hidden = !(pes && homePP);
  labelKota('h', jenisHome);
  isiKota($('#h-asal'), jenisHome, pes ? 'Dari mana?' : 'Pilih kota asal');
  isiKota($('#h-tujuan'), jenisHome, pes ? 'Mau ke mana?' : 'Pilih kota tujuan');
}
const DEST = [
  {kota:'Denpasar', nama:'Bali', reg:'id', k:'pantai', wiki:'Tanah Lot', d:'Pintu masuk ke Bali. Dari bandara tinggal lanjut ke Kuta, Ubud, atau Uluwatu.'},
  {kota:'Yogyakarta', nama:'Yogyakarta', reg:'id', k:'candi', wiki:'Prambanan', d:'Malioboro bisa ditempuh jalan kaki dari stasiun. Prambanan dan Borobudur agak ke luar kota.'},
  {kota:'Malang', nama:'Malang', reg:'id', k:'gunung', wiki:'Mount Bromo', d:'Hawanya adem. Dari sini biasanya orang lanjut ke Bromo atau Batu.'},
  {kota:'Bandung', nama:'Bandung', reg:'id', k:'gunung', wiki:'Gedung Sate', d:'Cocok buat akhir pekan dari Jakarta. Kebanyakan orang datang untuk ngopi, belanja, dan makan.'},
  {kota:'Surabaya', nama:'Surabaya', reg:'id', k:'kota', wiki:'Suramadu Bridge', d:'Panas, tapi makanannya enak: rawon, lontong balap, rujak cingur.'},
  {kota:'Semarang', nama:'Semarang', reg:'id', k:'kota', wiki:'Lawang Sewu', d:'Kota Lama dan Lawang Sewu cukup sehari. Lumpia dan tahu gimbal untuk makan.'},
  {kota:'Jakarta', nama:'Jakarta', reg:'id', k:'kota', wiki:'National Monument (Indonesia)', d:'Macet dan ramai, tapi isinya banyak. Monas, museum, dan kafe ada di mana-mana.'},
  {kota:'Medan', nama:'Medan', reg:'id', k:'kota', wiki:'Maimun Palace', d:'Istana Maimun, Masjid Raya, dan durian. Sering jadi titik awal ke Danau Toba.'},
  {kota:'Singapura', nama:'Singapura', reg:'asia-tenggara', k:'kota', wiki:'Marina Bay Sands', d:'Kecil dan rapi. Gardens by the Bay layak dikunjungi, makan siangnya di hawker center.'},
  {kota:'Kuala Lumpur', nama:'Kuala Lumpur', reg:'asia-tenggara', k:'kota', wiki:'Petronas Towers', d:'Petronas Towers ada di tengah kota. Makan malam di Jalan Alor.'},
  {kota:'Bangkok', nama:'Bangkok', reg:'asia-tenggara', k:'candi', wiki:'Wat Arun', d:'Wat Arun, pasar, dan jajanan kaki lima sampai larut. Cuacanya panas, bawa air.'},
  {kota:'Manila', nama:'Manila', reg:'asia-tenggara', k:'kota', wiki:'Intramuros', d:'Intramuros adalah kota tua bergaya Spanyol. Macetnya parah, hitung waktu perjalanan.'},
  {kota:'Tokyo', nama:'Tokyo', reg:'asia-timur', k:'kota', wiki:'Tokyo Tower', d:'Shibuya, Asakusa, Akihabara. Kereta di sini tepat waktu, jadi gampang ke mana-mana.'},
  {kota:'Seoul', nama:'Seoul', reg:'asia-timur', k:'candi', wiki:'Gyeongbokgung', d:'Istana Gyeongbokgung ada di tengah kota. Coba ayam goreng dan tteokbokki.'},
  {kota:'Hong Kong', nama:'Hong Kong', reg:'asia-timur', k:'kota', wiki:'Victoria Harbour', d:'Padat, tapi gampang dijelajahi pakai MTR. Naik Peak Tram untuk lihat skyline.'},
  {kota:'New Delhi', nama:'New Delhi', reg:'asia-selatan', k:'candi', wiki:'India Gate', d:'India Gate, Red Fort, dan pasar Chandni Chowk. Banyak yang lanjut ke Agra dari sini.'},
  {kota:'Kolombo', nama:'Kolombo', reg:'asia-selatan', k:'pantai', wiki:'Gangaramaya Temple', d:'Kota pantai yang santai di Sri Lanka. Ada pasar Pettah dan teh Ceylon.'},
  {kota:'Tashkent', nama:'Tashkent', reg:'asia-tengah', k:'candi', wiki:'Khast Imam Complex', d:'Ibu kota Uzbekistan. Stasiun metronya berhias mozaik, dan jalur Silk Road ke Samarkand mulai dari sini.'},
  {kota:'Almaty', nama:'Almaty', reg:'asia-tengah', k:'gunung', wiki:'Zenkov Cathedral', d:'Kota di kaki Pegunungan Tian Shan. Musim dingin ramai orang main ski di Shymbulak.'},
  {kota:'Dubai', nama:'Dubai', reg:'timur-tengah', k:'kota', wiki:'Burj Khalifa', d:'Burj Khalifa, mal besar, dan gurun di pinggir kota. Musim panasnya sangat panas.'},
  {kota:'Doha', nama:'Doha', reg:'timur-tengah', k:'kota', wiki:'Museum of Islamic Art, Doha', d:'Museum of Islamic Art dan pasar Souq Waqif. Banyak penumpang transit di sini.'},
  {kota:'Jeddah', nama:'Jeddah', reg:'timur-tengah', k:'pantai', wiki:'Al-Balad, Jeddah', d:'Kota tua Al-Balad dan Laut Merah. Jadi gerbang menuju Makkah untuk umrah.'},
  {kota:'Istanbul', nama:'Istanbul', reg:'eropa', k:'candi', wiki:'Hagia Sophia', d:'Hagia Sophia, Grand Bazaar, dan kapal feri yang melintasi Selat Bosphorus.'},
  {kota:'Amsterdam', nama:'Amsterdam', reg:'eropa', k:'kota', wiki:'Canals of Amsterdam', d:'Kanal, sepeda, dan museum. Hampir semuanya bisa dicapai dengan jalan kaki.'},
  {kota:'London', nama:'London', reg:'eropa', k:'kota', wiki:'Tower Bridge', d:'Tower Bridge dan museum-museum gratis. Hujannya datang tanpa aba-aba.'},
  {kota:'Paris', nama:'Paris', reg:'eropa', k:'kota', wiki:'Eiffel Tower', d:'Menara Eiffel dan Louvre. Antrenya panjang, jadi pesan tiket masuk lebih dulu.'},
  {kota:'Kairo', nama:'Kairo', reg:'afrika', k:'candi', wiki:'Giza pyramid complex', d:'Piramida Giza sekitar satu jam dari pusat kota. Siapkan topi dan air minum.'},
  {kota:'Cape Town', nama:'Cape Town', reg:'afrika', k:'gunung', wiki:'Table Mountain', d:'Table Mountain menjulang di belakang kota. Pantai dan kebun anggur tidak jauh.'},
  {kota:'New York', nama:'New York', reg:'amerika-utara', k:'kota', wiki:'Statue of Liberty', d:'Times Square, Central Park, Patung Liberty. Jalan kaki dan subway biasanya lebih cepat daripada taksi.'},
  {kota:'Los Angeles', nama:'Los Angeles', reg:'amerika-utara', k:'pantai', wiki:'Hollywood Sign', d:'Hollywood, pantai Santa Monica, dan jalan tol yang tidak habis-habis. Biasanya perlu sewa mobil.'},
  {kota:'Sao Paulo', nama:'Sao Paulo', reg:'amerika-selatan', k:'kota', wiki:'Ibirapuera Park', d:'Kota terbesar di Brasil. Makanannya beragam, dan Avenida Paulista ramai tiap hari Minggu.'},
  {kota:'Buenos Aires', nama:'Buenos Aires', reg:'amerika-selatan', k:'kota', wiki:'Obelisco de Buenos Aires', d:'Tango di San Telmo, steak, dan kafe di hampir tiap sudut.'},
  {kota:'Sydney', nama:'Sydney', reg:'oseania', k:'pantai', wiki:'Sydney Opera House', d:'Opera House dan Harbour Bridge berdekatan. Pantai Bondi bisa dicapai naik bus.'},
  {kota:'Melbourne', nama:'Melbourne', reg:'oseania', k:'kota', wiki:'Flinders Street railway station', d:'Terkenal dengan kopi, gang penuh mural, dan cuaca yang bisa berubah dalam sehari.'},
  {kota:'Auckland', nama:'Auckland', reg:'oseania', k:'pantai', wiki:'Sky Tower (Auckland)', d:'Dua pelabuhan dan puluhan gunung api kecil. Naik Sky Tower kalau cuaca cerah.'}
];
let regDest = 'semua';
function renderDestinasi() {
  const ada = REGIONS.filter(r => DEST.some(d => d.reg === r.id));
  $('#destFilter').innerHTML = [['semua', 'Semua']].concat(ada.map(r => [r.id, r.nama])).map(([i, n]) =>
    '<button type="button" data-reg="' + i + '" class="' + (i === regDest ? 'on' : '') + '">' + n + '</button>').join('');
  $('#recs').innerHTML = DEST.filter(d => regDest === 'semua' || d.reg === regDest).map(d => {
    let min = Infinity, n = 0;
    for (const t of TIKET) if (t.tujuan === d.kota) { n++; if (t.harga < min) min = t.harga; }
    if (!n) return '';
    return '<button class="rec" data-tujuan="' + d.kota + '">' + visual(d.k, d.nama, d.wiki) + '<div class="rec-body"><span class="reg">' + REGIONS.find(r => r.id === d.reg).nama + '</span><h3>' + d.nama + '</h3><p class="muted">' + d.d + '</p>' +
      '<div class="price"><small>Mulai dari<br>' + n + ' tiket</small><strong>' + rupiah(min) + '</strong></div></div></button>';
  }).join('');
  muatFoto($('#recs'));
}
function initBeranda() {
  $('#h-tanggal').min = hariIni(); $('#h-tanggal').value = besok(); $('#h-pulang').min = hariIni();
  renderSeg();
  const desk = {'Pesawat':'Dari dalam negeri sampai lintas benua.','Kereta Api':'Antarkota di Indonesia, bebas macet.','Bus':'Antarkota di Indonesia dengan harga bersahabat.'};
  $('#cats').innerHTML = JENIS.map(j => '<button class="cat" data-cat="' + j + '"><i>' + IKON[j] + '</i><div><b>' + j + '</b><span>' + desk[j] + '</span></div></button>').join('');
  const ha = (cls, k, nama, wiki) => '<div class="ha ' + cls + '">' + visual(k, nama, wiki) + '<span>' + nama + '</span></div>';
  $('#heroArt').innerHTML = ha('ha1', 'pantai', 'Bali', 'Tanah Lot') + ha('ha2', 'kota', 'Tokyo', 'Tokyo Tower') + ha('ha3', 'candi', 'Yogyakarta', 'Prambanan') +
    '<div class="plane" aria-hidden="true">' + IKON['Pesawat'] + '</div>';
  muatFoto($('#heroArt'));
  renderDestinasi();
}
function submitHome(e) {
  e.preventDefault();
  const asal = $('#h-asal').value, tujuan = $('#h-tujuan').value, tgl = $('#h-tanggal').value, pnp = parseInt($('#h-pnp').value, 10);
  const pp = jenisHome === 'Pesawat' && homePP, pulang = $('#h-pulang').value, err = $('#h-err'); let msg = '';
  if (!asal || !tujuan) msg = jenisHome === 'Pesawat' ? 'Pilih dulu kota keberangkatan dan kota tujuan.' : 'Pilih kota asal dan kota tujuan.';
  else if (asal === tujuan) msg = 'Kota asal dan kota tujuan tidak boleh sama.';
  else if (!tgl) msg = 'Pilih tanggal keberangkatan.';
  else if (tgl < hariIni()) msg = 'Tanggal keberangkatan tidak boleh sebelum hari ini.';
  else if (pp && !pulang) msg = 'Pilih tanggal pulang.';
  else if (pp && pulang < tgl) msg = 'Tanggal pulang tidak boleh sebelum tanggal berangkat.';
  else if (!(pnp >= 1)) msg = 'Jumlah penumpang minimal 1.';
  err.textContent = msg;
  if (msg) { toast(msg, 'err'); return; }
  Object.assign(kriteria, {jenis:jenisHome, asal, tujuan, tanggal:tgl, pulang:pp ? pulang : '', pp, penumpang:pnp, maksHarga:MAKS_HARGA, urut:'harga-asc'});
  go('hasil');
}

/* =====================================================================
   HASIL PENCARIAN
   ===================================================================== */
function initHasil() {
  $('#rf-jenis').innerHTML = opsi(['Semua'].concat(JENIS));
  $$('#page-hasil select, #page-hasil input').forEach(el => el.addEventListener('input', () => {
    if (el.id === 'rf-jenis' && el.value !== 'Semua') { jenisHome = el.value; renderSeg(); }
    ambilFilter();
    (el.type === 'range' || el.type === 'number') ? renderHasil() : jalankanCari(true);
  }));
  $('#rf-reset').addEventListener('click', () => { Object.assign(kriteria, {jenis:'Semua', asal:'Semua', tujuan:'Semua', tanggal:'', pulang:'', pp:false, penumpang:1, maksHarga:MAKS_HARGA, urut:'harga-asc'}); jalankanCari(true); });
}
function ambilFilter() {
  kriteria.jenis = $('#rf-jenis').value; kriteria.asal = $('#rf-asal').value; kriteria.tujuan = $('#rf-tujuan').value;
  kriteria.tanggal = $('#rf-tanggal').value; kriteria.penumpang = Math.max(1, parseInt($('#rf-pnp').value, 10) || 1);
  kriteria.maksHarga = parseInt($('#rf-harga').value, 10); kriteria.urut = $('#rf-urut').value;
  kriteria.pp = $('#rf-trip').value === '2'; kriteria.pulang = $('#rf-pulang').value;
}
let meta = {pesan:'', tipe:''}, cariToken = 0;
// Tahap "mencari" (kerangka + spinner) lalu hasil dan notifikasi, supaya setiap pencarian ada umpan balik.
function jalankanCari(umpan) {
  const tok = ++cariToken, list = $('#hasilList');
  $('#rf-err').textContent = '';
  $('#hasilInfo').innerHTML = '<span class="sp"></span> Mencari tiket yang cocok...';
  list.setAttribute('aria-busy', 'true');
  list.innerHTML = '<div class="tk skel"></div><div class="tk skel"></div><div class="tk skel"></div>';
  setTimeout(() => {
    if (tok !== cariToken) return;
    renderHasil(); list.removeAttribute('aria-busy');
    if (umpan && meta.pesan) toast(meta.pesan, meta.tipe);
  }, 650);
}
const banner = (tipe, judul, isi, alt) => '<div class="banner ' + tipe + '"><h3>' + judul + '</h3><p class="muted">' + isi + '</p>' +
  (alt && alt.length ? '<div class="actions">' + alt.slice(0, 4).map(x => '<button class="btn ghost" data-saran="' + esc(x[1]) + '">' + esc(x[0]) + '</button>').join('') + '</div>' : '') + '</div>';
function saran(a, t) {                    // tombol alternatif saat rute tidak ada / semua habis
  const alt = [];
  if (kriteria.jenis !== 'Semua') for (const j of JENIS) if (j !== kriteria.jenis && TIKET.some(x => x.jenis === j && (!a || x.asal === a) && (!t || x.tujuan === t)))
    alt.push(['Lihat ' + j.toLowerCase() + ' untuk rute ini', j + '|' + (a || 'Semua') + '|' + (t || 'Semua')]);
  if (a && t) { alt.push(['Semua tiket dari ' + a, 'Semua|' + a + '|Semua']); alt.push(['Semua tiket ke ' + t, 'Semua|Semua|' + t]); }
  return alt;
}
function renderHasil() {
  const K = kriteria;
  labelKota('rf', K.jenis);
  isiKota($('#rf-asal'), K.jenis, '', true, K.asal); isiKota($('#rf-tujuan'), K.jenis, '', true, K.tujuan);
  K.asal = $('#rf-asal').value; K.tujuan = $('#rf-tujuan').value;     // kereta/bus: kota luar negeri otomatis kembali ke "Semua"
  $('#rf-jenis').value = K.jenis; $('#rf-tanggal').value = K.tanggal; $('#rf-tanggal').min = hariIni(); $('#rf-pnp').value = K.penumpang;
  $('#rf-trip-wrap').hidden = K.jenis !== 'Pesawat'; $('#rf-trip').value = ppAktif() ? '2' : '1';
  $('#rf-pulang-wrap').hidden = !ppAktif(); $('#rf-pulang').value = K.pulang; $('#rf-pulang').min = K.tanggal || hariIni();
  $('#rf-harga').value = K.maksHarga; $('#rf-urut').value = K.urut;
  $('#rf-hargaTxt').textContent = K.maksHarga >= MAKS_HARGA ? 'Semua harga' : rupiah(K.maksHarga);
  const err = $('#rf-err'), list = $('#hasilList'), info = $('#hasilInfo');
  const gagal = m => { err.textContent = m; list.innerHTML = ''; info.textContent = ''; meta = {pesan:m, tipe:'err'}; };
  if (K.asal !== 'Semua' && K.asal === K.tujuan) return gagal('Kota asal dan kota tujuan tidak boleh sama.');
  if (K.tanggal && K.tanggal < hariIni()) return gagal('Tanggal keberangkatan tidak boleh sebelum hari ini.');
  if (ppAktif() && !K.pulang) return gagal('Pilih tanggal pulang untuk perjalanan pulang pergi.');
  if (ppAktif() && K.tanggal && K.pulang < K.tanggal) return gagal('Tanggal pulang tidak boleh sebelum tanggal berangkat.');
  err.textContent = '';

  // pencarian bertahap (Linear Search): jenis, kota asal, lalu kota tujuan
  const a = K.asal === 'Semua' ? '' : K.asal, t = K.tujuan === 'Semua' ? '' : K.tujuan, jt = K.jenis === 'Semua' ? '' : ' ' + K.jenis.toLowerCase();
  let data = TIKET.slice();
  for (const [attr, kata] of [['jenis', K.jenis === 'Semua' ? '' : K.jenis], ['asal', a], ['tujuan', t]]) if (kata) data = linearSearch(data, attr, kata);
  const rtxt = a && t ? a + ' ke ' + t : a ? 'dari ' + a : t ? 'ke ' + t : '';

  if (!data.length) {                      // tidak ada rute sama sekali
    const m = 'Tidak ada rute' + jt + ' ' + rtxt + '.';
    info.textContent = '0 tiket ditemukan.'; meta = {pesan:m, tipe:'err'};
    list.innerHTML = banner('', m, 'Belum ada jadwal yang melayani rute ini. Coba jenis transportasi lain atau ganti kotanya.', saran(a, t)); return;
  }
  const murah = data.filter(x => x.harga * mult() <= K.maksHarga);
  if (!murah.length) {                     // rute ada tapi di atas batas harga
    const m = 'Ada ' + data.length + ' tiket' + jt + ' ' + rtxt + ', tapi semuanya di atas batas harga.';
    info.textContent = '0 tiket sesuai batas harga.'; meta = {pesan:m, tipe:'warn'};
    list.innerHTML = banner('warn', m, 'Naikkan batas harga untuk melihat tiketnya.', [['Tampilkan semua harga', '~harga']]); return;
  }
  const k = KRITERIA[K.urut], urut = bubbleSort(murah, k);                 // pengurutan (Bubble Sort)
  const ada = urut.filter(x => sisaKursi(x) > 0), habis = urut.filter(x => sisaKursi(x) <= 0);
  info.textContent = ada.length + ' tiket tersedia' + (habis.length ? ', ' + habis.length + ' sudah habis' : '') + ', diurutkan: ' + k.label.toLowerCase() + '.';
  let atas = '';
  if (!ada.length) {
    const m = 'Semua tiket' + jt + ' ' + rtxt + ' sudah habis.';
    meta = {pesan:m, tipe:'err'}; atas = banner('', m, 'Kursinya sudah terisi semua. Coba jenis transportasi atau rute lain.', saran(a, t));
  } else {
    const min = Math.min(...ada.map(x => x.harga)) * mult();
    meta = {pesan:'Ditemukan ' + ada.length + ' tiket' + jt + (rtxt ? ' ' + rtxt : '') + '. Termurah ' + rupiah(min) + (habis.length ? '. ' + habis.length + ' tiket sudah habis.' : '.'), tipe:habis.length ? 'warn' : ''};
  }
  list.innerHTML = atas + ada.concat(habis).map(kartuTiket).join('');
}
function kartuTiket(t) {
  const K = kriteria, sisa = sisaKursi(t), habis = sisa <= 0, kurang = !habis && sisa < K.penumpang, tgl = K.tanggal || t.tanggal;
  return '<article class="tk' + (habis ? ' habis' : '') + '"><div class="tk-main">' +
    '<div class="tk-top"><span class="chip">' + IKON[t.jenis] + ' ' + t.jenis + '</span><span class="op">' + esc(t.operator) + '</span>' + (habis ? '<span class="badge-habis">Sudah habis</span>' : '') + '<span class="idt">' + t.id + '</span></div>' +
    '<div class="tk-route"><div><b>' + t.berangkat + '</b><small>' + t.asal + '</small></div><div class="line">' + durTxt(t.durasi) + '</div><div><b>' + tiba(t) + '</b><small>' + t.tujuan + '</small></div></div>' +
    '<div class="tk-meta"><span>' + tglID(tgl) + '</span>' + (ppAktif() ? '<span>Pulang: ' + tglID(K.pulang) + '</span>' : '') +
    (habis ? '<span class="low">Kursi sudah habis</span>' : '<span class="' + (sisa <= 5 ? 'low' : '') + '">Kursi tersedia: ' + sisa + '</span>') +
    (kurang ? '<span class="low">Tidak cukup untuk ' + K.penumpang + ' penumpang</span>' : '') + '</div></div>' +
    '<div class="tk-side"><small>' + (ppAktif() ? 'Harga per orang, pulang pergi' : 'Harga per orang') + '</small><strong>' + rupiah(t.harga * mult()) + '</strong>' +
    '<button class="btn ghost" data-detail="' + t.id + '">Lihat Detail</button>' +
    (habis ? '<button class="btn sold" disabled>Tiket Habis</button>' : '<button class="btn primary" data-pesan="' + t.id + '">Pesan Tiket</button>') + '</div></article>';
}

/* =====================================================================
   MODAL, DETAIL, PEMESANAN
   ===================================================================== */
function bukaModal(html) { $('#modalBody').innerHTML = html; $('#modal').hidden = false; document.body.style.overflow = 'hidden'; }
function tutupModal() { $('#modal').hidden = true; $('.modal-box').classList.remove('wide'); document.body.style.overflow = ''; }

function ringkasTiket(t, tgl) {
  return '<div class="sum"><div><span>Transportasi</span><b>' + IKON[t.jenis] + ' ' + t.jenis + '</b></div><div><span>Operator</span><b>' + esc(t.operator) + '</b></div>' +
    '<div><span>Rute</span><b>' + t.asal + ' → ' + t.tujuan + '</b></div><div><span>Tanggal</span><b>' + tglID(tgl) + '</b></div>' +
    '<div><span>Berangkat / tiba</span><b>' + t.berangkat + ' / ' + tiba(t) + '</b></div><div><span>Durasi</span><b>' + durTxt(t.durasi) + '</b></div>' +
    '<div><span>Kursi tersedia</span><b>' + sisaKursi(t) + '</b></div>' + (ppAktif() ? '<div><span>Perjalanan</span><b>Pulang pergi, kembali ' + tglID(kriteria.pulang) + '</b></div>' : '') + '<div><span>Harga satuan</span><b>' + rupiah(t.harga * mult()) + '</b></div></div>';
}
function bukaDetail(id) {
  const t = cariById(id); if (!t) return;
  bukaModal('<h2>Detail Perjalanan</h2>' + ringkasTiket(t, kriteria.tanggal || t.tanggal) +
    '<div class="actions"><button class="btn ghost" data-close>Tutup</button><button class="btn primary" data-pesan="' + t.id + '">Pesan Tiket</button></div>');
}
function bukaPesan(id) {
  const t = cariById(id); if (!t) return;
  const sisa = sisaKursi(t);
  if (sisa < 1) { toast('Kursi untuk tiket ini sudah habis.', 'err'); return; }
  const tgl = kriteria.tanggal || t.tanggal, awal = Math.min(kriteria.penumpang, sisa);
  bukaModal('<h2>Pemesanan Tiket</h2>' + ringkasTiket(t, tgl) +
    '<form id="bookForm" class="form-grid" novalidate data-id="' + t.id + '" data-tgl="' + tgl + '">' +
    '<label>Nama lengkap<input id="b-nama" autocomplete="name"><small class="err" id="e-nama"></small></label>' +
    '<label>Email<input id="b-email" type="email" autocomplete="email"><small class="err" id="e-email"></small></label>' +
    '<label>Nomor telepon<input id="b-telp" type="tel" placeholder="contoh: 081234567890" autocomplete="tel"><small class="err" id="e-telp"></small></label>' +
    '<label>Jumlah penumpang (maksimal ' + sisa + ')<input id="b-pnp" type="number" min="1" max="' + sisa + '" value="' + awal + '"><small class="err" id="e-pnp"></small></label>' +
    '<div class="total"><div><span>Harga satuan</span><span>' + rupiah(t.harga * mult()) + '</span></div><div><span>Jumlah tiket</span><span id="t-jml">' + awal + '</span></div>' +
    '<div class="t"><span>Total harga</span><span id="t-total">' + rupiah(t.harga * mult() * awal) + '</span></div></div>' +
    '<div class="actions"><button type="button" class="btn ghost" data-close>Kembali</button><button type="submit" class="btn orange">Konfirmasi Pemesanan</button></div></form>');
  $('#b-pnp').addEventListener('input', () => {
    const n = parseInt($('#b-pnp').value, 10) || 0;
    $('#t-jml').textContent = n; $('#t-total').textContent = rupiah(t.harga * mult() * Math.max(n, 0));
  });
  $('#bookForm').addEventListener('submit', submitPesan);
  $('#b-nama').focus();
}
function setErr(f, msg) { $('#e-' + f).textContent = msg; $('#b-' + f).classList.toggle('invalid', !!msg); return !msg; }
function submitPesan(e) {
  e.preventDefault();
  const f = e.currentTarget, t = cariById(f.dataset.id), tgl = f.dataset.tgl;
  const nama = $('#b-nama').value.trim(), email = $('#b-email').value.trim(), telp = $('#b-telp').value.trim().replace(/[\s-]/g, ''), pnp = Number($('#b-pnp').value);
  const sisa = sisaKursi(t);
  let ok = true;
  ok = setErr('nama', nama.length < 3 ? 'Nama lengkap minimal 3 karakter.' : '') && ok;
  ok = setErr('email', !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? 'Masukkan email yang valid, contoh: nama@email.com.' : '') && ok;
  ok = setErr('telp', !/^(\+62|62|0)8\d{7,12}$/.test(telp) ? 'Nomor telepon harus diawali 08 atau +62 (9 sampai 13 digit setelah 8).' : '') && ok;
  ok = setErr('pnp', !Number.isInteger(pnp) || pnp < 1 ? 'Jumlah penumpang minimal 1.' : pnp > sisa ? 'Melebihi kursi tersedia (' + sisa + ').' : '') && ok;
  if (!ok) { toast('Periksa kembali isian yang ditandai.', 'err'); return; }
  const riwayat = store.get('easygo_riwayat', []);
  let kode;
  do { kode = 'EG-' + Date.now().toString(36).toUpperCase().slice(-5) + Math.random().toString(36).slice(2, 5).toUpperCase(); }
  while (riwayat.some(b => b.kode === kode));
  const b = {kode, nama, email, telp, tiketId:t.id, jenis:t.jenis, operator:t.operator, asal:t.asal, tujuan:t.tujuan, tanggal:tgl,
    berangkat:t.berangkat, tiba:tiba(t), durasi:t.durasi, penumpang:pnp, hargaSatuan:t.harga * mult(), total:t.harga * mult() * pnp, pp:ppAktif(), pulang:kriteria.pulang, status:'Berhasil', waktuPesan:new Date().toISOString()};
  riwayat.unshift(b); store.set('easygo_riwayat', riwayat); ubahKursi(t.id, pnp);
  bukaModal('<h2>Pemesanan Berhasil</h2><p class="muted">Simpan kode booking berikut.</p><div class="kode">' + b.kode + '</div>' + ringkasanBooking(b) +
    '<div class="actions"><button class="btn ghost" data-close>Tutup</button><button class="btn primary" data-goto="riwayat">Lihat Riwayat</button></div>');
  toast('Pemesanan berhasil. Kode booking: ' + b.kode);
  renderHasil();
}
function ringkasanBooking(b) {
  return '<div class="kv"><div><span>Nama pemesan</span><b>' + esc(b.nama) + '</b></div><div><span>Email</span><b>' + esc(b.email) + '</b></div><div><span>Telepon</span><b>' + esc(b.telp) + '</b></div>' +
    '<div><span>Transportasi</span><b>' + IKON[b.jenis] + ' ' + b.jenis + ' - ' + esc(b.operator) + '</b></div><div><span>Rute</span><b>' + b.asal + (b.pp ? ' ⇄ ' : ' → ') + b.tujuan + '</b></div>' + (b.pp ? '<div><span>Pulang</span><b>' + tglID(b.pulang) + '</b></div>' : '') +
    '<div><span>Keberangkatan</span><b>' + tglID(b.tanggal) + ', ' + b.berangkat + '</b></div><div><span>Tiba</span><b>' + b.tiba + '</b></div>' +
    '<div><span>Penumpang</span><b>' + b.penumpang + ' x ' + rupiah(b.hargaSatuan) + '</b></div><div><span>Total harga</span><b>' + rupiah(b.total) + '</b></div>' +
    '<div><span>Status</span><b class="status ' + (b.status === 'Berhasil' ? 'ok' : 'cx') + '">' + b.status + '</b></div></div>';
}

/* =====================================================================
   RIWAYAT
   ===================================================================== */
function renderRiwayat() {
  const data = store.get('easygo_riwayat', []), box = $('#riwayatList');
  $('#hapusRiwayat').disabled = data.length === 0;
  if (!data.length) {
    box.innerHTML = '<div class="empty"><div class="big">'+IKON_TIKET+'</div><h3>Belum ada pemesanan</h3><p class="muted">Pesanan yang kamu buat akan muncul di sini.</p><button class="btn primary" data-page="hasil">Cari Tiket</button></div>';
    return;
  }
  box.innerHTML = data.map(b => '<div class="rw"><div><b class="kd">' + b.kode + '</b> <span class="status ' + (b.status === 'Berhasil' ? 'ok' : 'cx') + '">' + b.status + '</span>' +
    '<div class="rt">' + IKON[b.jenis] + ' ' + b.asal + ' → ' + b.tujuan + '</div>' +
    '<small>' + esc(b.nama) + ', ' + b.jenis + ' ' + esc(b.operator) + '</small><small>' + tglID(b.tanggal) + ', ' + b.berangkat + ', ' + b.penumpang + ' penumpang</small></div>' +
    '<div><strong style="color:var(--orange);font-size:1.15rem">' + rupiah(b.total) + '</strong></div>' +
    '<div class="actions" style="margin:0"><button class="btn ghost" data-rdetail="' + b.kode + '">Lihat Detail</button>' +
    (b.status === 'Berhasil' ? '<button class="btn danger" data-batal="' + b.kode + '">Batalkan</button>' : '') + '</div></div>').join('');
}
function batalkan(kode) {
  const data = store.get('easygo_riwayat', []), b = data.find(x => x.kode === kode);
  if (!b || b.status !== 'Berhasil') return;
  if (!confirm('Batalkan pemesanan ' + kode + '?')) return;
  b.status = 'Dibatalkan'; store.set('easygo_riwayat', data); ubahKursi(b.tiketId, -b.penumpang);
  renderRiwayat(); toast('Pemesanan ' + kode + ' dibatalkan.');
}

/* =====================================================================
   EVENT & INISIALISASI
   ===================================================================== */
document.addEventListener('click', e => {
  const el = e.target;
  const pg = el.closest('[data-page]'); if (pg) { e.preventDefault(); tutupModal(); go(pg.dataset.page); return; }
  const gt = el.closest('[data-goto]'); if (gt) { tutupModal(); go(gt.dataset.goto); return; }
  if (el.closest('[data-close]') || el === $('#modal')) { tutupModal(); return; }
  const j = el.closest('#homeJenis button'); if (j) { jenisHome = j.dataset.j; renderSeg(); return; }
  const tr = el.closest('#homeTrip button'); if (tr) {
    homePP = tr.dataset.trip === 'true';
    if (homePP && !$('#h-pulang').value) $('#h-pulang').value = tambahHari($('#h-tanggal').value || besok(), 3);
    renderSeg(); return; }
  const sg = el.closest('[data-saran]'); if (sg) {
    if (sg.dataset.saran === '~harga') kriteria.maksHarga = MAKS_HARGA;
    else { const [j2, a2, t2] = sg.dataset.saran.split('|'); Object.assign(kriteria, {jenis:j2, asal:a2, tujuan:t2}); if (j2 !== 'Pesawat') kriteria.pp = false; }
    jalankanCari(true); return; }
  const cat = el.closest('[data-cat]'); if (cat) {
    jenisHome = cat.dataset.cat; renderSeg();
    Object.assign(kriteria, {jenis:cat.dataset.cat, asal:'Semua', tujuan:'Semua', tanggal:'', pulang:'', pp:false, penumpang:1, maksHarga:MAKS_HARGA});
    go('hasil'); return; }
  const rg = el.closest('[data-reg]'); if (rg) { regDest = rg.dataset.reg; renderDestinasi(); return; }
  const rec = el.closest('.rec'); if (rec) {
    Object.assign(kriteria, {jenis:'Semua', asal:'Semua', tujuan:rec.dataset.tujuan, tanggal:'', pulang:'', pp:false, penumpang:1, maksHarga:MAKS_HARGA});
    go('hasil'); return; }
  const d = el.closest('[data-detail]'); if (d) { bukaDetail(d.dataset.detail); return; }
  const p = el.closest('[data-pesan]'); if (p) { bukaPesan(p.dataset.pesan); return; }
  const rd = el.closest('[data-rdetail]'); if (rd) {
    const b = store.get('easygo_riwayat', []).find(x => x.kode === rd.dataset.rdetail);
    if (b) bukaModal('<h2>Detail Pesanan</h2><div class="kode">' + b.kode + '</div>' + ringkasanBooking(b) + '<div class="actions"><button class="btn ghost" data-close>Tutup</button></div>');
    return; }
  const bt = el.closest('[data-batal]'); if (bt) { batalkan(bt.dataset.batal); return; }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) tutupModal(); });

document.addEventListener('DOMContentLoaded', () => {
  initBeranda(); initHasil();
  $('#homeForm').addEventListener('submit', submitHome);
  $('#ctaCari').addEventListener('click', () => { $('#homeForm').scrollIntoView({behavior:'smooth', block:'center'}); $('#h-asal').focus({preventScroll:true}); });
  $('#burger').addEventListener('click', () => { const o = $('#links').classList.toggle('open'); $('#burger').setAttribute('aria-expanded', o); });
  $('#hapusRiwayat').addEventListener('click', () => {
    if (!confirm('Hapus semua riwayat pemesanan di browser ini?')) return;
    store.set('easygo_riwayat', []); store.set('easygo_kursi', {}); renderRiwayat(); toast('Riwayat dihapus.'); });
  const awal = location.hash.replace('#', '');
  go(['beranda','hasil','riwayat','tentang'].indexOf(awal) !== -1 ? awal : 'beranda');
});
