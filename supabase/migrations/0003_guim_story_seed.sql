-- Seed data Cerita GUIM — 10 angkatan (FR-105)
-- Sumber: "GUIM Story (Full)", Sayap Dewantara. Statistik dari bagian "GUIM in Data".
-- Field yang datanya belum diketahui di sumber (mis. Sosmas/PI BEM UI angkatan 2-6) sengaja
-- tidak diisi (NULL) — sesuai keputusan ID-008: field kosong disembunyikan di UI, bukan
-- ditampilkan sebagai "-".

insert into public.guim_story (
  slug, angkatan, nama_angkatan, kabupaten, provinsi, tahun_pelaksanaan, tema, tagline, nilai,
  gambaran_umum, latar_belakang,
  timeline_pra_aksi, timeline_aksi, timeline_pasca_aksi,
  titik_pelaksanaan, inovasi, pembaharuan, evaluasi_lesson_learned,
  jumlah_panitia, jumlah_pengajar, jumlah_siswa, jumlah_guru, jumlah_sd, jumlah_desa, jumlah_kecamatan,
  status
) values

(
  'guim-1', 1, 'GUIM 1', 'Kabupaten Garut', 'Jawa Barat', 'September 2011 - Februari 2012',
  '1 Bulan, 1 Daerah, 1 Bhakti untuk Negeri', null, null,
  'GUIM angkatan ke-1 adalah Gerakan Universitas Indonesia Mengajar pertama yang diadakan di luar program K2N UI, di bawah program kerja BEM UI masa bakti 2011. Kegiatan ini lahir dari janji politik BEM UI untuk merambah daerah 3T (terdepan, terpencil, terluar). Sasarannya mencakup civitas akademika UI sebagai upaya membumikan GUIM, serta daerah tujuan aksi di Pameungpeuk, Garut, Jawa Barat. Sebagai angkatan pelopor, GUIM 1 dikenal nekat: dalam waktu singkat dan dengan panitia seadanya, berhasil membangun program berdurasi satu tahun penuh, lengkap dengan persiapan pengajar hingga pelaksanaan di lapangan.',
  'GUIM berawal dari janji kampanye Ketua BEM UI terpilih dengan nama awal UI Mengajar, bervisi memberantas buta huruf. Setelah konsultasi dengan dosen intervensi sosial dan studi banding ke Indonesia Mengajar, Kersos FTUI, dan K2N UI, tujuan diarahkan ulang menjadi memotivasi siswa daerah untuk kembali bersemangat belajar melalui model perubahan perilaku berbasis interaksi langsung. Daerah pedesaan dipilih agar mahasiswa dapat live in dan merasakan langsung kondisi masyarakat.',
  ARRAY['Asesmen dan Survey Lapangan: 2011','Seleksi Pengajar tiga tahap: Seleksi CV (26 Sep - 2 Okt 2011), Wawancara (22-23 Okt 2011), Simulasi Mengajar (12-13 Nov 2011)','Pelatihan Pengajar lima sesi: 3, 10, 11 (dua sesi), dan 17 Desember 2011','Seminar Akbar: 14 Januari 2012'],
  ARRAY['18 Januari - 23 Februari 2012'],
  null,
  '[{"nama":"SDN 2 Bojong dan SDN 4 Bojong"},{"nama":"SDN 1 Bojong dan SDN 3 Bojong"},{"nama":"SDN 5 Bojong"}]'::jsonb,
  ARRAY['Intervensi terhadap siswa dan guru sekaligus melalui team teaching kreatif bersama guru setempat','Survei titik aksi berbasis data sekunder Dinas Pendidikan dengan tolok ukur kondisi bangunan, presensi siswa, dan rasio guru-siswa','Seleksi pengajar komprehensif dengan simulasi mengajar dibantu anggota teater FIB','Intervensi sosial per titik yang dirancang bersama masyarakat setempat, termasuk iuran warga'],
  null,
  ARRAY['Setiap angkatan menghadapi tantangan serupa dengan bentuk berbeda dari angkatan sebelumnya','Latar belakang jurusan panitia maupun pengajar tidak membatasi ilmu baru yang bisa dikembangkan di GUIM','GUIM menyediakan wadah eksplorasi diri dan jejaring yang sulit didapat setelah lulus kuliah','Keberanian dan ketahanan diri menjadi kunci menghadapi ketidakpastian memulai sesuatu yang baru','Tidak ada bayangan dari pengurus GUIM 1 bahwa gerakan ini akan bertahan hingga angkatan ke-10','Laporan pertanggungjawaban tiap angkatan sebaiknya menjadi bahan evaluasi bagi angkatan berikutnya'],
  34, 30, 450, 30, 5, 1, 1, 'published'
),

