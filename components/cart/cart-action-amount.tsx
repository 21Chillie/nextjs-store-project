"use client";

import { updateCartItem } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Minus, Plus } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
  amount: number;
};

export function BtnIncreaseAmount({ id, amount }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    startTransition(async () => {
      const result = await updateCartItem({ id, amount: amount + 1 });

      if (!result.success) {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      type="button"
      onClick={() => handleUpdate()}
      disabled={isPending}
      size={"icon"}
      variant={"outline"}>
      {isPending ? <Spinner /> : <Plus />}
    </Button>
  );
}

export function BtnDecreaseAmount({ id, amount }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    startTransition(async () => {
      const result = await updateCartItem({ id, amount: amount - 1 });

      if (result.success && result.message) {
        toast.success(result.message);
      } else if (!result.success && result.message) {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      type="button"
      onClick={() => handleUpdate()}
      disabled={isPending}
      size={"icon"}
      variant={"outline"}>
      {isPending ? <Spinner /> : <Minus />}
    </Button>
  );
}
