"use client";

import { toggleFavorite } from "@/actions/favorites";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ButtonFavorite({
  isFavorite,
  productId,
}: {
  isFavorite: boolean;
  productId: string;
}) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleAction = async () => {
    startTransition(async () => {
      const res = await toggleFavorite({ productId, pathName: pathname });

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <form action={handleAction}>
      <Button
        type="submit"
        className={"cursor-pointer"}
        variant="secondary"
        size="icon"
        disabled={isPending}>
        {isPending ? (
          <Spinner />
        ) : (
          <Heart
            className={`${isFavorite ? "fill-destructive stroke-destructive" : "stroke-destructive"}`}
          />
        )}
      </Button>
    </form>
  );
}
