"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewAdPage() {
  const supabase = createClient();
  const router = useRouter();

  const [form, setForm] = useState({
    message: "",
    masjid_id: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [masjidSearch, setMasjidSearch] = useState("");
  const [masjidResults, setMasjidResults] = useState<any[]>([]);
  const [loadingMasjids, setLoadingMasjids] = useState(false);
  const [hasSelectedMasjid, setHasSelectedMasjid] = useState(false);

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

        const masjids = data ?? [];

        const masjidIds = masjids.map((m) => m.id);
        const { data: adSettings } = await supabase
          .from("masjid_ads")
          .select("masjid_id, allow_ads")
          .in("masjid_id", masjidIds)
          .eq("allow_ads", true);

        const allowedIds = adSettings?.map((a) => a.masjid_id) || [];
        const filtered = masjids.filter((m) => allowedIds.includes(m.id));

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

    const temp = await supabase.from("ad_requests").insert({
      business_id: business?.id,
      masjid_id: form.masjid_id,
      message: form.message,
      image: imageUrl,
      status: "pending",
    });

    console.log('temp:', temp);

    router.push("/business");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create New Ad</h1>

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
                  <p className="text-xs text-muted-foreground">
                    {m.address_label}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">
            Message
          </label>
          <Textarea
            placeholder="Write your ad message..."
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
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
    </div>
  );
}
