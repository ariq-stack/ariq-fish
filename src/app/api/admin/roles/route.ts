import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbGetRoles, dbCreateRole } from "@/lib/sheets";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role_name !== "admin") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const roles = await dbGetRoles();
    return NextResponse.json({ success: true, roles });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengambil daftar peran" },
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

    const { name, description, permissions } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Nama peran wajib diisi" }, { status: 400 });
    }

    const created = await dbCreateRole({
      name: name.trim().toLowerCase(),
      description: description || "",
      permissions: permissions || "",
    });

    return NextResponse.json({ success: true, role: created });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal membuat peran baru" },
      { status: 500 }
    );
  }
}

