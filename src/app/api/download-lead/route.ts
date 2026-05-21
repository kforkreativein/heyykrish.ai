import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIP,
  getRateLimitHeaders,
  RATE_LIMITS,
} from "@/lib/rate-limit";
import { downloadLeadSchema, validateWithSchema } from "@/lib/validations";
import { validateRequest } from "@/lib/csrf";
import { addDownloadLead, addNewsletterSubscriber } from "@/lib/local-store";
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
    const rateLimitResult = checkRateLimit(ip, RATE_LIMITS.downloadLead);
    
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
    const validation = validateWithSchema(downloadLeadSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { name, email, resourceId, resourceTitle } = validation.data;
    const web3forms = await submitToWeb3Forms({
      subject: "New resource download from heyykrish.site",
      from_name: name,
      email,
      resource_id: resourceId,
      resource_title: resourceTitle,
      message: `Downloaded: ${resourceTitle || resourceId}`,
    });

    await addDownloadLead({ email, name, resourceId, resourceTitle });
    await addNewsletterSubscriber({
      email,
      name,
      source: resourceTitle || resourceId,
    });

    return NextResponse.json({ success: true, web3forms });
  } catch (error) {
    console.error("Error saving download lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
