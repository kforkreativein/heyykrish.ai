import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const CONTENT_FILE_PATH = path.join(process.cwd(), "src/data/site-content.json");

// GET: Fetch current site content
export async function GET(request: NextRequest) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const content = await fs.readFile(CONTENT_FILE_PATH, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error("Error reading content file:", error);
    return NextResponse.json(
      { error: "Failed to load site content" },
      { status: 500 }
    );
  }
}

// POST: Update site content
export async function POST(request: NextRequest) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedContent = await request.json();
    if (
      !updatedContent ||
      typeof updatedContent !== "object" ||
      Array.isArray(updatedContent)
    ) {
      return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
    }

    // Write updated content to file
    await fs.writeFile(
      CONTENT_FILE_PATH,
      JSON.stringify(updatedContent, null, 2),
      "utf-8"
    );

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
    });
  } catch (error) {
    console.error("Error updating content file:", error);
    return NextResponse.json(
      { error: "Failed to update site content" },
      { status: 500 }
    );
  }
}
