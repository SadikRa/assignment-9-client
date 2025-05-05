import AllProducts from "@/components/modules/products";
import Banner from "@/components/Shared/CustomBanner";
import CustomContainer from "@/components/ui/core/CustomContainer";
import products from "../../../dummy_json/product_review.json";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({}: { searchParams: SearchParams }) => {
  // const query = await searchParams;

  // const { data: products } = await getAllProducts(undefined, undefined, query);

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
