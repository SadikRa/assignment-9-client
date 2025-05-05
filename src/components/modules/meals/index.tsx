import ProductCard from "@/components/ui/core/ProductCard";
import { ICustomizableMeal } from "@/types";
import FilterSidebar from "./FilterSidebar";

const AllProducts = ({ products }: { products: ICustomizableMeal[] }) => {
  return (
    <div className="flex lg:flex-row flex-col justify-center items-center gap-8 my-10 mt-20">
      <div className="w-full max-w-sm md:block border border-gray-300 rounded-2xl ">
        <FilterSidebar />
      </div>
      <div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {products?.map((product: ICustomizableMeal, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
