"use client";

import { IProduct } from "@/types";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function ProductReviewDetails({
  product,
}: {
  product: IProduct;
}) {
  if (!product) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Product Cover Image */}
      {product.imageUrl ? (
        <div className="w-full h-64 relative rounded-xl overflow-hidden shadow">
          <Image
            src={
              product?.imageUrl ||
              "https://res.cloudinary.com/divyajujl/image/upload/v1746550148/online-learning-design-concept-top-view-student-table-with-tablet-headphone-stationeries-blue-table-background-1536x1025_u6sboo.jpg"
            }
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

      {/* Product Details */}
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
      </section>

      {/* Reviews Section */}
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
                <p className="text-sm text-gray-500">
                  Votes: {review.votes?.length ?? 0} | Comments:{" "}
                  {review.ReviewComment?.length ?? 0}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </section>
    </main>
  );
}
