import Loading from "@/components/global/loading";
import SectionTitle from "@/components/global/section-title";
import SidebarAdmin from "@/components/global/sidebar-admin";
import { protectAdminRoute } from "@/lib/protect-route";
import { Suspense } from "react";

async function ProtectedAdminContent({
  children,
}: {
  children: React.ReactNode;
}) {
  await protectAdminRoute();
  return (
    <section id="section-admin">
      <header>
        <SectionTitle title="Dashboard" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 md:border-x md:border-b">
        <div className="w-full border border-t-0 p-4 md:col-span-2 md:flex md:items-start md:justify-center md:border-0 max-sm mb-4">
          <Suspense>
            <SidebarAdmin />
          </Suspense>
        </div>

        <div className="md:col-span-10 md:border-l md:p-4">{children}</div>
      </div>
    </section>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <ProtectedAdminContent>{children}</ProtectedAdminContent>
    </Suspense>
  );
}
