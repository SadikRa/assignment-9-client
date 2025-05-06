import AllProducts from "@/components/modules/products";
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
  console.log(products);
  return (
    <CustomContainer>
      {/* Use inline styles for the background */}
      <div>
        <Banner
          heading="Review Products"
          description="A space to post and explore honest product feedback."
        />
        {products && <AllProducts products={products} />}
      </div>
    </CustomContainer>
  );
};

export default AllProductsPage;
