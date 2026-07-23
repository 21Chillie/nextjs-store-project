import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReviewForm from "./review-form";

type Props = {
  productId: string;
};

export default function ReviewInput({ productId }: Props) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            className={"cursor-pointer"}
            type="button"
            variant={"outline"}>
            Add review
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"font-bold"}>Add your review</DialogTitle>
        </DialogHeader>

        <ReviewForm productId={productId} />
      </DialogContent>
    </Dialog>
  );
}
