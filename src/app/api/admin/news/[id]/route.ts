import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbUpdateNews, dbDeleteNews, dbGetNews } from "@/lib/sheets";
import { deleteFile } from "@/lib/storage";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role_name !== "admin") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();

    await dbUpdateNews(id, body);
    return NextResponse.json({ success: true, message: "Berita berhasil diperbarui" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui berita" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role_name !== "admin") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const { id } = params;
    const allNews = await dbGetNews();
    const target = allNews.find((n) => n.id === id);

    if (target && target.thumbnail_path && target.thumbnail_path.startsWith("/uploads/")) {
      await deleteFile(target.thumbnail_path);
    }

    await dbDeleteNews(id);
    return NextResponse.json({ success: true, message: "Berita berhasil dihapus" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}

