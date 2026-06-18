import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "meristem_session";

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET ?? "fallback-secret-change-me-in-production"
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Always allow the login page through
  if (pathname === "/admin/login") {
    // If already authenticated, redirect to dashboard
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      try {
        await jwtVerify(token, getSecret());
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        // Invalid token — let them see the login page
      }
    }
    return NextResponse.next();
  }

  // All other /admin routes require a valid session
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, getSecret());
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
