import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, resourceId, resourceTitle } = body;
    const timestamp = new Date().toISOString();

    // Validate input
    if (!name || !email || !resourceId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "download-leads.csv");

    // Create CSV content
    const csvRow = `"${timestamp}","${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}","${resourceId}","${resourceTitle?.replace(/"/g, '""') || ''}"\n`;

    // Check if file exists to add header
    if (!existsSync(filePath)) {
      const header = '"Timestamp","Name","Email","Resource ID","Resource Title"\n';
      await writeFile(filePath, header + csvRow, "utf-8");
    } else {
      // Append to existing file
      const existingData = await readFile(filePath, "utf-8");
      await writeFile(filePath, existingData + csvRow, "utf-8");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving download lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
