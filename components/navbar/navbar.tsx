import Container from "@/components/global/container";
import CartButton from "@/components/navbar/cart-button";
import DropdownLinks from "@/components/navbar/dropdown-links";
import NavLogo from "@/components/navbar/nav-logo";
import NavSearch from "@/components/navbar/nav-search";
import { Button } from "@/components/ui/button";
import { TextAlignEnd } from "lucide-react";
import { Suspense } from "react";

export default function Navbar() {
  return (
    <nav className="shadow-md">
      <Container className="flex items-center justify-between py-6">
        <NavLogo />
        <div className="hidden md:block">
          <NavSearch />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Suspense>
              <CartButton />
            </Suspense>
          </div>

          <Suspense
            fallback={
              <Button
                variant={"outline"}
                size={"icon-lg"}>
                <TextAlignEnd />
              </Button>
            }>
            <DropdownLinks />
          </Suspense>
        </div>
      </Container>
    </nav>
  );
}
