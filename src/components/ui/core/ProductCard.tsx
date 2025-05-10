"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  addProduct,
  orderedProductsSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { IProduct } from "@/types"; // Updated type for product
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineRateReview } from "react-icons/md";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(orderedProductsSelector);
  const isProductInCart = cartItems.some(
    (item) => item.productId === product.id
  );

  const totalRating = product.reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);
  const averageRating = (totalRating / product.reviews.length).toFixed(1);

  const totalVotes = product.reviews.reduce(
    (acc, review) => {
      review.votes.forEach((vote) => {
        acc.upVotes += vote.upVote;
        acc.downVotes += vote.downVote;
      });
      return acc;
    },
    { upVotes: 0, downVotes: 0 }
  );

  const handleAddToCart = () => {
    if (isProductInCart) {
      return toast.error("Product already in cart");
    }
    const cartItem = {
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      orderedQuantity: 1,
      company: product?.company,
    };
    dispatch(addProduct(cartItem));
  };
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
              <p className="text-sm">{averageRating}</p>
            </div>
          </div>
          <div className="flex items-center justify-between my-2">
            <p className="text-sm text-gray-600">
              {product?.category && (
                <span className="font-semibold">{product?.category}</span>
              )}
            </p>

            <div className="flex items-center justify-center gap-1">
              Recom By : {totalVotes.upVotes}
            </div>
          </div>
        </CardContent>

        <CardFooter className="block p-0">
          <div className="flex gap-2 items-center justify-center">
            <Link href={`/products/${product?.id}`} passHref>
              <Button
                size="sm"
                variant="outline"
                className=" cursor-pointer text-center flex items-center"
              >
                <MdOutlineRateReview />
                Review
              </Button>
            </Link>
            <Button
              onClick={() => handleAddToCart()}
              size="sm"
              variant="outline"
              className=" cursor-pointer text-center flex items-center"
            >
              <MdOutlineRateReview />
              Add to Cart
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
