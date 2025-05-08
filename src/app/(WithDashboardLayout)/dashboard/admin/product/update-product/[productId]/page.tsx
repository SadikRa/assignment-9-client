import UpdateProductForm from "@/components/modules/dashboard/dashboard-product/UpdateProductForm";
import { getSingleProduct } from "@/services/Product";

interface UpdateProductPageProps {
  params: {
    productId: string;
  };
}

const UpdateProductPage = async ({ params }: UpdateProductPageProps) => {
  const { productId } = params;

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
