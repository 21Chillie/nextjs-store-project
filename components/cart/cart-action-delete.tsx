"use client";

import { deleteCartItem } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
};

export function BtnDeleteCartItem({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCartItem(id);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      size={"icon"}
      variant={"destructive"}>
      {isPending ? <Spinner /> : <Trash />}
    </Button>
  );
}