(
  'guim-2', 2, 'GUIM 2', 'Kabupaten Pandeglang', 'Banten', 'September 2012 - Februari 2013',
  '3E: Enlighten, Empower, Educate', 'Satu Hati, Mengabdi, Memberi Arti', null,
  'GUIM Angkatan 2 awalnya direncanakan di Lebak, Banten, namun berpindah ke Pandeglang karena Lebak sudah diintervensi Indonesia Mengajar. Pandeglang dipilih berdasarkan survei ke BPS Provinsi Banten yang menunjukkan tiga kecamatan dengan tingkat pendidikan dasar rendah. GUIM 2 dikenal sebagai angkatan yang melakukan perbaikan sistemik internal organisasi, mulai dari alur kegiatan hingga standarisasi pra-kegiatan dan kegiatan, meski belum fokus pada pasca-kegiatan.',
  null,
  ARRAY['Grand Launching: 6 September 2012 di Aula Terapung Perpustakaan Pusat UI','Call for Pengajar dua tahap: 5-11 Oktober dan 6-7 Oktober 2012','Pembekalan Panitia dan Pengajar Terpilih: 5-16 November 2012','Seminar dan Pelantikan Pengajar: 24 November 2012'],
  ARRAY['9 Januari - 2 Februari 2013'],
  null,
  '[{"nama":"SDN Kertaraharja 1"},{"nama":"SDN Kertaraharja 2"},{"nama":"SDN Kertaraharja 3"},{"nama":"SDN Kutamekar 1"},{"nama":"SDN Kutamekar 3"}]'::jsonb,
  ARRAY['Rapat koordinasi pertama untuk membentuk strategi tim satu tahun kepengurusan dengan parameter keberhasilan yang jelas','Hibah eksternal pertama: pendanaan Rp240 juta dari Pertamina, bantuan transportasi survei dari BlueBird, dan beasiswa dari SSC','Perekrutan panitia terbuka pertama kali dengan proses formulir dan wawancara','Rangkaian Call for Pengajar terstruktur: seleksi administrasi, esai substantif, dan simulasi mengajar langsung ke siswa SD','Kontrak pengajar pertama kali diterbitkan agar pengajar lebih disiplin mengikuti kegiatan','Pesta Rakyat pertama kali diadakan sebagai acara penutupan dan perpisahan di lokasi aksi'],
  ARRAY['Titik aksi bertambah dari 3 menjadi 5 lokasi, meski jumlah SD tetap 5','Proses seleksi pengajar dibuat lebih sistematis, langsung memilih 30 orang tanpa pelatihan sebagai tahap seleksi','Pembekalan pengajar dipadatkan dari dua kali seminggu menjadi penuh satu minggu','Setiap pengajar terpilih mendapat dana Rp250.000 untuk menyiapkan media pembelajaran'],
  ARRAY['Program yang berdasarkan riset sangat diperlukan, bukan menawarkan program yang sebenarnya tidak dibutuhkan masyarakat','Fundraising sebaiknya berfokus pada donasi bertujuan jelas, bukan sekadar penjualan','Barang berharga panitia perlu dijaga ketat selama aksi karena pernah terjadi pencurian','Publikasi acara selama hari aksi perlu dilakukan secara masif sebagai andalan gerakan','Setiap titik memiliki kebutuhan berbeda sehingga survei perlu mencakup kebutuhan masyarakat secara luas, bukan hanya sekolah'],
  50, 30, 613, 32, 5, 2, 1, 'published'
),

