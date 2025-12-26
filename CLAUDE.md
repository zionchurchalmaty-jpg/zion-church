# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zion Church (Церковь Сион) website - a Russian-language church website for a Presbyterian church in Almaty, Kazakhstan. Internationalization infrastructure is in place for future multi-language support.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router and React 19
- **Styling**: Tailwind CSS v4 with CSS variables (orange/navy color scheme)
- **UI Components**: shadcn/ui (new-york style) in `components/ui/`
- **Fonts**: Cormorant Garamond (serif headings) + Inter (sans-serif body)
- **Blog**: MDX with next-mdx-remote/rsc, content in `content/blog/`
- **Analytics**: Google Analytics 4 + Vercel Analytics

### Key Directories
- `app/` - Next.js App Router pages (main page is single-file church landing page)
- `components/` - React components (UI primitives in `ui/`)
- `lib/` - Utilities: `blog.ts` (MDX parsing), `gtag.ts` (GA4 events), `cookies/` (consent)
- `content/blog/` - MDX blog posts with gray-matter frontmatter
- `public/` - Static assets including church logo and images

### Path Aliases
`@/*` maps to project root (configured in tsconfig.json)

### Color System (CSS Variables in globals.css)
- Primary: Orange (`--primary-orange: 234 88 11`)
- Secondary: Navy (`--secondary-navy: 30 58 95`)
- Background: Warm cream tones
- Utility classes: `.text-primary-orange`, `.text-navy`, `.bg-navy`, `.bg-cream`

### Cookie Consent System
GDPR/CCPA cookie consent in `lib/cookies/` and `components/cookie-consent/`. Consent categories: essential, analytics, advertising. Maps to GA4 Consent Mode.

### Blog System
Blog posts are MDX files in `content/blog/` with frontmatter (title, description, date, author, tags). The `lib/blog.ts` module handles parsing with gray-matter and provides `getAllPosts()`, `getPostBySlug()`.

### Environment Variables
- `NEXT_PUBLIC_GA_ID` (for GA4 tracking)
