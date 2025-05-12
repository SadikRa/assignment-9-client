"use client";

import { Badge } from "@/components/ui/badge";
import { deleteReview } from "@/services/Review";
import { IReviews } from "@/types/reviews";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export const ReviewColumns: ColumnDef<IReviews>[] = [
  {
    accessorKey: "review.title",
    header: "Review Title",
    cell: ({ row }) => row.original.title || "N/A",
  },
  {
    accessorKey: "previewContent",
    header: "Suggestions",
  },
  {
    accessorKey: "fullContent",
    header: "Comment",
  },

  {
    accessorKey: "status",
    header: "Status",
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
            <Badge className="bg-red-500 text-white rounded-sm">Rejected</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
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
              console.log(res);
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

      return (
        <div className="flex gap-2 text-center">
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
