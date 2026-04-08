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
   * **Accent Color:** `#FF6A25` - Dusty orange/Claude color for CTAs, highlights
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
   * **Glowing Indicators:** `shadow-[0_0_8px_rgba(255,106,37,0.6)]` for status dots

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

## Components

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

### Sidebar Component
- Floating OS panel aesthetic on desktop with `m-4`
- Status indicator text: "System Ready"
- Navigation with active state dots (glowing when active)
- Pill-shaped social buttons (Instagram, Email)
- Newsletter signup form with functional validation
- Smooth mobile slide-out with dark overlay
- **IMPORTANT**: Instagram-only social links (TikTok and YouTube removed)

### ResourceCard Component
- Wrapped in OSCard component
- Pill-shaped category tags: `bg-claude-500/10 text-claude-500`
- Title in Space Grotesk: `font-heading text-2xl text-white`
- Subtle progress bar for aesthetics
- Pill-shaped action button with gradient: `bg-gradient-to-b from-claude-500 to-claude-600`
- Links to `/resources/${slug}` automatically

### DownloadModal Component
- Email capture before PDF downloads
- Full-screen centered overlay with dark backdrop
- "Unlock This System" positioning
- Success states with smooth transitions
- Posts to `/api/download-lead` API endpoint
- Data stored in `/data/download-leads.csv`

### ContactModal Component (NEW)
- Partnership inquiry form (Name, Email, Company, Message)
- Full-screen centered overlay matching DownloadModal
- Form validation and error handling
- Posts to `/api/contact` API endpoint
- Data stored in `/data/contact-inquiries.csv`

### BottomCTA Component (UPDATED)
- Flexible CTA component for multiple purposes
- Props: `useModal={true}` for newsletter, `useContactModal={true}` for partnerships
- Default behavior: Regular link navigation
- Conditionally renders appropriate modal based on props

## Coding Conventions
1. **Component Structure:** 
   - Modular components in `/src/components/`
   - Use OSCard for all major card layouts
   - Server Components by default
   - Client Components only for interactivity (`"use client"`)

2. **Tailwind & CSS Variables:** 
   - Mobile-first responsive design
   - Use CSS variables from globals.css: `--claude-*`, `--font-*`
   - Access via Tailwind: `text-[#FF6A25]`, `bg-[#121212]`, `border-white/5`
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
- `/app/resources/page.tsx` - Searchable resource directory with filters + newsletter CTA
- `/app/resources/[slug]/page.tsx` - Dynamic resource detail pages (SSG)
- `/app/brand-partnerships/page.tsx` - Partnership page with contact modal
- `/app/about/page.tsx` - Biography and mission with newsletter CTA
- `/app/media-kit/page.tsx` - Hidden media kit dashboard (direct access only)

### Components
- `/src/components/Sidebar.tsx` - Floating OS panel navigation (Client Component)
- `/src/components/OSCard.tsx` - Reusable card with inset glow effect (Server Component)
- `/src/components/ResourceCard.tsx` - Resource display card using OSCard (Server Component)
- `/src/components/TypewriterText.tsx` - Animated typewriter effect (Client Component)
- `/src/components/BottomCTA.tsx` - Flexible CTA component with modal support (Client Component)
- `/src/components/DownloadModal.tsx` - Newsletter/lead capture modal (Client Component)
- `/src/components/ContactModal.tsx` - Partnership inquiry modal (Client Component)

### Data & Configuration
- `/src/data/resources.ts` - All resource data and utility functions
- `/src/data/mediakit.ts` - Media kit stats (150K+ followers, 5M+ impressions, etc.)
- `/src/app/api/newsletter/route.ts` - Newsletter signup API endpoint
- `/src/app/api/download-lead/route.ts` - PDF download lead capture API
- `/src/app/api/contact/route.ts` - Partnership contact form API (NEW)
- `/data/newsletter-subscribers.csv` - Email subscriber data
- `/data/download-leads.csv` - PDF download lead data
- `/data/contact-inquiries.csv` - Partnership inquiry data (NEW)
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
- Text color: `text-[#FF6A25]` (claudeColor)
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
3. Follow design system (zinc colors, #FF6A25 accent)
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
- [x] Floating sidebar OS panel with Instagram-only social buttons
- [x] OSCard component with inset glows
- [x] Sidebar navigation with dot indicators
- [x] Pill-shaped buttons and inputs
- [x] Space Grotesk + JetBrains Mono fonts
- [x] Resource sorting by date (newest first)
- [x] Professional copywriting across all pages
- [x] Email capture system (newsletter, PDF downloads, contact inquiries)
- [x] DownloadModal for PDF lead capture
- [x] ContactModal for partnership inquiries
- [x] API endpoints for all data collection
- [x] CSV-based data storage system
- [x] BottomCTA component with modal support
- [x] Newsletter CTA on About and Resources pages
- [x] Contact modal on Brand Partnerships page
- [x] Updated page breadcrumbs (HeyyKrish.AI // [Page Name])

### In Progress 🔄
- [ ] Dashboard analytics view (viewing collected emails/inquiries)
- [ ] Email validation & GDPR compliance features
- [ ] Form submission rate limiting

### High Priority (Before Launch)
- [ ] Add actual profile photo to homepage
- [ ] Testing on all devices (mobile, tablet, desktop)
- [ ] Performance optimization for production
- [ ] SSL certificate setup for Vercel deployment
- [ ] Newsletter email delivery service integration

### Medium Priority
- [ ] Advanced search filters on resources page
- [ ] Page transitions/animations
- [ ] CMS integration (with XSS protection)
- [ ] Analytics dashboard
- [ ] Admin panel for managing inquiries

### Low Priority
- [ ] RSS feed for resources
- [ ] Advanced scroll animations
- [ ] Dark mode toggle (already dark)
- [ ] Internationalization support

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
**Status:** ✅ Complete website redesign with email capture, modals, and professional copy. All 9 pages styled, 3 API endpoints, CSV data storage.

**Recent Changes (This Session):**
- Fixed partnership page UI: removed duplicate media kit button, left-aligned single button
- Created ContactModal component for partnership inquiries
- Created `/api/contact` endpoint with CSV storage for contact inquiries
- Enhanced BottomCTA component with flexible modal support
- Added newsletter BottomCTA to Resources page
- Fixed modal positioning: both ContactModal and DownloadModal now full-screen centered
- Updated page breadcrumbs to "HeyyKrish.AI // [Page Name]" format across all pages
- Fixed Sidebar social buttons: removed TikTok and YouTube, kept Instagram and Email only
- Improved button styling on partnership page with hover states and accessibility features
- Standardized container widths across all pages (max-w-6xl) for consistent spacing