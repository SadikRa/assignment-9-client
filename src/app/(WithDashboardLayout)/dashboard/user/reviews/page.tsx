import { ReviewColumns } from "@/components/modules/dashboard/user/review";
import { NMTable } from "@/components/ui/core/NMTable";
import { getMyProfile } from "@/services/Profile";
import { getAllReviews } from "@/services/Review";
import { IReviews } from "@/types/reviews";
import React from "react";

const ReviewCommentPage = async () => {
  const { data: myProfile } = await getMyProfile();
  // console.log(myProfile);
  try {
    const response = await getAllReviews();
    const reviews: IReviews[] = response?.data || [];
    const reviewsNotDeleted = reviews.filter(
      (review: IReviews) => review.isDeleted === false
    );
    // console.log(reviewsNotDeleted);
    const myReviews = reviewsNotDeleted.filter(
      (rev) => rev.account.email == myProfile?.email
    );
    console.log(myReviews);
    return (
      <div className="container mx-auto px-4 py-8">
        <NMTable columns={ReviewColumns} data={myReviews} />
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
