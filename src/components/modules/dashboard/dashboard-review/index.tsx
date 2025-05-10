"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { NMTable } from "@/components/ui/core/NMTable";
import { IReviews } from "@/types/reviews";
import { Eye, PenLine, Trash2 } from "lucide-react";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useState } from "react";
import ReviewModal from "../../reviews/reviewModal";
import { Badge } from "@/components/ui/badge";

const ManageReviewTable = ({ reviews }: { reviews: IReviews[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<IReviews | null>(null);
  const router = useRouter();

  const columns: ColumnDef<IReviews>[] = [
    {
      accessorKey: "title",
      header: "Comment Summary",
    },
    {
      accessorKey: "previewContent",
      header: "Suggestions",
    },
    {
      accessorKey: "rating",
      header: "Ratings",
    },
    {
      accessorKey: "isPremium",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center justify-center">
            {item.isPremium ? (
              <Badge className="bg-blue-400 text-white rounded-sm">
                Premium
              </Badge>
            ) : (
              <Badge variant="default">Standard</Badge>
            )}
          </div>
        );
      },
      header: "Is Premium",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;

        const handleDelete = async () => {
          try {
            const res = await fetch(`/api/product/${item.id}`, {
              method: "DELETE",
            });

            if (res.ok) {
              window.location.reload();
            } else {
              alert("Failed to delete the product.");
            }
          } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting product.");
          }
        };

        return (
          <div className="flex gap-2 text-center">
            <Tooltip>
              <TooltipTrigger>
                <p
                  className="cursor-pointer w-8 bg-gray-200 p-1 rounded-sm"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedReview(item);
                  }}
                >
                  <Eye />
                </p>
              </TooltipTrigger>
              <TooltipContent>View Full Review</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <p
                  className="cursor-pointer w-8 bg-gray-200 p-1 rounded-sm"
                  onClick={() =>
                    router.push(
                      `/dashboard/admin/product/update-product/${item.id}`
                    )
                  }
                >
                  <PenLine />
                </p>
              </TooltipTrigger>
              <TooltipContent>Review Comment</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <p
                  className="cursor-pointer duration-300 hover:text-red-500"
                  onClick={handleDelete}
                >
                  <Trash2 />
                </p>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Reviews </h1>
      </div>
      <NMTable columns={columns} data={reviews || []} />
      <ReviewModal
        review={selectedReview}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ManageReviewTable;
