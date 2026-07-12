import SectionTitle from "@/components/global/section-title";
import SidebarAdmin from "@/components/global/sidebar-admin";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section id="section-admin">
      <header>
        <SectionTitle title="Dashboard" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 md:border-x md:border-b">
        <div className="w-full border border-t-0 p-4 md:col-span-2 md:flex md:items-start md:justify-center md:border-0">
          <Suspense>
            <SidebarAdmin />
          </Suspense>
        </div>

        <div className="md:col-span-10 md:border-l md:p-4">{children}</div>
      </div>
    </section>
  );
}
