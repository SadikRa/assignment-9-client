"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAllReviews } from "@/services/Review";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Banner from "@/components/Shared/CustomBanner";

interface Account {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
}

interface Review {
  id: string;
  title: string;
  rating: number;
  previewContent: string;
  fullContent: string;
  images: string[];
  createdAt: string;
  account: Account;
  status: string;
  isPremium: boolean;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await getAllReviews();

        if (response.success) {
          const approvedReviews = (response.data || []).sort(
            (a: Review, b: Review) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          setReviews(approvedReviews);
        } else {
          toast.error(response.message || "Failed to fetch reviews");
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    setShowFullContent(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
    setShowFullContent(false);
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  if (isLoading) {
    return (
      <section className="py-16 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Customer Reviews
        </h2>
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm">
          <p>Loading reviews...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Customer Reviews
        </h2>
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm text-red-500">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-16 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Customer Reviews
        </h2>
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm">
          <p>No approved reviews yet. Be the first to review!</p>
        </div>
      </section>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <section className=" py-10 my-5 bg-gray-50 rounded-2xl">
      <div className="container mx-auto px-4">
        <Banner
          heading="Customer Reviews"
          description="Real opinions from real users—our customer reviews speak the truth you
          can trust."
        />

        <div className="max-w-4xl mx-auto  relative">
          {/* Review Card */}
          <div className="bg-white mt-20 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-green-500">
                    <Image
                      src={
                        currentReview.account.imageUrl ||
                        "https://github.com/shadcn.png"
                      }
                      alt={currentReview.account.name || "img"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {currentReview.account.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(currentReview.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < currentReview.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {currentReview.title}
              </h4>

              <div className="prose max-w-none text-gray-600 mb-4">
                {showFullContent
                  ? currentReview.fullContent
                  : currentReview.previewContent}
              </div>

              {currentReview.fullContent &&
                currentReview.fullContent !== currentReview.previewContent && (
                  <button
                    onClick={toggleContent}
                    className="text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    {showFullContent ? "Show less" : "Read more"}
                  </button>
                )}

              {/* Review Images */}
              {currentReview.images.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {currentReview.images.slice(0, 3).map((image, index) => (
                    <div
                      key={index}
                      className="relative h-32 rounded-md overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Review image ${index + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {currentReview.isPremium && (
                <div className="mt-4 flex items-center text-sm text-amber-600">
                  <span className="mr-1">⭐</span>
                  <span>Premium Review</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              className="rounded-full p-2 h-12 w-12"
              disabled={reviews.length <= 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex items-center space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setShowFullContent(false);
                  }}
                  className={`h-3 w-3 rounded-full ${
                    currentIndex === index ? "bg-green-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              className="rounded-full p-2 h-12 w-12"
              disabled={reviews.length <= 1}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
