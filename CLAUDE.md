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
The UI follows a **Futuristic Cyber-Dashboard** aesthetic with ultra-dark backgrounds, extreme border radiuses, soft inset glows, and technical typography.

**Aesthetic Principles:**
1. **Dark Palette (Updated):**
   * **Main Background:** `#0a0a0a` (pure black) - Deep dark base
   * **Container Backgrounds:** `#121212` - OS cards and panels
   * **Borders:** `white/5` - Subtle 5% white borders for glass effect
   * **Accent Color:** `#CC785C` - Dusty orange/Claude color for CTAs, highlights
   * **Text Primary:** `#ffffff` (pure white) - Headings
   * **Text Secondary:** `#d4d4d8` (zinc-300) - Body text
   * **Text Tertiary:** `#a1a1aa` (zinc-400) - Descriptions

2. **Typography (NEW):**
   * **Headings:** Space Grotesk (`--font-space`) - Wide, futuristic, technical feel
   * **Body:** Inter (`--font-inter`) - Clean readability
   * **Technical/Tags:** JetBrains Mono (`--font-mono`) - Monospace for code, labels, system text
   * **Weight Distribution:** 400-700 based on context

3. **Visual Effects:**
   * **Extreme Border Radius:** `rounded-[32px]` for major cards, `rounded-full` for buttons/pills
   * **Inset Glow:** `inset 0 1px 0 0 rgba(255,255,255,0.05)` on top edge of cards
   * **Shadows:** `0 4px 24px -1px rgba(0,0,0,0.5)` for depth
   * **Backdrop Blur:** `backdrop-blur-xl` for glass morphism effect
   * **Glowing Indicators:** `shadow-[0_0_8px_rgba(204,120,92,0.6)]` for status dots

4. **Component Styling:**
   * Cards: OSCard component with `bg-[#121212] border border-white/5 rounded-[32px] shadow-os-card`
   * Buttons: Pill-shaped (`rounded-full`) with gradient backgrounds
   * Inputs: Pill-shaped with minimal borders
   * Navigation: Monospace labels with glowing dot indicators

5. **Spacing & Layout:**
   * Desktop sidebar: Floating panel with margins (`m-4`)
   * Mobile sidebar: Full-height slide-out with smooth animations
   * Content offset: `lg:ml-[276px]` for floating sidebar
   * Generous whitespace with breathing room

## Core Layout Requirements
- **Global Sidebar (NEW):** Floating panel on desktop with `m-4`, `rounded-[32px]`, OSCard styling. Full-height slide-out on mobile.
- **Sidebar Elements:** 
  - "System Ready" status indicator (monospace, uppercase, tracked)
  - Name "Krish Chhatrala" in Space Grotesk heading
  - Navigation with glowing dot indicators for active state
  - "Connect" section with pill-shaped social buttons
  - Newsletter box with pill-shaped input and button
- **Main Content:** Offset by 276px on desktop (`lg:ml-[276px]`), full-width on mobile
- **Mobile Header:** Minimal top bar with logo and hamburger (no padding excess)

## New Components

### OSCard Component
```tsx
<OSCard className="optional-classes">
  {children}
</OSCard>
```
Base styles applied automatically:
- `bg-[#121212]` — Dark card surface
- `border border-white/5` — Subtle 5% white border
- `rounded-[32px]` — Extreme border radius
- `shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)]` — Deep shadow + inset top glow
- `backdrop-blur-xl` — Glass morphism effect
- `p-6 md:p-8` — Responsive padding

### Updated Sidebar Component
- Floating OS panel aesthetic on desktop
- Status indicator text: "System Ready"
- Navigation with active state dots (glowing when active)
- Pill-shaped social buttons with icons
- Newsletter section with rounded inputs/buttons
- Smooth mobile slide-out with dark overlay

### Updated ResourceCard Component
- Wrapped in OSCard component
- Pill-shaped category tags: `bg-claude-500/10 text-claude-500`
- Title in Space Grotesk: `font-heading text-2xl text-white`
- Subtle progress bar for aesthetics
- Pill-shaped action button with gradient: `bg-gradient-to-b from-claude-500 to-claude-600`

## Coding Conventions
1. **Component Structure:** 
   - Modular components in `/src/components/`
   - Use OSCard for all major card layouts
   - Server Components by default
   - Client Components only for interactivity (`"use client"`)

2. **Tailwind & CSS Variables:** 
   - Mobile-first responsive design
   - Use CSS variables from globals.css: `--claude-*`, `--font-*`
   - Access via Tailwind: `text-[#CC785C]`, `bg-[#121212]`, `border-white/5`
   - Font utilities: `font-heading`, `font-mono`

3. **Typography Usage:**
   - Space Grotesk (`font-heading`) — Page titles, major headings
   - Inter — Body copy, default text
   - JetBrains Mono (`font-mono`) — Labels, technical text, breadcrumbs, status indicators

