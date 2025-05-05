"use client";

import { useParams } from "next/navigation";
import data from "../../../dummy_json/product_review.json";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function ProductReviewDetails() {
  const { id } = useParams();
  const product = data.find((item) => item.id === id);

  if (!product) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
      <p className="text-sm text-gray-500 mb-4">
        By {product.author.name} on{" "}
        {new Date(product.createdAt).toLocaleDateString()}
      </p>

      {product.imgUrl && product.imgUrl.length > 0 && (
        <div className="mb-4">
          <Image
            src={product.imgUrl[0]}
            alt={product.title}
            width={600}
            height={400}
            className="rounded-xl"
          />
        </div>
      )}

      <p className="mb-4">{product.description}</p>

      <div className="mb-4">
        <span className="font-semibold">Rating:</span> {product.rating}/5
      </div>

      {product.isPremium && product.price !== undefined && (
        <div className="mb-4 text-orange-600 font-medium">
          Premium Review – Price: {product.price} credits
        </div>
      )}

      <div className="mb-4">
        <span className="font-semibold">Votes:</span> 👍 {product.votes.upvotes}{" "}
        / 👎 {product.votes.downvotes}
      </div>

      {product.comments.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Comments:</h2>
          <ul className="space-y-2">
            {product.comments.map((comment) => (
              <li key={comment.id} className="border p-3 rounded-md bg-gray-50">
                <p className="text-sm font-semibold">
                  {comment.author}{" "}
                  <span className="text-gray-400 text-xs">
                    ({new Date(comment.createdAt).toLocaleDateString()})
                  </span>
                </p>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
