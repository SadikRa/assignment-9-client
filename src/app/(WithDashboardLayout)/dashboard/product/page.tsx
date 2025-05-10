import ManageProductsTable from "@/components/modules/dashboard/dashboard-product";
import { getAllProducts } from "@/services/Product";
import { IProduct } from "@/types";

export default async function ManageProductsPage() {
  const { data: AllProducts } = await getAllProducts();

  const productsNotdeleted = AllProducts.filter(
    (product: IProduct) => product.isDeleted === false
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <ManageProductsTable products={productsNotdeleted} />
    </div>
  );
}
