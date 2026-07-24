import { deleteCartItem, updateCartItem } from "@/actions/cart";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

type HookOptions = {
  id: string;
  initialAmount: number;
};

export function useCartAction({ id, initialAmount }: HookOptions) {
  const [amount, setAmount] = useState(initialAmount);
  const [isPending, startTransition] = useTransition();

  // Sync amount from server on initial load
  useEffect(() => {
    (function syncAmountFromServer() {
      setAmount(initialAmount);
    })();
  }, [initialAmount]);

  const debouncedSync = useDebouncedCallback(async (nextAmount: number) => {
    const result = await updateCartItem({ id, amount: nextAmount });

    if (result.success && result.message) {
      toast.success(result.message);
    } else if (!result.success && result.message) {
      setAmount(initialAmount);
      toast.error(result.message);
    }
  }, 900);

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    debouncedSync(newAmount);
  };

  const handleDelete = () => {
    startTransition(async () => {
      debouncedSync.cancel();
      const result = await deleteCartItem(id);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return {
    amount,
    increaseAmount: () => handleAmountChange(amount + 1),
    decreaseAmount: () => handleAmountChange(amount - 1),
    inputChangeAmount: (newAmount: number) => handleAmountChange(newAmount),
    deleteItem: () => handleDelete(),
    isPending,
  };
}
