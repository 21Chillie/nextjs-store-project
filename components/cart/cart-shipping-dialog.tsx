import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CartShippingForm from "./cart-shipping-form";

export default function CartShippingFormDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            className={"w-full cursor-pointer"}
            type="button"
            variant={"default"}>
            Create Order
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"font-bold"}>Shipping Info</DialogTitle>
          <DialogDescription>
            Please enter your shipping information.
          </DialogDescription>
        </DialogHeader>

        <CartShippingForm />
      </DialogContent>
    </Dialog>
  );
}
