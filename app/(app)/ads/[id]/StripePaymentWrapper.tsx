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
        const res = await fetch(`/api/stripe/intent/${paymentIntentId}`);
        if (!res.ok) throw new Error("Failed to fetch client secret");
        const data = await res.json();
        setClientSecret(data.client_secret);
      } catch (error) {
        console.error(error);
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
