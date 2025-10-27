"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BusinessSetupPage() {
  const supabase = createClient();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    website: "",
    contact_phone: "",
    contact_email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: user } = await supabase.auth.getUser();

    const { data: business, error } = await supabase
      .from("businesses")
      .insert({
        user_id: user?.user?.id,
        name: form.name,
        description: form.description,
        address: form.address,
        website: form.website,
        contact_phone: form.contact_phone,
        contact_email: form.contact_email,
      })
      .select("id")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    await fetch("/api/business/attach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user?.user?.id,
        business_id: business.id,
      }),
    });

    router.push("/");
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create Your Business Profile</h1>
      <p className="text-sm text-muted-foreground">
        Tell us about your business to start advertising on Masjidaa.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Business name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <Input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <Input
          placeholder="Website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
        <Input
          placeholder="Contact phone"
          value={form.contact_phone}
          onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
        />
        <Input
          placeholder="Contact email"
          type="email"
          value={form.contact_email}
          onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
          required
        />
        <Button type="submit" className="w-full">
          Save & Continue
        </Button>
      </form>
    </div>
  );
}
