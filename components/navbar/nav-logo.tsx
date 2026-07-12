import { buttonVariants } from "@/components/ui/button";
import { Armchair } from "lucide-react";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link
      href={"/"}
      className={buttonVariants({ variant: "default", size: "icon-lg" })}>
      <Armchair />
    </Link>
  );
}
