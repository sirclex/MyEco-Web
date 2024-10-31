import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/auth/login",
    "/api/auth/callback",
    "/api/auth/session",
  ];

  if (!token && !publicRoutes.includes(req.nextUrl.pathname)) {
    console.log(req.nextUrl.pathname)
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    return NextResponse.redirect(new URL(`/myeco/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
