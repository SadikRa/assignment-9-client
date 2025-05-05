/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeProduct,
  updateQuantity,
  updateTotalPrice,
  clearCart,
  orderedProductsSelector,
  totalPriceSelector,
  wholeCartInfoSelector,
} from "@/redux/features/cartSlice";
import { FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { OrderInfo } from "@/types/cart";
import Link from "next/link";
import { createOrder } from "@/services/cart";
import { toast } from "sonner";
import Loading from "../loading";

interface CartSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartSidebar = ({ isOpen, setIsOpen }: CartSidebarProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(orderedProductsSelector) as OrderInfo[];
  const totalPrice = useAppSelector(totalPriceSelector);
  const wholeCartInfo = useAppSelector(wholeCartInfoSelector);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(updateTotalPrice());
  }, [cartItems, dispatch]);

  const handleRemoveItem = (cartItemId: string) => {
    dispatch(removeProduct(cartItemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, orderedQuantity: quantity }));
    dispatch(updateTotalPrice());
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(wholeCartInfo);
    try {
      const res = await createOrder(wholeCartInfo);
      console.log(res);
      if (res.success) {
        setLoading(false);
        toast.success(`${res.message}, Order NO: ${res.data[0]._id}`);
        dispatch(clearCart());
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.message as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-15 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-96 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out h-screen ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FiShoppingCart className="text-yellow-500" />
            Your Cart
          </h2>
          <button
            className="text-red-600 hover:text-red-700 hover:scale-125 duration-500 hover:cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[70vh]">
          {cartItems.length > 0 ? (
            cartItems.map((meal, idx) => (
              <div key={idx} className="flex flex-col border-b pb-3">
                <div className="flex items-center gap-4">
                  <Image
                    src={
                      meal.imgUrl[0] ||
                      "https://res.cloudinary.com/divyajujl/image/upload/v1741764173/j4bt4nnxmfnvetzdedoh.jpg"
                    }
                    alt={`${meal.meal_id ? meal.meal_id : "meal"}`}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <Link
                      href={meal.productId}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <h3 className="text-sm font-semibold hover:underline">
                        {meal.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-xs">
                      {meal.calories} Calories | ${meal.price}
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(meal?.cartItemId as string)} // Use cartItemId instead
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="text-xs text-gray-600 mt-2">
                  <p>
                    <strong>Base:</strong> {meal.baseOptions || "None"}
                  </p>
                  <p>
                    <strong>Protein:</strong> {meal.proteinOptions || "None"}
                  </p>
                  <p>
                    <strong>Extras:</strong>{" "}
                    {meal.extras.length > 0 ? meal.extras.join(", ") : "None"}
                  </p>
                  <p>
                    <strong>Dietary:</strong>{" "}
                    {meal.dietaryPreferences || "None"}
                  </p>
                </div>

                <div className="flex gap-2 mt-2 justify-end items-center">
                  <Button
                    className=" cursor-pointer"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(
                        meal.productId,
                        Math.max(1, meal.orderedQuantity - 1)
                      )
                    }
                  >
                    -
                  </Button>
                  <span className="text-sm font-semibold">
                    {meal.orderedQuantity}
                  </span>
                  <Button
                    className=" cursor-pointer"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleQuantityChange(
                        meal.productId,
                        meal.orderedQuantity + 1
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col border-b pb-3">
              Your cart is empty.
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t flex flex-col gap-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
            <Button
              onClick={handleSubmit}
              variant="default"
              className="w-full cursor-pointer"
            >
              {loading ? (
                <div className="w-8 h-8">
                  <Loading></Loading>
                </div>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
