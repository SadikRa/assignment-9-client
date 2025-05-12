import { getAllPayments } from "@/services/payment";

import { NMTable } from "@/components/ui/core/NMTable";
import { Payment } from "@/components/modules/dashboard/admin/dashboard-payment";
import { getMyProfile } from "@/services/Profile";
import { PaymentColumns } from "@/components/modules/dashboard/user/paymnet";

const Page = async () => {
  const { data: myProfile } = await getMyProfile();
  // console.log(myProfile);
  const { data: PaymentData } = await getAllPayments();
  const myPayments = PaymentData.filter(
    (myPay: Payment) => myPay.account.email == (myProfile?.email as string)
  );
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Analytics</h1>
      <NMTable columns={PaymentColumns} data={myPayments} />
    </div>
  );
};

export default Page;
