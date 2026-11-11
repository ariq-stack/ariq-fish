import { NextRequest, NextResponse } from "next/server";
import { dbGetUserByEmail } from "@/lib/sheets";
import { verifyPassword, createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await dbGetUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    if (user.status === "inactive" || user.status === "blocked") {
      return NextResponse.json(
        { error: "Akun Anda dinonaktifkan. Hubungi administrator." },
        { status: 403 }
      );
    }

    const isMatch = await verifyPassword(password, user.password_hash || "");
    if (!isMatch) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const sessionPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      role_name: user.role_name || "user",
      status: user.status,
    };

    const token = await createSessionToken(sessionPayload);
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: sessionPayload,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}

