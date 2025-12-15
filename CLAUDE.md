# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 marketing/landing page for ProAgent Me - a marketplace connecting experts with AI agent opportunities. The site collects waitlist signups via HubSpot forms and includes a blog powered by MDX.

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
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui (new-york style) in `components/ui/`
- **Forms**: react-hook-form + zod validation
- **Blog**: MDX with next-mdx-remote/rsc, content in `content/blog/`
- **Analytics**: Google Analytics 4 + Vercel Analytics
- **Form Backend**: HubSpot Forms API

### Key Directories
- `app/` - Next.js App Router pages
- `components/` - React components (UI primitives in `ui/`, page sections at root level)
- `lib/` - Utilities: `blog.ts` (MDX parsing), `hubspot.ts` (form submissions), `cookies/` (consent management), `gtag.ts` (GA4 events)
- `content/blog/` - MDX blog posts with gray-matter frontmatter
- `hooks/` - Custom React hooks (e.g., `use-utm-params.ts`)

### Path Aliases
`@/*` maps to project root (configured in tsconfig.json)

### Cookie Consent System
The app implements GDPR/CCPA cookie consent in `lib/cookies/` and `components/cookie-consent/`. Consent categories: essential (always on), analytics, advertising. These map to GA4 Consent Mode signals.

### Blog System
Blog posts are MDX files in `content/blog/` with frontmatter (title, description, date, author, tags). The `lib/blog.ts` module handles parsing with gray-matter and provides `getAllPosts()`, `getPostBySlug()`. Posts are rendered server-side using `compileMDX` from next-mdx-remote/rsc.

### Form Handling
Waitlist forms (`components/waitlist-form.tsx`) use:
- Zod schemas for validation
- react-hook-form for state management
- Google reCAPTCHA v3 for spam protection
- HubSpot Forms API for submission (via `lib/hubspot.ts`)
- UTM parameter tracking via `hooks/use-utm-params.ts`

### Environment Variables
Required for forms:
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
- `NEXT_PUBLIC_HUBSPOT_CREATOR_FORM_ID`
- `NEXT_PUBLIC_HUBSPOT_CLIENT_FORM_ID`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `NEXT_PUBLIC_GA_ID` (for GA4 tracking)
