/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createPayment = async (cusomerData: FieldValues): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/init-payment`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cusomerData),
      }
    );
    revalidateTag("PAYMENT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const createPaymentForPremiumReview = async (
  reviewId: string,
  cusomerData: FieldValues
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${reviewId}/init-payment`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cusomerData),
      }
    );
    revalidateTag("PAYMENT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get all payments
export const getAllPayments = async (page?: string, limit?: string) => {
  const params = new URLSearchParams();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          tags: ["PAYMENT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
