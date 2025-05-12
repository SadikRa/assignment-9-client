"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  account: {
    email: string;
  };
  review: {
    title: string;
  };
  createdAt: string;
};

export const PaymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "review.title",
    header: "Review Title",
    cell: ({ row }) => row.original.review?.title || "N/A",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `${row.getValue("amount")} ${row.original.currency}`,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
];
