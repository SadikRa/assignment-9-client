"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IProduct } from "@/types"; // Updated type for product
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div>
      <Card className="p-3 w-64">
        <CardHeader className="relative p-0 h-48">
          <Link href={`/meals/${product?.id}`} passHref>
            <Image
              src={
                product?.imgUrl[0] ||
                "https://res.cloudinary.com/divyajujl/image/upload/v1741701675/Healthy-Meal-Delivery-Toronto-Matters_csceqi.jpg"
              }
              width={500}
              height={500}
              alt="product image"
              className="rounded-sm h-48 object-cover hover:scale-105 duration-500"
            />
          </Link>
        </CardHeader>

        <CardContent className="p-0 mt-2">
          <CardTitle
            title={product?.title}
            className="font-semibold cursor-pointer text-sm"
          >
            {product?.title.length > 20
              ? product?.title?.slice(0, 20) + "..."
              : product?.title}
          </CardTitle>

          <div className="flex items-center justify-between my-2">
            <p className="text-sm text-gray-600">
              {product?.price && (
                <span className="font-semibold">$ {product?.price}</span>
              )}
            </p>

            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4" fill="orange" stroke="orange" />
              <p className="text-sm">{product?.rating}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="block p-0">
          <div className="flex gap-2 items-center justify-between">
            <Link href={`/meals/${product?.id}`} passHref>
              <Button
                size="sm"
                variant="outline"
                className="w-32 cursor-pointer"
              >
                Buy Now
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
