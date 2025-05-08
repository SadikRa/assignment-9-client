import ManageProductsTable from "@/components/modules/dashboard/dashboard-product";
import { getAllProducts } from "@/services/Product";

export default async function ManageProductsPage() {
  const { data: products } = await getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <ManageProductsTable products={products} />
    </div>
  );
}