(
  'guim-3', 3, 'GUIM 3', 'Kabupaten Indramayu', 'Jawa Barat', 'Juni 2013 - Maret 2014',
  'Mewarnai Negeri, Menginspirasi Bangsa', 'Bergerak Turun Untuk Naik Bersama', ARRAY['Pendidikan','Penelitian','Pengabdian'],
  'GUIM 3 menghadapi obstacle eksternal cukup besar: tanpa sponsor utama di awal, yang justru mendorong GUIM untuk mendekatkan diri kepada Rektorat dan akhirnya mendapat pendanaan lebih besar dari angkatan sebelumnya, menjadi acuan pendanaan angkatan berikutnya. Saat pelaksanaan aksi, bencana banjir besar melanda Indramayu selama sekitar seminggu dan berdampak pada empat dari enam titik aksi. GUIM 3 merespons cepat dengan membantu masyarakat terdampak bekerja sama dengan UI Peduli Bencana.',
  null,
  ARRAY['Seleksi Panitia: April-Mei 2013','Team Building Panitia: Juni 2013','Survei: Juni-Juli 2013','Grand Launching dan Roadshow: September 2013','Seleksi Pengajar: September-November 2013','Seminar dan Pelantikan Pengajar: Desember 2013'],
  ARRAY['Aksi Mengajar: 7 Januari - 2 Februari 2014','Aksi Sosial Terintegrasi, Rumah GUIM 3, Show Time, Pelatihan Guru, dan Pesta Rakyat'],
  ARRAY['Performance Appraisal dan Grand Closing: Februari 2014','Rapat Evaluasi: Maret 2014'],
  '[{"nama":"SDN Cikawung 2","desa":"Ciselang","kecamatan":"Terisi"},{"nama":"SDN Cikawung 4","desa":"Sukatani","kecamatan":"Terisi"},{"nama":"SDN Cangkring 2","desa":"Cantigi Kulon","kecamatan":"Cantigi"},{"nama":"SDN Taman Sari Endah","desa":"Cemara","kecamatan":"Cantigi"},{"nama":"SDN Cemara Kulon","desa":"Cemara","kecamatan":"Losarang"},{"nama":"SDN Losari","desa":"Kertasari","kecamatan":"Losarang"}]'::jsonb,
  ARRAY['Penambahan divisi baru Human Resource Development agar tim panitia sekuat pengajar dalam melewati proses seleksi hingga persiapan mental'],
  ARRAY['Titik aksi bertambah dari lima menjadi enam','Jumlah panitia dan pengajar turut ditambah seiring penambahan titik aksi'],
  ARRAY['Contingency plan harus dibuat matang dengan mempertimbangkan faktor internal maupun eksternal signifikan','Relasi dengan partner dan sponsor perlu dijaga dengan target yang ditetapkan jelas sejak awal','Pasca aksi menjadi momen terberat karena motivasi tim menurun, perlu cara efektif untuk tetap produktif','Perlu dipertimbangkan lebih lanjut apakah closing GUIM secara terpusat masih diperlukan'],
  53, 36, 570, 36, 6, 6, 3, 'published'
),

(
  'guim-4', 4, 'GUIM 4', 'Kabupaten Sukabumi', 'Jawa Barat', '2015',
  'Aksi, Kreasi, dan Inspirasi', 'Satu Aksi, Bersama Menginspirasi', ARRAY['Pendidikan','Kepedulian','Kreativitas','Pengabdian'],
  'GUIM 4 bergerak tidak hanya secara horizontal ke masyarakat, tetapi juga vertikal dengan pemerintah kabupaten dan kecamatan Sukabumi, agar aksi yang dilakukan dapat dilanjutkan dan dimonitor pemerintah setelah GUIM berakhir. Angkatan ini juga menginisiasi Konferensi Mahasiswa Mengajar sebagai wadah sharing gagasan pendidikan antar mahasiswa se-Indonesia, agar konsep GUIM dapat diadaptasi oleh universitas lain.',
  null,
  ARRAY['Seleksi Panitia, Team Building, Pelatihan Awal Bidang, dan Survei','Grand Launching dan Roadshow Fakultas','Seleksi Pengajar','Team Building serta Pelatihan dan Pembekalan Panitia dan Pengajar','Seminar dan Pelantikan Pengajar Terpilih'],
  ARRAY['Opening, Aksi Mengajar, Intervensi dan Proyek Sosial, Rumah Pelangi, Sabtu Ceria, Pesta Rakyat'],
  ARRAY['Konferensi Gerakan Mahasiswa Mengajar se-Indonesia dan Gala Dinner','Evaluasi, Laporan Rekomendasi, serta Monitoring dan Evaluasi'],
  '[{"nama":"SDN Puncakmanggu","desa":"Balekembang","kecamatan":"Kalibunder"},{"nama":"SDN Puncakmanggah","desa":"Cimahpar","kecamatan":"Kalibunder"},{"nama":"SDN Cimahpar 4","desa":"Sekarsari","kecamatan":"Kalibunder"},{"nama":"SDN Cimanggu 1","desa":"Cimanggu","kecamatan":"Cimanggu"},{"nama":"SDN Karanganyar","desa":"Karang Anyar","kecamatan":"Jampang Kulon"},{"nama":"SDN Negla","desa":"Tanjung","kecamatan":"Jampangkulon"}]'::jsonb,
  ARRAY['Konferensi Gerakan Mahasiswa Mengajar menghadirkan perwakilan 18 universitas se-Indonesia serta Menteri Pendidikan dan Kebudayaan saat itu, Anies Baswedan','Penuansaan branding GUIM dipergencar lewat maskot GUIMO, desain logo baru, dan liputan media televisi maupun radio','Laporan Rekomendasi kepada pemerintah daerah aksi disusun untuk menunjang keberlanjutan program'],
  ARRAY['Rebranding Perpustakaan Umum menjadi Rumah Pelangi agar lebih menarik, didekorasi kolaboratif bersama panitia, pengajar, guru, dan murid'],
  ARRAY['Kinerja sebagian panitia tidak maksimal sehingga PO dan VPO memutuskan memutihkan beberapa panitia','Antusiasme sebagian pengajar untuk menyelesaikan program yang direncanakan sempat menurun','Penyelesaian dokumentasi akhir seperti Buku GUIM, sertifikat, dan laporan rekomendasi berjalan lamban akibat kesibukan panitia'],
  56, 36, 828, 36, 6, 6, 3, 'published'
),

