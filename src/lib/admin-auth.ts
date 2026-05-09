import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "hk_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function getSigningSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("No signing secret available for admin sessions.");
  return secret;
}

function signPayload(payload: string): string {
  return createHmac("sha256", getSigningSecret()).update(payload).digest("hex");
}

function generateSessionToken(): string {
  const issuedAt = Date.now();
  const nonce = randomBytes(16).toString("hex");
  const payload = `${issuedAt}:${nonce}`;
  const sig = signPayload(payload);
  return `${payload}.${sig}`;
}

function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;

  const payload = token.substring(0, lastDot);
  const sig = token.substring(lastDot + 1);

  // Verify HMAC signature with timing-safe comparison
  const expectedSig = signPayload(payload);
  try {
    const sigBuf = Buffer.from(sig, "hex");
    const expectedBuf = Buffer.from(expectedSig, "hex");
    if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
      return false;
    }
  } catch {
    return false;
  }

  // Verify token age is within TTL
  const [timestampStr] = payload.split(":");
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  const ageSeconds = (Date.now() - timestamp) / 1000;
  return ageSeconds >= 0 && ageSeconds < SESSION_TTL_SECONDS;
}

export function setAdminSessionCookie(response: NextResponse) {
  const token = generateSessionToken();
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

export function isAdminAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}

export function assertStrongAdminPassword(
  password: string | undefined
): string {
  if (!password) {
    throw new Error("ADMIN_PASSWORD is missing or not set.");
  }

  return password;
}
