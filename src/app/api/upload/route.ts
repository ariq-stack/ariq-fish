import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveFile } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role_name !== "admin") {
      return NextResponse.json(
        { error: "Akses ditolak: Hanya admin yang dapat mengunggah file" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada file yang diunggah" },
        { status: 400 }
      );
    }

    const result = await saveFile(file);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      filePath: result.filePath,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memproses unggahan file" },
      { status: 500 }
    );
  }
}

