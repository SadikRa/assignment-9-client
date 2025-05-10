import ManageReviewTable from "@/components/modules/dashboard/dashboard-review";
import { getAllReviews } from "@/services/Review";
import { IReviews } from "@/types/reviews";
import React from "react";

const reviewComment = async () => {
  const allReviews = await getAllReviews();
  const reviewsNotDeleted = allReviews.data.filter(
    (review: IReviews) => review.isDeleted === false
  );
  // console.log(allReviews.data);
  return (
    <div>
      <ManageReviewTable reviews={reviewsNotDeleted} />
    </div>
  );
};

export default reviewComment;
