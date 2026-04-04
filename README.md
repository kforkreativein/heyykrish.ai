# heyykrish.ai

Personal brand website and AI resource hub for Krish Chhatrala (@heyykrish.ai). A premium Next.js application showcasing AI workflows, ChatGPT prompts, automation tools, and battle-tested systems from real-world testing.

## 🎯 Features

- **Futuristic Cyber-Dashboard Design** - Ultra-dark aesthetic with extreme border radiuses and glowing effects
- **Email Capture System** - Collect newsletters, PDF download leads, and partnership inquiries via modals
- **API Endpoints** - 3 endpoints with CSV-based data storage
- **Responsive Design** - Mobile-first, works on all devices
- **Professional Copywriting** - Execution-focused messaging across all pages
- **SEO Optimized** - Static generation with dynamic routes
- **TypeScript** - Full type safety

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Development
```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Architecture

### Tech Stack
- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Space Grotesk, JetBrains Mono, Inter (Google Fonts)
- **Deployment:** Vercel

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with hero & featured resources
│   ├── layout.tsx         # Global layout with sidebar
│   ├── globals.css        # Global styles & design tokens
│   ├── resources/         # Resource hub
│   │   ├── page.tsx       # Resources list with search/filters
│   │   └── [slug]/        # Dynamic resource detail pages
│   ├── about/             # About page with newsletter CTA
│   ├── brand-partnerships/# Partnership page with contact modal
│   ├── media-kit/         # Media kit dashboard (hidden page)
│   └── api/               # API endpoints
│       ├── newsletter/    # Newsletter signup
│       ├── download-lead/ # PDF download leads
│       └── contact/       # Partnership inquiries
├── components/            # Reusable React components
│   ├── Sidebar.tsx        # Floating navigation sidebar
│   ├── OSCard.tsx         # Card component with inset glow
│   ├── ResourceCard.tsx   # Resource display card
│   ├── TypewriterText.tsx # Animated typewriter effect
│   ├── BottomCTA.tsx      # Flexible CTA with modal support
│   ├── DownloadModal.tsx  # Email capture modal
│   └── ContactModal.tsx   # Partnership inquiry modal
└── data/
    ├── resources.ts       # Resource database & utilities
    └── mediakit.ts        # Media kit stats
data/
├── newsletter-subscribers.csv  # Email subscribers
├── download-leads.csv          # PDF download leads
└── contact-inquiries.csv       # Partnership inquiries
```

## 🎨 Design System

### Color Palette (Cyber-Dashboard Aesthetic)
- **Background:** `#0a0a0a` (pure black)
- **Cards:** `#121212` (dark gray)
- **Borders:** `white/5` (subtle glass effect)
- **Accent:** `#CC785C` (dusty orange - Claude color)
- **Text Primary:** `#ffffff` (white)
- **Text Secondary:** `#d4d4d8` (zinc-300)
- **Text Tertiary:** `#a1a1aa` (zinc-400)

### Typography
- **Headings:** Space Grotesk (`font-heading`) - Wide, futuristic feel
- **Body:** Inter - Clean, readable
- **Technical:** JetBrains Mono (`font-mono`) - Labels, status indicators

### Components
- **OSCard:** Reusable card with inset glow, backdrop blur, and extreme border radius
- **Sidebar:** Floating OS panel with navigation, status indicator, and newsletter signup
- **Modals:** Full-screen centered overlays with dark backdrop for email capture
- **Buttons:** Pill-shaped with gradient backgrounds and smooth hover states

## 📊 Email Capture System

The site includes a complete email capture system with 3 endpoints and CSV storage:

### 1. Newsletter Signup (`/api/newsletter`)
- Used on: Homepage, Sidebar, About page, Resources page
- Data stored in: `/data/newsletter-subscribers.csv`
- Fields: Timestamp, Email, Source
- Trigger: Newsletter forms throughout the site

### 2. PDF Download Leads (`/api/download-lead`)
- Used on: Resource detail pages
- Data stored in: `/data/download-leads.csv`
- Fields: Timestamp, Name, Email, Resource ID, Resource Title
- Trigger: DownloadModal before PDF download

### 3. Partnership Inquiries (`/api/contact`)
- Used on: Brand Partnerships page
- Data stored in: `/data/contact-inquiries.csv`
- Fields: Timestamp, Name, Email, Company, Message
- Trigger: ContactModal on partnership button click

