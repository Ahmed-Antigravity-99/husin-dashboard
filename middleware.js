import { NextResponse } from "next/server";

export function middleware(request) {
  // Example: simple auth redirect placeholder
  const url = request.nextUrl.clone();
  // If you have auth logic, check cookies or headers here
  // Example: block access to /admin if not authenticated (placeholder)
  // if (url.pathname.startsWith("/admin") && !request.cookies.get("token")) {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }
  return NextResponse.next();
}
