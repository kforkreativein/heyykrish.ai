import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIP,
  getRateLimitHeaders,
  RATE_LIMITS,
} from "@/lib/rate-limit";
import { newsletterSchema, validateWithSchema } from "@/lib/validations";
import { validateRequest } from "@/lib/csrf";
import { addNewsletterSubscriber } from "@/lib/local-store";
import { submitToWeb3Forms } from "@/lib/web3forms";

export async function POST(request: NextRequest) {
  try {
    // CSRF validation
    const csrfResult = validateRequest(request);
    if (!csrfResult.valid) {
      return NextResponse.json(
        { error: csrfResult.error },
        { status: 403 }
      );
    }

    // Rate limiting check
    const ip = getClientIP(request);
    const rateLimitResult = checkRateLimit(ip, RATE_LIMITS.newsletter);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult),
        }
      );
    }

    const body = await request.json();
    
    // Zod validation
    const validation = validateWithSchema(newsletterSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { email, name, source } = validation.data;

    const web3forms = await submitToWeb3Forms({
      subject: "New newsletter signup from heyykrish.site",
      from_name: name || "Newsletter subscriber",
      email,
      source,
      message: `Newsletter signup from ${source}`,
    });

    await addNewsletterSubscriber({ email, name, source });

    return NextResponse.json({ success: true, web3forms });
  } catch (error) {
    console.error("Error saving newsletter subscriber:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
