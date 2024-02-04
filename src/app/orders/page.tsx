import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";

const OrdersPage = async () => {
  const user = getServerSession(authOptions);
  if (!user) {
    // TODO SHOW ACCESS DENIED
    return <p>Access Denied</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: { userId: (user as any).id },
    include: { orderProducts: true },
  });
  return (
    <div className="p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant={"outline"}
      >
        <PackageSearchIcon size={16} />
        My Orders {orders.length}
      </Badge>
      <div className="flex flex-col gap-5">
        {orders.length > 0 ? (
          orders.map((orderItem) => (
            <OrderItem key={orderItem.id} order={orderItem} />
          ))
        ) : (
          <p>You Don't have orders</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
