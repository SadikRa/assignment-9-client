"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Vote } from "@/types";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VoteCard = ({ vote }: { vote: Vote }) => {
  return (
    <div>
      <Card className="p-3 w-64">
        <CardHeader className="relative p-0 h-48">
          <Link href={`/reviews/${vote.reviewId}`} passHref>
            <Image
              src={
                vote?.review?.imageUrl ||
                "https://res.cloudinary.com/divyajujl/image/upload/v1746550148/online-learning-design-concept-top-view-student-table-with-tablet-headphone-stationeries-blue-table-background-1536x1025_u6sboo.jpg"
              }
              width={500}
              height={500}
              alt="review image"
              className="rounded-sm h-48 object-cover hover:scale-105 duration-500"
            />
          </Link>
        </CardHeader>

        <CardContent className="p-0 mt-2 text-gray-600">
          <CardTitle
            title={vote?.review?.title || ""}
            className="font-semibold cursor-pointer text-base hover:text-yellow-500 duration-300"
          >
            {vote?.review?.title
              ? vote.review.title.length > 30
                ? vote.review.title.slice(0, 30) + "..."
                : vote.review.title
              : "Untitled Review"}
          </CardTitle>

          <div className="flex items-center justify-between my-2">
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <ThumbsUp className="w-4 h-4 text-green-600" />
              {vote.upVote}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <ThumbsDown className="w-4 h-4 text-red-600" />
              {vote.downVote}
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Voted on: {new Date(vote.createdAt).toLocaleDateString()}
          </p>
        </CardContent>

        <CardFooter className="block p-0 mt-3">
          <div className="flex gap-2 items-center justify-center">
            <Link href={`/reviews/${vote.reviewId}`} passHref>
              <Button
                size="sm"
                variant="outline"
                className="w-32 cursor-pointer text-center flex items-center justify-center"
              >
                View Review
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VoteCard;
