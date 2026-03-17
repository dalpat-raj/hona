import { HiOutlineBanknotes, HiOutlineUserGroup } from "react-icons/hi2";
import { FaJediOrder } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { fetchCardData } from "@/lib/data";

const iconMap = {
  revenue: HiOutlineBanknotes,
  products: MdOutlineProductionQuantityLimits,
  orders: FaJediOrder,
  customers: HiOutlineUserGroup,
};

export default async function CardWrapper() {
  // const { totalProducts, totalCustomers, totalOrders } = await fetchCardData();
  const totalProducts = 300;
  const totalCustomers = 200;
  const totalOrders = 20;

  const totalRevenue = 1;

  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Total Revenue" value={totalRevenue} type="revenue" />
      <Card title="Total Products" value={totalProducts} type="products" />
      <Card title="Total Orders" value={totalOrders} type="orders" />
      <Card title="Total Customers" value={totalCustomers} type="customers" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "revenue" | "products" | "orders" | "customers";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-100 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-4 text-center text-xl">
        {value}
      </p>
    </div>
  );
}
