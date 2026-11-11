import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbGetOrderById } from "@/lib/sheets";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Akses ditolak: Silakan masuk ke akun Anda" },
        { status: 401 }
      );
    }

    const { id } = params;
    const order = await dbGetOrderById(id);

    if (!order) {
      return NextResponse.json(
        { error: "Tiket pesanan tidak ditemukan" },
        { status: 404 }
      );
    }

    // Keamanan: Hanya pemilik pesanan atau admin yang dapat melihat detail tiket
    if (order.user_id !== session.id && session.role_name !== "admin") {
      return NextResponse.json(
        { error: "Akses ditolak: Anda tidak memiliki wewenang melihat pesanan ini" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengambil data tiket pesanan" },
      { status: 500 }
    );
  }
}

