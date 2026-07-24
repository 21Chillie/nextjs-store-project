import CartContainer from "@/components/cart/cart-container";
import CartContainerSkeleton from "@/components/cart/cart-container-skeleton";
import { Suspense } from "react";

export default function Cart() {
  return (
    <Suspense fallback={<CartContainerSkeleton />}>
      <CartContainer />
    </Suspense>
  );
}
