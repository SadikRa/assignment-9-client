"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProduct } from "@/services/Product";

interface ProductFormValues {
  name: string;
  price: string;
  description: string;
  category: "GADGETS" | "CLOTHING" | "BOOKS";
}

interface UpdateProductFormProps {
  productId: string;
  initialData: ProductFormValues;
  existingImageUrl?: string;
}

export default function UpdateProductForm({
  productId,
  initialData,
  existingImageUrl,
}: UpdateProductFormProps) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    existingImageUrl || null
  );

  const form = useForm<ProductFormValues>({
    defaultValues: initialData,
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await updateProduct(formData, productId);
      if (res?.success) {
        toast.success("Product updated successfully");
        router.push("/dashboard/products");
      } else {
        toast.error(res?.message || "Failed to update product");
      }
    } catch (err) {
      toast.error("An error occurred while updating the product");
      console.error(err);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Update Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GADGETS">Gadgets</SelectItem>
                        <SelectItem value="CLOTHING">Clothing</SelectItem>
                        <SelectItem value="BOOKS">Books</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Enter product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel>Product Image</FormLabel>
              <div className="flex flex-col gap-4 md:flex-row">
                <NMImageUploader
                  setImageFiles={setImageFile}
                  setImagePreview={setImagePreview}
                  label="Upload New Image (optional)"
                />
                {imagePreview && (
                  <ImagePreviewer
                    imagePreview={[imagePreview]}
                    setImagePreview={(prev) => setImagePreview(prev[0] || null)}
                    setImageFiles={(prev) => setImageFile(prev[0] || null)}
                  />
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
