import ProductDetails from "@/components/modules/meals/ProductDetails";
import Banner from "@/components/Shared/CustomBanner";
import CustomContainer from "@/components/ui/core/CustomContainer";
import { getSingleProduct } from "@/services/Product";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const { mealId } = await params;

  const { data: product } = await getSingleProduct(mealId);
  return (
    <CustomContainer>
      <Banner
        heading={"Personalize Your Meal"}
        description={"Choose your desiered flavours"}
      />
      <ProductDetails product={product[0]} />
    </CustomContainer>
  );
};

export default ProductDetailsPage;
