import { createClient } from "@/lib/supabase/server";
import { CheckCheck, ClockFading, Hash, Plus, Settings } from "lucide-react";
import Link from "next/link";

type AdRequest = {
  id: string;
  title: string;
  status: string;
  created_at: string;
  expires_at: string;
  masjid: { id: string; name: string } | null;
};

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
      expires_at,
      masjid:masjid_id (id, name)
    `
    )
    .eq("business_id", business?.id)
    .order("created_at", { ascending: false });

  if (adsError) console.error("Ads fetch error:", adsError);

  // ✅ Normalize Supabase relation (can sometimes return an array)
  const normalizedAds = ads?.map((ad) => ({
    ...ad,
    masjid: Array.isArray(ad.masjid) ? ad.masjid[0] ?? null : ad.masjid,
  })) as AdRequest[];

  return (
    <div className="w-full p-6">
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

      <div className="flex flex-wrap justify-between items-end my-8">
        <div className="flex flex-wrap gap-16">
          <div className="flex flex-col">
            <div className="flex items-end gap-3">
              <Hash className="h-6 w-6 text-theme mb-2" />
              <p className="text-7xl font-semibold text-theme-gradient leading-none">
                {normalizedAds?.length ?? 0}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Total Ads</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-end gap-3">
              <ClockFading className="h-6 w-6 text-theme mb-2" />
              <p className="text-7xl font-semibold text-theme-gradient leading-none">
                {normalizedAds?.filter((ad) => ad.status === "pending")
                  .length ?? 0}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Pending Ads</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-end gap-3">
              <CheckCheck className="h-6 w-6 text-theme mb-2" />
              <p className="text-7xl font-semibold text-theme-gradient leading-none">
                {normalizedAds?.filter((ad) => ad.status === "live")
                  .length ?? 0}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Active Ads</p>
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex space-x-4">
          <Link
            href="/profile"
            className="flex items-center justify-center px-4 py-2 bg-theme text-white rounded-md"
          >
            <Settings className="w-4 h-4 mr-2" />
            Update Business Profile
          </Link>

          <Link
            href="/ads/new"
            className="flex items-center justify-center px-4 py-2 bg-theme text-white rounded-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Ad
          </Link>
        </div>
      </div>

      <div className="border-b border-b-foreground/10" />

      <div className="mt-6">
        <h2 className="text-lg font-medium">Your Ads</h2>
        <div className="border rounded-lg divide-y mt-4">
          {normalizedAds?.length ? (
            normalizedAds.map((ad: AdRequest) => (
              <Link
                key={ad.id}
                href={`/ads/${ad.id}`}
                className="block p-4 hover:bg-muted/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{ad.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Masjid: {ad.masjid?.name ?? "Unknown masjid"} • Status:{" "}
                      <span
                        className={
                          ad.status === "pending"
                            ? "text-orange-500 font-medium"
                            : ad.status === "approved" || ad.status === "live"
                            ? "text-green-600 font-medium"
                            : ad.status === "rejected" ||
                              ad.status === "payment_failed"
                            ? "text-red-500 font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {ad.status === "payment_failed"
                          ? "Payment Failed"
                          : ad.status === "live"
                          ? "Live"
                          : ad.status === "approved"
                          ? "Approved"
                          : ad.status === "rejected"
                          ? "Rejected"
                          : ad.status === "expired"
                          ? "Expired"
                          : ad.status === "pending"
                          ? "Pending"
                          : ad.status}
                      </span>
                      &nbsp; • Date Submitted:&nbsp;
                      {new Date(ad.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                      {ad.status === "approved" || ad.status === "live" && (
                        <>
                          &nbsp; • Date Expires:&nbsp;
                          {new Date(ad.expires_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })}
                        </>
                      )}
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
    </div>
  );
}
