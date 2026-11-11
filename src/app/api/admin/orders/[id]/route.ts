import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbUpdateOrderStatus, dbGetOrderById } from "@/lib/sheets";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role_name !== "admin") {
      return NextResponse.json(
        { error: "Akses ditolak: Hanya administrator yang diizinkan mengubah status" },
        { status: 403 }
      );
    }

    const { id } = params;
    const { status, admin_notes } = await req.json();

    const validStatuses = ["menunggu_konfirmasi", "dikonfirmasi", "ditolak", "selesai"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Status pesanan tidak valid" },
        { status: 400 }
      );
    }

    const order = await dbGetOrderById(id);
    if (!order) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan" },
        { status: 404 }
      );
    }

    await dbUpdateOrderStatus(id, status, admin_notes);

    return NextResponse.json({
      success: true,
      message: `Status pesanan ${id} berhasil diubah menjadi ${status}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui status pesanan" },
      { status: 500 }
    );
  }
}

