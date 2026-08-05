"use client";

import { Card, CardContent } from "@/components/ui/card";
import { fetchStripeClientSecret } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function OrderCheckout() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  const fetchClientSecret = async () =>
    await fetchStripeClientSecret({
      orderId: orderId ?? "",
      email: user?.primaryEmailAddress?.emailAddress,
    });

  // Prevent fetchClientSecret from running while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="text-muted-foreground flex animate-pulse items-center justify-center p-12 text-sm">
        Preparing checkout...
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="text-destructive p-6 text-center">
        Invalid order ID. Please return to your orders page.
      </div>
    );
  }

  return (
    <section id="section-checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}>
        <Card>
          <CardContent>
            <EmbeddedCheckout />
          </CardContent>
        </Card>
      </EmbeddedCheckoutProvider>
    </section>
  );
}
