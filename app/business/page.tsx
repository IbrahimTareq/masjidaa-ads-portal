import { createClient } from "@/lib/supabase/server";
import { HeartPlus, Repeat } from "lucide-react";
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

  // ✅ Pull related masjid data
  const { data: ads, error: adsError } = await supabase
    .from("ad_requests")
    .select(
      `
      id,
      title,
      status,
      created_at,
      masjid:masjid_id (id, name)
    `
    )
    .eq("business_id", business?.id)
    .order("created_at", { ascending: false });

  if (adsError) console.error("Ads fetch error:", adsError);

  return (
    <div className="w-full p-6 space-y-10">
      <header>
        <h1 className="text-2xl font-semibold text-theme">{business?.name}</h1>
        <p className="text-sm text-muted-foreground">
          You can view and manage your ads here. For any questions or concerns,
          please reach out to us at&nbsp;
          <a
            href="mailto:support@masjidaa.com"
            className="text-theme hover:text-theme-gradient"
          >
            support@masjidaa.com
          </a>
          .
        </p>
      </header>

      <div className="flex flex-wrap justify-between items-end">
        <div className="flex flex-wrap gap-16">
          <div className="flex flex-col">
            <div className="flex items-end gap-3">
              <HeartPlus className="h-6 w-6 text-theme mb-2" />
              <p className="text-7xl font-semibold text-theme-gradient leading-none">
                {ads?.filter((ad) => ad.status === "pending").length}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Pending Ads</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-end gap-3">
              <Repeat className="h-6 w-6 text-theme mb-2" />
              <p className="text-7xl font-semibold text-theme-gradient leading-none">
                {ads?.filter((ad) => ad.status === "approved").length}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Active Ads</p>
          </div>
        </div>

        {/* Right side button */}
        <div>
          <div>
            <Link
              href="/business/profile"
              className="px-4 py-2 bg-theme text-white rounded-md"
            >
              Business Profile
            </Link>
          </div>
          <div>
            <Link
              href="/business/ads/new"
              className="px-4 py-2 bg-theme text-white rounded-md"
            >
              + New Ad
            </Link>
          </div>
        </div>
      </div>

      <div className="border rounded-lg divide-y mt-8">
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
                  <p className="font-medium">{ad.title}</p>

                  {/* ✅ Status + Created date */}
                  <p className="text-sm text-muted-foreground">
                    Masjid: {ad.masjid?.name ?? "Unknown masjid"} • Status:{" "}
                    <span
                      className={
                        ad.status === "pending"
                          ? "text-orange-500 font-medium"
                          : ad.status === "approved"
                          ? "text-green-600 font-medium"
                          : ad.status === "rejected"
                          ? "text-red-500 font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {ad.status}
                    </span>{" "}
                    • Date Submitted:{" "}
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