### Accessing Your Data
All CSV files are in the `/data` directory:
```bash
# View newsletter subscribers
open data/newsletter-subscribers.csv

# View download leads
open data/download-leads.csv

# View partnership inquiries
open data/contact-inquiries.csv
```

Import into Excel, Google Sheets, or your CRM for analysis and follow-up.

## 📚 Adding Resources

Resources are stored in `/src/data/resources.ts`:

```typescript
{
  id: "12",
  slug: "my-resource-slug",
  title: "Resource Title",
  description: "Brief 2-3 sentence summary",
  category: "Prompts", // or Tools, Learning, Automations, etc.
  publishedAt: "2026-04-04",
  featured: true, // Optional: shows on homepage
  contentHtml: `<h3>Content</h3>...` // Optional: rich HTML content
}
```

Then run:
```bash
npm run build
```

## 🔗 Page Breadcrumbs

All pages now use consistent breadcrumb format:
- **Home:** "Heyykrish.AI // Home"
- **Resources:** "Heyykrish.AI // Resources"
- **Partnership:** "Heyykrish.AI // Partnership"
- **About:** "Heyykrish.AI // About"
- **Media Kit:** "Heyykrish.AI // Media Kit"

## 🌐 Deployment

### Deploy to Vercel
The easiest way to deploy is on [Vercel](https://vercel.com):

1. Push code to GitHub
2. Go to vercel.com and click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js
5. Click "Deploy"

**Custom Domain:**
1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain (heyykrish.ai)
3. Update DNS records (Vercel provides instructions)
4. SSL auto-provisioned

## 🔒 Security

✅ **Current Security Measures:**
- Security headers (X-Frame-Options, CSP prep)
- React auto-escaping (XSS protection)
- Email validation on all forms
- CSV-based data storage (no external dependencies)
- No hardcoded secrets
- Trusted content only (no user-generated HTML)

⚠️ **Before Production:**
- [ ] Set up rate limiting for API endpoints
- [ ] Add CSRF tokens if needed
- [ ] Implement email verification
- [ ] Consider GDPR compliance for EU users

See [SECURITY-AUDIT.md](./SECURITY-AUDIT.md) for full security report.

## 📚 Pages

### Homepage (`/`)
- Execution-focused hero: "Stop Learning AI. Start Deploying It."
- Typewriter effect with dynamic words
- Featured resources grid
- Newsletter signup

### Resources Hub (`/resources`)
- Searchable directory with category filters
- Command-line inspired search bar
- Responsive grid layout
- Newsletter CTA at bottom

### Resource Detail (`/resources/[slug]`)
- Rich content display
- Download modal for lead capture
- Related resources
- Social sharing

### About (`/about`)
- Creator biography and mission
- Agency story (K for Kreative)
- Newsletter signup CTA
- Direct contact info

### Brand Partnerships (`/brand-partnerships`)
- Partnership program info
- Past partners showcase with logo grid
- "View Media Kit" button
- Contact inquiry modal

### Media Kit (`/media-kit`) - *Hidden Page*
- 150K+ followers stat
- 5M+ monthly impressions
- Audience demographics
- Engagement metrics
- Direct access only (not in navigation)

## 🧪 Testing

```bash
# Build for production
npm run build

# Check for errors
npm run lint

# Test pages
# Homepage: http://localhost:3000
# Resources: http://localhost:3000/resources
# About: http://localhost:3000/about
# Partnerships: http://localhost:3000/brand-partnerships
# Media Kit: http://localhost:3000/media-kit
```

## 📖 Documentation

- [CLAUDE.md](./CLAUDE.md) - Detailed project guidelines & architecture
- [AGENTS.md](./AGENTS.md) - AI agent instructions
- [SECURITY-AUDIT.md](./SECURITY-AUDIT.md) - Security analysis
- [ENHANCEMENT-SUMMARY.md](./ENHANCEMENT-SUMMARY.md) - Recent updates

## 📱 Connect

- 📱 Instagram: [@heyykrish.ai](https://instagram.com/heyykrish)
- 🌐 Website: [heyykrish.ai](https://heyykrish.ai)
- 📧 Email: hello@heyykrish.ai

## 📜 License

This project is private. All rights reserved to Krish Chhatrala.

---

**Built with:** Next.js 16 • Tailwind CSS • TypeScript • Vercel  
**Last Updated:** April 4, 2026
