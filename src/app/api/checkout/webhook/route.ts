import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    logger.error("Webhook signature verification failed", err as Error, { endpoint: "POST /api/checkout/webhook" });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const stripeSessionId = session.id as string;
      const paymentIntentId = session.payment_intent as string | null;

      await prisma.order.updateMany({
        where: { stripeSessionId },
        data: {
          status: "paid",
          stripePaymentIntentId: paymentIntentId ?? undefined,
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error("Error handling Stripe webhook", error as Error, { endpoint: "POST /api/checkout/webhook" });
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}


