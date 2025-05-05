"use client";
import Image from "next/image";
import { useState } from "react";

interface Testimonial {
  name: string;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Johan Rahman",
    text: "MealBox has changed the way I eat!",
    image: "https://i.ibb.co.com/xGRKzjq/1668674433825.jpg",
  },
  {
    name: "Tasnim Ahmed",
    text: "Delicious and healthy meals delivered!",
    image: "https://i.ibb.co.com/2PFSLpw/1516563317575.jpg",
  },
  {
    name: "Fahim Ahmed",
    text: "Affordable and convenient meal options!",
    image: "https://i.ibb.co.com/X7c6bVT/fahim-ahmed-256x256.jpg",
  },
  {
    name: "Sara Khan",
    text: "Great variety and taste. Highly recommended!",
    image: "https://i.ibb.co.com/LPpWhf8/images-1.jpg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 text-center ">
      <h2 className="text-3xl font-bold">What Our Customers Say</h2>
      <div className="mt-8 relative w-full max-w-lg mx-auto">
        <TestimonialCard testimonial={testimonials[currentIndex]} />
        <div className="flex justify-between mt-4 ">
          <button
            onClick={prevTestimonial}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 cursor-pointer rounded-lg"
          >
            ← Prev
          </button>
          <button
            onClick={nextTestimonial}
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 cursor-pointer rounded-lg"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="p-6 bg-white border rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <Image
        height={500}
        width={500}
        src={testimonial.image}
        alt={testimonial.name}
        className="w-16 h-16 mx-auto rounded-full mb-4 border-2 border-white"
      />
      <p className="italic">{testimonial.text}</p>
      <h3 className="mt-4 font-semibold">- {testimonial.name}</h3>
    </div>
  );
}
