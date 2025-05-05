"use client";
// components/Hero.tsx
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    image:
      "https://res.cloudinary.com/divyajujl/image/upload/v1741701675/Healthy-Meal-Delivery-Toronto-Matters_csceqi.jpg",
    title: "Healthy & Nutritious Meals",
    description: "Enjoy fresh, balanced meals made just for you.",
  },
  {
    image:
      "https://res.cloudinary.com/divyajujl/image/upload/v1741701101/McDonald_dm32rp.jpg",
    title: "Customized for Your Diet",
    description: "Tailor your meal plans based on your dietary needs.",
  },
  {
    image:
      "https://res.cloudinary.com/divyajujl/image/upload/v1741706687/Maximize-Your-Restaurants-Profits_may3kc.png",
    title: "Delivered to Your Doorstep",
    description: "Convenient and delicious meals, ready when you are.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative text-center py-20 bg-gradient-to-r from-green-400 to-blue-500 text-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative">
        <Image
          height={60}
          width={1200}
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-64 object-cover rounded-lg shadow-lg md:block hidden"
        />
        <h1 className="text-5xl font-extrabold mt-6 drop-shadow-lg">
          {slides[currentSlide].title}
        </h1>
        <p className="mt-4 text-xl font-light drop-shadow-md">
          {slides[currentSlide].description}
        </p>
        <Button className="mt-6 px-6 py-3 text-lg font-semibold bg-white text-green-600 rounded-full shadow-lg hover:bg-gray-100 transition">
          Start Now
        </Button>
      </div>
      <div>
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white p-2 rounded-full shadow-lg hover:cursor-pointer"
          >
            <ChevronLeft className="text-green-600" />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={nextSlide}
            className="bg-white p-2 rounded-full shadow-lg hover:cursor-pointer"
          >
            <ChevronRight className="text-green-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
