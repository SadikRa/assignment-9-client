import { getAllPayments } from "@/services/payment";

import { NMTable } from "@/components/ui/core/NMTable";
import { PaymentColumns } from "@/components/modules/dashboard/admin/dashboard-payment";

const Page = async () => {
  const { data: PaymentData } = await getAllPayments();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Analytics</h1>
      <NMTable columns={PaymentColumns} data={PaymentData} />
    </div>
  );
};

export default Page;
