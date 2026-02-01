import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Placeholder for your future Auth logic
  // You can check for a Firebase session cookie here later
  
  return NextResponse.next();
}

// CRITICAL: The matcher tells Next.js exactly which routes to watch.
// This prevents middleware from breaking your CSS/Image loading.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
