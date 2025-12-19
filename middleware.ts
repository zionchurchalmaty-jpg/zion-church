import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  // - API routes (/api/*)
  // - Static files (_next, _vercel, assets with extensions)
  // - Admin section (keep English-only)
  // - Login page (keep English-only)
  matcher: ["/((?!api|_next|_vercel|admin|login|.*\\..*).*)", "/"],
};
