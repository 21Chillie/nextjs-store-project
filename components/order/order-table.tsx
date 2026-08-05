import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OrderWithItems } from "@/types/global.type";
import { Badge } from "../ui/badge";
import OrderActions from "./order-actions";
import OrderDetail from "./order-detail";
import OrderIdClipboard from "./order-id-clipboard";
import { OrderItems } from "./order-items";

type Props = {
  tableHead: string[];
  tableBody: OrderWithItems[];
};

export default function OrderTable({ tableHead, tableBody }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHead.map((label) => {
            return <TableHead key={label}>{label}</TableHead>;
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {tableBody.map((order) => {
          const {
            id,
            createdAt,
            orderItems,
            numItemsInCart,
            orderTotal,
            status,
          } = order;

          return (
            <TableRow key={`Order-${id}`}>
              <OrderIdClipboard id={id} />
              <TableCell>{formatDate(createdAt)}</TableCell>
              <TableCell>
                <OrderItems
                  numItemsInCart={numItemsInCart}
                  data={orderItems}
                />
              </TableCell>
              <TableCell>{formatCurrency(orderTotal)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    (status === "CANCELED" && "destructive") ||
                    (status === "COMPLETED" && "default") ||
                    (status === "PENDING" && "secondary") ||
                    "ghost"
                  }>
                  {status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <OrderDetail order={order} />
                  <OrderActions
                    status={status}
                    orderId={id}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
