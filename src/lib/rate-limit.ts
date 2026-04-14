/**
 * Simple in-memory rate limiter for API routes
 * Uses a sliding window algorithm with IP-based tracking
 * 
 * Note: In-memory storage resets on server restart and doesn't work
 * across multiple server instances. For production with multiple
 * instances, consider using Redis (e.g., @upstash/ratelimit).
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  
  lastCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
  /** Identifier prefix (e.g., "newsletter", "contact") */
  identifier: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

/**
 * Check if a request should be rate limited
 * @param ip - The client IP address
 * @param config - Rate limit configuration
 * @returns RateLimitResult with success status and metadata
 */
export function checkRateLimit(
  ip: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanupExpiredEntries();
  
  const key = `${config.identifier}:${ip}`;
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  
  const entry = rateLimitStore.get(key);
  
  // No existing entry or expired window - create new entry
  if (!entry || now > entry.resetTime) {
    const resetTime = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetTime,
    };
  }
  
  // Check if limit exceeded
  if (entry.count >= config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }
  
  // Increment count
  entry.count++;
  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client IP from request headers
 * Handles various proxy configurations
 */
export function getClientIP(request: Request): string {
  // Check various headers in order of preference
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }
  
  // Vercel-specific header
  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(",")[0].trim();
  }
  
  // Fallback for local development
  return "127.0.0.1";
}

/**
 * Create rate limit headers for response
 */
export function getRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(result.resetTime / 1000).toString(),
  };
}

// Default rate limit configurations for different endpoints
export const RATE_LIMITS = {
  adminAuth: {
    limit: 5,
    windowSeconds: 15 * 60, // 5 attempts per 15 minutes
    identifier: "admin-auth",
  },
  newsletter: {
    limit: 5,
    windowSeconds: 60, // 5 requests per minute
    identifier: "newsletter",
  },
  contact: {
    limit: 3,
    windowSeconds: 60, // 3 requests per minute
    identifier: "contact",
  },
  downloadLead: {
    limit: 10,
    windowSeconds: 60, // 10 requests per minute
    identifier: "download-lead",
  },
} as const;