(
  'guim-5', 5, 'GUIM 5', 'Kabupaten Tegal', 'Jawa Tengah', 'September 2015 - Maret 2016',
  'Sinergi Aksi untuk Menginspirasi', 'Belajar dan Bermain di Tegal', null,
  'GUIM 5 merupakan angkatan evaluasi yang meninjau ulang visi dan misi GUIM setelah berjalan empat angkatan, menghasilkan perubahan redaksional yang berdampak pada mata acara hingga sasaran aksi. Untuk pertama kalinya GUIM mengadakan aksi di luar Provinsi Jawa Barat, sebagai bentuk melebarkan sayap kebermanfaatan setelah tiga angkatan berturut-turut beraksi di Jawa Barat.',
  null,
  ARRAY['Seleksi Panitia: Mei 2015','Survei dalam empat gelombang: Juni, Agustus (dua kali), dan Oktober','Grand Launching: 4 September 2015','Roadshow: 8-17 September 2015','Seleksi Pengajar: September-November 2015','Pelatihan, Pembekalan, dan Pelantikan Pengajar: November-Desember 2015'],
  ARRAY['Aksi Mengajar dan Aksi Sosial Terintegrasi: 7-31 Januari 2016','Pesta Rakyat dan Closing Aksi'],
  ARRAY['Konferensi dan pameran: 14-19 Maret 2016','Evaluasi'],
  '[{"nama":"SDN Rangimulya 01","desa":"Rangimulya","kecamatan":"Warureja"},{"nama":"SDN Sumbarang","desa":"Sumbarang","kecamatan":"Jatinegara"},{"nama":"SDN Kedungwungu","desa":"Kedungwungu","kecamatan":"Jatinegara"},{"nama":"SDN Rembul","desa":"Rembul","kecamatan":"Bojong"},{"nama":"SDN Traju 03","desa":"Traju","kecamatan":"Bumijawa"},{"nama":"SDN Sigedong 02","desa":"Sigedong","kecamatan":"Bumijawa"}]'::jsonb,
  ARRAY['Program Duta GUIM: melibatkan dua mahasiswa perwakilan dari IPB dan Unsoed untuk turun aksi bersama GUIM, agar gerakan mengajar swadaya kampus lain dapat mengadaptasi hal baik dari GUIM','Para Duta GUIM diundang menyampaikan pengalaman di Konferensi Mahasiswa Mengajar Indonesia pasca aksi'],
  ARRAY['Konferensi Mahasiswa Mengajar Indonesia disatukan ke rangkaian grand closing bersama seminar dan pameran foto','Jumlah peserta konferensi bertambah menjadi perwakilan 26 universitas se-Indonesia'],
  ARRAY['Program berbasis riset yang jelas lebih penting daripada program yang sekadar mencontoh angkatan sebelumnya','Konferensi Mahasiswa Mengajar sebaiknya dioper ke gerakan kampus lain agar tidak hanya bersifat seremonial milik GUIM','Publikasi besar pasca aksi diperlukan agar nama GUIM lebih dikenal masyarakat luas, tidak hanya kalangan mahasiswa','Komunikasi yang baik dengan partner dan pihak lain penting untuk meminimalkan kesalahpahaman','Tim yang solid dengan konsistensi tinggi menjadi kunci keberhasilan mengingat masa kerja panitia lebih dari satu tahun','Pengelolaan website perlu dijadwalkan tetap sebagai pusat informasi utama GUIM ke publik'],
  56, 36, 984, 36, 6, 6, 4, 'published'
),

