"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { NMTable } from "@/components/ui/core/NMTable";
import { IReviews } from "@/types/reviews";
import { Eye, PenLine, Trash2 } from "lucide-react";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteReview } from "@/services/Review";
import Swal from "sweetalert2";
import ReviewModal from "@/components/modules/reviews/reviewModal";

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
      accessorKey: "status",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center justify-center">
            {item.status === "APPROVED" ? (
              <Badge className="bg-blue-400 text-white rounded-sm">
                Published
              </Badge>
            ) : item.status === "PENDING" ? (
              <Badge className="bg-black text-white rounded-sm">Pending</Badge>
            ) : (
              <Badge className="bg-red-500 text-white rounded-sm">
                Rejected
              </Badge>
            )}
          </div>
        );
      },
      header: "Status",
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

        const handleDelete = async (id: string) => {
          // console.log(id);

          Swal.fire({
            title: "Want to delete this review?",
            text: "You won't be able to revert this!",
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
              const toastId = toast.loading("Deleting Review...");
              try {
                const res = await deleteReview(id);
                // console.log(res);
                if (res.success) {
                  toast.success("Review deleted successfully", {
                    id: toastId,
                  });
                }
              } catch (err) {
                console.error("Delete error:", err);
                toast.error("Failed to delete Review", {
                  id: toastId,
                });
              }
            }
          });
        };

        // const handleDelete = async (id: string) => {
        //   const toastId = toast.loading("Deleting Review...");
        //   try {
        //     const res = await deleteReview(id);
        //     console.log(res);
        //     if (res.success) {
        //       toast.success("Review deleted successfully", {
        //         id: toastId,
        //       });
        //     }
        //   } catch (error) {
        //     console.error("Delete error:", error);
        //     toast.error("Failed to delete Review", {
        //       id: toastId,
        //     });
        //   }
        // };

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
                  onClick={() => handleDelete(item.id)}
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
