"use client";

import { IProduct } from "@/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { LiaComments } from "react-icons/lia";
import { FcIdea } from "react-icons/fc";
import { TbFileDislike } from "react-icons/tb";
import { TbFileLike } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AiFillStar } from "react-icons/ai"; // Top of file if not added
import { addReview } from "@/services/Review";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { UserInfo } from "@/services/AuthService";
import { createVote } from "@/services/Vote";

type ReviewFormInput = {
  title: string;
  fullContent: string;
  previewContent: string;
  rating: number;
  purchaseSource: string;
  votes?: {
    upVote: number;
    downVote: number;
  };
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
    setValue,
  } = useForm<ReviewFormInput>({
    defaultValues: {
      votes: { upVote: 0, downVote: 0 },
    },
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedVote, setSelectedVote] = useState<"up" | "down" | null>(null);
  const [starRating, setStarRating] = useState(0);
  const { user, isLoading } = useUser();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  if (!product) return notFound();
  if (isLoading) return <div>Loading...</div>;
  const onSubmit = async (data: ReviewFormInput) => {
    if (!user?.email) {
      toast.error("User email is not available.");
      return;
    }

    const UserAccount = await UserInfo(user.email);
    const accountId = UserAccount?.data?.id;
    const votes = data.votes;
    const productId = product.id;

    delete data.votes;

    const reviewData = {
      ...data,
      productId,
      accountId,
    };

    const toastId = toast.loading("Submitting your review...");

    try {
      const result = await addReview(reviewData);

      if (!result?.data?.id) {
        toast.error("Failed to submit review.", { id: toastId });
        return;
      }

      toast.success("Review submitted successfully!", { id: toastId });

      const review_id = result.data.id;

      const voteData = {
        upVote: votes?.upVote || 0,
        downVote: votes?.downVote || 0,
        accountId,
        reviewId: review_id,
      };

      const voteToastId = toast.loading("Submitting your vote...");

      const voteResult = await createVote(voteData);

      if (voteResult?.success) {
        if (voteResult?.data?.upVote > 0) {
          toast.success(
            "You submitted an Upvote. Thanks for your recommendation.",
            {
              id: voteToastId,
            }
          );
        } else if (voteResult?.data?.downVote > 0) {
          toast.success("You submitted a Downvote. Thanks for your feedback.", {
            id: voteToastId,
          });
        }
      } else {
        toast.error("Failed to submit vote.", { id: voteToastId });
      }

      reset();
    } catch (error) {
      toast.error("Submission failed. Try again.", { id: toastId });
      console.error("Submission error:", error);
    } finally {
      setStarRating(0);
      setSelectedVote(null);
      setValue("votes", { upVote: 0, downVote: 0 });
    }
  };

  const totalRating = product.reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);
  const averageRating = (totalRating / product.reviews.length).toFixed(1);

  const totalVotes = product.reviews.reduce(
    (acc, review) => {
      review.votes.forEach((vote) => {
        acc.upVotes += vote.upVote;
        acc.downVotes += vote.downVote;
      });
      return acc;
    },
    { upVotes: 0, downVotes: 0 }
  );

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
        <div>
          <p className="text-yellow-600 font-medium mb-1">
            ⭐ {averageRating} / 5
          </p>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <TbFileLike className="h-6 w-6 text-yellow-600" />
              Upvotes: {totalVotes.upVotes}
            </p>
            |{" "}
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <TbFileDislike className="h-6 w-6 text-yellow-600" />
              Downvotes: {totalVotes.downVotes}
            </p>
            |{" "}
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <LiaComments className="h-6 w-6 text-yellow-600" />
              Comments: {product.reviews.length}
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Customer Reviews
        </h2>
        {product.reviews?.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
          >
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-[600px]  flex-shrink-0 bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {review.title}
                </h3>
                <p className="text-gray-700 mb-2 flex items-start gap-2">
                  <LiaComments className="w-8 h-8" />
                  {review.fullContent}
                </p>
                <p className="text-gray-700 mb-2 flex items-start gap-2">
                  <FcIdea className="w-6 h-6" /> Suggestions:{" "}
                  {review.previewContent}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-yellow-600 font-medium mb-1">
                    ⭐ {review.rating} / 5
                  </p>
                  <p className="text-gray-700">
                    Reviewed By: {review.account.email}
                  </p>
                </div>
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="Great product..."
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Comment</Label>
            <Textarea
              {...register("fullContent", {
                required: "Comment is required",
              })}
              placeholder="Share your experience..."
              rows={4}
            />
            {errors.fullContent && (
              <p className="text-red-500 text-sm">
                {errors.fullContent.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Suggestions</Label>
            <Textarea
              {...register("previewContent")}
              placeholder="Any tips or ideas for others?"
              rows={2}
            />
          </div>

          <div>
            <div>
              <Label>Rating (1–5)</Label>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setStarRating(star);
                      setValue("rating", star, { shouldValidate: true });
                    }}
                  >
                    <AiFillStar
                      size={28}
                      className={
                        star <= starRating ? "text-yellow-500" : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm">{errors.rating.message}</p>
              )}
            </div>

            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Purchase Source</Label>
            <Input
              {...register("purchaseSource")}
              placeholder="Daraz, Amazon, etc."
            />
          </div>

          <div className="space-y-2">
            <Label>Vote</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={selectedVote === "up" ? "default" : "outline"}
                onClick={() => {
                  setSelectedVote("up");
                  setValue(
                    "votes",
                    { upVote: 1, downVote: 0 },
                    { shouldValidate: true }
                  );
                }}
              >
                <TbFileLike className="mr-2 h-5 w-5" /> Upvote
              </Button>

              <Button
                type="button"
                variant={selectedVote === "down" ? "default" : "outline"}
                onClick={() => {
                  setSelectedVote("down");
                  setValue(
                    "votes",
                    { upVote: 0, downVote: 1 },
                    { shouldValidate: true }
                  );
                }}
              >
                <TbFileDislike className="mr-2 h-5 w-5" /> Downvote
              </Button>
            </div>
          </div>

          <Button type="submit">Submit Review</Button>
        </form>
      </section>
    </main>
  );
}
