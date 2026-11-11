import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbGetUsers, dbUpdateUser, dbDeleteUser } from "@/lib/sheets";

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

    // Admin tidak bisa menonaktifkan dirinya sendiri
    if (session.id === id && body.status && body.status !== "active") {
      return NextResponse.json(
        { error: "Anda tidak dapat menonaktifkan akun Anda sendiri" },
        { status: 400 }
      );
    }

    await dbUpdateUser(id, body);
    return NextResponse.json({ success: true, message: "Pengguna berhasil diperbarui" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui pengguna" },
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

    // Admin tidak bisa menghapus dirinya sendiri
    if (session.id === id) {
      return NextResponse.json(
        { error: "Anda tidak dapat menghapus akun Anda sendiri" },
        { status: 400 }
      );
    }

    // Admin tidak bisa menghapus admin terakhir
    const allUsers = await dbGetUsers();
    const adminCount = allUsers.filter(
      (u) => (u.role_name === "admin" || u.role_id === "role-admin-default") && u.status === "active"
    ).length;

    const targetUser = allUsers.find((u) => u.id === id);
    if (targetUser && (targetUser.role_name === "admin" || targetUser.role_id === "role-admin-default")) {
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Tidak dapat menghapus admin terakhir yang aktif" },
          { status: 400 }
        );
      }
    }

    await dbDeleteUser(id);
    return NextResponse.json({ success: true, message: "Pengguna berhasil dihapus" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal menghapus pengguna" },
      { status: 500 }
    );
  }
}

