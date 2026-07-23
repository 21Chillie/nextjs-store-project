import { navLinks } from "@/components/navbar/links";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Show, SignInButton, SignOutButton, UserAvatar } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { TextAlignEnd } from "lucide-react";
import Link from "next/link";

export default async function DropdownLinks() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className={"flex cursor-pointer items-center gap-2"}
            variant={"outline"}
          />
        }>
        <TextAlignEnd />
        <Show when={"signed-in"}>
          <UserAvatar />
        </Show>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={"mt-2"}>
        <DynamicDropdownMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

async function DynamicDropdownMenu() {
  const { isAuthenticated, userId } = await auth();
  const isAdminUser = userId === process.env.ADMIN_USER_ID;

  return (
    <>
      <DropdownMenuGroup>
        {navLinks.map(({ href, label }) => {
          const protectedRoute =
            !isAuthenticated &&
            (label === "favorites" ||
              label === "cart" ||
              label === "orders" ||
              label === "reviews");

          if (!isAdminUser && label === "dashboard") return null;
          if (protectedRoute) return null;

          return (
            <DropdownMenuItem
              className={"cursor-pointer capitalize"}
              key={label}

              render={<Link href={href} />}>
              {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        {isAuthenticated ? (
          <SignOutButton>
            <DropdownMenuItem
              variant="destructive"
              className={"cursor-pointer"}>
              Logout
            </DropdownMenuItem>
          </SignOutButton>
        ) : (
          <SignInButton mode="modal">
            <DropdownMenuItem className={"cursor-pointer"}>
              Login
            </DropdownMenuItem>
          </SignInButton>
        )}
      </DropdownMenuGroup>
    </>
  );
}
