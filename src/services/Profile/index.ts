/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

// get My Profile
export const getMyProfile = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update profile yet to ready
// export const updateProduct = async (
//   productData: FieldValues,
//   productId: string
// ): Promise<any> => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/product/update-product/${productId}`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: (await cookies()).get("accessToken")!.value,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(productData),
//       }
//     );
//     revalidateTag("PRODUCT");
//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };
