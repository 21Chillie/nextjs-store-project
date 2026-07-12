"use client";

import { adminLinks, type links } from "@/components/navbar/links";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarAdmin() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center gap-2 md:flex-col">
      {adminLinks.map((link) => {
        return (
          <AdminSideMenu
            key={link.label}
            {...link}
            pathname={pathname}
          />
        );
      })}
    </div>
  );
}

function AdminSideMenu({
  href,
  label,
  pathname,
}: links & { pathname: string }) {
  const isCurrentSection = pathname.startsWith(href);
  const isActivePath =
    pathname === href || (isCurrentSection && pathname.endsWith("/edit"));

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActivePath ? "default" : "ghost",
        className: "capitalize",
      })}>
      {label}
    </Link>
  );
}
