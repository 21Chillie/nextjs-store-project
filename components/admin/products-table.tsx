import { getAllProduct } from "@/actions/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import TableActions from "./table-actions";

export default async function ProductsTable() {
  const products = await getAllProduct();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Products Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      {/*Table Row then TableCell*/}
      <TableBody>
        {products.map(({ id, name, company, price }) => {
          return (
            <TableRow key={`${name}-${id}`}>
              <TableCell>{name}</TableCell>
              <TableCell>{company}</TableCell>
              <TableCell>{formatCurrency(price)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <TableActions
                    type="edit"
                    productId={id}
                  />
                  <TableActions
                    type="delete"
                    productId={id}
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
