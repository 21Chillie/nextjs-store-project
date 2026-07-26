import { fetchAdminSalesOrder } from "@/actions/order";
import OrderTable from "../order/order-table";

export default async function AdminSalesOrderContainer() {
  const orders = await fetchAdminSalesOrder();
  const head = ["Order ID", "Date", "Items", "Total", "Status", "Action"];

  if (orders.length === 0) {
    return <p className="text-muted-foreground">No sales orders found.</p>;
  }

  return (
    <OrderTable
      tableHead={head}
      tableBody={orders}
    />
  );
}
