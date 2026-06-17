import { getOrderDetails } from "@/lib/data";
import Summary from "@/app/ui/dashboard/orders/orderDetails/orderSummary/Summary";
import Items from "@/app/ui/dashboard/orders/orderDetails/OrderItems/Items";
import User from "@/app/ui/dashboard/orders/orderDetails/OrderUser/User";
import Status from "@/app/ui/dashboard/orders/orderDetails/orderStatus/Status";
import Addresses from "@/app/ui/dashboard/orders/orderDetails/DeliveryAddress/Address";
import { TiMessages } from "react-icons/ti";
import Link from "next/link";

const OrderDetail = async ({ id }: { id: string }) => {
  const { order } = await getOrderDetails(id);

  return (
    <div className="p-4 h-full">
      <div className=" h-full">
        <div className="bg-white  p-2 rounded-lg shadow-custom-shadow max-md:col-span-2">
          <div className="flex justify-between items-center gap-4">
            <h2 className={`flex gap-2 text-[16px] font-bold text-gray-800`}>
              Order Number <p>#{order?.orderNumber}</p>
            </h2>
            <button className="flex items-center gap-1 bg-[#111827] py-1 px-2 rounded-lg text-[14px] text-white">
              <TiMessages size={18} />
              Message Customer
            </button>
          </div>
        </div>

        <div className="w-full flex justify-between max-md:flex-col items-start gap-4 mt-4">
          <div className="bg-white w-full  p-2 rounded-lg shadow-custom-shadow">
            <div className="">
              <h2 className="text-[16px] font-bold text-gray-800">Payment</h2>
              <div className="flex justify-between items-center">
                <p className="text-[14px] font-semibold text-gray-600">
                Payment Method
              </p>
              <p className="text-[14px]">{order.paymentMethod}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[14px] font-semibold text-gray-600">
                Payment Status
              </p>
              <p className="text-[14px]">{order.paymentStatus}</p>
              </div>
              <div className="flex justify-between items-center">
              <p className="text-[14px] font-semibold text-gray-600">
                Razorpay Order ID 
              </p>
                <p className="text-[14px]">{order.razorpayOrderId}</p>
              </div>
              <p className="text-[14px] font-semibold text-gray-600">
                Razorpay Payment ID {}
              </p>
            </div>
          </div>
          <div className="bg-white w-full  p-2 rounded-lg shadow-custom-shadow">
            <Summary order={order} />
          </div>
          <div className="w-full">
            {order?.paymentStatus === "PAID" && (
              <div className="bg-white rounded-lg shadow-custom-shadow overflow-hidden ">
                <Link href={order.shipment?.invoiceUrl}  target="_blank">Download Invoice</Link>
                <Link href={order.shipment?.labelUrl} target="_blank">Download Label</Link>
              </div>
            )}

            <div className="mt-4 bg-white rounded-lg shadow-custom-shadow overflow-hidden ">
              <Status order={order} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start gap-4 mt-4">
          <div className="bg-white w-full p-2 rounded-md shadow-custom-shadow ">
            <Addresses address={order.address} />
          </div>
          <div className="bg-white w-full  p-2 rounded-md shadow-custom-shadow ">
            <div>
              <div className="mb-2">
                <h2 className="text-[16px] font-bold text-gray-800">
                  Shipment Details
                </h2>
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  AWB Code:
                </p>
                {/* <p className="text-[14px] text-gray-600">{address?.address}</p> */}
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Courier Name:
                </p>
                {/* <p className="text-[14px] text-gray-600">{address?.landmark}</p> */}
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Shipment Status:
                </p>
                {/* <p className="text-[14px] text-gray-600">{address?.city}</p> */}
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Shiprocket Order ID:
                </p>
                {/* <p className="text-[14px] text-gray-600">{address?.state}</p> */}
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Shipment ID:
                </p>
                {/* <p className="text-[14px] text-gray-600">{address?.pinCode}</p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-custom-shadow max-md:col-span-2">
          <Items order={order} />
        </div>

        <div className="bg-white p-2 rounded-lg shadow-custom-shadow max-md:col-span-1 max-md:row-span-2 max-md:row-start-6  max-md:col-start-2">
          <User users={order?.user} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
