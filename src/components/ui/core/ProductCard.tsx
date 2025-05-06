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
import { MdOutlineRateReview } from "react-icons/md";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div>
      <Card className="p-3 w-64">
        <CardHeader className="relative p-0 h-48">
          <Link href={`/products/${product?.id}`} passHref>
            <Image
              src={
                product?.imageUrl ||
                "https://res.cloudinary.com/divyajujl/image/upload/v1746550148/online-learning-design-concept-top-view-student-table-with-tablet-headphone-stationeries-blue-table-background-1536x1025_u6sboo.jpg"
              }
              width={500}
              height={500}
              alt="product image"
              className="rounded-sm h-48 object-cover hover:scale-105 duration-500"
            />
          </Link>
        </CardHeader>

        <CardContent className="p-0 mt-2 text-gray-600">
          <CardTitle
            title={product?.name}
            className="font-semibold cursor-pointer text-base hover:text-yellow-500 duration-300"
          >
            {product?.name.length > 30
              ? product?.name?.slice(0, 30) + "..."
              : product?.name}
          </CardTitle>

          <div className="flex items-center justify-between my-2">
            <p className="text-sm text-gray-600">
              {product?.price && (
                <span className="font-semibold">$ {product?.price}</span>
              )}
            </p>

            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4" fill="orange" stroke="orange" />
              <p className="text-sm">{product?.reviews.length}</p>
            </div>
          </div>
          <div className="flex items-center justify-between my-2">
            <p className="text-sm text-gray-600">
              {product?.category && (
                <span className="font-semibold">{product?.category}</span>
              )}
            </p>

            <div className="flex items-center justify-center gap-1">
              Recom By : {product.reviews.length}
            </div>
          </div>
        </CardContent>

        <CardFooter className="block p-0">
          <div className="flex gap-2 items-center justify-center">
            <Link href={`/products/${product?.id}`} passHref>
              <Button
                size="sm"
                variant="outline"
                className="w-32 cursor-pointer text-center flex items-center"
              >
                <MdOutlineRateReview />
                Review
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
