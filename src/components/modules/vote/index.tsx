"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import VoteCard from "@/components/ui/core/VoteCard";
import { Vote } from "@/types";

const AllVotes = ({ votes }: { votes: Vote[] }) => {
  return (
    <div className="flex lg:flex-row flex-col justify-start items-start gap-8 my-10 mt-20">
      <div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {votes?.map((vote: any, idx: number) => (
            <VoteCard key={idx} vote={vote} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllVotes;
