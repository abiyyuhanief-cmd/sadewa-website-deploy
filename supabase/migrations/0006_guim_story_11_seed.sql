-- Seed data Cerita GUIM — angkatan 11 (susulan dari seed awal 10 angkatan di 0003)
-- Sumber: "Proposal Kegiatan Gerakan UI Mengajar Angkatan 11" dan "Proposal Dana Hibah
-- GUIM 11 - SOSMAS - BEM UI 2021" (Departemen Sosial Masyarakat BEM UI 2021).
-- CATATAN: sumber ini adalah proposal pra-aksi (ditulis Okt-Nov 2021), bukan laporan
-- pasca-aksi seperti "GUIM Story (Full)" yang jadi sumber angkatan 1-10. Tanggal aksi
-- masih "tentatif" per dokumen, dan jumlah_siswa/jumlah_guru tidak disebutkan di sumber
-- (sengaja NULL, sesuai keputusan ID-008). Disimpan sebagai draft — upgrade ke
-- published setelah divalidasi dengan laporan rekomendasi/monev pelaksanaan asli.

insert into public.guim_story (
  slug, angkatan, nama_angkatan, kabupaten, provinsi, tahun_pelaksanaan, tema, tagline, nilai,
  gambaran_umum, latar_belakang,
  timeline_pra_aksi, timeline_aksi, timeline_pasca_aksi,
  titik_pelaksanaan, inovasi, pembaharuan, evaluasi_lesson_learned,
  jumlah_panitia, jumlah_pengajar, jumlah_siswa, jumlah_guru, jumlah_sd, jumlah_desa, jumlah_kecamatan,
  status
) values
(
  'guim-11', 11, 'GUIM 11', 'Kabupaten Sumedang', 'Jawa Barat', 'Juni 2021 - Juli 2022',
  'Bentangkan Layar, Labuhkan Inspirasi', null, null,
  'GUIM 11 digagas Departemen Sosial Masyarakat BEM UI 2021 di tengah pandemi Covid-19, membawa konsep "Mini GUIM": jumlah anggota yang tinggal, hidup, dan belajar bersama masyarakat dikurangi, dengan titik aksi dipilih yang cukup dekat namun tetap terpelosok untuk menghindari mobilisasi berlebihan. Kabupaten Sumedang, Jawa Barat dipilih berdasarkan asesmen data sekunder — APM, APK, APS SD, angka melek huruf, topografi, tingkat penularan Covid-19, kriminalitas, hingga potensi bencana. Kegiatan berlangsung secara hybrid (daring dan luring dengan protokol kesehatan ketat) di tiga kecamatan: Buahdua (SDN Karangbungur), Jatinunggal (SDN Cibareubeu), dan Cisitu (SDN Cimarga), dengan aksi mengajar berlangsung 25 hari.',
  '"Bentangkan layar, labuhkan inspirasi" melambangkan tujuan GUIM 11 untuk meluaskan kebermanfaatan dan semangat inspirasi pendidikan secara berkelanjutan, dicapai lewat aksi 25 hari, publikasi maksimal, dan kerja sama dengan pihak eksternal. GUIM 11 berangkat dari keprihatinan terhadap rendahnya kesadaran akan urgensi pendidikan di daerah pelosok, sekaligus berupaya beradaptasi dengan situasi pandemi yang membatasi ruang gerak dibanding angkatan-angkatan sebelumnya.',
  ARRAY['Rekrutmen panitia, welcoming staff, dan musyawarah kerja (pleno)','Team building panitia','Grand Opening dan GUIMO Tour (daring)','Survei titik aksi, sosialisasi kegiatan, dan perizinan ke instansi/stakeholder terkait','Pembekalan dan pelatihan panitia-pengajar','Team building panitia dengan pengajar','Pelantikan pengajar','Penggalangan dana dan pengumpulan buku untuk Rumah Pelangi di tiap titik'],
  ARRAY['Aksi Mengajar/KBM, home visit, dan teacher visit harian selama 25 hari (4-28 Januari 2022)','Pembukaan Aksi: 8 Januari 2022','Rumah Pelangi dan Kelas Inspirasi: 9 Januari 2022','Pelatihan Guru: 10-11 Januari 2022','Kelas Pendidikan Diri: 15 dan 22 Januari 2022','Tubuh Sehat Ceria dan Rumah Pelangi: 16 Januari 2022','Kelas Kenali Nusantara: 21 Januari 2022','Bincang Orang Tua: 22 Januari 2022','Mari Nyeni! dan Rumah Pelangi: 23 Januari 2022','Festival Rakyat: 24 Januari 2022, penutup rangkaian mengajar','Parent Conference: 25 Januari 2022','Penutupan Aksi: 27 Januari 2022'],
  ARRAY['Publikasi kilas balik aksi dan aktor lokal inspiratif di media sosial resmi GUIM','Penyusunan laporan rekomendasi untuk diadvokasikan ke instansi pemerintah dan sekolah terkait','Grand Closing GUIM 11: peluncuran buku, sertifikat, apresiasi panitia-pengajar, serta serah terima jabatan ke kepengurusan berikutnya','Monitoring dan Evaluasi: 15-22 Agustus 2022, mencakup presentasi laporan rekomendasi ke stakeholder, kunjungan ke seluruh titik aksi, dan pengambilan data lanjutan'],
  '[{"nama":"SDN Karangbungur","desa":"Karangbungur","kecamatan":"Buahdua"},{"nama":"SDN Cibareubeu","desa":"Sukamanah (Dusun Cibareubeu)","kecamatan":"Jatinunggal"},{"nama":"SDN Cimarga","desa":"Cimarga","kecamatan":"Cisitu"}]'::jsonb,
  ARRAY['Buku Antologi Cerita Pendek GUIM: kumpulan cerita perjalanan inspiratif panitia dan pengajar setelah satu dekade GUIM','Lagu dan video soundtrack Gerakan UI Mengajar di YouTube untuk membangkitkan motivasi belajar','Program Bincang Orang Tua: membekali orang tua di titik aksi untuk mendampingi motivasi belajar anak','Program Celengan Apresiasi: budaya apresiasi internal lewat Love Letter, Curhat Akhir Bulan, dan Kejutan!','Program Covid Bundle: perbekalan kesehatan internal, dibuktikan status "covid licensed" sebelum berangkat ke titik aksi','Kerja sama dengan lembaga riset kolaborator untuk publikasi artikel ilmiah terkait kondisi pendidikan di titik aksi'],
  ARRAY['Konsep "Mini GUIM": jumlah anggota yang tinggal di titik aksi dikurangi demi meminimalkan mobilisasi di tengah pandemi','Format hybrid (daring-luring) pertama dengan protokol kesehatan ketat, termasuk swab antigen berkala dan isolasi mandiri panitia-pengajar','Pelatihan guru bertema literasi teknologi ("Bersama Beradaptasi Menciptakan Lingkungan Sekolah Ramah Teknologi"), disusun mengikuti kebutuhan hasil survei tiap titik','Rangkaian pembelajaran non-formal pagi (gerakan literasi) ditambahkan untuk mengembangkan minat baca siswa'],
  null,
  33, 18, null, null, 3, 3, 3, 'draft'
);
