## Security Audit Report - heyykrish.ai

**Date:** 2026-04-03  
**Auditor:** Claude with Security Skill

---

### 🔴 Critical Issues: 0

### 🟡 Medium Priority Issues: 3

#### 1. Forms Have No CSRF Protection
**Files:** 
- `src/app/page.tsx` (newsletter signup)
- `src/app/brand-partnerships/page.tsx` (contact form)
- `src/components/Sidebar.tsx` (newsletter signup)

**Issue:** All forms use `onSubmit={(e) => e.preventDefault()}` as placeholders. When you implement actual form submission:
- No CSRF token validation
- No rate limiting
- No input sanitization

**Risk:** When forms are connected to backend:
- CSRF attacks could submit unauthorized requests
- Spam/abuse via unlimited submissions
- Potential XSS if input isn't sanitized

**Recommendation:**
```typescript
// Add when implementing backend
import { csrf } from '@/lib/csrf';

export async function submitNewsletter(formData: FormData) {
  'use server'
  
  // 1. Verify CSRF token
  await csrf.verify(formData.get('csrf_token'));
  
  // 2. Rate limit
  const ip = headers().get('x-forwarded-for');
  await rateLimit.check(ip, 'newsletter', { limit: 5, window: '1h' });
  
  // 3. Validate & sanitize input
  const email = formData.get('email')?.toString().trim();
  if (!email || !isValidEmail(email)) throw new Error('Invalid email');
  
  // 4. Process safely
  await db.newsletter.create({ data: { email } });
}
```

---

#### 2. dangerouslySetInnerHTML Usage (Currently Safe, Needs Monitoring)
**File:** `src/app/resources/[slug]/page.tsx:102`

**Current State:** ✅ Safe because:
- Content comes from `src/data/resources.ts` (trusted source)
- No user-submitted content
- Well-documented security comment

**Future Risk:** If you ever move to a CMS or allow user content, this becomes **Critical XSS vulnerability**.

**Recommendation:**
- Keep as-is for now (it's safe)
- Add this check before deployment:
  ```typescript
  // Future: If moving to CMS, use DOMPurify
  import DOMPurify from 'isomorphic-dompurify';
  
  const cleanHtml = DOMPurify.sanitize(resource.contentHtml, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote', 'code', 'pre', 'a'],
    ALLOWED_ATTR: ['href', 'class']
  });
  ```

---

#### 3. No Rate Limiting on Newsletter Signup
**Files:** All pages with newsletter forms

**Issue:** No protection against:
- Email bombing (spam signups)
- DoS via repeated requests
- List pollution

**Recommendation:** Implement when connecting to backend:
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1h'), // 5 requests per hour per IP
  analytics: true,
});

// In server action:
const { success } = await ratelimit.limit(ip);
if (!success) throw new Error('Too many requests');
```

---

### ✅ Security Strengths

1. **No SQL Injection Risk** - Using Prisma with parameterized queries (when you add a database)
2. **XSS Protection** - React automatically escapes JSX content
3. **HTTPS Ready** - Vercel deployment enforces HTTPS
4. **No Secrets in Code** - No hardcoded API keys detected
5. **Safe Dependencies** - Next.js, React, Tailwind are trusted packages

---

### 📋 Action Items (Before Production)

**Before connecting forms to backend:**
- [ ] Implement CSRF tokens (use `next-csrf` package)
- [ ] Add rate limiting (use `@upstash/ratelimit`)
- [ ] Add input validation (use `zod` schemas)
- [ ] Set up CORS properly (if using API routes)
- [ ] Add Content-Security-Policy headers

**Before accepting user content:**
- [ ] Install `isomorphic-dompurify` for HTML sanitization
- [ ] Never trust user input in `dangerouslySetInnerHTML`

**General hardening:**
- [ ] Add security headers in `next.config.ts`
- [ ] Enable Vercel's DDoS protection
- [ ] Set up monitoring/alerts for unusual activity

---

### 🛡️ Recommended Security Headers

Add to `next.config.ts`:
```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ];
},
```

---

**Overall Assessment:** Currently safe for static hosting. Requires hardening before implementing backend features.