(
  'guim-6', 6, 'GUIM 6', 'Kabupaten Brebes', 'Jawa Tengah', '2016 - 2017',
  'Sinergi proaktif dan berbagi untuk negeri', null, null,
  'GUIM 6 melanjutkan kegiatan yang dirintis Departemen Sosial Masyarakat BEM UI sejak 2010/2011, dengan fokus mengembangkan jejaring bersama komunitas pendidikan lain agar siswa di titik aksi memiliki akses lebih luas untuk melanjutkan sekolah. GUIM 6 berhasil menjalin kerja sama dengan GNOTA (Gerakan Nasional Orangtua Asuh) yang memfasilitasi siswa putus sekolah agar tetap lanjut sekolah, serta sempat mewakili Indonesia di forum ASEAN Student Future Leaders di Filipina.',
  null,
  ARRAY['Open Recruitment Panitia: Mei 2016','Enam gelombang Survei antara Juni-Desember 2016','Grand Opening dan Roadshow: September 2016','Donasi Buku: September-Desember 2016','Seleksi dan Pelantikan Pengajar: November 2016','Pelatihan Pengajar dan Persiapan Keberangkatan: Desember 2016'],
  ARRAY['Januari 2017'],
  ARRAY['Persiapan Penutupan, Pembuatan Buku GUIM 6, dan Film Etnografi Pendidikan: Februari 2017','Forum Ilmiah Pendidikan, GUIM Exhibition, dan Team Breaking: Maret 2017'],
  '[{"nama":"Titik 1","desa":"Grinting","kecamatan":"Bulakamba"},{"nama":"Titik 2","desa":"Kemiriamba","kecamatan":"Jatibarang"},{"nama":"Titik 3","desa":"Keramat","kecamatan":"Jatibarang"},{"nama":"Titik 4","desa":"Kamal","kecamatan":"Larangan"},{"nama":"Titik 5","desa":"Kalibanteng","kecamatan":"Larangan"},{"nama":"Titik 6","desa":"Sindangheula","kecamatan":"Banjarharjo"}]'::jsonb,
  ARRAY['Membawa GUIM ke Filipina untuk berbagi wawasan dengan gerakan mengajar se-ASEAN','Kerja sama dengan GNOTA sebagai simbol keberlanjutan manfaat bagi siswa didik di titik aksi'],
  ARRAY['Melanjutkan program Duta GUIM dan mempertahankan Rumah Pelangi di setiap titik aksi','Mengganti maskot dengan desain buatan tim GUIM sendiri','Tim Pubdok diganti menjadi Visual and Design, job publikasi dialihkan ke Public Relations','Tim keuangan dijadikan satu unit tersendiri yang menyatukan fundraising dan sponsorship'],
  ARRAY['Pengalaman menjadi panitia dan pengajar GUIM adalah pengalaman berharga yang tidak bisa dibeli, mengajarkan interaksi dengan berbagai pihak, personal branding, profesionalisme, dan manajemen waktu','Proses dari perekrutan hingga monitoring evaluasi memberi banyak pelajaran yang berguna pasca kuliah'],
  59, 36, 768, 36, 6, 6, 4, 'published'
),

