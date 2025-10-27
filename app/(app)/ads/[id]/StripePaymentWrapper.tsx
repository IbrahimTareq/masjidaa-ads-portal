"use client";

import { useEffect, useState } from "react";
import StripePayment from "./StripePayment";

export default function StripePaymentWrapper({
  paymentIntentId,
}: {
  paymentIntentId: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClientSecret() {
      try {
        console.log("Fetching client secret for payment intent:", paymentIntentId);
        const res = await fetch(`/api/stripe/intent/${paymentIntentId}`);
        console.log("Response status:", res.status);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("Failed to fetch client secret:", errorData);
          throw new Error("Failed to fetch client secret");
        }
        const data = await res.json() as { client_secret: string };
        console.log("Client secret fetched successfully");
        setClientSecret(data.client_secret);
      } catch (error: unknown) {
        console.error("Error fetching client secret:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClientSecret();
  }, [paymentIntentId]);

  if (loading) return <p>Loading payment form...</p>;
  if (!clientSecret)
    return (
      <p className="text-red-500 text-sm">
        Unable to load payment form. Please contact support.
      </p>
    );

  return <StripePayment clientSecret={clientSecret} />;
}
