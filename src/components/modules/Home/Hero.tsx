/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/services/Product";

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  price: number;
}

interface Slide {
  image: string;
  title: string;
  description: string;
  price?: number;
}

const categories = ["GADGETS", "CLOTHING", "BOOKS"];

const stats = {
  reviews: 245,
  users: 89,
  companies: 15,
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [productsResponse] = await Promise.all([getAllProducts()]);

        if (productsResponse.success) {
          const products = productsResponse.data || [];

          const productsWithImages = products.filter(
            (product: { imageUrl: any }) => product.imageUrl
          );
          const topProducts =
            productsWithImages.length >= 3
              ? productsWithImages.slice(0, 3)
              : products.slice(0, 3);

          const formattedSlides = topProducts.map((product: Product) => ({
            image: product.imageUrl || "https://ibb.co.com/27prvyN",
            title: product.name,
            description:
              product.description ||
              "Discover quality products tailored for you.",
            price: product.price,
          }));

          setSlides(formattedSlides);
        } else {
          throw new Error(
            productsResponse.message || "Failed to fetch products"
          );
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <p>Loading Hero Content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="text-center py-20">
        <p>No products available to display.</p>
      </div>
    );
  }

  return (
    <section className="text-white bg-gradient-to-r from-green-400 to-blue-500 py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative text-center">
        <div className="relative w-full h-64 rounded-lg shadow-lg overflow-hidden bg-gray-100">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-hero.jpg";
            }}
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mt-6 drop-shadow-lg">
          {slides[currentSlide].title}
        </h1>
        {slides[currentSlide].price && (
          <p className="text-xl font-semibold mt-2">
            ${slides[currentSlide].price.toFixed(2)}
          </p>
        )}
        <p className="mt-3 text-lg md:text-xl drop-shadow-md max-w-2xl mx-auto">
          {slides[currentSlide].description}
        </p>
        <Button className="mt-6 px-6 py-3 text-lg font-semibold bg-black text-white rounded-full shadow-lg hover:bg-zinc-900 transition">
          Explore Reviews
        </Button>

        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/4 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="text-green-600 hover:text-amber-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/4 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
              aria-label="Next slide"
            >
              <ChevronRight className="text-green-600 hover:text-amber-600" />
            </button>
          </>
        )}
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="bg-white text-green-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Portal Statistics</h2>
        <div className="flex justify-center gap-8 text-white">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key}>
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-sm capitalize">{key.replace(/_/g, " ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