(
  'guim-7', 7, 'GUIM 7', 'Kabupaten Pangandaran', 'Jawa Barat', 'April 2017 - Agustus 2018',
  'Sinergi Dalam Aksi untuk Menginspirasi Negeri', null, null,
  'GUIM Angkatan 7 dinaungi BEM Sosmas UI dan berfokus pada pengabdian masyarakat bidang pendidikan di 6 SD pada 5 kecamatan di Kabupaten Pangandaran, dipilih berdasarkan Angka Putus Sekolah, Angka Buta Huruf, Angka Kompetensi Guru, dan Indeks Pembangunan Manusia terendah di Jawa Barat. GUIM 7 dikenal sebagai angkatan yang menghasilkan laporan rekomendasi berbasis penelitian Participatory Rural Appraisal (PRA) bersama masyarakat.',
  null,
  ARRAY['April 2017 - Desember 2018 (rincian tidak tercatat lengkap di sumber)'],
  ARRAY['Januari 2018 (rincian tidak tercatat lengkap di sumber)'],
  null,
  '[{"nama":"SDN 2 Maruyungsari"},{"nama":"SDN 2 Batumalang"},{"nama":"SDN 2 Ciakar"},{"nama":"SDN 1 Cempaka"},{"nama":"SDN 1 Mekarwangi"},{"nama":"SDN 1 Karangkamiri"}]'::jsonb,
  ARRAY['Inisiasi kegiatan Participatory Rural Appraisal (PRA) untuk melibatkan masyarakat sejak proses identifikasi masalah hingga perencanaan aksi, menjadi landasan laporan rekomendasi','Penggalangan donasi publik melalui Kitabisa untuk pembangunan Rumah Pelangi SDN 02 Batumalang','Surat dari mahasiswa UI untuk anak-anak murid di titik aksi'],
  ARRAY['Kerja sama dengan Selasar.com untuk proses pendaftaran pengajar berbasis esai, sekaligus sumber dana sponsor','Kegiatan konferensi pasca aksi dihilangkan, diganti acara informal bersama anak asuh Yayasan GNOTA Depok','Audiensi dengan Pemerintah Kabupaten dan Dinas Pendidikan Pangandaran untuk presentasi laporan rekomendasi'],
  ARRAY['Perlu menyiapkan rencana cadangan sejak awal karena rektorat sempat tidak mengizinkan aksi ke luar Pulau Jawa','Internal kepanitiaan perlu diperkuat untuk menjaga semangat pengabdian dari tahun ke tahun','Komunikasi dan kerja sama dengan mitra seperti pemerintah daerah, lembaga riset, dan ikatan alumni perlu ditingkatkan','Konsistensi desain dan publikasi di media sosial maupun fisik perlu ditingkatkan','Rencana pembuatan buku fisik sebaiknya dipertimbangkan dalam format e-book untuk menghemat biaya dan memperluas distribusi'],
  52, 36, 553, 36, 6, 6, 5, 'published'
),

(
  'guim-8', 8, 'GUIM 8', 'Kabupaten Temanggung', 'Jawa Tengah', 'November 2018 - Agustus 2019',
  'Bergerak Bersama Menginspirasi', null, ARRAY['Bergerak','Bersama','Menginspirasi'],
  'GUIM 8 menjadi tongkat estafet dari angkatan-angkatan sebelumnya, dilaksanakan karena manfaat dan pembelajaran yang dirasakan tidak boleh terputus. Angkatan ini dikenal cukup banyak menghadapi konflik, mulai dari isu dengan alumni terkait pengelolaan cerita GUIM untuk website, birokrasi dengan pemerintah kota, hingga negosiasi dengan warga di salah satu titik aksi — namun setiap konflik turut membawa banyak pembelajaran bagi tim.',
  null,
  ARRAY['Pleno dan Briefing Pengajar: 10 November 2018','Team Building Panitia dan Pengajar: 16-18 November 2018','Pelatihan dan Pembekalan Pengajar: 24-25 November 2018','Pelatihan Bahasa dan Budaya, Pleno II, dan Mentoring Pengajar: awal Desember 2018','Seminar dan Pelantikan Pengajar: 8 Desember 2018'],
  ARRAY['Aksi Mengajar 25 hari: 5-30 Januari 2019','Penutupan Aksi: 30 Januari 2019'],
  ARRAY['Monitoring dan Evaluasi: Juli 2019'],
  '[{"nama":"SDN Gandikan","kecamatan":"Tretep"},{"nama":"SDN Sarangan","kecamatan":"Tretep"},{"nama":"SDN Glagahombo","kecamatan":"Bejen"},{"nama":"SDN 1 Ngadisepi","kecamatan":"Gemawang"},{"nama":"SDN 2 Ngemplak","kecamatan":"Kandangan"},{"nama":"SDN Kwarakan","kecamatan":"Kaloran"}]'::jsonb,
  ARRAY['Meluncurkan website GUIM (uimengajar.org) yang masih digunakan hingga GUIM 10','Kolaborasi pembukaan bersama Rumbel, FKM UI Peduli, dan Indonesia Mengajar dengan konsep berbagi cerita mengajar','Berhasil mencetak buku GUIM 8 hingga tahap percetakan fisik','Closing GUIM dilakukan secara online untuk pertama kali, menjangkau lebih banyak alumni'],
  ARRAY['Struktur sekretaris ditambah menjadi dua orang agar beban kerja lebih terbagi','Lokasi simulasi mengajar pengajar dipindah ke SDN Srengseng Sawah','Merchandise dibuat berkolaborasi dengan Alter Project, brand rintisan mahasiswa FISIP','Grand Closing offline ditiadakan demi efisiensi waktu, dana, dan tenaga, digantikan penutupan di Dindikpora Temanggung'],
  ARRAY['Komunikasi yang jelas dan konsisten dengan panitia, pengajar, orang tua, warga, dan pemerintah lokal sangat penting sejak sebelum aksi berlangsung','Mengelola ekspektasi menjadi kunci karena banyak faktor eksternal yang tidak bisa dikendalikan sepenuhnya','Fokus pada porsi tugas masing-masing lebih efektif daripada berusaha mengubah semua hal yang di luar kendali','Mencari local hero di titik aksi membantu keberlanjutan program setelah GUIM selesai, meski perlu dikelola dengan ekspektasi yang realistis'],
  54, 36, 631, 38, 6, 6, 5, 'published'
),

