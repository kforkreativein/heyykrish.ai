import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "hk_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function getAdminSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short. Use at least 32 characters."
    );
  }

  return secret;
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function makeToken(expiresAt: number): string {
  const secret = getAdminSecret();
  const payload = `admin:${expiresAt}`;
  const signature = signPayload(payload, secret);
  return `${payload}.${signature}`;
}

export function setAdminSessionCookie(response: NextResponse) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const token = makeToken(expiresAt);

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
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

function isValidToken(token: string): boolean {
  try {
    const secret = getAdminSecret();
    const [rawPayload, providedSignature] = token.split(".");

    if (!rawPayload || !providedSignature) {
      return false;
    }

    const expectedSignature = signPayload(rawPayload, secret);
    const providedBuf = Buffer.from(providedSignature);
    const expectedBuf = Buffer.from(expectedSignature);

    if (providedBuf.length !== expectedBuf.length) {
      return false;
    }

    if (!timingSafeEqual(providedBuf, expectedBuf)) {
      return false;
    }

    const [namespace, expiresRaw] = rawPayload.split(":");
    if (namespace !== "admin") {
      return false;
    }

    const expiresAt = Number(expiresRaw);
    if (!Number.isFinite(expiresAt)) {
      return false;
    }

    return Math.floor(Date.now() / 1000) < expiresAt;
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return false;
  }

  return isValidToken(token);
}

export function assertStrongAdminPassword(password: string | undefined): string {
  if (!password || password.length < 12) {
    throw new Error(
      "ADMIN_PASSWORD is missing or weak. Set a strong value (>=12 chars)."
    );
  }

  return password;
}
