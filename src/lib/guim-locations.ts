// Titik sebaran GUIM per kabupaten, diposisikan sebagai persentase (0-100)
// di atas gambar latar `/gallery/guim-map-terrain.jpg` (diorama clay Sumatra +
// Jawa). Posisi dikalibrasi manual terhadap siluet pulau pada gambar (dideteksi
// dari occupancy grid piksel), bukan koordinat GPS asli — urutan relatif
// barat→timur di Jawa dan lokasi Lampung di Sumatra tetap dipertahankan.
//
// `documented: true` = sudah ada di tabel guim_story (angkatan 1-10). `false` =
// angkatan 11-15, data statis internal Sayap Dewantara (tak sinkron dengan DB).
//
// Label West Java yang padat dipisah dua baris: pantai utara diberi labelDy
// negatif (label di atas pin) dan pantai selatan labelDy positif besar (label
// di bawah pin, di "laut" selatan) supaya tidak saling tumpuk. Nilai labelDx/
// labelDy dalam unit viewBox GuimMap (1000 x 562.5).

export type GuimLocation = {
  kabupaten: string;
  provinsi: string;
  angkatan: string;
  documented: boolean;
  /** Posisi persen dari lebar gambar (0-100), titik tumpu pin. */
  xPct: number;
  /** Posisi persen dari tinggi gambar (0-100), titik tumpu pin. */
  yPct: number;
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "middle" | "end";
};

// yPct dikalibrasi dari deteksi piksel (bukan tebakan mata) terhadap file
// guim-map-terrain.jpg yang berlaku sekarang: untuk tiap kolom xPct dicari pita
// "permukaan-atas cerah" pulau (hijau terang, bukan dinding tebing gelap hasil
// ekstrusi), lalu pin didudukkan ~62% ke bawah pita itu supaya ujungnya tampak
// tertanam di badan pulau, bukan mengambang di garis pantai. Kalau gambarnya
// di-crop ulang lagi, ULANGI deteksi ini (skrip Python ada di riwayat obrolan)
// alih-alih menaksir ulang manual.
export const guimLocations: GuimLocation[] = [
  // — Sumatra (Lampung) —
  { kabupaten: "Pesisir Barat", provinsi: "Lampung", angkatan: "9, 10", documented: true, xPct: 34, yPct: 46.8, labelAnchor: "end", labelDx: -6 },
  { kabupaten: "Pesawaran", provinsi: "Lampung", angkatan: "13", documented: false, xPct: 44, yPct: 57, labelAnchor: "start", labelDx: 10, labelDy: 2 },

  // — Jawa Barat (padat: label utara di-stagger dua tingkat, selatan di bawah pulau) —
  { kabupaten: "Pandeglang", provinsi: "Banten", angkatan: "2", documented: true, xPct: 52, yPct: 71.5, labelAnchor: "end", labelDx: -8, labelDy: 6 },
  { kabupaten: "Sukabumi", provinsi: "Jawa Barat", angkatan: "4", documented: true, xPct: 54.5, yPct: 69.7, labelDy: 54 },
  { kabupaten: "Sumedang", provinsi: "Jawa Barat", angkatan: "11", documented: false, xPct: 57.5, yPct: 71.5, labelDy: -4 },
  { kabupaten: "Garut", provinsi: "Jawa Barat", angkatan: "1", documented: true, xPct: 60, yPct: 70.1, labelDy: 54 },
  { kabupaten: "Indramayu", provinsi: "Jawa Barat", angkatan: "3", documented: true, xPct: 62, yPct: 69.7, labelDy: -20 },
  { kabupaten: "Cirebon", provinsi: "Jawa Barat", angkatan: "15", documented: false, xPct: 64.5, yPct: 70.8, labelAnchor: "start", labelDx: 8, labelDy: -3 },
  { kabupaten: "Pangandaran", provinsi: "Jawa Barat", angkatan: "7", documented: true, xPct: 67, yPct: 69.6, labelDy: 54 },

  // — Jawa Tengah & Timur —
  { kabupaten: "Brebes", provinsi: "Jawa Tengah", angkatan: "6", documented: true, xPct: 69, yPct: 66.7, labelAnchor: "end", labelDx: -6, labelDy: -20 },
  { kabupaten: "Tegal", provinsi: "Jawa Tengah", angkatan: "5", documented: true, xPct: 71.5, yPct: 65.2, labelAnchor: "start", labelDx: 8, labelDy: -3 },
  { kabupaten: "Temanggung", provinsi: "Jawa Tengah", angkatan: "8, 10", documented: true, xPct: 76.5, yPct: 62.4, labelDy: -4 },
  { kabupaten: "Blora", provinsi: "Jawa Tengah", angkatan: "14", documented: false, xPct: 83, yPct: 60.6, labelDy: -4 },
  { kabupaten: "Nganjuk", provinsi: "Jawa Timur", angkatan: "12", documented: false, xPct: 89, yPct: 57.4, labelAnchor: "start", labelDx: 9 },
];
