import OrderCheckout from "@/components/order/order-checkout";
import { Suspense } from "react";

export default async function CheckoutPage() {
  return (
    <Suspense>
      <OrderCheckout />
    </Suspense>
  );
}
