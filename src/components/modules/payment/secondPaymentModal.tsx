/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PaymentModal.tsx
"use client";

import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import { createPaymentForPremiumReview } from "@/services/payment";
import { makePremium } from "@/services/Review";
import { DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { FaDollarSign } from "react-icons/fa";
import { toast } from "sonner";

type PaymentForm = {
  amount: number;
  transactionId: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
};

type Props = {
  review: any;
  isOpen: boolean;
  onClose: () => void;
};

export default function SecondPaymentModal({ review, isOpen, onClose }: Props) {
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<PaymentForm>({});

  const handlePayment = async (data: any) => {
    toast.loading("Navigating to payment getway", { id: "paymentToastId" });
    try {
      const paymentUrl = await createPaymentForPremiumReview(review.id, data);
      const result = await makePremium(review.id, { isPremium: true });
      console.log(result);
      console.log("Payment URL:", paymentUrl);
      if (paymentUrl.data) {
        window.location.href = await paymentUrl.data.paymentUrl; // Redirect the user
        toast.loading("Navigating please wait...", { id: "paymentToastId" });
      } else {
        toast.error("Payment URL not received", { id: "paymentToastId" });
      }
    } catch (error) {
      toast.error(`Error during payment process: ${error}`, {
        id: "paymentToastId",
      });
    }
  };

  const onSubmit = async (data: PaymentForm) => {
    console.log("Payment Info:", data);
    try {
      const result = await handlePayment(data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Mark This Review As Premium
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex justify-center items-center">
            <Label>
              <DollarSign></DollarSign>
            </Label>
            <input
              {...register("amount")}
              type="number"
              className="w-full px-4 py-2 border-none rounded "
              placeholder="Amount"
              value={review?.premiumPrice}
              readOnly
            />
          </div>
          <input
            {...register("transactionId")}
            className="w-full px-4 py-2 border rounded"
            placeholder="Transaction ID"
            value={`txn_id_${Math.floor(Math.random() * 1000000000)}`}
            readOnly
          />
          <input
            {...register("name")}
            className="w-full px-4 py-2 border rounded"
            placeholder="Name"
            defaultValue={user?.user?.name}
            required
          />
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-2 border rounded"
            placeholder="Email"
            defaultValue={user?.email}
            readOnly
          />
          <input
            {...register("address")}
            className="w-full px-4 py-2 border rounded"
            placeholder="Address"
            required
          />
          <input
            {...register("phoneNumber")}
            className="w-full px-4 py-2 border rounded"
            placeholder="Phone Number"
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 hover:bg-red-600 text-white hover:duration-300 hover:cursor-pointer rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-white border-2 border-yellow-500 text-black hover:bg-yellow-500 duration-300 hover:text-white hover:cursor-pointer rounded flex justify-center items-center"
            >
              Mark as Premium at <FaDollarSign className="w-4 h-4" />
              {review.premiumPrice}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
