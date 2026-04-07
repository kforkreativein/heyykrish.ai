import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // Get newsletter count
    const { count: newsletterCount } = await supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true });

    // Get contact count
    const { count: contactCount } = await supabase
      .from("contact_inquiries")
      .select("*", { count: "exact", head: true });

    // Get download count
    const { count: downloadCount } = await supabase
      .from("download_leads")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      newsletterCount: newsletterCount ?? 0,
      contactCount: contactCount ?? 0,
      downloadCount: downloadCount ?? 0,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
