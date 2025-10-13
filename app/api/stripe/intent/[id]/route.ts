import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_CONNECT_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(params.id);
    return NextResponse.json({ client_secret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Failed to retrieve PaymentIntent:", error);
    return NextResponse.json(
      { error: "Unable to retrieve client secret" },
      { status: 500 }
    );
  }
}
