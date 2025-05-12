import ManageProductsTable from "@/components/modules/dashboard/dashboard-product";
import { getAllProducts } from "@/services/Product";
import { IProduct } from "@/types";

export default async function ManageProductsPage() {
  try {
    const response = await getAllProducts();
    const AllProducts: IProduct[] = response?.data || [];

    const productsNotdeleted = AllProducts.filter(
      (product: IProduct) => product.isDeleted === false
    );

    return (
      <div className="container mx-auto px-4 py-8">
        <ManageProductsTable products={productsNotdeleted} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-600 text-center">Failed to load products.</p>
      </div>
    );
  }
}
