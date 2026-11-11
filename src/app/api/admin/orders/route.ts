import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbGetOrders } from "@/lib/sheets";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role_name !== "admin") {
      return NextResponse.json(
        { error: "Akses ditolak: Hanya administrator yang diizinkan" },
        { status: 403 }
      );
    }

    const orders = await dbGetOrders();
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengambil daftar seluruh pesanan" },
      { status: 500 }
    );
  }
}

