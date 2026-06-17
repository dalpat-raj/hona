import Link from "next/link";
import { db } from "@/lib/db";

export default async function Page({
  params,
}: {
  params: Promise<{
    orderId: string;
  }>;
}) {
  const { orderId } = await params;

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: true,
      payment: true,
      shipment: true,
      address: true,
      user: true,
    },
  });

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
      <div className="max-w-4xl mx-auto p-8">
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h1 className="text-3xl font-bold text-green-700">
          Order Placed Successfully
        </h1>

        <p className="mt-2">
          Order Number:
          <strong>
            {order.orderNumber}
          </strong>
        </p>

        <p>
          Payment Status:
          <strong>
            {order.paymentStatus}
          </strong>
        </p>

        <p>
          Order Status:
          <strong>{order.status}</strong>
        </p>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-xl mb-4">
          Products
        </h2>

        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-4"
          >
            <div>
              <h3>{item.productName}</h3>

              <p>
                Qty: {item.quantity}
              </p>
            </div>

            <div>
              ₹{Number(item.total)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p>
          Total Amount:
          <strong>
            ₹{Number(order.totalAmount)}
          </strong>
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}