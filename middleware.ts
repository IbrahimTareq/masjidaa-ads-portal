// middleware.ts
import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function middleware(request: NextRequest) {
  // Let Supabase refresh or validate the user's session
  const response = await updateSession(request);

  const url = request.nextUrl.clone();
  const path = url.pathname;

  // ---- STEP 1: Read Supabase session from request cookies ----
  // Supabase sets its own auth cookie automatically:
  // sb-[PROJECT_REF]-auth-token
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const hasSession = data?.claims !== null;

  // ---- STEP 2: If user is authenticated, block /auth/* ----
  if (path.startsWith("/auth")) {
    if (hasSession) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // ---- STEP 3: If user is NOT authenticated, redirect to /auth/login ----
  if (!hasSession) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // ---- STEP 4: Otherwise, continue normally ----
  return response;
}

export const config = {
  matcher: [
    // Apply to all routes except static assets and APIs
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};