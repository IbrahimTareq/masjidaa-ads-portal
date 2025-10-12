import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function AdDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data: ad } = await supabase
    .from("ad_requests")
    .select("*, masjids(name)")
    .eq("id", params.id)
    .single();

  if (!ad) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{ad.title}</h1>
        <p className="text-sm text-muted-foreground">
          Status: {ad.status.toUpperCase()}
        </p>
      </header>

      <p>{ad.message}</p>

      {ad.status === "approved" && (
        <div className="border-t pt-4">
          <h2 className="text-lg font-medium mb-2">Complete Payment</h2>
          {/* Stripe Elements form goes here */}
          <div>Stripe payment goes here</div>
        </div>
      )}
    </div>
  );
}
