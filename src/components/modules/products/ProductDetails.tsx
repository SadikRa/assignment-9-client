"use client";

import { IProduct } from "@/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";

type ReviewFormInput = {
  title: string;
  description: string;
  rating: number;
  purchaseSource: string;
};

export default function ProductReviewDetails({
  product,
}: {
  product: IProduct;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormInput>();

  const [submitted, setSubmitted] = useState(false);

  if (!product) return notFound();

  const onSubmit = (data: ReviewFormInput) => {
    console.log("Review Submitted:", data);
    // Call API to submit data here
    reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-10">
      {/* Cover Image */}
      {product.imageUrl ? (
        <div className="w-full h-64 relative rounded-xl overflow-hidden shadow">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-xl text-gray-500">
          No Image Available
        </div>
      )}

      {/* Product Info */}
      <section className="space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {product.name}
        </h1>
        <p className="text-xl font-semibold text-green-700">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600">{product.description}</p>
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {product.category}
        </span>
        {}
        {product.reviews.map((review) => (
          <div key={review.id}>
            <p className="text-yellow-600 font-medium mb-1">
              ⭐ {review.rating} / 5
            </p>
            <p className="text-sm text-gray-500">
              Votes: {review.votes?.length ?? 0} | Comments:{" "}
              {review.ReviewComment?.length ?? 0}
            </p>
          </div>
        ))}
      </section>

      {/* Reviews */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Customer Reviews
        </h2>
        {product.reviews?.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {review.title}
                </h3>
                <p className="text-gray-700 mb-2">{review.description}</p>
                <p className="text-yellow-600 font-medium mb-1">
                  ⭐ {review.rating} / 5
                </p>
                <p>Reviewed By: {review.account.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </section>

      {/* Review Form */}
      <section className="bg-gray-50 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full border rounded px-3 py-2"
              placeholder="Great product..."
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border rounded px-3 py-2"
              rows={4}
              placeholder="Share your experience..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Rating (1–5)</label>
            <input
              type="number"
              {...register("rating", {
                required: "Rating is required",
                min: 1,
                max: 5,
              })}
              className="w-full border rounded px-3 py-2"
              placeholder="4"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Purchase Source</label>
            <input
              {...register("purchaseSource")}
              className="w-full border rounded px-3 py-2"
              placeholder="Amazon, Daraz, etc."
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>

          {submitted && (
            <p className="text-green-600 font-medium mt-2">
              Thank you! Review submitted.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
