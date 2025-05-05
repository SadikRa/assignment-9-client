/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

import { Button } from "@/components/ui/button";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const [price, setPrice] = useState([0]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="p-6  bg-white rounded-lg">
      <div className="flex justify-between items-center lg:mb-6">
        <h2 className="text-xl font-semibold ">Filter</h2>
        {searchParams.toString().length > 0 && (
          <Button
            onClick={() => {
              router.push(`${pathname}`, {
                scroll: false,
              });
            }}
            size="sm"
            className="bg-black hover:bg-gray-700 ml-5"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Filter by Price */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Price</h2>
        <div className="flex items-center justify-between text-sm lg:mb-2">
          <span>$0</span>
          <span>$5000</span>
        </div>
        <Slider
          max={5000}
          step={1}
          onValueChange={(value) => {
            setPrice(value);
            handleSearchQuery("price", value[0]);
          }}
          className="w-full"
        />
        <p className="text-sm mt-2">Selected Price: ${price[0]}</p>
      </div>
    </div>
  );
}
