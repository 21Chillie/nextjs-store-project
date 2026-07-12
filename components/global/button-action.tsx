"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function ButtonAddCart({ productId }: { productId: string }) {
  return (
    <Button
      variant={"default"}
      onClick={() => {
        toast("Product has been added to cart", {
          description: (
            <p className="text-foreground/60">Product ID: {productId}</p>
          ),
          action: {
            label: "Check",
            onClick: () => redirect("/cart"),
          },
        });
      }}>
      Add to cart <ShoppingCart />
    </Button>
  );
}
