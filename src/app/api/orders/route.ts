import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbCreateOrder, dbGetOrders, OrderItem } from "@/lib/sheets";
import { siteConfig } from "@/config/site";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Silakan masuk ke akun Anda terlebih dahulu untuk membuat pesanan." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { customer_name, customer_phone, delivery_address, items, notes } = body;

    // 1. Validasi Input Server-Side
    if (!customer_name || customer_name.trim().length < 2) {
      return NextResponse.json(
        { error: "Nama pemesan / penerima wajib diisi dengan benar" },
        { status: 400 }
      );
    }

    // Validasi format nomor telepon / WhatsApp
    const cleanPhone = (customer_phone || "").replace(/[^0-9+]/g, "");
    if (cleanPhone.length < 9) {
      return NextResponse.json(
        { error: "Nomor WhatsApp aktif wajib diisi (minimal 9 digit)" },
        { status: 400 }
      );
    }

    if (!delivery_address || delivery_address.trim().length < 5) {
      return NextResponse.json(
        { error: "Alamat pengiriman / serah terima komoditas wajib diisi lengkap" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Pesanan harus memuat minimal 1 jenis komoditas ikan" },
        { status: 400 }
      );
    }

    // 2. Hitung Ulang Total Harga di Server (Mencegah Manipulasi Harga dari Client)
    const productMap = new Map(siteConfig.products.map((p) => [p.id, p]));
    let verifiedTotal = 0;
    const validatedItems: OrderItem[] = [];

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Produk dengan ID "${item.productId}" tidak ditemukan dalam katalog` },
          { status: 400 }
        );
      }

      const qty = Number(item.quantity);
      if (isNaN(qty) || qty <= 0) {
        return NextResponse.json(
          { error: `Jumlah pesanan untuk ${product.name} harus lebih dari 0` },
          { status: 400 }
        );
      }

      const subtotal = product.price * qty;
      verifiedTotal += subtotal;

      validatedItems.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: qty,
        unit: product.unit,
        subtotal,
      });
    }

    // 3. Simpan Pesanan ke Database
    const newOrder = await dbCreateOrder({
      user_id: session.id,
      customer_name: customer_name.trim(),
      customer_phone: cleanPhone,
      customer_email: session.email,
      order_type: "jual_beli",
      delivery_address: delivery_address.trim(),
      items: validatedItems,
      total_amount: verifiedTotal,
      notes: notes || "",
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memproses pesanan" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Akses ditolak: Silakan masuk" },
        { status: 401 }
      );
    }

    // Ambil hanya pesanan milik user yang sedang login
    const orders = await dbGetOrders(session.id);
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengambil daftar pesanan Anda" },
      { status: 500 }
    );
  }
}

