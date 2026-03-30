export type AdminRole = "super_admin" | "manager" | "editor" | "order_manager";

export type AdminSession = {
  name: string;
  email: string;
  role: AdminRole;
};

export type AdminProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  status: "active" | "draft" | "passive";
  featured: boolean;
  image: string;
  variants: string[];
  updatedAt: string;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  parent?: string;
  image: string;
  order: number;
  status: "active" | "passive";
  seoTitle: string;
  seoDescription: string;
};

export type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  total: number;
  itemCount: number;
  status: "new" | "preparing" | "shipping" | "delivered" | "cancelled";
  paymentStatus: "paid" | "pending" | "refunded";
  address: string;
  createdAt: string;
  note?: string;
  timeline: { label: string; time: string; done: boolean }[];
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "active" | "invited" | "passive";
  lastSeen: string;
};

export type AdminMedia = {
  id: string;
  name: string;
  src: string;
  usedIn: string;
  size: string;
  date: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  trend: string;
  tone: "neutral" | "positive" | "warning";
};

export const demoSession: AdminSession = {
  name: "Ali Ayik",
  email: "admin@etico.local",
  role: "super_admin",
};

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Toplam Urun", value: "1.284", trend: "+24 bu hafta", tone: "positive" },
  { label: "Aktif Kategori", value: "36", trend: "4 yeni duzen", tone: "neutral" },
  { label: "Toplam Siparis", value: "842", trend: "+12.4%", tone: "positive" },
  { label: "Bekleyen Siparis", value: "29", trend: "8 kritik", tone: "warning" },
  { label: "Toplam Musteri", value: "5.420", trend: "+186 yeni kayit", tone: "positive" },
  { label: "Ciro Ozeti", value: "4,82 Mn TL", trend: "Aylik hedef %86", tone: "neutral" },
];

export const orderChart = [
  { label: "Pzt", orders: 42, revenue: 180 },
  { label: "Sal", orders: 38, revenue: 164 },
  { label: "Car", orders: 54, revenue: 228 },
  { label: "Per", orders: 47, revenue: 201 },
  { label: "Cum", orders: 61, revenue: 256 },
  { label: "Cmt", orders: 69, revenue: 294 },
  { label: "Paz", orders: 36, revenue: 144 },
];

export const salesChannels = [
  { label: "Kurumsal Talepler", value: 42 },
  { label: "B2B Teklif", value: 31 },
  { label: "Perakende", value: 18 },
  { label: "Blog / Organik", value: 9 },
];

export const recentActivities = [
  "Yeni banner guncellendi: Bahar Kampanyasi",
  "Kuresel Vana PN 25 stok adedi 40 olarak yenilendi",
  "Siparis #ET-1042 kargoya hazirlandi",
  "Yeni admin kullanici daveti gonderildi",
  "Footer iletisim bilgileri duzenlendi",
];

export const quickActions = [
  { title: "Yeni Urun Ekle", href: "/admin/products", detail: "SKU, gorsel ve varyant olustur" },
  { title: "Siparisleri Kontrol Et", href: "/admin/orders", detail: "Bekleyen siparis akisini guncelle" },
  { title: "Banner Yonet", href: "/admin/content", detail: "Anasayfa slider ve kampanya alanlari" },
  { title: "Raporlari Incele", href: "/admin/reports", detail: "Satis ve performans metrikleri" },
];

