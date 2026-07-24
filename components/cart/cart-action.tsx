"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCartAction } from "@/hooks/use-cart-action.hook";
import { Minus, Plus, Trash2 } from "lucide-react";

type Props = {
  id: string;
  amount: number;
};

export default function CartAction({ id, amount: initialAmount }: Props) {
  const {
    amount,
    increaseAmount,
    decreaseAmount,
    inputChangeAmount,
    isPending,
    deleteItem,
  } = useCartAction({ id, initialAmount });

  return (
    <div className="flex gap-4">
      <ButtonGroup>
        <Button
          type="button"
          onClick={decreaseAmount}
          variant={"outline"}
          size={"icon"}
          disabled={isPending}>
          <Minus />
        </Button>

        <Input
          className="w-9 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          value={amount}
          disabled={isPending}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val)) inputChangeAmount(val);
          }}
        />

        <Button
          type="button"
          onClick={increaseAmount}
          variant={"outline"}
          size={"icon"}
          disabled={isPending}>
          <Plus />
        </Button>
      </ButtonGroup>

      <Button
        type="button"
        onClick={deleteItem}
        variant={"destructive"}
        size={"icon"}
        disabled={isPending}>
        {isPending ? <Spinner /> : <Trash2 />}
      </Button>
    </div>
  );
}
