import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "ariq_fish_family_heritage_secret_key_1950_secure";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "ariq_fish_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Verifikasi token jika ada
  let sessionPayload: any = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY, {
        algorithms: ["HS256"],
      });
      sessionPayload = payload;
    } catch {
      sessionPayload = null;
    }
  }

  // 1. Proteksi Rute Dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!sessionPayload) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Hanya role 'admin' yang boleh masuk dashboard
    if (sessionPayload.role_name !== "admin") {
      const homeUrl = new URL("/", request.url);
      homeUrl.searchParams.set("error", "unauthorized_role");
      return NextResponse.redirect(homeUrl);
    }
  }

  // 2. Proteksi Rute API Admin
  if (pathname.startsWith("/api/admin")) {
    if (!sessionPayload || sessionPayload.role_name !== "admin") {
      return NextResponse.json(
        { error: "Akses ditolak: Hanya admin yang diizinkan" },
        { status: 403 }
      );
    }
  }

  // 3. Jika sudah login sebagai admin dan membuka /login atau /register, arahkan ke dashboard
  if ((pathname === "/login" || pathname === "/register") && sessionPayload) {
    if (sessionPayload.role_name === "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*", "/login", "/register"],
};

