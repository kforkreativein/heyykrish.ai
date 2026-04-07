import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  checkRateLimit,
  getClientIP,
  getRateLimitHeaders,
  RATE_LIMITS,
} from "@/lib/rate-limit";
import { newsletterSchema, validateWithSchema } from "@/lib/validations";
import { validateRequest } from "@/lib/csrf";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getISTTimestamp() {
  const now = new Date();
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return istTime.toISOString();
}

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

    // Insert into Supabase
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          name,
          source,
          created_at: getISTTimestamp(),
        },
      ]);

    if (error) {
      console.error("Supabase error:", error);
      // Check if it's a duplicate email error
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 400 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving newsletter subscriber:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
