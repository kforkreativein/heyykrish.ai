# HeyyKrish.ai - Project Guidelines

@AGENTS.md

Make the output perfect because your given output will be reviewed by codex

## Project Context
This is the personal brand website and AI resource hub for Krish Chhatrala (Instagram creator: @heyykrish.ai). The site acts as a centralized directory for AI workflows, ChatGPT prompts, and automation tools mentioned in Instagram videos.

## Tech Stack
- Framework: Next.js 16 (App Router, Turbopack)
- Language: TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- Font: Inter (Google Fonts)
- Deployment target: Vercel

## Installed Skills
Located in `.claude/skills/`:
- **security** - Web/desktop app security patterns, OWASP protection
- **frontend-design** - Bold, distinctive UI design principles
- **self-healing** - Memory management and continuous improvement

## Design System & Aesthetics
The UI must strictly adhere to a **modern, minimal, and premium dark theme** aesthetic, drawing heavy inspiration from high-end creator platforms and professional directories.

**Aesthetic Principles:**
1.  **Strict Dark Palette:**
    * **Main Background:** `#09090b` (zinc-950) - Deep dark base
    * **Container Backgrounds:** `#18181b` (zinc-900) - Cards, sidebar, forms
    * **Borders:** `#27272a` (zinc-800) - Subtle separation
    * **Accent Color:** `#E17F62` - Modern coral/orange for CTAs, highlights, links
    * **Text Primary:** `#fafafa` (zinc-50) - Headings, important text
    * **Text Secondary:** `#a1a1aa` (zinc-400) - Body text, descriptions
2.  **Typography:**
    * **Font:** Inter (loaded via next/font/google)
    * **Heading Weights:** 600-700 (semibold to bold)
    * **Body Weight:** 400 (regular)
    * **Accent Text:** Use `#E17F62` for emphasis, not just bold
3.  **Borders:** Extremely subtle zinc-800 borders with rounded corners (rounded-xl, rounded-2xl)
4.  **Whitespace:** Generous padding (py-16, py-24) and margins. Let elements breathe.
5.  **Hover States:** Minimalist transitions - focus on color changes, subtle transforms
6.  **Animations:** Purposeful micro-interactions (typewriter effect, gradient glows, transform effects)

## Core Layout Requirements
- **Global Sidebar:** Fixed on desktop (280px wide). Hamburger menu on mobile with slide-out drawer.
- **Sidebar Elements:** 
  - Profile picture (gradient circle with "K" initial)
  - Name "Krish Chhatrala" + "AI Creator" subtitle
  - Main navigation (Home, Resources, Brand Partnerships, About)
  - "Find Me" section with social links (Instagram, TikTok, YouTube, Email)
  - Bottom-anchored newsletter signup form
- **Main Content:** Offset by 280px on desktop (`lg:ml-[280px]`), full-width on mobile
- **Mobile Header:** Fixed top bar with logo and hamburger button

## Coding Conventions
1.  **Component Structure:** 
    - Modular components in `/src/components/`
    - Server Components by default
    - Client Components only for interactivity (`"use client"`)
2.  **Tailwind:** 
    - Mobile-first responsive design
    - Group related utilities: layout, spacing, colors, typography
    - Use CSS variables for theme colors (defined in globals.css)
3.  **Data Management:**
    - All resources in `/src/data/resources.ts`
    - Use helper functions: `getResourceBySlug()`, `getFeaturedResources()`
    - Never hardcode data in components
4.  **Clean Code:** 
    - Minimal comments (code should be self-documenting)
    - Descriptive variable/function names
    - Single responsibility principle
5.  **Client vs Server:**
    - Server: Static pages (About, resource details)
    - Client: Forms, animations, search/filters, mobile menu

## Project Structure

### Pages
- `/app/layout.tsx` - Global layout with Sidebar
- `/app/page.tsx` - Homepage (hero with typewriter + featured resources)
- `/app/resources/page.tsx` - Searchable resource directory with filters
- `/app/resources/[slug]/page.tsx` - Dynamic resource detail pages (SSG)
- `/app/brand-partnerships/page.tsx` - Media kit with stats and contact form
- `/app/about/page.tsx` - Biography and mission

### Components
- `/src/components/Sidebar.tsx` - Fixed sidebar with navigation (Client Component)
- `/src/components/ResourceCard.tsx` - Reusable resource card (Server Component)
- `/src/components/TypewriterText.tsx` - Animated typewriter effect (Client Component)

