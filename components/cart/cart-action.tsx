import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { BtnDecreaseAmount, BtnIncreaseAmount } from "./cart-action-amount";
import { BtnDeleteCartItem } from "./cart-action-delete";

type Props = {
  id: string;
  amount: number;
};

export default function CartAction({ id, amount }: Props) {
  return (
    <div className="flex gap-4">
      <ButtonGroup>
        <BtnIncreaseAmount
          id={id}
          amount={amount}
        />

        <Input
          className="w-9 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          value={amount}
          readOnly
        />

        <BtnDecreaseAmount
          id={id}
          amount={amount}
        />
      </ButtonGroup>

      <BtnDeleteCartItem id={id} />
    </div>
  );
}
