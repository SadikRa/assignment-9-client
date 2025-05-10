import ManageReviewTable from "@/components/modules/dashboard/dashboard-review";
import { getAllReviews } from "@/services/Review";
import React from "react";

const reviewComment = async () => {
  const allReviews = await getAllReviews();
  console.log(allReviews.data);
  return (
    <div>
      <ManageReviewTable reviews={allReviews.data} />
    </div>
  );
};

export default reviewComment;
