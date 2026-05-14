"use client";
import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { CiLocationOn } from "react-icons/ci";
import UpdateAddress from "@/app/ui/homePage/profile/address/UpdateAddress";
// const UpdateAddress = dynamic(()=> import('@/app/ui/homePage/profile/address/UpdateAddress'),{ssr:false})
const AddressForm = dynamic(
  () => import("@/app/ui/homePage/profile/address/AddressForm"),
  { ssr: false },
);
import { UserProfile } from "@/lib/definations";
import clsx from "clsx";
import { FaPlus } from "react-icons/fa6";
import { deleteAddress } from "@/action/address";
import { toast } from "sonner";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";
import { add } from "date-fns";

type UserProps = {
  user: UserProfile | any;
};

const Addresses: React.FC<UserProps> = ({ user }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openAddress, setOpenAddress] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete=(id:string)=>{
     startTransition(() => {
        deleteAddress(id)
      .then((res)=>{
        if (res?.success) toast.success(res.success)
        if(res?.error) toast.error(res.error)
      }).catch(()=>{
        toast.error('Error something wrong 😢');
      })
    });
  }

  return (
    <div className="p-6 max-sm:px-2 max-sm:py-4">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className={`text-[16px] font-bold text-gray-800`}>
          Manage Address
        </h2>
        <div>
          <div
            onClick={() => setAddAddress(!addAddress)}
            className="cursor-pointer flex gap-4 items-center border border-gray-200 px-4 p-3 text-blue-500"
          >
            <FaPlus />
            <p>Add Address</p>
          </div>
        </div>

        <div
          className={clsx(
            "w-full absolute -top-[100%] right-0 opacity-0 transition duration-300 ease-in-out",
            {
              "relative transition duration-300 ease-in-out opacity-100":
                addAddress === true,
            },
          )}
        >
          <AddressForm userId={user?.id} setOpenAddress={setAddAddress} />
        </div>
      </div>

      {user?.address?.map((addr: any) => (
        <div
          key={addr.id}
          className="border border-gray px-4 p-3 flex justify-between items-center"
        >
          <div>
            <span className="bg-gray py-1 px-2 text-[13px] text-black font-semibold rounded-md">
              {addr.addressType}
            </span>
            <p className="text-[14px] font-bold">{user?.name}</p>

            <p className="text-[13px] text-gray-600">
              {addr.address}, {addr.landmark}, {addr.city}, {addr.state},{" "}
              {addr.pinCode}
            </p>
          </div>

          <div className="flex gap-6">
            <button
              onClick={() => {
                setSelectedAddress(addr);
                setOpenAddress(!openAddress);
              }}
              className="text-blue text-sm"
            >
              Edit
            </button>
            <form onSubmit={()=>handleDelete(addr.id)}>
                <ButtonWithSpinner loading={isPending}>Delete</ButtonWithSpinner>
            </form>
          </div>
        </div>
      ))}

      {openAddress && selectedAddress && (
        <div className="mt-4">
          <UpdateAddress
            address={selectedAddress}
            setOpenAddress={setOpenAddress}
          />
        </div>
      )}
    </div>
  );
};

export default Addresses;