(
  'guim-9', 9, 'GUIM 9', 'Kabupaten Pesisir Barat', 'Lampung', 'April 2019 - Agustus 2020',
  'Gotong Royong Berkontribusi, Tanamkan Inspirasi', null, null,
  'GUIM angkatan ke-9 menjadi angkatan pertama yang melaksanakan aksinya di luar Pulau Jawa, didasari kesadaran bahwa sekolah yang membutuhkan semangat dan dukungan juga ada di daerah lain. Sasaran GUIM 9 mencakup sekolah, masyarakat sekitar, dan mahasiswa UI sendiri, dengan harapan mahasiswa turut menyadari banyak hal yang dapat dipelajari dari kegiatan ini.',
  null,
  ARRAY['Open Recruitment dan Staffing: April-Mei 2019','Rangkaian Survei ke Pesisir Barat, Lampung: Juni-Agustus 2019 (dua gelombang)','Grand Opening: 11 September 2019','Seleksi Pengajar lima tahap dan Roadshow: September-November 2019','Grand Team Building: 22-24 November 2019 di Puncak, Bogor','Pelantikan Panitia dan Pengajar: 7 Desember 2019'],
  ARRAY['Advance Aksi: 2-5 Januari 2020','Aksi Mengajar: 6-30 Januari 2020'],
  null,
  '[{"nama":"Pagar Dalam"},{"nama":"Pugung Malaya (SDN 111 Krui)"},{"nama":"Kota Karang (SDN 93 Krui)"},{"nama":"Way Napal (SDN 71 Krui)"},{"nama":"Marang (SDN 60 Krui)"},{"nama":"Ulok Mukti (SDN 44 Ulok Mukti)"}]'::jsonb,
  ARRAY['Program disusun secara bottom-up berdasarkan kebutuhan spesifik tiap titik hasil survei, sehingga aktivitas dan implementasi bervariasi antar titik','Dua program besar ditetapkan sebagai standar aktivitas yang dapat diadaptasi tiap titik'],
  ARRAY['Divisi RED dipisah menjadi ED dan RC agar pembagian kerja pra aksi dan aksi lebih merata dan data survei lebih mendalam','Divisi CED diganti menjadi HRD, memisahkan fungsi internal (HRD) dan eksternal (PR) agar masing-masing lebih fokus','Sistem tiga pilar RED-CRE-CED dihapuskan karena setiap divisi dinilai memiliki peran setara'],
  ARRAY['Keberhasilan menjadi angkatan pertama beraksi di luar Pulau Jawa membuktikan hal yang dianggap tidak mungkin tetap bisa terlaksana dengan persiapan matang','Pemekaran divisi meningkatkan efisiensi namun masih menyisakan ketimpangan beban kerja di beberapa divisi','Sistem pengajar cadangan perlu direncanakan lebih matang karena banyak calon pengajar enggan berkomitmen tanpa kepastian keberangkatan','Relationship building mendalam dengan pihak sekolah sejak survei diperlukan agar permasalahan benar-benar tergali'],
  56, 36, 625, 38, 6, 6, 5, 'published'
),

