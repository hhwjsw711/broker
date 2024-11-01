import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "zh"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

const isSignInPage = createRouteMatcher(["/signin", "/:locale/signin"]);
const isProtectedRoute = createRouteMatcher(["/overview(.*)", "/:locale/overview(.*)"]);

export default convexAuthNextjsMiddleware(
  (request: NextRequest, { convexAuth }) => {
    const i18nResponse = I18nMiddleware(request);

    if (isSignInPage(request) && convexAuth.isAuthenticated()) {
      return nextjsMiddlewareRedirect(request, `/overview`);
    }
    if (isProtectedRoute(request) && !convexAuth.isAuthenticated()) {
      return nextjsMiddlewareRedirect(request, `/signin`);
    }

    return i18nResponse;
  },
);

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
