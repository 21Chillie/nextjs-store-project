import { getFavoritesWithAuth } from "@/actions/favorites";
import SectionTitle from "@/components/global/section-title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ButtonToggleFavorite from "./button-toggle-favorite";

export async function ProductsFavorite() {
  const favorites = await getFavoritesWithAuth();

  if (favorites.length === 0) {
    return <SectionTitle title="No favorites product has been added" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>Product Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {favorites.map(({ id, product }) => {
          return (
            <TableRow key={id}>
              <TableCell className="w-[132px] px-4">
                <Image
                  className="aspect-square size-32 object-cover"
                  src={product.image}
                  width={192}
                  height={192}
                  alt={`${product.name} products image`}
                />
              </TableCell>
              <TableCell>
                <Link
                  className="hover:underline"
                  href={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </TableCell>
              <TableCell>{product.company}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>
                <ButtonToggleFavorite productId={product.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
