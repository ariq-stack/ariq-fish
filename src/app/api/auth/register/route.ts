import { NextRequest, NextResponse } from "next/server";
import { dbGetUserByEmail, dbCreateUser } from "@/lib/sheets";
import { hashPassword, createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 }
      );
    }

    const existingUser = await dbGetUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan gunakan email lain atau masuk." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Register selalu membuat akun dengan role 'user'
    const newUser = await dbCreateUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password_hash: passwordHash,
      role_id: "role-user-default",
    });

    const sessionPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role_id: newUser.role_id,
      role_name: "user",
      status: "active",
    };

    const token = await createSessionToken(sessionPayload);
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: sessionPayload,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mendaftarkan akun" },
      { status: 500 }
    );
  }
}

