"use client";

import { addToCartOrIncreaseAmount } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ShoppingCart } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function ButtonAddCart({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(async () => {
      const result = await addToCartOrIncreaseAmount({ productId });

      if (result.success) {
        toast.success(result.message, {
          description: (
            <p className="text-foreground/60">Product ID: {productId}</p>
          ),
          action: {
            label: "Check",
            onClick: () => redirect("/cart"),
          },
        });
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      type="button"
      variant={"default"}
      onClick={handleAction}
      disabled={isPending}>
      {isPending ? (
        <>
          Adding to cart <Spinner />
        </>
      ) : (
        <>
          Add to cart <ShoppingCart />
        </>
      )}
    </Button>
  );
}
