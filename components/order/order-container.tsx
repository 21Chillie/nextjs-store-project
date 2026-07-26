import { fetchUserOrder } from "@/actions/order";
import SectionTitle from "../global/section-title";
import OrderTable from "./order-table";

export default async function OrderContainer() {
  const orders = await fetchUserOrder();
  const head = ["Order ID", "Date", "Items", "Total", "Status", "Action"];

  return (
    <section id="section-user-order">
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
