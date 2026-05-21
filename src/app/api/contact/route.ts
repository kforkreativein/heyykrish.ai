import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIP,
  getRateLimitHeaders,
  RATE_LIMITS,
} from "@/lib/rate-limit";
import { contactSchema, validateWithSchema } from "@/lib/validations";
import { validateRequest } from "@/lib/csrf";
import { addContactInquiry } from "@/lib/local-store";
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
    const rateLimitResult = checkRateLimit(ip, RATE_LIMITS.contact);
    
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
    const validation = validateWithSchema(contactSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { name, email, company, message } = validation.data;
    const web3forms = await submitToWeb3Forms({
      subject: "New partnership inquiry from heyykrish.site",
      from_name: name,
      email,
      company: company ?? undefined,
      message,
    });

    await addContactInquiry({ name, email, company, message });

    return NextResponse.json({
      success: true,
      message: "Contact inquiry saved successfully",
      web3forms,
    });
  } catch (error) {
    console.error("Error saving contact inquiry:", error);
    return NextResponse.json(
      { error: "Failed to save contact inquiry" },
      { status: 500 }
    );
  }
}
