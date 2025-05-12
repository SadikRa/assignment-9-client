"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";

const slides = [
  {
    image:
      "https://res.cloudinary.com/divyajujl/image/upload/v1747050815/1743592595500_mzz8fg.jpg",
    title: "Built by Real Users",
    description:
      "Every review on Criti Check comes from verified buyers. No fake feedback. No fluff.",
  },
  {
    image:
      "https://res.cloudinary.com/divyajujl/image/upload/v1747050814/contact-center-manager_hjjp5b.webp",
    title: "Trusted Moderation",
    description:
      "Each review goes through expert moderation to ensure quality and relevance.",
  },
  {
    image:
      "https://res.cloudinary.com/divyajujl/image/upload/v1747051038/RSPL_Blog_IoT-Data-Analytics_Benefits-Use-Cases_Banner_kyqg0x.jpg",
    title: "Smart Insights for Smart Choices",
    description:
      "Compare product ratings, discover trends, and make informed decisions—fast.",
  },
];

const stats = {
  "Total Reviews": 550,
  "Active Users": 52,
  "Verified Products": 210,
};

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="bg-gradient-to-r from-amber-400 to-yellow-200 text-white py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative text-center">
        <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden shadow-lg ring-2 ring-white/30">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mt-8 drop-shadow-lg">
          {slide.title}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md text-white/90">
          {slide.description}
        </p>

        <Button className="mt-6 px-6 py-3 text-lg font-semibold bg-black text-white rounded-full shadow-lg hover:bg-zinc-900 transition">
          Start Exploring Reviews
        </Button>

        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute top-1/3 left-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="text-blue-600" />
            </button>
            <button
              onClick={next}
              className="absolute top-1/3 right-6 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="text-blue-600" />
            </button>
          </>
        )}
      </div>

      <div className="mt-16 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Criti Check?</h2>
        <div className="flex justify-center gap-10 text-white text-lg flex-wrap">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-3xl font-bold">
                <CountUp end={value} duration={2} />
              </p>
              <p className="capitalize">{key}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
