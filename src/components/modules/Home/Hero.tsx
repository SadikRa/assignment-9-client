"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

// Dummy data
const featuredReviews = [
  {
    id: "rev-1",
    title: "Top Pick: Wireless Headphones",
    rating: 5,
    snippet: "Amazing sound and build quality...",
  },
  {
    id: "rev-2",
    title: "Budget-Friendly Blender",
    rating: 4,
    snippet: "Great performance for the price.",
  },
];

const categories = ["Electronics", "Home Appliances", "Fitness", "Books"];

const stats = {
  reviews: 245,
  users: 89,
  companies: 15,
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="text-white bg-gradient-to-r from-green-400 to-blue-500 py-20 relative overflow-hidden">
      {/* Hero Carousel */}
      <div className="max-w-5xl mx-auto px-4 relative text-center">
        <Image
          height={60}
          width={1200}
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-64 object-cover rounded-lg shadow-lg md:block hidden"
        />
        <h1 className="text-4xl md:text-5xl font-bold mt-6 drop-shadow-lg">
          {slides[currentSlide].title}
        </h1>
        <p className="mt-3 text-lg md:text-xl drop-shadow-md">
          {slides[currentSlide].description}
        </p>
        <Button className="mt-6 px-6 py-3 text-lg font-semibold bg-white text-green-600 rounded-full shadow-lg hover:bg-gray-100 transition">
          Explore Reviews
        </Button>

        {/* Carousel Controls */}
        <div className="absolute top-1/3 left-[-40px]  transform -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white hover:cursor-pointer  p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="text-green-600 hover:text-amber-600 hover:scale-110 duration-500" />
          </button>
        </div>
        <div className="absolute top-1/3 right-[-40px] transform -translate-y-1/2">
          <button
            onClick={nextSlide}
            className="bg-white p-2 hover:cursor-pointer rounded-full shadow-md"
          >
            <ChevronRight className="text-green-600  hover:text-amber-600 hover:scale-110 duration-500" />
          </button>
        </div>
      </div>

      {/* Featured Reviews */}
      <div className="mt-16 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Featured Reviews</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {featuredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white text-black rounded-lg p-4 shadow-md"
            >
              <h3 className="text-lg font-bold">{review.title}</h3>
              <p className="text-yellow-500">Rating: {review.rating}/5</p>
              <p className="text-sm mt-1">{review.snippet}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mt-16 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Browse Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="bg-white text-green-600 px-4 py-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-16 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Portal Statistics</h2>
        <div className="flex justify-center gap-8 text-white">
          <div>
            <p className="text-3xl font-bold">{stats.reviews}</p>
            <p className="text-sm">Total Reviews</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{stats.users}</p>
            <p className="text-sm">Active Users</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{stats.companies}</p>
            <p className="text-sm">Registered Companies</p>
          </div>
        </div>
      </div>
    </section>
  );
}
