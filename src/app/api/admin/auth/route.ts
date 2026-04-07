import { NextRequest, NextResponse } from "next/server";

// POST: Validate admin password
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Get password from server environment (secure)
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
    
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ 
        success: true, 
        message: "Authentication successful" 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid password" 
      }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Authentication failed" 
    }, { status: 500 });
  }
}