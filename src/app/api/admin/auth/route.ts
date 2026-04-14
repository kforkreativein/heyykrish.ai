import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  assertStrongAdminPassword,
  clearAdminSessionCookie,
  isAdminAuthenticated,
  setAdminSessionCookie,
} from "@/lib/admin-auth";
import {
  checkRateLimit,
  getClientIP,
  getRateLimitHeaders,
  RATE_LIMITS,
} from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAdminAuthenticated(request) });
}

// POST: Authenticate and issue secure admin session
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const rateLimitResult = checkRateLimit(ip, RATE_LIMITS.adminAuth);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, message: "Too many login attempts. Try again later." },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    const { password } = await request.json();
    const adminPassword = assertStrongAdminPassword(process.env.ADMIN_PASSWORD);
    const provided = String(password ?? "");

    const providedBuf = Buffer.from(provided);
    const adminBuf = Buffer.from(adminPassword);

    const isValid =
      providedBuf.length === adminBuf.length &&
      timingSafeEqual(providedBuf, adminBuf);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    });
    setAdminSessionCookie(response);
    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  clearAdminSessionCookie(response);
  return response;
}