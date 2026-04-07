import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const MEDIA_KIT_PATH = path.join(process.cwd(), "src/data/mediakit.ts");

// GET: Fetch current media kit data
export async function GET() {
  try {
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
    const updatedData = await request.json();

    // Generate TypeScript file content
    const fileContent = `// Media Kit Data - Last Updated: ${updatedData.lastUpdated || "April 2025"}

export const mediaKitData = {
  followers: "${updatedData.followers}",
  impressions: "${updatedData.impressions}",
  audienceAge: "${updatedData.audienceAge}",
  engagementRate: "${updatedData.engagementRate}",
  demographics: {
    gender: {
      male: "${updatedData.demographics.gender.male}",
      female: "${updatedData.demographics.gender.female}",
    },
    topLocations: [
      ${updatedData.demographics.topLocations.map((loc: string) => `"${loc}"`).join(",\n      ")}
    ],
  },
  topInterests: [
    ${updatedData.topInterests.map((interest: string) => `"${interest}"`).join(",\n    ")}
  ],
  lastUpdated: "${updatedData.lastUpdated}",
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
