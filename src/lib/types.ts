export type TitikPelaksanaan = {
  nama: string;
  desa?: string;
  kecamatan?: string;
};

export type GuimStory = {
  id: string;
  slug: string;
  angkatan: number;
  nama_angkatan: string;
  kabupaten: string;
  provinsi: string;
  tahun_pelaksanaan: string;
  tema: string;
  tagline: string | null;
  nilai: string[] | null;
  gambaran_umum: string;
  latar_belakang: string | null;
  timeline_pra_aksi: string[] | null;
  timeline_aksi: string[] | null;
  timeline_pasca_aksi: string[] | null;
  titik_pelaksanaan: TitikPelaksanaan[];
  inovasi: string[] | null;
  pembaharuan: string[] | null;
  evaluasi_lesson_learned: string[] | null;
  jumlah_panitia: number | null;
  jumlah_pengajar: number | null;
  jumlah_siswa: number | null;
  jumlah_guru: number | null;
  jumlah_sd: number | null;
  jumlah_desa: number | null;
  jumlah_kecamatan: number | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  interest: string | null;
  consent: boolean;
  source_page: string | null;
  created_at: string;
};

export type Cerita = {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string | null;
  konten: string;
  gambar_utama_url: string | null;
  penulis: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};
