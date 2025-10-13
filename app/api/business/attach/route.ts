import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const supabaseAdmin = await createClient();

  try {
    const { user_id, business_id } = (await req.json()) as {
      user_id: string;
      business_id: string;
    };
    
    if (!user_id || !business_id) {
      return NextResponse.json(
        { error: "Missing user_id or business_id" },
        { status: 400 }
      );
    }

    const {
      data: { user },
    } = await supabaseAdmin.auth.admin.getUserById(user_id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const currentAppMeta = user.app_metadata || {};
    await supabaseAdmin.auth.admin.updateUserById(user_id, {
      app_metadata: { ...currentAppMeta, business_id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Attach business error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
