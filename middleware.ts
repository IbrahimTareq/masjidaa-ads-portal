import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Refresh session cookies and get updated response
  const response = await updateSession(request);
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Only run middleware for business routes
  if (path.startsWith("/business")) {
    const accessToken = request.cookies.get("sb-auth-token")?.value;
    const isSetupPage = path.startsWith("/business/setup");

    // 🔒 Redirect unauthenticated users
    if (!accessToken && !path.startsWith("/auth") && !isSetupPage) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

// Apply to all app routes
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
