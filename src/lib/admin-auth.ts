import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "hk_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const SESSION_TOKEN = "authenticated";

export function setAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: SESSION_TOKEN,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export function isAdminAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return token === SESSION_TOKEN;
}

export function assertStrongAdminPassword(
  password: string | undefined
): string {
  if (!password) {
    throw new Error("ADMIN_PASSWORD is missing or not set.");
  }

  return password;
}