### Data & Configuration
- `/src/data/resources.ts` - All resource data and utility functions
- `/src/app/globals.css` - Global styles, CSS variables, prose-dark utilities
- `/next.config.ts` - Security headers configuration
- `/.claude/memory/MEMORY.md` - Project memory for AI assistants

## Component Guidelines

### TypewriterText Component
```tsx
<TypewriterText 
  words={["workflows.", "prompts.", "tools.", "automations."]}
  typingSpeed={100}
  deletingSpeed={50}
  pauseDuration={1500}
/>
```
- Client component with smooth typing animation
- Fixed width to prevent layout shifts
- Brand color accent with blinking cursor

### ResourceCard Component
```tsx
<ResourceCard 
  id={resource.id}
  slug={resource.slug}
  title={resource.title}
  description={resource.description}
  category={resource.category}
/>
```
- Links to `/resources/${slug}` automatically
- Category badges with gradient backgrounds
- Hover effects with color transitions

### Sidebar Component
**Known Issue:** `SidebarContent` is defined inside render (causes re-creation on every render)
**Fix Needed:** Move `SidebarContent` outside the Sidebar component function
- Mobile menu state managed with useState
- Active route detection with usePathname
- Newsletter form at bottom

## Security Guidelines

### Current Security Measures
- ✅ Security headers in `next.config.ts` (X-Frame-Options, CSP prep, etc.)
- ✅ React auto-escapes JSX content (XSS protection)
- ✅ No secrets in code
- ⚠️ Forms are placeholders only (need backend implementation)

### Before Production (Forms)
- [ ] Add CSRF tokens (use `next-csrf` package)
- [ ] Implement rate limiting (use `@upstash/ratelimit`)
- [ ] Add input validation with Zod schemas
- [ ] Sanitize form data server-side

### HTML Content Safety
- `dangerouslySetInnerHTML` used ONLY for trusted content from `/src/data/resources.ts`
- **Never** use with user-submitted content
- If adding CMS: Install `isomorphic-dompurify` and sanitize all HTML

See `SECURITY-AUDIT.md` for complete audit report.

## Resource Management

### Adding a New Resource
1. Edit `/src/data/resources.ts`
2. Add object to `resources` array:
```typescript
{
  id: "11",
  slug: "my-new-resource",
  title: "Resource Title",
  description: "Brief description...",
  category: "Prompts", // or Tools, Learning, etc.
  publishedAt: "2026-04-03",
  featured: true, // Optional: shows on homepage
  contentHtml: `<h2>Content</h2>...` // Optional: rich content
}
```
3. Run `npm run build` to regenerate static pages

### Content HTML Format
Use `contentHtml` field for rich resource content:
- Supports HTML tags: h1-h3, p, ul, ol, li, strong, em, blockquote, code, pre, a
- Styled automatically with `.prose-dark` classes
- **Security:** Only add trusted content (no user input)

## Common Workflows

### Development
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Run production build
```

### Adding Features
1. Check if skill exists (`.claude/skills/`)
2. Read project memory (`.claude/memory/MEMORY.md`)
3. Follow design system (zinc colors, #E17F62 accent)
4. Use Server Components by default
5. Test mobile responsiveness

### Updating Design
1. Colors: Update CSS variables in `globals.css`
2. Components: Follow existing patterns (zinc-900 cards, zinc-800 borders)
3. Verify contrast ratios (zinc-50 on zinc-950 background)
4. Test hover states and animations

## Known Issues & Future Work

### High Priority
- [ ] Fix Sidebar component anti-pattern (move SidebarContent outside)
- [ ] Add actual profile photo to homepage hero
- [ ] Implement newsletter backend with security

### Medium Priority
- [ ] Extract newsletter form to separate client component
- [ ] Add more resources with rich contentHtml
- [ ] Consider adding scroll-triggered animations

### Low Priority
- [ ] Set up analytics
- [ ] Add RSS feed for resources
- [ ] Consider CMS integration (with XSS protection)

## Memory & Context
- Project memory stored in `.claude/memory/MEMORY.md`
- Brand guidelines, conventions, and workflows documented
- AI assistants should read memory before making changes
- Update memory when discovering new patterns or fixing issues

## Links & References
- Production: (TBD - Vercel deployment)
- Instagram: [@heyykrish](https://instagram.com/heyykrish)
- TikTok: [@heyykrish](https://tiktok.com/@heyykrish)
- YouTube: [@heyykrish](https://youtube.com/@heyykrish)
- Email: hello@heyykrish.ai

---

**Last Updated:** April 3, 2026  
**Status:** ✅ Build passing, 17 pages generated, TypeScript 0 errors