"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@wrksz/themes/client";
import { Moon, Sun } from "lucide-react";

export function ButtonToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className={"cursor-pointer"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant={"outline"}
      size={"icon-lg"}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
