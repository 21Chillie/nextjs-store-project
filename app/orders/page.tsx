import OrderContainer from "@/components/order/order-container";
import { Suspense } from "react";

export default function Orders() {
  return (
    // TODO: Add fallback later
    <Suspense>
      <OrderContainer />
    </Suspense>
  );
}
