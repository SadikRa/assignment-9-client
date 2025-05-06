import ProductReviewDetails from "@/components/modules/products/ProductDetails";
import Banner from "@/components/Shared/CustomBanner";
import CustomContainer from "@/components/ui/core/CustomContainer";
import { getSingleProduct } from "@/services/Product";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  // console.log(productId);

  const { data: product } = await getSingleProduct(productId);
  // console.log(product);
  return (
    <CustomContainer>
      <Banner
        heading={"Review Product"}
        description={"We value your feedback and appreciate your time."}
      />
      <ProductReviewDetails product={product} />
    </CustomContainer>
  );
};

export default ProductDetailsPage;