export const adminProducts: AdminProduct[] = [
  {
    id: "prd_001",
    name: "Batu Kuresel Flansli Pik Vana PN10-16",
    brand: "Batu",
    category: "Vanalar",
    sku: "VAN-BAT-001",
    price: 7572.96,
    salePrice: 7420,
    stock: 84,
    status: "active",
    featured: true,
    image: "/products/vanalar/vana-1.jpg",
    variants: ["DN50", "DN80"],
    updatedAt: "30 Mar 2026",
  },
  {
    id: "prd_002",
    name: "EVS Kosva Vana",
    brand: "EVS",
    category: "Vanalar",
    sku: "VAN-EVS-019",
    price: 29999,
    stock: 12,
    status: "active",
    featured: false,
    image: "/products/vanalar/vana-2.jpg",
    variants: ["1 inc", "1.5 inc"],
    updatedAt: "29 Mar 2026",
  },
  {
    id: "prd_003",
    name: "Kuresel Vana PN 25",
    brand: "Batu",
    category: "Vanalar",
    sku: "VAN-BAT-021",
    price: 75299,
    stock: 4,
    status: "draft",
    featured: true,
    image: "/products/vanalar/vana-3.jpg",
    variants: ["PN25"],
    updatedAt: "27 Mar 2026",
  },
  {
    id: "prd_004",
    name: "Klepsan Termokuplu Kuresel Vana",
    brand: "Klepsan",
    category: "Vanalar",
    sku: "VAN-KLP-225",
    price: 12160,
    salePrice: 11690,
    stock: 21,
    status: "active",
    featured: false,
    image: "/products/vanalar/vana-4.jpg",
    variants: ["Gaz", "Emniyet"],
    updatedAt: "28 Mar 2026",
  },
  {
    id: "prd_005",
    name: "Duyar Surgulu Vana Elastomerli F4 PN16",
    brand: "Duyar",
    category: "Vanalar",
    sku: "VAN-DYR-412",
    price: 47339,
    stock: 0,
    status: "passive",
    featured: true,
    image: "/products/vanalar/vana-5.jpg",
    variants: ["DN100"],
    updatedAt: "24 Mar 2026",
  },
  {
    id: "prd_006",
    name: "Trakya Dokum Siyah Nipel",
    brand: "Trakya Dokum",
    category: "Boru Ekleme",
    sku: "BAG-TRK-101",
    price: 18499,
    stock: 140,
    status: "active",
    featured: false,
    image: "/products/baglanti/bag1.jpg",
    variants: ['1"', '1 1/4"'],
    updatedAt: "26 Mar 2026",
  },
];

export const adminCategories: AdminCategory[] = [
  {
    id: "cat_001",
    name: "Vanalar",
    slug: "vanalar",
    image: "/products/vanalar/vana-1.jpg",
    order: 1,
    status: "active",
    seoTitle: "Vanalar | Etico",
    seoDescription: "Kuresel, surgulu ve flansli vana kategorileri.",
  },
  {
    id: "cat_002",
    name: "Boru Ekleme ve Askilama",
    slug: "boru-ekleme-ve-askilama",
    image: "/products/baglanti/bag1.jpg",
    order: 2,
    status: "active",
    seoTitle: "Boru Ekleme ve Askilama | Etico",
    seoDescription: "Nipel, dirsek, manson ve baglanti urunleri.",
  },
  {
    id: "cat_003",
    name: "Yangin Malzemeleri",
    slug: "yangin-malzemeleri",
    image: "/banners/duyarbanner.jpg",
    order: 3,
    status: "active",
    seoTitle: "Yangin Malzemeleri | Etico",
    seoDescription: "Kurumsal yangin guvenlik ekipmanlari.",
  },
  {
    id: "cat_004",
    name: "PVC",
    slug: "pvc",
    parent: "Boru Ekleme ve Askilama",
    image: "/products/blog/blog-2.webp",
    order: 4,
    status: "passive",
    seoTitle: "PVC | Etico",
    seoDescription: "PVC baglanti ve tesisat cozumleri.",
  },
];

