import ProductDetails from "@/components/modules/products/ProductDetails";
import Banner from "@/components/Shared/CustomBanner";
import CustomContainer from "@/components/ui/core/CustomContainer";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  console.log({ productId });

  // const { data: product } = await getSingleProduct(productId);
  return (
    <CustomContainer>
      <Banner
        heading={"Personalize Your Meal"}
        description={"Choose your desiered flavours"}
      />
      <ProductDetails />
    </CustomContainer>
  );
};

export default ProductDetailsPage;
