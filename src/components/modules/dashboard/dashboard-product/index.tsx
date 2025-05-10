"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { NMTable } from "@/components/ui/core/NMTable";
import { deleteProduct } from "@/services/Product";
import { toast } from "sonner";

const ManageProductsTable = ({ products }: { products: IProduct[] }) => {
  const router = useRouter();

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
    },
    {
      accessorKey: "category",
      header: "Category",
    },

    {
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        });
      },
      header: "Created At",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;

        const handleDelete = async (id: string) => {
          const toastId = toast.loading("Deleting product...");
          try {
            const res = await deleteProduct(id);
            console.log(res);
            if (res.success) {
              toast.success("Product deleted successfully", {
                id: toastId,
              });
            }
          } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete product", {
              id: toastId,
            });
          }
        };

        return (
          <div className="flex gap-2">
            <Button
              className="cursor-pointer"
              size="sm"
              variant="outline"
              onClick={() =>
                router.push(`/dashboard/product/update-product/${product.id}`)
              }
            >
              Edit
            </Button>
            <Button
              className="cursor-pointer"
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <Button
          onClick={() => router.push("/dashboard/product/create-product")}
          size="sm"
        >
          Add Product
        </Button>
      </div>
      <NMTable columns={columns} data={products || []} />
    </div>
  );
};

export default ManageProductsTable;
