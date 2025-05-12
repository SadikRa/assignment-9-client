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
import { createProduct } from "@/services/Product";
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

interface ProductFormValues {
  name: string;
  price: string;
  description: string;
  category: "GADGETS" | "CLOTHING" | "BOOKS";
  imageUrl?: string;
}

export default function CreateProductForm() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "GADGETS",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
<<<<<<< HEAD
=======
    // if (!imageFile) {
    //   toast.error("Please upload a product image");
    //   return;
    // }

    const productData = {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
      category: data.category,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(productData));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    const toastId = toast.loading("Creating product...");
>>>>>>> fddf5633a97790a7964e2a81c327ad5348accb80
    try {
      if (!imageFile) {
        toast.error("Please upload a product image");
        return;
      }

      const productData = {
        name: data.name,
        price: parseFloat(data.price),
        description: data.description,
        category: data.category,
        imageUrl: imageFile,
      };

      const res = await createProduct(productData);

      if (res?.success) {
<<<<<<< HEAD
        toast.success("Product created successfully");
        router.push("/dashboard/admin/product");
=======
        // console.log(res);
        toast.success("Product created successfully", {
          id: toastId,
        });
        router.push("/dashboard");
>>>>>>> fddf5633a97790a7964e2a81c327ad5348accb80
      } else {
        console.log(res);
        toast.error(res?.message || "Failed to create product", {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("An error occurred while creating the product", {
        id: toastId,
      });
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create New Product</CardTitle>
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
                  label="Upload Image"
                />
                {imagePreview && (
                  <ImagePreviewer
                    imagePreview={[imagePreview]}
                    setImagePreview={(prev) =>
                      Array.isArray(prev) ? prev[0] || null : null
                    }
                    setImageFiles={(prev) => {
                      if (Array.isArray(prev)) {
                        setImageFile(prev[0] || null);
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              size="lg"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting || isUploading ? "Processing..." : "Create Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
