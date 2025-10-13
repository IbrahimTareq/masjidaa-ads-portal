"use client";

import { Button } from "@/components/ui/button";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_CONNECT_PUBLIC_KEY!
);

export default function StripePayment({
  clientSecret,
}: {
  clientSecret: string;
}) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm clientSecret={clientSecret} />
    </Elements>
  );
}

function PaymentForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      setError(error.message ?? "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      setSuccess(true);
      router.push(`/`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="border rounded-md p-3 bg-white">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontFamily: "'Montserrat', 'system-ui', 'sans-serif'",
                fontSize: "16px",
                fontWeight: "400",
                fontSmoothing: "antialiased",
                color: "#000",
                "::placeholder": { color: "#9ca3af" },
              },
              invalid: { color: "#ef4444" },
            },
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading || success} className="w-full">
        {success
          ? "Payment Successful 🎉"
          : loading
          ? "Processing..."
          : "Pay Now"}
      </Button>
    </form>
  );
}
