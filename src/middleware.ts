import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect from old /offers format to new /fixtures format
  if (pathname.startsWith("/offers")) {
    if (pathname === "/offers") {
      // Redirect /offers to /fixtures
      return NextResponse.redirect(new URL("/fixtures", request.url));
    } else if (pathname.startsWith("/offers/")) {
      const slug = pathname.replace("/offers/", "");

      // If it's a valid slug (not empty and doesn't contain slashes)
      if (slug && !slug.includes("/")) {
        // For now, redirect to fixtures page since we don't have slug-to-ID mapping
        // In the future, we could implement a slug-to-ID lookup service
        return NextResponse.redirect(new URL("/fixtures", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
