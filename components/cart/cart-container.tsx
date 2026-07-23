import { getUserCart } from "@/actions/cart";
import SectionTitle from "@/components/global/section-title";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import CartList from "./cart-list";
import CartTotal from "./cart-total";

export default async function CartContainer() {
  const { userId } = await auth.protect();
  const userCart = await getUserCart(userId);

  if (!userCart || userCart.cartItems.length === 0) {
    return (
      <section className="space-y-6">
        <SectionTitle title="My Carts" />
        <p className="text-muted-foreground">
          Your cart is empty, please{" "}
          <Link
            className="hover:text-foreground underline transition-colors"
            href={"/products"}>
            explore
          </Link>{" "}
          more products.
        </p>
      </section>
    );
  }

  const { cartTotal, shipping, tax, orderTotal, cartItems } = userCart;

  return (
    <section className="space-y-6">
      <SectionTitle title="My Carts" />

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <CartList carts={cartItems} />
        </div>

        <div className="md:col-span-4">
          <CartTotal
            cartTotal={cartTotal}
            shipping={shipping}
            tax={tax}
            orderTotal={orderTotal}
          />
        </div>
      </div>
    </section>
  );
}
