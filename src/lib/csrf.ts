import { NextRequest } from "next/server";

/**
 * CSRF Protection utilities
 * 
 * Uses Origin/Referer header validation for stateless CSRF protection.
 * This is suitable for API routes that don't need server-side session tokens.
 */

// Allowed origins for CSRF validation
const ALLOWED_ORIGINS = [
  "https://www.heyykrish.site",
  "https://heyykrish.site",
  // Add staging/preview URLs as needed
];

// Allow localhost in development
if (process.env.NODE_ENV === "development") {
  ALLOWED_ORIGINS.push(
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  );
}

/**
 * Validates that a request comes from an allowed origin
 * Checks both Origin and Referer headers
 */
export function validateOrigin(request: NextRequest): {
  valid: boolean;
  error?: string;
} {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  
  // For same-origin requests, Origin might not be sent
  // but we should have a Referer
  const checkOrigin = origin || (referer ? new URL(referer).origin : null);
  
  if (!checkOrigin) {
    // No origin info - might be a direct API call (curl, Postman, etc.)
    // In production, reject these for form submissions
    if (process.env.NODE_ENV === "production") {
      return {
        valid: false,
        error: "Missing origin header",
      };
    }
    // Allow in development for testing
    return { valid: true };
  }
  
  // Check if origin is in allowed list
  const isAllowed = ALLOWED_ORIGINS.some(
    (allowed) => checkOrigin === allowed || checkOrigin.startsWith(allowed)
  );
  
  if (!isAllowed) {
    return {
      valid: false,
      error: `Origin not allowed: ${checkOrigin}`,
    };
  }
  
  return { valid: true };
}

/**
 * Content-Type validation for JSON APIs
 */
export function validateContentType(request: NextRequest): {
  valid: boolean;
  error?: string;
} {
  const contentType = request.headers.get("content-type");
  
  if (!contentType || !contentType.includes("application/json")) {
    return {
      valid: false,
      error: "Content-Type must be application/json",
    };
  }
  
  return { valid: true };
}

/**
 * Combined CSRF and content validation
 */
export function validateRequest(request: NextRequest): {
  valid: boolean;
  error?: string;
} {
  // Check content type
  const contentTypeResult = validateContentType(request);
  if (!contentTypeResult.valid) {
    return contentTypeResult;
  }
  
  // Check origin
  const originResult = validateOrigin(request);
  if (!originResult.valid) {
    return originResult;
  }
  
  return { valid: true };
}
