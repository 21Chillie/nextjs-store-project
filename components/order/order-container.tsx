import { fetchUserOrder } from "@/actions/order";
import SectionTitle from "@/components/global/section-title";
import { protectRoute } from "@/lib/protect-route";
import Link from "next/link";
import OrderTable from "./order-table";

export default async function OrderContainer() {
  const userId = await protectRoute();
  const orders = await fetchUserOrder({ userId });
  const head = ["Order ID", "Date", "Items", "Total", "Status", "Action"];

  if (orders.length === 0) {
    return (
      <section
        id="section-user-order"
        className="space-y-6">
        <SectionTitle title="My Orders" />

        <div>
          <p className="text-muted-foreground">
            No orders yet. When you are ready,{" "}
            <Link
              href="/cart"
              className="hover:text-foreground underline">
              create your first order
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="section-user-order"
      className="space-y-6">
      <SectionTitle title="My Orders" />

      <div>
        <OrderTable
          tableHead={head}
          tableBody={orders}
        />
      </div>
    </section>
  );
}
