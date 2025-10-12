import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function BusinessDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: business } = await supabase
    .from("businesses")
    .select("id, name")
    .eq("user_id", user?.id)
    .maybeSingle();

  console.log("business:", business);

  // ✅ Pull related masjid data
  const { data: ads, error: adsError } = await supabase
    .from("ad_requests")
    .select(
      `
      id,
      status,
      created_at,
      masjid:masjid_id (id, name)
    `
    )
    .eq("business_id", business?.id)
    .order("created_at", { ascending: false });

  if (adsError) console.error("Ads fetch error:", adsError);
  console.log("ads:", ads);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{business?.name}</h1>
        <p className="text-sm text-muted-foreground">
          Manage your ads and profile
        </p>
      </header>

      <div className="flex justify-end">
        <Link
          href="/business/ads/new"
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          + New Ad
        </Link>
      </div>

      <div className="border rounded-lg divide-y">
        {ads?.length ? (
          ads.map((ad) => (
            <Link
              key={ad.id}
              href={`/business/ads/${ad.id}`}
              className="block p-4 hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  {/* ✅ Masjid name */}
                  <p className="font-medium">{ad.masjid?.name ?? "Unknown masjid"}</p>

                  {/* ✅ Status + Created date */}
                  <p className="text-sm text-muted-foreground">
                    Status: {ad.status} •{" "}
                    {new Date(ad.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="p-4 text-sm text-muted-foreground">
            No ads yet. Create your first one!
          </p>
        )}
      </div>
    </div>
  );
}
