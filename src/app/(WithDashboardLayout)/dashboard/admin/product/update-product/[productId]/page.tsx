import UpdateProductForm from "@/components/modules/dashboard/admin/dashboard-product/UpdateProductForm";
import { getSingleProduct } from "@/services/Product";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);

  const initialData = {
    name: product?.name || "",
    price: product?.price?.toString() || "0.00",
    description: product?.description || "",
    category: product?.category || "GADGETS",
  };

  return (
    <div className="flex justify-center items-center">
      <UpdateProductForm
        productId={productId}
        initialData={initialData}
        existingImageUrl={product?.imageUrl}
      />
    </div>
  );
};

export default UpdateProductPage;
