"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define types for better type safety
interface BusinessProfile {
  id: string;
  name: string;
  description?: string;
  website?: string;
  contact_email?: string;
  contact_number?: string;
  address?: string;
}

interface Masjid {
  id: string;
  name: string;
  address_label: string;
  ad_price?: number;
}

export default function NewAdPage() {
  const supabase = createClient();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    message: "",
    masjid_id: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [masjidSearch, setMasjidSearch] = useState("");
  const [masjidResults, setMasjidResults] = useState<Masjid[]>([]);
  const [loadingMasjids, setLoadingMasjids] = useState(false);
  const [hasSelectedMasjid, setHasSelectedMasjid] = useState(false);
  const [businessProfile, setBusinessProfile] =
    useState<BusinessProfile | null>(null);

  // --- Load business profile ---
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      const { data: user } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user?.user?.id)
        .single();

      if (data) {
        setBusinessProfile(data);
      }
    };

    fetchBusinessProfile();
  }, [supabase]);

  // --- Handle image preview ---
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  // --- Masjid search ---
  useEffect(() => {
    if (hasSelectedMasjid) return; // ✅ stop searching after selection

    const fetchMasjids = async () => {
      if (masjidSearch.trim().length < 2) {
        setMasjidResults([]);
        return;
      }

      setLoadingMasjids(true);

      try {
        const formattedSearch = masjidSearch.trim().replace(/\s+/g, "+");
        const { data, error } = await supabase.rpc("search_masjids", {
          search: formattedSearch,
        });
        if (error) throw error;

        const masjids = (data as Masjid[]) ?? [];

        const masjidIds = masjids.map((m) => m.id);
        const { data: adSettings } = await supabase
          .from("masjid_ads")
          .select("masjid_id, allow_ads, ad_price")
          .in("masjid_id", masjidIds)
          .eq("allow_ads", true);

        const allowedIds = adSettings?.map((a) => a.masjid_id) || [];
        const priceMap =
          adSettings?.reduce((acc, setting) => {
            acc[setting.masjid_id] = setting.ad_price;
            return acc;
          }, {} as Record<string, number>) || {};

        const filtered = masjids
          .filter((m) => allowedIds.includes(m.id))
          .map((m) => ({ ...m, ad_price: priceMap[m.id] }));

        setMasjidResults(filtered);
      } catch (err) {
        console.error("Error fetching masjids:", err);
      } finally {
        setLoadingMasjids(false);
      }
    };

    const debounce = setTimeout(fetchMasjids, 400);
    return () => clearTimeout(debounce);
  }, [masjidSearch, supabase, hasSelectedMasjid]);

  // --- Handle form submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: user } = await supabase.auth.getUser();
    const { data: business } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user?.user?.id)
      .single();

    let imageUrl: string | null = null;

    if (imageFile) {
      const filePath = `ads/${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("ad-images")
        .upload(filePath, imageFile);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from("ad-images")
          .getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      } else {
        console.error("Image upload failed:", uploadError);
      }
    }

    await supabase.from("ad_requests").insert({
      business_id: business?.id,
      masjid_id: form.masjid_id,
      title: form.title,
      message: form.message,
      image: imageUrl,
      status: "pending",
    });

    router.push("/");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create New Ad</h1>
        <p className="text-sm text-muted-foreground">
          Your business details, message, and image will appear on the selected
          masjid&apos;s display and app screens. Please note that ad details
          cannot be edited after submission. Once your ad is approved by the
          masjid, you will be notified via email to complete the payment. The ad
          will go live only after the payment is confirmed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Masjid Search */}
        <div className="relative space-y-1">
          <label className="text-sm font-medium text-foreground">
            Select Masjid
          </label>
          <Input
            placeholder="Search for masjid by name..."
            value={masjidSearch}
            onChange={(e) => {
              setHasSelectedMasjid(false); // ✅ re-enable searching if user types
              setMasjidSearch(e.target.value);
            }}
          />

          {loadingMasjids && (
            <p className="text-sm text-muted-foreground">Searching...</p>
          )}

          {!loadingMasjids && masjidResults.length > 0 && (
            <ul className="absolute z-50 mt-1 w-full border rounded-md bg-background shadow-md max-h-48 overflow-y-auto">
              {masjidResults.map((m) => (
                <li
                  key={m.id}
                  onClick={() => {
                    setForm({ ...form, masjid_id: m.id });
                    setMasjidSearch(m.name);
                    setMasjidResults([]);
                    setHasSelectedMasjid(true); // ✅ prevents re-search
                  }}
                  className="p-2 cursor-pointer hover:bg-muted"
                >
                  <p className="font-medium">{m.name}</p>
                  <div className="flex justify-between">
                    <p className="text-xs text-muted-foreground">
                      {m.address_label}
                    </p>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      ${(m.ad_price ? m.ad_price / 100 : 100).toFixed(2)}/month
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input
            placeholder="Enter a title for your ad..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            Message{" "}
            <span className="text-xs text-muted-foreground">
              (maximum 145 characters)
            </span>
          </label>
          <Textarea
            placeholder="Write your ad message..."
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            maxLength={145}
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            Upload Image
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
          />
          {imageFile && (
            <p className="text-sm text-muted-foreground">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!form.masjid_id || !form.message}
        >
          Submit Ad Request
        </Button>
      </form>

      {/* Ad Preview Section */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-medium">Ad Preview</h2>
        <p className="text-sm text-muted-foreground">
          This is how your ad will appear to users in the masjid&apos;s display
          screen.
        </p>

        <div className="border rounded-lg overflow-hidden bg-white text-black mt-4">
          <section className="relative w-full font-sans pb-6">
            {/* Header Section */}
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-start justify-between w-full px-6 py-4">
                {/* Business Info */}
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <p className="text-xl md:text-2xl font-bold leading-tight mb-2">
                    {businessProfile?.name ||
                      form.title ||
                      "Your Business Name"}{" "}
                    <span className="text-gray-500 text-xs">
                      (Sponsored Ad)
                    </span>
                  </p>

                  {/* Contact Details */}
                  <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                    {/* Row 1: Website + Phone */}
                    <div className="flex flex-wrap items-center gap-4">
                      {businessProfile?.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-theme" />
                          <span>{businessProfile.website}</span>
                        </div>
                      )}
                      {businessProfile?.contact_number && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-theme" />
                          <span>{businessProfile.contact_number}</span>
                        </div>
                      )}
                    </div>

                    {/* Row 2: Email + Address */}
                    <div className="flex flex-wrap items-center gap-4">
                      {businessProfile?.contact_email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-theme" />
                          <span>{businessProfile.contact_email}</span>
                        </div>
                      )}
                      {businessProfile?.address && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-theme" />
                          <span>{businessProfile.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ad Message */}
                <div className="w-full md:w-1/2 md:pl-4 md:text-right">
                  <p className="text-lg text-gray-500">
                    {form.message || "Your ad message will appear here..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Image Section */}
            {imagePreview ? (
              <div className="w-full px-6 mt-4">
                <div className="w-full rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  <Image
                    src={imagePreview}
                    alt={form.title || "Business Ad"}
                    className="w-full h-auto object-contain"
                    width={1200}
                    height={400}
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full px-6 mt-4">
                <div className="w-full h-[200px] rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">
                    Image preview will appear here
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
