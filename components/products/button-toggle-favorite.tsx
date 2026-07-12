import { getFavoriteDataById } from "@/actions/favorites";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Heart } from "lucide-react";
import ButtonFavorite from "@/components/global/button-favorite";

export default async function ButtonToggleFavorite({
  productId,
}: {
  productId: string;
}) {
  const { userId } = await auth();
  const isFavorite = await getFavoriteDataById({ productId });

  if (userId) {
    return (
      <ButtonFavorite
        isFavorite={isFavorite}
        productId={productId}
      />
    );
  } else {
    return (
      <SignInButton mode="modal">
        <Button
          type="button"
          className={"cursor-pointer"}
          variant="secondary"
          size="icon">
          <Heart className={`stroke-destructive`} />
        </Button>
      </SignInButton>
    );
  }
}
