/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PaymentModal.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { makePremium } from "@/services/Review";
import { IReviews } from "@/types/reviews";

import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  review: IReviews | null;
};

export default function ReviewModal({ isOpen, onClose, review }: Props) {
  if (!isOpen) return null;

  const handlePremium = async (id: string) => {
    // console.log(id);
    const toastId = "PremimumReview";
    Swal.fire({
      title: "Make this review as premium?",
      // text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",

      showClass: {
        popup: `
          animate__animated,
          animate__fadeInUp,
          animate__faster,
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          toast.loading("Marking as Premium", { id: toastId });
          const reviewData = {
            productId: review?.productId,
            accountId: review?.accountId,
            isPremium: true,
          };
          console.log(reviewData);
          const res = await makePremium(id, reviewData);
          if (res) {
            toast.success("Marked as Premium", { id: toastId });
            onClose();
          } else {
            toast.error("Failed to mark as Premium", { id: toastId });
          }
          console.log(res);
        } catch (err) {
          console.log(err);
          toast.error("Failed to mark as Premium", { id: toastId });
        }
      }
    });
  };
  const handlePublish = async (id: string) => {
    // console.log(id);
    const toastId = "PublishReview";
    Swal.fire({
      title: "Publish this review?",
      // text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",

      showClass: {
        popup: `
          animate__animated,
          animate__fadeInUp,
          animate__faster,
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          toast.loading("Publishing Review", { id: toastId });
          const reviewData = {
            productId: review?.productId,
            accountId: review?.accountId,
            status: "APPROVED",
          };
          console.log(reviewData);
          const res = await makePremium(id, reviewData);
          if (res) {
            toast.success("Review Published", { id: toastId });
            onClose();
          } else {
            toast.error("Review failed to be published", { id: toastId });
          }
          console.log(res);
        } catch (err) {
          console.log(err);
          toast.error("Review failed to be published", { id: toastId });
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start bg-gray-100 p-6 rounded-xl max-w-2xl max-h-[90vh] my-auto mx-auto overflow-y-auto">
      <div className="rounded-xl w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Reviewer Details</h2>

        <div className="my-4">
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold">Title:</p>
            <p className="text-sm text-muted-foreground">{review?.title}</p>
          </div>
          <div className="">
            <p className="text-base font-semibold">Full Review:</p>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {review?.fullContent}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold">Suggestions:</p>
            <p className="text-sm text-muted-foreground">
              {review?.previewContent}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Rating: {review?.rating} / 5</p>
          <p className="text-sm text-gray-500">
            Purchase Source: {review?.purchaseSource}
          </p>
          <p className="text-sm text-gray-500">
            Email: {review?.account.email}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            Status:
            {review?.status === "APPROVED" ? (
              <Badge className="bg-yellow-100 text-blue-600"> Published</Badge>
            ) : review?.status === "PENDING" ? (
              <Badge className="bg-cyan-200 text-black "> Pending</Badge>
            ) : (
              <Badge className="bg-red-100 text-red-600"> Rejected</Badge>
            )}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            {" "}
            Review Category:
            {review?.isPremium ? (
              <Badge className="bg-yellow-100 text-blue-600">Premium</Badge>
            ) : (
              <Badge className="bg-red-100 text-red-600">Standard</Badge>
            )}
          </p>

          <div className="my-4">
            <p className="text-base font-semibold">Product:</p>
            <p className="text-sm">
              {review?.product?.name} - ${review?.product.price}
            </p>
            <p className="text-sm text-muted-foreground">
              {review?.product?.description}
            </p>
          </div>

          {(review?.images ?? []).length > 0 && (
            <div className="grid grid-cols-2 gap-2 my-4">
              {review?.images.map((img: string, idx: number) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Review Image ${idx + 1}`}
                  width={200}
                  height={150}
                  className="rounded-md object-cover"
                />
              ))}
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-2">
            Votes: {review?._count.votes} | Comments:{" "}
            {review?._count.ReviewComment}
          </p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-2 bg-gray-400 hover:bg-red-600 text-white hover:duration-300 hover:cursor-pointer rounded"
          >
            Cancel
          </button>
          <button
            disabled={review?.isPremium}
            onClick={() => handlePremium(review?.id as string)}
            className="px-2 bg-white border-2 border-yellow-500 text-black disabled:bg-white disabled:hover:bg-white disabled:hover:text-black hover:bg-yellow-500 duration-300 hover:text-white hover:cursor-pointer rounded"
          >
            {review?.isPremium ? (
              <Badge className="bg-yellow-100 text-blue-600">Premium</Badge>
            ) : (
              "Mark as Premium"
            )}
          </button>
          <button
            onClick={() => handlePublish(review?.id as string)}
            disabled={review?.status === "APPROVED"}
            className="px-2 bg-white border-2 border-yellow-500 text-black hover:bg-yellow-500 duration-300 hover:text-white hover:cursor-pointer rounded disabled:bg-white disabled:hover:bg-white disabled:hover:text-black"
          >
            {review?.status === "PENDING" ? "Publish" : "Published"}
          </button>
        </div>
      </div>
    </div>
  );
}
