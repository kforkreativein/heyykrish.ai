import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabaseServer
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
