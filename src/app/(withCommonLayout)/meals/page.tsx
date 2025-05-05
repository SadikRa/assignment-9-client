import AllProducts from "@/components/modules/meals";
import Banner from "@/components/Shared/CustomBanner";
import CustomContainer from "@/components/ui/core/CustomContainer";
import { getAllProducts } from "@/services/Product";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;

  const { data: products } = await getAllProducts(undefined, undefined, query);

  return (
    <CustomContainer>
      {/* Use inline styles for the background */}
      <div>
        <Banner heading="Customized Meals" description="Enjoy our meals" />
        {products && <AllProducts products={products?.result} />}
      </div>
    </CustomContainer>
  );
};

export default AllProductsPage;
