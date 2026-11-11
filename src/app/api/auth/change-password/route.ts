import { NextRequest, NextResponse } from "next/server";
import { getSession, verifyPassword, hashPassword } from "@/lib/auth";
import { dbGetUserByEmail, dbChangePassword } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Sesi tidak valid. Silakan login." }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Password saat ini dan password baru wajib diisi" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password baru minimal 6 karakter" },
        { status: 400 }
      );
    }

    const user = await dbGetUserByEmail(session.email);
    if (!user) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    const isMatch = await verifyPassword(currentPassword, user.password_hash || "");
    if (!isMatch) {
      return NextResponse.json(
        { error: "Password saat ini tidak cocok" },
        { status: 400 }
      );
    }

    const newHash = await hashPassword(newPassword);
    await dbChangePassword(session.id, newHash);

    return NextResponse.json({
      success: true,
      message: "Password berhasil diperbarui!",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengubah password" },
      { status: 500 }
    );
  }
}

