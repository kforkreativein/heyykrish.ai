import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const MEDIA_KIT_PATH = path.join(process.cwd(), "src/data/mediakit.ts");

function q(value: unknown): string {
  return JSON.stringify(String(value ?? ""));
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((entry) => String(entry ?? ""));
}

// GET: Fetch current media kit data
export async function GET(request: NextRequest) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const content = await fs.readFile(MEDIA_KIT_PATH, "utf-8");
    
    // Extract the data object from the TypeScript file
    const match = content.match(/export const mediaKitData = ({[\s\S]*?});/);
    if (!match) {
      throw new Error("Could not parse mediakit.ts");
    }
    
    // Convert TypeScript object to JSON-parseable string
    const dataStr = match[1]
      .replace(/(\w+):/g, '"$1":')  // Add quotes to keys
      .replace(/'/g, '"');           // Replace single quotes with double
    
    const data = JSON.parse(dataStr);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading media kit:", error);
    return NextResponse.json(
      { error: "Failed to load media kit" },
      { status: 500 }
    );
  }
}

// POST: Update media kit data
export async function POST(request: NextRequest) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedData = await request.json();
    if (
      !updatedData ||
      typeof updatedData !== "object" ||
      Array.isArray(updatedData)
    ) {
      return NextResponse.json({ error: "Invalid media kit payload" }, { status: 400 });
    }
    const topLocations = toStringArray(updatedData?.demographics?.topLocations);
    const topInterests = toStringArray(updatedData?.topInterests);

    // Generate TypeScript file content
    const fileContent = `// Media Kit Data - Last Updated: ${String(updatedData.lastUpdated || "April 2025")}

export const mediaKitData = {
  followers: ${q(updatedData.followers)},
  impressions: ${q(updatedData.impressions)},
  audienceAge: ${q(updatedData.audienceAge)},
  engagementRate: ${q(updatedData.engagementRate)},
  demographics: {
    gender: {
      male: ${q(updatedData?.demographics?.gender?.male)},
      female: ${q(updatedData?.demographics?.gender?.female)},
    },
    topLocations: [
      ${topLocations.map((loc) => q(loc)).join(",\n      ")}
    ],
  },
  topInterests: [
    ${topInterests.map((interest) => q(interest)).join(",\n    ")}
  ],
  lastUpdated: ${q(updatedData.lastUpdated)},
};
`;

    // Write updated content to file
    await fs.writeFile(MEDIA_KIT_PATH, fileContent, "utf-8");

    return NextResponse.json({
      success: true,
      message: "Media kit updated successfully",
    });
  } catch (error) {
    console.error("Error updating media kit:", error);
    return NextResponse.json(
      { error: "Failed to update media kit" },
      { status: 500 }
    );
  }
}
