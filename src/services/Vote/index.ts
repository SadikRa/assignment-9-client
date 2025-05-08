/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

// Create vote
export const createVote = async (voteData: {
  reviewId: string;
  upVote: number;
  downVote: number;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/vote/create-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(voteData),
      }
    );
    revalidateTag("VOTE");
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get All Votes
export const getAllVotes = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/vote`, {
      next: { tags: ["VOTE"] },
    });
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get single vote by ID
export const getAVote = async (voteId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/vote/${voteId}`,
      {
        next: { tags: ["VOTE"] },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Update vote
export const updateVote = async (
  voteId: string,
  voteData: { upVote?: number; downVote?: number }
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/vote/update-vote/${voteId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(voteData),
      }
    );
    revalidateTag("VOTE");
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Delete vote
export const deleteVote = async (voteId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/vote/delete-vote/${voteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("VOTE");
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};
