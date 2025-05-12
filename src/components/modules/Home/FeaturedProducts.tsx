/* eslint-disable @typescript-eslint/no-explicit-any */
import Banner from "@/components/Shared/CustomBanner";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import { getAllProducts } from "@/services/Product";
import { IProduct } from "@/types";
import Link from "next/link";
import React from "react";

const FeaturedProducts = async () => {
  const { data: products } = await getAllProducts();
  const productsNotDeleted = products.filter(
    (product: IProduct) => product.isDeleted === false
  );
  const featuredProducts = productsNotDeleted.slice(0, 3); // <-- corrected here
  return (
    <div className="container py-10">
      <Banner
        heading="Featured Products"
        description="Check out our handpicked Featured Products – top-rated, most loved, and best in quality!"
      />
      <div className="flex flex-col md:flex-row gap-8 mt-20 justify-center items-center w-full">
        {featuredProducts?.map((product: any, idx: number) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
      <div className="flex justify-center md:justify-end items-center w-full mt-5">
        <Link href={"/products"}>
          <Button className="hover:cursor-pointer" variant={"outline"}>
            See All Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
