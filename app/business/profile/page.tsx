"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function BusinessProfilePage() {
  const supabase = createClient();
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    website: "",
    contact_email: "",
  });

  useEffect(() => {
    const load = async () => {
      const { data: user } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user?.user?.id)
        .single();
      if (data) setProfile(data);
    };
    load();
  }, []);

  const handleSave = async () => {
    const { data: user } = await supabase.auth.getUser();
    await supabase.from("businesses").upsert({
      user_id: user?.user?.id,
      ...profile,
    });
    alert("Saved!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Business Profile</h1>

      <Input
        placeholder="Business name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <Textarea
        placeholder="Description"
        value={profile.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setProfile({ ...profile, description: e.target.value })
        }
      />
      <Input
        placeholder="Website"
        value={profile.website}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProfile({ ...profile, website: e.target.value })
        }
      />
      <Input
        placeholder="Contact email"
        value={profile.contact_email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProfile({ ...profile, contact_email: e.target.value })
        }
      />

      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
