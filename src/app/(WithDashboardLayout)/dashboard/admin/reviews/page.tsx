import ManageReviewTable from "@/components/modules/dashboard/dashboard-review";
import { getAllReviews } from "@/services/Review";
import { IReviews } from "@/types/reviews";
import React from "react";

const ReviewCommentPage = async () => {
  try {
    const response = await getAllReviews();
    const reviews: IReviews[] = response?.data || [];

    const reviewsNotDeleted = reviews.filter(
      (review: IReviews) => review.isDeleted === false
    );

    return (
      <div className="container mx-auto px-4 py-8">
        <ManageReviewTable reviews={reviewsNotDeleted} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500 text-center">Failed to load reviews.</p>
      </div>
    );
  }
};

export default ReviewCommentPage;
