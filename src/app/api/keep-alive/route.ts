import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const token = request.headers.get("x-keep-alive-token");

  if (!token || token !== process.env.KEEP_ALIVE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { count } = await supabaseServer
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      ok: true,
      ping: new Date().toISOString(),
      subscribers: count ?? 0,
    });
  } catch (error) {
    console.error("Keep-alive ping failed:", error);
    return NextResponse.json({ error: "DB ping failed" }, { status: 500 });
  }
}