export const adminOrders: AdminOrder[] = [
  {
    id: "ET-1042",
    customer: "Marmara Mekanik",
    email: "satinalma@marmara.com",
    total: 184500,
    itemCount: 12,
    status: "preparing",
    paymentStatus: "paid",
    address: "Tuzla OSB, Istanbul",
    createdAt: "30 Mar 2026, 11:24",
    note: "Cikis oncesi palet fotografi gonderilsin.",
    timeline: [
      { label: "Siparis alindi", time: "11:24", done: true },
      { label: "Odeme onaylandi", time: "11:32", done: true },
      { label: "Depo hazirlaniyor", time: "12:05", done: true },
      { label: "Kargoya teslim", time: "-", done: false },
    ],
  },
  {
    id: "ET-1038",
    customer: "Akin Yapi",
    email: "info@akinyapi.com",
    total: 42890,
    itemCount: 5,
    status: "shipping",
    paymentStatus: "paid",
    address: "Bursa Nilufer",
    createdAt: "29 Mar 2026, 16:50",
    timeline: [
      { label: "Siparis alindi", time: "16:50", done: true },
      { label: "Hazirlaniyor", time: "17:15", done: true },
      { label: "Kargoda", time: "18:20", done: true },
      { label: "Teslim edildi", time: "-", done: false },
    ],
  },
  {
    id: "ET-1031",
    customer: "Can Endustri",
    email: "tedarik@canendustri.com",
    total: 9240,
    itemCount: 2,
    status: "new",
    paymentStatus: "pending",
    address: "Gebze Kocaeli",
    createdAt: "28 Mar 2026, 09:10",
    timeline: [
      { label: "Siparis alindi", time: "09:10", done: true },
      { label: "Odeme bekleniyor", time: "09:12", done: false },
      { label: "Hazirlaniyor", time: "-", done: false },
      { label: "Kargoda", time: "-", done: false },
    ],
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "usr_001",
    name: "Ali Ayik",
    email: "admin@etico.local",
    role: "super_admin",
    status: "active",
    lastSeen: "Az once",
  },
  {
    id: "usr_002",
    name: "Zeynep Kaya",
    email: "editor@etico.local",
    role: "editor",
    status: "active",
    lastSeen: "18 dk once",
  },
  {
    id: "usr_003",
    name: "Mert Arslan",
    email: "orders@etico.local",
    role: "order_manager",
    status: "active",
    lastSeen: "1 saat once",
  },
  {
    id: "usr_004",
    name: "Burcu Demir",
    email: "manager@etico.local",
    role: "manager",
    status: "invited",
    lastSeen: "Davet bekleniyor",
  },
];

export const roleLabels: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  manager: "Yonetici",
  editor: "Editor",
  order_manager: "Siparis Sorumlusu",
};

export const roleMenuAccess: Record<AdminRole, string[]> = {
  super_admin: ["dashboard", "products", "categories", "orders", "users", "content", "media", "settings", "reports"],
  manager: ["dashboard", "products", "categories", "orders", "content", "media", "reports"],
  editor: ["dashboard", "products", "categories", "content", "media"],
  order_manager: ["dashboard", "orders", "reports"],
};

export const adminMedia: AdminMedia[] = [
  {
    id: "med_001",
    name: "duyarbanner.jpg",
    src: "/banners/duyarbanner.jpg",
    usedIn: "Anasayfa Hero",
    size: "1.8 MB",
    date: "30 Mar 2026",
  },
  {
    id: "med_002",
    name: "cagdas-isi-logo.png",
    src: "/branding/cagdas-isi-logo.png",
    usedIn: "Header / Footer",
    size: "420 KB",
    date: "28 Mar 2026",
  },
  {
    id: "med_003",
    name: "vana-1.jpg",
    src: "/products/vanalar/vana-1.jpg",
    usedIn: "Urun Katalogu",
    size: "212 KB",
    date: "27 Mar 2026",
  },
];

export const contentBlocks = {
  homepageBanner: {
    title: "Anasayfa Hero Basligi",
    description: "B2B tesisat katalog deneyimini guclendiren premium sahne",
    cta: "Teklif Al",
  },
  about: {
    title: "Hakkimizda",
    body: "Cagdas Isi, tesisat ve teknik tedarik alaninda kurumsal musteri odakli hizmet veren premium bir katalog ve satis altyapisidir.",
  },
  contact: {
    phone: "+90 322 334 19 66",
    email: "info@cagdasisi.com",
    address: "Adana / Seyhan",
  },
  footer: {
    supportTitle: "Musteri Hizmetleri",
    supportText: "Hafta ici 09:00 - 18:00 arasinda destek saglanir.",
  },
};

export const siteSettings = {
  siteName: "Cagdas Isi",
  domain: "etico.vercel.app",
  email: "info@cagdasisi.com",
  phone: "+90 322 334 19 66",
  instagram: "https://instagram.com/cagdasisi",
  linkedin: "https://linkedin.com/company/cagdasisi",
  defaultSeoTitle: "Cagdas Isi | Premium Tesisat Tedarik Platformu",
  defaultSeoDescription: "Kurumsal ve teknik urun kataloglarini premium deneyimle yonetin.",
  accent: "#3e5c76",
  surface: "#f4efe6",
};

export const reportHighlights = [
  { label: "En Cok Satilan", value: "Kuresel Vana PN 25", meta: "214 siparis" },
  { label: "En Cok Goruntulenen", value: "Duyar Surgulu Vana", meta: "8.4K gosterim" },
  { label: "En Yuksek Sepet", value: "Marmara Mekanik", meta: "184.500 TL" },
];

