"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { NMTable } from "@/components/ui/core/NMTable";

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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;

        const handleDelete = async () => {
          try {
            const res = await fetch(`/api/product/${product.id}`, {
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
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                router.push(
                  `/dashboard/admin/product/update-product/${product.id}`
                )
              }
            >
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={handleDelete}>
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
          onClick={() => router.push("/dashboard/admin/product/create-product")}
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
