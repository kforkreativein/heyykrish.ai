import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get newsletter count
    const { count: newsletterCount } = await supabaseServer
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true });

    // Get contact count
    const { count: contactCount } = await supabaseServer
      .from("contact_inquiries")
      .select("*", { count: "exact", head: true });

    // Get download count
    const { count: downloadCount } = await supabaseServer
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