(
  'guim-10', 10, 'GUIM 10', 'Kabupaten Temanggung dan Kabupaten Pesisir Barat (Dalam Jaringan)', 'Jawa Tengah dan Lampung', 'Agustus 2020 - April 2021',
  'Bersama menuju tak terbatas', null, null,
  'GUIM 10 dilaksanakan di tengah pandemi Covid-19 dengan fokus pada peningkatan kualitas pembelajaran jarak jauh melalui blended learning dan pemberian fasilitas pendukung belajar. Aksi dilakukan secara daring di lokasi yang pernah dikunjungi GUIM 8 dan GUIM 9, yaitu Kabupaten Temanggung dan Kabupaten Pesisir Barat. Kegiatan terbagi menjadi tiga bentuk: menginspirasi secara daring, meningkatkan akses pendidikan lewat webinar dan blended learning, serta menyediakan fasilitas pendukung pembelajaran seperti video belajar dan donasi buku.',
  null,
  ARRAY['Open Recruitment dan Welcoming Staff: Agustus-September 2020','Asesmen Kebutuhan Wilayah Sasaran dan Kemampuan Komunitas Kolaborator: 31 Agustus - 17 September 2020','Grand Opening: 12 September 2020','Lomba Cerita Anak dan GUIM Donasi Buku (Gedebuk): September-Oktober 2020','Webinar Orang Tua, Pembekalan Pengajar dan Relawan: Oktober 2020','Penggalangan Dana: September-Desember 2020'],
  ARRAY['Blended Learning setiap Sabtu: 31 Oktober - 12 Desember 2020','Pendampingan Pengajar dan Relawan, Talk With Teacher, Talk With Parents berjalan paralel','Rangkaian publikasi konten edukatif: Ayo Berkarya, Jelajah Inspirasi, Kelas Pendidikan Diri, Aku Anak Sehat, Bangga Menjadi Indonesia'],
  null,
  '[{"nama":"SDN Kwarakan","desa":"Kwarakan","kecamatan":"Kaloran, Temanggung"},{"nama":"SDN Kota Karang","desa":"Kota Karang","kecamatan":"Pesisir Utara, Pesisir Barat"}]'::jsonb,
  ARRAY['Metode co-teaching (One Teach, One Assist) berkolaborasi dengan komunitas lokal Kamadita di Temanggung dan Potensial.id di Pesisir Barat','Webinar orang tua bertema peran pendampingan anak belajar di rumah selama pembelajaran jarak jauh','Lomba cerita anak menghasilkan buku ber-ISBN berjudul Aku Anak Indonesia Sehat, Hebat, dan Berkarakter, dicetak sekitar 100 eksemplar dan disebarkan ke wilayah sasaran','Kegiatan Isotop mengundang inovator komunitas pendidikan untuk berbagi wawasan lewat media sosial GUIM','Asesmen daring menggantikan survei luring untuk memahami kondisi wilayah sasaran'],
  ARRAY['Mekanisme donasi buku ditugaskan penuh ke divisi Accommodation agar lebih terstruktur','Konten publikasi diperluas mencakup konten informatif dan interaktif, tidak hanya kegiatan GUIM','Struktur kepengurusan dipangkas, termasuk jumlah sekretaris menjadi satu orang','Tahapan seleksi pengajar dipangkas menjadi dua tahap sesuai kondisi pandemi'],
  ARRAY['Keberanian menghadapi ketidakpastian menjadi kunci karena GUIM 10 berangkat dari kondisi yang awalnya dirasa tidak mungkin dilakukan','Informasi yang lengkap sangat membantu pengambilan keputusan meski hasil akhirnya tetap tidak dapat diprediksi sepenuhnya','Perlu dikaji ulang relevansi metode turun langsung ke lapangan pada kondisi tertentu seperti pandemi','Deskripsi kerja tiap divisi perlu dirancang lebih jelas sejak awal, termasuk yang berhubungan dengan komunitas kolaborator','Kendala teknis pada acara daring seperti sinyal dan platform konferensi perlu diantisipasi dengan finalisasi jadwal lebih awal'],
  52, 18, 213, 12, 2, 2, 2, 'published'
);
