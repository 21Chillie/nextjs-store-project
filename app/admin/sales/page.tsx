import AdminSalesOrderContainer from "@/components/admin/admin-sales-order-container";
import { Suspense } from "react";

export default function AdminSalesPage() {
  return (
    // TODO: Add fallback later
    <Suspense>
      <AdminSalesOrderContainer />
    </Suspense>
  );
}
