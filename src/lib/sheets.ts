/**
 * Client penghubung Next.js Server ke Google Apps Script Web App.
 * Dilengkapi fallback mock otomatis jika APPS_SCRIPT_URL belum diisi,
 * sehingga pengujian lokal dapat berjalan mulus langsung dari hari pertama.
 */

export interface DbUser {
  id: string;
  name: string;
  email: string;
  password_hash?: string;
  role_id: string;
  role_name?: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface DbRole {
  id: string;
  name: string;
  description: string;
  permissions: string;
  is_system: boolean | string;
  created_at: string;
}

export interface DbNews {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  status: string; // 'published' | 'draft'
  author_id: string;
  created_at: string;
  updated_at?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
  subtotal: number;
}

export interface DbOrder {
  id: string;
  user_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  order_type: string;
  delivery_address?: string;
  items: OrderItem[] | string;
  total_amount: number;
  status: "menunggu_konfirmasi" | "dikonfirmasi" | "ditolak" | "selesai";
  notes?: string;
  admin_notes?: string;
  payment_proof?: string;
  created_at: string;
  updated_at?: string;
}

// Fallback in-memory storage untuk local development tanpa setup Apps Script
const fallbackRoles: DbRole[] = [
  {
    id: "role-admin-default",
    name: "admin",
    description: "Administrator sistem dengan hak akses penuh",
    permissions: "manage_users,manage_roles,manage_news,view_dashboard",
    is_system: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "role-user-default",
    name: "user",
    description: "Pengguna terdaftar umum",
    permissions: "view_profile,view_own_orders",
    is_system: true,
    created_at: new Date().toISOString(),
  },
];

const fallbackUsers: DbUser[] = [
  {
    id: "usr-admin-initial",
    name: "Administrator Ariq Fish",
    email: "admin@gmail.com",
    password_hash: "$2a$10$g3vK/rMvOq58L8u.e1Q4A.q2E6V1JgV8Cfx6uK3Uv2mQ9E6w5Z0C.", // bcrypt 123456
    role_id: "role-admin-default",
    role_name: "admin",
    status: "active",
    created_at: new Date().toISOString(),
  },
];

const fallbackNews: DbNews[] = [
  {
    id: "news-001",
    title: "Kenaikan Permintaan Ikan Cakalang & Tongkol di Sentra Pesisir Jawa",
    slug: "kenaikan-permintaan-ikan-cakalang-tongkol",
    excerpt:
      "Analisis stabilitas pasokan tangkapan nelayan pesisir utara dan kesiapan fasilitas serap beku Ariq Fish menghadapi fluktuasi cuaca laut.",
    content:
      "Kebutuhan bahan baku industri pengalengan ikan dan jaringan pasar induk mengalami peningkatan volume signifikan pada kuartal ini. Fasilitas cold storage Ariq Fish siap mengantisipasi lonjakan pasokan dermaga dengan standar suhu -25°C.",
    thumbnail_path: "/images/news-1.png",
    status: "published",
    author_id: "usr-admin-initial",
    created_at: "2026-05-12T08:00:00.000Z",
  },
  {
    id: "news-002",
    title: "Pentingnya Air Blast Freezing dalam Mempertahankan Kualitas Ikan Tuna",
    slug: "pentingnya-air-blast-freezing-kualitas-tuna",
    excerpt:
      "Kajian teknis pembekuan ultra-cepat untuk mencegah kerusakan jaringan seluler daging ikan agar tetap layak sashimi grade saat dipasarkan.",
    content:
      "Metode air blast freezing memungkinkan suhu pusat ikan turun hingga di bawah -20°C dalam hitungan jam. Hal ini mencegah kristal es besar yang dapat merusak serat daging tuna, menjaga warna merah segar dan tekstur kenyal saat dicairkan.",
    thumbnail_path: "/images/news-2.png",
    status: "published",
    author_id: "usr-admin-initial",
    created_at: "2026-04-28T09:30:00.000Z",
  },
  {
    id: "news-003",
    title: "Ariq Fish Perluas Distribusi Pasokan Segar ke 50+ Jaringan Restoran",
    slug: "ariq-fish-perluas-distribusi-pasokan-50-restoran",
    excerpt:
      "Layanan daily supply menjamin kontinuitas bahan baku hasil laut bebas formalin dengan grading ukuran seragam dan harga kompetitif.",
    content:
      "Kerja sama suplai harian dengan jaringan hotel bintang lima dan restoran seafood premium di Jabodetabek resmi dimulai. Didukung armada reefer bersertifikat higienis KKP.",
    thumbnail_path: "/images/news-3.png",
    status: "published",
    author_id: "usr-admin-initial",
    created_at: "2026-04-15T10:15:00.000Z",
  },
];

const fallbackOrders: DbOrder[] = [
  {
    id: "ord-849201",
    user_id: "usr-admin-initial",
    customer_name: "Resto Segar Bahari PIK",
    customer_phone: "081234567890",
    customer_email: "bahari.pik@gmail.com",
    order_type: "jual_beli",
    delivery_address: "Ruko Cordoba Blok E No. 12, Pantai Indah Kapuk, Jakarta Utara",
    items: [
      {
        productId: "prod-1",
        productName: "Tuna Loin Grade A (Sashimi / Steak)",
        price: 95000,
        quantity: 15,
        unit: "kg",
        subtotal: 1425000,
      },
      {
        productId: "prod-4",
        productName: "Kakap Merah Tangkapan Karang",
        price: 85000,
        quantity: 10,
        unit: "kg",
        subtotal: 850000,
      },
    ],
    total_amount: 2275000,
    status: "menunggu_konfirmasi",
    notes: "Pengiriman pagi hari jam 08:00 WIB via armada reefer dingin.",
    created_at: new Date().toISOString(),
  },
];

/**
 * Panggil Google Apps Script Web App jika URL tersedia
 */
async function callAppsScript(action: string, payload: Record<string, any> = {}) {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;

  if (!url || !url.startsWith("http")) {
    return null; // Gunakan mode fallback
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, secret, ...payload }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Apps Script responded with HTTP ${res.status}`);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Gagal memproses data di Apps Script");
    }
    return data.data;
  } catch (err) {
    console.warn("Apps Script call failed, falling back to local store:", err);
    return null;
  }
}

// ==========================================
// USER OPERATIONS
// ==========================================

export async function dbGetUsers(): Promise<DbUser[]> {
  const remote = await callAppsScript("getUsers");
  if (remote !== null) return remote;
  return fallbackUsers;
}

export async function dbGetUserByEmail(email: string): Promise<DbUser | null> {
  const remote = await callAppsScript("getUserByEmail", { email });
  if (remote !== null) return remote;

  const normalized = email.trim().toLowerCase();
  const user = fallbackUsers.find((u) => u.email.toLowerCase() === normalized);
  return user || null;
}

export async function dbCreateUser(userData: {
  name: string;
  email: string;
  password_hash: string;
  role_id?: string;
}): Promise<DbUser> {
  const remote = await callAppsScript("createUser", { user: userData });
  if (remote !== null) return remote;

  const normalized = userData.email.trim().toLowerCase();
  const exists = fallbackUsers.some((u) => u.email.toLowerCase() === normalized);
  if (exists) throw new Error("Email sudah terdaftar");

  const newUser: DbUser = {
    id: `usr-${Date.now().toString(36)}`,
    name: userData.name,
    email: normalized,
    password_hash: userData.password_hash,
    role_id: userData.role_id || "role-user-default",
    role_name: "user",
    status: "active",
    created_at: new Date().toISOString(),
  };
  fallbackUsers.push(newUser);
  return newUser;
}

export async function dbUpdateUser(
  id: string,
  updates: Partial<DbUser>
): Promise<boolean> {
  const remote = await callAppsScript("updateUser", { id, updates });
  if (remote !== null) return true;

  const idx = fallbackUsers.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("Pengguna tidak ditemukan");
  fallbackUsers[idx] = { ...fallbackUsers[idx], ...updates, updated_at: new Date().toISOString() };
  return true;
}

export async function dbDeleteUser(id: string): Promise<boolean> {
  const remote = await callAppsScript("deleteUser", { id });
  if (remote !== null) return true;

  const idx = fallbackUsers.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("Pengguna tidak ditemukan");
  fallbackUsers.splice(idx, 1);
  return true;
}

export async function dbChangePassword(id: string, passwordHash: string): Promise<boolean> {
  const remote = await callAppsScript("changePassword", { id, password_hash: passwordHash });
  if (remote !== null) return true;

  const user = fallbackUsers.find((u) => u.id === id);
  if (user) {
    user.password_hash = passwordHash;
    return true;
  }
  return false;
}

// ==========================================
// ROLE OPERATIONS
// ==========================================

export async function dbGetRoles(): Promise<DbRole[]> {
  const remote = await callAppsScript("getRoles");
  if (remote !== null) return remote;
  return fallbackRoles;
}

export async function dbCreateRole(roleData: {
  name: string;
  description: string;
  permissions: string;
}): Promise<DbRole> {
  const remote = await callAppsScript("createRole", { role: roleData });
  if (remote !== null) return remote;

  const newRole: DbRole = {
    id: `role-${Date.now().toString(36)}`,
    name: roleData.name,
    description: roleData.description,
    permissions: roleData.permissions,
    is_system: false,
    created_at: new Date().toISOString(),
  };
  fallbackRoles.push(newRole);
  return newRole;
}

export async function dbUpdateRole(
  id: string,
  updates: Partial<DbRole>
): Promise<boolean> {
  const remote = await callAppsScript("updateRole", { id, updates });
  if (remote !== null) return true;

  const idx = fallbackRoles.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error("Peran tidak ditemukan");
  fallbackRoles[idx] = { ...fallbackRoles[idx], ...updates };
  return true;
}

export async function dbDeleteRole(id: string): Promise<boolean> {
  const remote = await callAppsScript("deleteRole", { id });
  if (remote !== null) return true;

  const role = fallbackRoles.find((r) => r.id === id);
  if (!role) throw new Error("Peran tidak ditemukan");
  if (role.is_system) throw new Error("Peran bawaan sistem tidak boleh dihapus");

  const idx = fallbackRoles.findIndex((r) => r.id === id);
  fallbackRoles.splice(idx, 1);
  return true;
}

// ==========================================
// NEWS OPERATIONS
// ==========================================

export async function dbGetNews(status?: string): Promise<DbNews[]> {
  const remote = await callAppsScript("getNews", { status });
  if (remote !== null) return remote;

  if (status) {
    return fallbackNews.filter((n) => n.status === status);
  }
  return fallbackNews;
}

export async function dbGetNewsBySlug(slug: string): Promise<DbNews | null> {
  const remote = await callAppsScript("getNewsBySlug", { slug });
  if (remote !== null) return remote;

  const found = fallbackNews.find((n) => n.slug === slug);
  return found || null;
}

export async function dbCreateNews(newsData: {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  thumbnail_path?: string;
  status?: string;
  author_id?: string;
}): Promise<DbNews> {
  const remote = await callAppsScript("createNews", { news: newsData });
  if (remote !== null) return remote;

  const slug =
    newsData.slug ||
    newsData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const newArticle: DbNews = {
    id: `news-${Date.now().toString(36)}`,
    title: newsData.title,
    slug,
    excerpt: newsData.excerpt,
    content: newsData.content,
    thumbnail_path: newsData.thumbnail_path || "/images/hero-fish-platter.png",
    status: newsData.status || "published",
    author_id: newsData.author_id || "admin",
    created_at: new Date().toISOString(),
  };
  fallbackNews.unshift(newArticle);
  return newArticle;
}

export async function dbUpdateNews(
  id: string,
  updates: Partial<DbNews>
): Promise<boolean> {
  const remote = await callAppsScript("updateNews", { id, updates });
  if (remote !== null) return true;

  const idx = fallbackNews.findIndex((n) => n.id === id);
  if (idx === -1) throw new Error("Artikel berita tidak ditemukan");
  fallbackNews[idx] = { ...fallbackNews[idx], ...updates, updated_at: new Date().toISOString() };
  return true;
}

export async function dbDeleteNews(id: string): Promise<boolean> {
  const remote = await callAppsScript("deleteNews", { id });
  if (remote !== null) return true;

  const idx = fallbackNews.findIndex((n) => n.id === id);
  if (idx === -1) throw new Error("Artikel berita tidak ditemukan");
  fallbackNews.splice(idx, 1);
  return true;
}

// ==========================================
// ORDER OPERATIONS (Step 3)
// ==========================================

export async function dbGetOrders(userId?: string): Promise<DbOrder[]> {
  const remote = await callAppsScript("getOrders", { userId });
  if (remote !== null) {
    return remote.map((o: any) => ({
      ...o,
      items: typeof o.items === "string" ? JSON.parse(o.items || "[]") : o.items,
    }));
  }

  if (userId) {
    return fallbackOrders.filter((o) => o.user_id === userId);
  }
  return fallbackOrders;
}

export async function dbGetOrderById(id: string): Promise<DbOrder | null> {
  const allOrders = await dbGetOrders();
  const order = allOrders.find((o) => o.id === id);
  return order || null;
}

export async function dbCreateOrder(orderData: {
  user_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  order_type?: string;
  delivery_address?: string;
  items: OrderItem[];
  total_amount: number;
  notes?: string;
  payment_proof?: string;
}): Promise<DbOrder> {
  const remote = await callAppsScript("createOrder", { order: orderData });
  const orderId = remote?.id || `ord-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder: DbOrder = {
    id: orderId,
    user_id: orderData.user_id,
    customer_name: orderData.customer_name,
    customer_phone: orderData.customer_phone,
    customer_email: orderData.customer_email,
    order_type: orderData.order_type || "jual_beli",
    delivery_address: orderData.delivery_address || "",
    items: orderData.items,
    total_amount: orderData.total_amount,
    status: "menunggu_konfirmasi",
    notes: orderData.notes || "",
    payment_proof: orderData.payment_proof || "",
    created_at: new Date().toISOString(),
  };

  fallbackOrders.unshift(newOrder);
  return newOrder;
}

export async function dbUpdateOrderStatus(
  id: string,
  status: "menunggu_konfirmasi" | "dikonfirmasi" | "ditolak" | "selesai",
  adminNotes?: string
): Promise<boolean> {
  const remote = await callAppsScript("updateOrderStatus", { id, status, notes: adminNotes });
  if (remote !== null) return true;

  const idx = fallbackOrders.findIndex((o) => o.id === id);
  if (idx === -1) throw new Error("Pesanan tidak ditemukan");
  fallbackOrders[idx] = {
    ...fallbackOrders[idx],
    status,
    admin_notes: adminNotes || fallbackOrders[idx].admin_notes,
    updated_at: new Date().toISOString(),
  };
  return true;
}


