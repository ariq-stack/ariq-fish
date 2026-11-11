import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbGetUsers } from "@/lib/sheets";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role_name !== "admin") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const users = await dbGetUsers();
    return NextResponse.json({ success: true, users });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengambil daftar pengguna" },
      { status: 500 }
    );
  }
}

