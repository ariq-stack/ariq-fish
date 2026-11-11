export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  description: string;
  actionText: string;
  icon: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  readTime: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  minOrder: number;
  description: string;
  image: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  foundedYear: number;
  category: string;
  description: string;
  shortDescription: string;
  qrisImage: string;
  quote: {
    text: string;
    author: string;
  };
  address: {
    label: string;
    full: string;
    city: string;
    district: string;
    province: string;
    postalCode: string;
    coordinates: string;
    accessibilityNotes: string;
    googleMapsEmbedUrl: string;
    googleMapsLink: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    whatsappUrl: string;
    email: string;
    operatingHours: string;
    operatingDays: string;
  };
  license: {
    kkpPermit: string;
    skpCertificate: string;
    nib: string;
  };
  metrics: {
    value: string;
    label: string;
  }[];
  mainCommodities: string[];
  services: ServiceItem[];
  initialNews: NewsItem[];
  products: ProductItem[];
}

export const siteConfig: SiteConfig = {
  name: "Ariq Fish",
  legalName: "PT Ariq Fish Samudra Nusantara",
  tagline: "Pusat Pengadaan & Perdagangan Hasil Laut Terbesar Se-Asia",
  foundedYear: 1950,
  category: "Jual Beli Ikan & Rantai Pasok Hasil Laut",
  description:
    "Perusahaan jual beli ikan terbesar se-Asia yang didirikan oleh keluarga Ariq pada tahun 1950. Menghubungkan hasil tangkapan nelayan pesisir Nusantara dengan pasar industri, restoran, dan ekspor melalui rantai pasok dingin (cold chain) standar internasional demi kesegaran optimal.",
  shortDescription:
    "Menyerap hasil tangkapan nelayan nusantara dengan harga adil, menjaga mutu kesegaran melalui fasilitas cold storage modern, dan menyuplai kebutuhan pasar nasional hingga ekspor.",
  qrisImage: "/images/qris.jpg",
  quote: {
    text: "Kunci utama hasil laut bukan sekadar volume tangkapan, melainkan kecepatan rantai dingin dan keadilan harga bagi nelayan pejuang bahari.",
    author: "Manajemen Kemitraan Keluarga Ariq Fish",
  },
  address: {
    label: "Kantor Pemasaran Utama (Marketing Gallery) PIK 2",
    full: "Jl. Marina Indah Raya No. 1, RT.7/RW.2, Kamal Muara, Kecamatan Penjaringan, Jakarta Utara, 14470",
    city: "Jakarta Utara",
    district: "Penjaringan",
    province: "DKI Jakarta",
    postalCode: "14470",
    coordinates: "6°04'58.2\"S 106°44'21.1\"E",
    accessibilityNotes: "Terletak strategis di kawasan PIK 2, akses tol langsung dan dekat fasilitas pelabuhan.",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=Marketing+Gallery+PIK+2+Jl.+Marina+Indah+Raya+No.+1+Kamal+Muara+Jakarta+Utara&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsLink:
      "https://maps.google.com/?q=Marketing+Gallery+PIK+2+Jl.+Marina+Indah+Raya+No.+1+Kamal+Muara+Jakarta+Utara+14470",
  },
  contact: {
    phone: "085156256177",
    whatsapp: "085156256177",
    whatsappUrl: "https://wa.me/6285156256177",
    email: "ariqfathi@gmail.com",
    operatingHours: "08:30 - 17:00 WIB",
    operatingDays: "Senin - Jumat (Sabtu dengan Janji Temu)",
  },
  license: {
    kkpPermit: "Izin KKP No. 4481/FISH-ID",
    skpCertificate: "Standar Higienitas & SKP KKP",
    nib: "9120014820193 / KBLI Perikanan",
  },
  metrics: [
    { value: "50+ Ton", label: "Kapasitas / Hari" },
    { value: "12+ Hub", label: "Sentra Pelabuhan" },
    { value: "99.8%", label: "Kesegaran Terjaga" },
    { value: "Sejak 1950", label: "Dedikasi 3 Generasi" },
  ],
  mainCommodities: [
    "Tuna Loin Grade A",
    "Cakalang & Tongkol Beku",
    "Kakap Merah & Kerapu",
    "Cumi & Udang Segar",
    "Tenggiri & Kembung",
  ],
  services: [
    {
      id: "service-1",
      code: "Layanan 01",
      title: "Pembelian Ikan Tangkapan Segar",
      description:
        "Direct sourcing dari nelayan kapal motor di dermaga pendaratan ikan dengan penimbangan presisi dan sistem pembayaran kontan transparan.",
      actionText: "Pelajari Skema Kemitraan",
      icon: "sailing",
    },
    {
      id: "service-2",
      code: "Layanan 02",
      title: "Pengadaan Ikan Beku Skala Industri",
      description:
        "Suplai rutin tonase besar untuk Tuna, Cakalang, Tongkol, Kakap Merah, Kembung, Lemuru, dan Cumi untuk pabrik pengalengan & pengolahan.",
      actionText: "Katalog Komoditas",
      icon: "warehouse",
    },
    {
      id: "service-3",
      code: "Layanan 03",
      title: "Rantai Dingin & Cold Storage",
      description:
        "Penyewaan kapasitas ruang beku dan manajemen cold storage bersuhu hingga -25°C dengan pemantauan suhu otomatis serta standar sanitasi ketat.",
      actionText: "Fasilitas Gudang Beku",
      icon: "ac_unit",
    },
    {
      id: "service-4",
      code: "Layanan 04",
      title: "Suplai Restoran & Hotel (Horeka)",
      description:
        "Pengiriman harian terjadwal ikan segar bersih dan portion cut untuk restoran seafood, hotel berbintang, dan jaringan katering premium.",
      actionText: "Paket Pasokan Horeka",
      icon: "restaurant",
    },
    {
      id: "service-5",
      code: "Layanan 05",
      title: "Pemrosesan & Fillet Higienis",
      description:
        "Pembersihan insang, penyiangan isi perut (gutting), fillet loin, dan vacuum pack kedap udara berstandar food safety & halal.",
      actionText: "Standar Pemrosesan",
      icon: "content_cut",
    },
    {
      id: "service-6",
      code: "Layanan 06",
      title: "Ekspor Hasil Laut & Karantina",
      description:
        "Pengurusan dokumen karantina ikan (Health Certificate), kelayakan ekspor CITES/HACCP, serta kontainer pendingin kargo internasional.",
      actionText: "Konsultasi Ekspor",
      icon: "public",
    },
  ],
  initialNews: [
    {
      id: "news-1",
      title: "Kenaikan Permintaan Ikan Cakalang & Tongkol di Sentra Pesisir Jawa",
      slug: "kenaikan-permintaan-ikan-cakalang-tongkol",
      category: "Dinamika Lelang",
      date: "12 Mei 2026",
      readTime: "4 mnt baca",
      excerpt:
        "Analisis stabilitas pasokan tangkapan nelayan pesisir utara dan kesiapan fasilitas serap beku Ariq Fish menghadapi fluktuasi cuaca laut.",
      thumbnail: "/images/news-1.png",
    },
    {
      id: "news-2",
      title: "Pentingnya Air Blast Freezing dalam Mempertahankan Kualitas Ikan Tuna",
      slug: "pentingnya-air-blast-freezing-kualitas-tuna",
      category: "Standar Kualitas",
      date: "28 April 2026",
      readTime: "5 mnt baca",
      excerpt:
        "Kajian teknis pembekuan ultra-cepat untuk mencegah kerusakan jaringan seluler daging ikan agar tetap layak sashimi grade saat dipasarkan.",
      thumbnail: "/images/news-2.png",
    },
    {
      id: "news-3",
      title: "Ariq Fish Perluas Distribusi Pasokan Segar ke 50+ Jaringan Restoran",
      slug: "ariq-fish-perluas-distribusi-pasokan-50-restoran",
      category: "Ekspansi Pasar",
      date: "15 April 2026",
      readTime: "3 mnt baca",
      excerpt:
        "Layanan daily supply menjamin kontinuitas bahan baku hasil laut bebas formalin dengan grading ukuran seragam dan harga kompetitif.",
      thumbnail: "/images/news-3.png",
    },
  ],
  products: [
    {
      id: "prod-1",
      name: "Tuna Loin Grade A (Sashimi / Steak)",
      category: "Ikan Laut Pelagis",
      price: 95000,
      unit: "kg",
      minOrder: 5,
      description: "Daging tuna sirip kuning (yellowfin) murni tanpa tulang & kulit. Pembekuan air blast freezing menjaga tekstur dan warna merah alami.",
      image: "/images/hero-fish-platter.png",
    },
    {
      id: "prod-2",
      name: "Ikan Cakalang Segar / Beku Kapal",
      category: "Ikan Laut Pelagis",
      price: 38000,
      unit: "kg",
      minOrder: 10,
      description: "Tangkapan segar armada kapal pancing Nusantara. Cocok untuk industri pengolahan, abon, fufu, dan konsumsi horeka.",
      image: "/images/news-1.png",
    },
    {
      id: "prod-3",
      name: "Ikan Tongkol Komo Segar",
      category: "Ikan Laut Pelagis",
      price: 35000,
      unit: "kg",
      minOrder: 10,
      description: "Ukuran seragam 3-4 ekor/kg, insang merah segar, mata jernih, daging padat kenyal.",
      image: "/images/news-3.png",
    },
    {
      id: "prod-4",
      name: "Kakap Merah Tangkapan Karang",
      category: "Ikan Demersal / Karang",
      price: 85000,
      unit: "kg",
      minOrder: 5,
      description: "Kakap merah segar pilihan grade restoran bintang lima. Ukuran 800gr - 1.5kg per ekor.",
      image: "/images/hero-fish-platter.png",
    },
    {
      id: "prod-5",
      name: "Kerapu Cantang Hidup / Segar",
      category: "Ikan Demersal / Karang",
      price: 95000,
      unit: "kg",
      minOrder: 5,
      description: "Daging lembut gurih kualitas ekspor, langsung dari sentra budidaya dan tangkapan laut dalam.",
      image: "/images/hero-fish-platter.png",
    },
    {
      id: "prod-6",
      name: "Cumi-Cumi Sero Segar",
      category: "Cephalopoda",
      price: 75000,
      unit: "kg",
      minOrder: 5,
      description: "Cumi segar bening tanpa pengawet kimiawi, tekstur kenyal manis alami.",
      image: "/images/hero-fish-platter.png",
    },
    {
      id: "prod-7",
      name: "Udang Vaname Segar Laut",
      category: "Crustacea",
      price: 85000,
      unit: "kg",
      minOrder: 5,
      description: "Ukuran size 30-40 per kg, kepala utuh kuat, kulit berkilau segar.",
      image: "/images/about-fishermen.png",
    },
  ],
};

