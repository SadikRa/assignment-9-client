"use client";

import { Vote } from "@/types";
import Image from "next/image";
import { TbFileLike, TbFileDislike } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function VoteDetails({ vote }: { vote: Vote }) {
  if (!vote) {
    return <p className="text-center text-gray-500">Vote not found.</p>;
  }

  const { upVote, downVote, createdAt, updatedAt, review, accountId } = vote;

  return (
    <Card className="max-w-3xl mx-auto mt-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Vote Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {review && (
          <div className="flex items-start gap-4">
            {review.imageUrl ? (
              <div className="w-24 h-24 relative rounded overflow-hidden border">
                <Image
                  src={review.imageUrl}
                  alt={review.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-100 text-gray-500 border rounded">
                No Image
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-gray-700">
                Review Title:
              </p>
              <p className="text-gray-900">{review.title}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-6 text-lg">
          <span className="flex items-center gap-2 text-green-600 font-semibold">
            <TbFileLike className="w-6 h-6" />
            Upvote: {upVote}
          </span>
          <span className="flex items-center gap-2 text-red-600 font-semibold">
            <TbFileDislike className="w-6 h-6" />
            Downvote: {downVote}
          </span>
        </div>

        <div className="text-gray-700">
          <p>
            <strong>Voter Account ID:</strong> {accountId}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {format(new Date(createdAt), "dd MMM yyyy, hh:mm a")}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {format(new Date(updatedAt), "dd MMM yyyy, hh:mm a")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
