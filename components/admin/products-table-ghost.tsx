import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  rowLength: number;
};

export function ProductsTableGhost({ rowLength }: Props) {
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

      <TableBody>
        {[...Array(rowLength)].map((_, i) => (
          <TableRow key={`table-row-skeleton-${i}`}>
            <TableCell>
              <Skeleton className="my-2 h-5 w-60" />
            </TableCell>
            <TableCell>
              <Skeleton className="my-2 h-5 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="my-2 h-5 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="my-2 h-5 w-24" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
