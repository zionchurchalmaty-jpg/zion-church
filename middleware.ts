import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Valid route patterns (without locale prefix)
const validRoutes = [
  /^\/$/, // Homepage
  /^\/blog(\/.*)?$/, // Blog pages
  /^\/songs(\/.*)?$/, // Songs pages
  /^\/legal(\/.*)?$/, // Legal pages
  /^\/about(\/.*)?$/, // About pages
  /^\/ru$/, // Russian homepage
  /^\/ru\/blog(\/.*)?$/, // Russian blog
  /^\/ru\/songs(\/.*)?$/, // Russian songs
  /^\/ru\/legal(\/.*)?$/, // Russian legal
  /^\/ru\/about(\/.*)?$/, // Russian about
];

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if path matches any valid route
  const isValidRoute = validRoutes.some((pattern) => pattern.test(pathname));

  if (!isValidRoute) {
    // Redirect to homepage
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Pass to next-intl middleware for valid routes
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except:
  // - API routes (/api/*)
  // - Static files (_next, _vercel, assets with extensions)
  // - Admin section (keep English-only)
  // - Login page (keep English-only)
  matcher: ["/((?!api|_next|_vercel|admin|login|.*\\..*).*)", "/"],
};
