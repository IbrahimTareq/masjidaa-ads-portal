import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_CONNECT_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
  httpClient: Stripe.createFetchHttpClient() // Required for Cloudflare Workers (https://github.com/stripe/stripe-node/issues/650#issuecomment-2324744424)
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    return NextResponse.json({ client_secret: paymentIntent.client_secret });
  } catch (error: unknown) {
    console.error("Failed to retrieve PaymentIntent:", error);
    return NextResponse.json(
      { error: "Unable to retrieve client secret" },
      { status: 500 }
    );
  }
}
