import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function CartButton() {
  const numItemsInCart = 10;
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) return null;

  return (
    <div className="relative">
      <Button
        nativeButton={false}
        variant={"outline"}
        size={"icon-lg"}
        render={
          <Link href={"/cart"}>
            <ShoppingCart />
          </Link>
        }
      />

      <span className="bg-primary text-primary-foreground absolute -top-1 -right-2 rounded-full px-1 text-[11px] font-bold">
        {numItemsInCart}
      </span>
    </div>
  );
}
