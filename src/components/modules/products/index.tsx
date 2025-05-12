"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "@/components/ui/core/ProductCard";
import FilterSidebar from "./FilterSidebar";
import { IProduct } from "@/types";

const AllProducts = ({ products }: { products: IProduct[] }) => {
  const productsNotDeleted = products.filter(
    (product) => product.isDeleted === false
  );

  return (
    <div className="flex lg:flex-row flex-col justify-start items-start gap-8 my-10 mt-20">
      <div className="w-full max-w-sm md:block border border-gray-300 rounded-2xl ">
        <FilterSidebar />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {productsNotDeleted?.map((product: any, idx: number) => (
            <div key={idx} className="w-full max-w-sm">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="flex md:hidden justify-center items-center flex-col w-full ">
          {productsNotDeleted?.map((product: any, idx: number) => (
            <div
              key={idx}
              className="w-full max-w-sm gap-2 flex flex-col justify-center items-center"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
