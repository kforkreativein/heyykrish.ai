import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare CSV data
    const timestamp = new Date().toISOString();
    const csvRow = `"${timestamp}","${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}","${company?.replace(/"/g, '""') || ''}","${message.replace(/"/g, '""').replace(/\n/g, ' ')}"\n`;
    
    const dataDir = path.join(process.cwd(), "data");
    const csvPath = path.join(dataDir, "contact-inquiries.csv");

    // Check if CSV file exists and add header if not
    let csvContent = csvRow;
    try {
      const existingContent = await readFile(csvPath, "utf-8");
      csvContent = existingContent + csvRow;
    } catch {
      // File doesn't exist, add header
      const header = "Timestamp,Name,Email,Company,Message\n";
      csvContent = header + csvRow;
    }

    // Write to CSV file
    await writeFile(csvPath, csvContent);

    return NextResponse.json({ 
      success: true, 
      message: "Contact inquiry saved successfully" 
    });

  } catch (error) {
    console.error("Error saving contact inquiry:", error);
    return NextResponse.json(
      { error: "Failed to save contact inquiry" },
      { status: 500 }
    );
  }
}