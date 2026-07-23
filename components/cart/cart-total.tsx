import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

type Props = {
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};

export default function CartTotal({
  cartTotal,
  shipping,
  tax,
  orderTotal,
}: Props) {
  return (
    <Card
      size="sm"
      className="w-full">
      <CardContent>
        <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
          <dl className="flex items-center justify-between">
            <dt>Subtotal</dt>
            <dd className="text-muted-foreground">
              {formatCurrency(cartTotal)}
            </dd>
          </dl>

          <Separator />

          <dl className="flex items-center justify-between">
            <dt>Shipping</dt>
            <dd className="text-muted-foreground">
              {formatCurrency(shipping)}
            </dd>
          </dl>

          <Separator />

          <dl className="flex items-center justify-between">
            <dt>Tax</dt>
            <dd className="text-muted-foreground">{formatCurrency(tax)}</dd>
          </dl>

          <Separator />

          <dl className="flex items-center justify-between">
            <dt className="font-bold">Total</dt>
            <dd className="text-muted-foreground font-bold">
              {formatCurrency(orderTotal)}
            </dd>
          </dl>
        </div>
      </CardContent>

      <CardFooter className="border-t">
        <Button className={"block w-full"}>Checkout Order</Button>
      </CardFooter>
    </Card>
  );
}
