import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbGetNews, dbCreateNews } from "@/lib/sheets";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const news = await dbGetNews(status);
    return NextResponse.json({ success: true, news });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengambil daftar berita" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role_name !== "admin") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const { title, excerpt, content, thumbnail_path, status } = await req.json();

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "Judul, ringkasan, dan konten berita wajib diisi" },
        { status: 400 }
      );
    }

    const created = await dbCreateNews({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      thumbnail_path: thumbnail_path || "/images/hero-fish-platter.png",
      status: status || "published",
      author_id: session.id,
    });

    return NextResponse.json({ success: true, news: created });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal membuat berita baru" },
      { status: 500 }
    );
  }
}

