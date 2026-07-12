import { productById } from "@/actions/product";
import { FormUpdateProduct } from "./form-update-product";

type Props = {
  id: string;
};

export default async function UpdateProductPage({ id }: Props) {
  const product = await productById(id);

  return <FormUpdateProduct product={product} />;
}
