import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Globe, Phone, Mail, MapPin } from "lucide-react";

export default async function AdDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const supabase = await createClient();
  const { data: ad } = await supabase
    .from("ad_requests")
    .select("*, masjids(name), businesses(*)")
    .eq("id", id)
    .single();

  if (!ad) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Ad Details</h1>
        <p className="text-sm text-muted-foreground">
          View the full details of your ad request below.
        </p>
      </header>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="text-sm text-muted-foreground">Title</label>
          <div className="mt-1 px-3 py-2 border rounded-md bg-muted/30">
            {ad.title}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-muted-foreground">Message</label>
          <div className="mt-1 px-3 py-2 border rounded-md bg-muted/30 whitespace-pre-wrap">
            {ad.message}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm text-muted-foreground">Status</label>
          <div
            className={`mt-1 px-3 py-2 border rounded-md uppercase font-medium ${
              ad.status === "pending"
                ? "bg-orange-100 text-orange-600 border-orange-200"
                : ad.status === "approved"
                ? "bg-green-100 text-green-700 border-green-200"
                : ad.status === "rejected"
                ? "bg-red-100 text-red-600 border-red-200"
                : "bg-muted/30 text-muted-foreground border-muted"
            }`}
          >
            {ad.status}
          </div>
        </div>

        {ad.rejected_reason && (
          <div>
            <label className="text-sm text-muted-foreground">Rejected Reason</label>
            <div className="mt-1 px-3 py-2 border rounded-md bg-muted/30">
              {ad.rejected_reason}
            </div>
          </div>
        )}

        {/* Masjid */}
        <div>
          <label className="text-sm text-muted-foreground">Masjid</label>
          <div className="mt-1 px-3 py-2 border rounded-md bg-muted/30">
            {ad.masjids?.name || "N/A"}
          </div>
        </div>
      </div>

      {ad.status === "approved" && (
        <div className="border-t pt-6 space-y-2">
          <h2 className="text-lg font-medium">Complete Payment</h2>
          <div className="px-3 py-4 border rounded-md bg-muted/20 text-sm text-muted-foreground">
            Stripe payment goes here
          </div>
        </div>
      )}

      {/* Ad Preview Section */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-medium">Ad Preview</h2>
        <p className="text-sm text-muted-foreground">
          This is how your ad will appear to users in the masjid&apos;s display screen.
        </p>
        
        <div className="border rounded-lg overflow-hidden bg-white text-black mt-4">
          <section className="relative w-full font-sans py-6">
            {/* Header Section */}
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-start justify-between w-full px-6 py-4">
                {/* Business Info */}
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <p className="text-xl md:text-2xl font-bold leading-tight mb-2">
                    {ad.businesses?.name || ad.title}{" "}
                    <span className="text-gray-500 text-xs">(Sponsored Ad)</span>
                  </p>

                  {/* Contact Details */}
                  <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                    {/* Row 1: Website + Phone */}
                    <div className="flex flex-wrap items-center gap-4">
                      {ad.businesses?.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-theme" />
                          <span>{ad.businesses.website}</span>
                        </div>
                      )}
                      {ad.businesses?.contact_number && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-theme" />
                          <span>{ad.businesses.contact_number}</span>
                        </div>
                      )}
                    </div>

                    {/* Row 2: Email + Address */}
                    <div className="flex flex-wrap items-center gap-4">
                      {ad.businesses?.contact_email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-theme" />
                          <span>{ad.businesses.contact_email}</span>
                        </div>
                      )}
                      {ad.businesses?.address && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-theme" />
                          <span>{ad.businesses.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ad Message */}
                <div className="w-full md:w-1/2 md:pl-4 md:text-right">
                  <p className="text-lg text-gray-500">{ad.message}</p>
                </div>
              </div>
            </div>

            {/* Image Section */}
            {ad.image && (
              <div className="w-full px-6 mt-4">
                <div className="w-full rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  <Image
                    src={ad.image}
                    alt={ad.title || "Business Ad"}
                    className="w-full h-auto object-contain"
                    width={1200}
                    height={400}
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                  />
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
