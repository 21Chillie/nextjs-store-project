import CartContainer from "@/components/cart/cart-container";
import { Suspense } from "react";

export default function Cart() {
  return (
    // Add fallback
    <Suspense>
      <CartContainer />
    </Suspense>
  );
}