4. **Data Management:**
   - All resources in `/src/data/resources.ts`
   - Use helper functions: `getResourceBySlug()`, `getFeaturedResources()`, `getAllResourcesSorted()`
   - Resources sorted by `publishedAt` descending (newest first)
   - Never hardcode data in components

5. **Clean Code:** 
   - Minimal comments (code should be self-documenting)
   - Descriptive variable/function names
   - Single responsibility principle
   - Avoid legacy zinc-900/zinc-800 colors (use new claude palette)

6. **Client vs Server:**
   - Server: Static pages (About, resource details, resources list)
   - Client: Forms, animations, search/filters, mobile menu, navigation state

## Project Structure

### Pages
- `/app/layout.tsx` - Global layout with Sidebar
- `/app/page.tsx` - Homepage (hero with typewriter + featured resources)
- `/app/resources/page.tsx` - Searchable resource directory with filters
- `/app/resources/[slug]/page.tsx` - Dynamic resource detail pages (SSG)
- `/app/brand-partnerships/page.tsx` - Media kit with stats and contact form
- `/app/about/page.tsx` - Biography and mission

### Components
- `/src/components/Sidebar.tsx` - Floating OS panel navigation (Client Component)
- `/src/components/OSCard.tsx` - Reusable card with inset glow effect (Server Component)
- `/src/components/ResourceCard.tsx` - Resource display card using OSCard (Server Component)
- `/src/components/TypewriterText.tsx` - Animated typewriter effect (Client Component)
- `/src/components/BottomCTA.tsx` - Reusable CTA card component (Server Component)

### Data & Configuration
- `/src/data/resources.ts` - All resource data and utility functions
- `/src/app/globals.css` - Global styles, CSS variables, prose-dark utilities
- `/next.config.ts` - Security headers configuration
- `/.claude/memory/MEMORY.md` - Project memory for AI assistants

## Component Guidelines

### OSCard Component (NEW)
```tsx
<OSCard className="p-8">
  <h3 className="font-heading text-2xl text-white mb-4">Title</h3>
  <p className="text-zinc-400">Content here</p>
</OSCard>
```
- Always use for major card layouts
- Handles all styling (bg, border, shadow, blur)
- Pass optional className for additional customization
- Works with nested components

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
- Text color: `text-[#CC785C]` (claudeColor)
- Use on hero sections
- Prevents layout shift

### ResourceCard Component (UPDATED)
```tsx
<ResourceCard 
  id={resource.id}
  slug={resource.slug}
  title={resource.title}
  description={resource.description}
  category={resource.category}
/>
```
- Wrapped in OSCard component
- Pill-shaped category tags in monospace
- Title in Space Grotesk font
- Links to `/resources/${slug}` automatically
- Pill-shaped gradient button with hover effects

### Sidebar Component (UPDATED)
- Floating panel on desktop with `m-4`, `rounded-[32px]`
- OSCard styling applied
- "System Ready" status indicator (monospace)
- Navigation with glowing dot indicators
- Pill-shaped social buttons
- Newsletter form with rounded inputs
- Mobile: Full-height slide-out with overlay

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

### Completed ✅
- [x] Cyber-Dashboard theme foundation (fonts, colors, shadows)
- [x] Floating sidebar OS panel
- [x] OSCard component with inset glows
- [x] Sidebar navigation with dot indicators
- [x] Pill-shaped buttons and inputs
- [x] Space Grotesk + JetBrains Mono fonts
- [x] Resource sorting by date (newest first)

### In Progress 🔄
- [ ] Update homepage to dashboard layout (Step 3)
- [ ] Update ResourceCard with new design
- [ ] Update resources page with new card styles
- [ ] Update all other pages with new theme

### High Priority
- [ ] Add actual profile photo to homepage
- [ ] Complete homepage dashboard redesign
- [ ] Update resource detail pages with new styling
- [ ] Implement newsletter backend with security

### Medium Priority
- [ ] Extract more reusable patterns from dashboard
- [ ] Add page transitions/animations
- [ ] Consider CMS integration (with XSS protection)
- [ ] Add analytics

### Low Priority
- [ ] Add RSS feed for resources
- [ ] Consider advanced scroll animations
- [ ] Refine mobile responsiveness on all pages

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

**Last Updated:** April 4, 2026  
**Status:** ✅ Cyber-Dashboard theme foundation complete, Sidebar redesigned, OSCard component added, Build passing 18 pages

**Recent Changes:**
- Migrated from minimal dark theme to Futuristic Cyber-Dashboard aesthetic
- Added Space Grotesk (headings) and JetBrains Mono (technical text) fonts
- Updated color palette: `#0a0a0a` background, `#CC785C` accent (dusty orange)
- Created OSCard component with inset glow effect for all major cards
- Redesigned Sidebar as floating OS panel with status indicators
- Updated navigation with glowing dot indicators instead of backgrounds
- Pill-shaped buttons, inputs, and social buttons for cohesive design