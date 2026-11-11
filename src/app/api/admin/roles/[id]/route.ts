import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbUpdateRole, dbDeleteRole, dbGetRoles } from "@/lib/sheets";

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

    await dbUpdateRole(id, body);
    return NextResponse.json({ success: true, message: "Peran berhasil diperbarui" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui peran" },
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
    const roles = await dbGetRoles();
    const target = roles.find((r) => r.id === id);

    if (target && (target.is_system === true || target.is_system === "TRUE")) {
      return NextResponse.json(
        { error: "Peran bawaan sistem (admin/user) tidak boleh dihapus" },
        { status: 400 }
      );
    }

    await dbDeleteRole(id);
    return NextResponse.json({ success: true, message: "Peran berhasil dihapus" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal menghapus peran" },
      { status: 500 }
    );
  }
}

