"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";

const ErrorToaster = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(error);
      // Clean up the URL by removing the error parameter
      const params = new URLSearchParams(searchParams);
      params.delete("error");
      router.replace(
        `${window.location.pathname}?${params.toString()}`,
        undefined
      );
    }
  }, [searchParams, router]);

  return null;
};

export default ErrorToaster;
