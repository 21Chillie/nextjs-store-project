import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share } from "lucide-react";
import SocialShareLink from "./social-share-link";

export default function ShareButton({ productId }: { productId: string }) {
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/products/${productId}`;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            className={"cursor-pointer"}
            variant={"secondary"}
            size={"icon"}>
            <Share />
          </Button>
        }
      />

      <PopoverContent
        align="center"
        className={"w-fit p-2"}>
        <div>
          <SocialShareLink
            url={url}
            message={"Thought you might like this: "}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
