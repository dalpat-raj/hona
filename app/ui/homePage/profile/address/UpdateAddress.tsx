import Label from "@/app/ui/label/Label";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAddressSchema } from "@/schema";
import { toast } from "sonner";
import { Address } from "@/lib/definations";
import { updateAddress } from "@/action/address";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";

interface AddressProps {
  address: Address;
  setOpenAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateAddress: React.FC<AddressProps> = ({ address, setOpenAddress }) => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Address>({
    resolver: zodResolver(UpdateAddressSchema),
    defaultValues: address,
  });

  async function handleAddressSubmit(data: Address) {
    startTransition(() => {
        updateAddress(address?.id ,data)
      .then((res)=>{
        if (res?.success) toast.success(res.success)
        if(res?.error) toast.error(res.error)
      }).catch(()=>{
        toast.error('Error something wrong 😢');
      }).finally(()=>{
        reset();
      })
    });
  }
  

  useEffect(() => {
    reset(address); // Update form with the new address
  }, [address, reset]);

  return (
    <div className="bg-gray-50 p-4 max-sm:px-0">
      <div className="w-[60%] max-md:w-full">
        <h2 className="text-[16px] font-bold text-gray-800 mb-2">
          Edit Address
        </h2>
        <form onSubmit={handleSubmit(handleAddressSubmit)}>
          <div className="mb-4">
            <Label htmlFor="address" title="Address Line 1" />
            <textarea
              {...register("address")}
              id="address"
              rows={3}
              placeholder="Type code in capital"
              className="w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-green text-sm text-gray-500"
            />
            {errors.address && (
              <p className="text-red-500 text-[13px]">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="flex max-sm:block gap-4 mb-4">
            <div className="w-1/2 max-sm:w-full">
              <Label htmlFor="state" title="State" />
              <input
                {...register("state")}
                type="text"
                id="state"
                placeholder="state"
                className="w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-green text-sm text-gray-500"
              />
              {errors.state && (
                <p className="text-red-500 text-[13px]">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div className="w-1/2 max-sm:w-full">
              <Label htmlFor="city" title="City" />
              <input
                {...register("city")}
                type="text"
                id="city"
                placeholder="city"
                className="w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-green text-sm text-gray-500"
              />
              {errors.city && (
                <p className="text-red-500 text-[13px]">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex max-sm:block gap-4 mb-4">
            <div className="w-1/2 max-sm:w-full">
              <Label htmlFor="disc" title="Landmark ( Optional ? )" />
              <input
                {...register("landmark")}
                type="text"
                id="disc"
                placeholder="Landmark"
                className="w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-green text-sm text-gray-500"
              />
              {errors.landmark && (
                <p className="text-red-500 text-[13px]">
                  {errors.landmark.message}
                </p>
              )}
            </div>
            <div className="w-1/2 max-sm:w-full">
              <Label htmlFor="city" title="Pin Code" />
              <input
                {...register("pinCode")}
                type="text"
                id="pinCode"
                placeholder="000 000"
                className="w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-green text-sm text-gray-500"
              />
              {errors.pinCode && (
                <p className="text-red-500 text-[13px]">
                  {errors.pinCode.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-1/2 ">
            <Label htmlFor="addressType" title="Address Type" />
            <select
              {...register("addressType")}
              id="addressType"
              className="w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-green text-sm text-black"
            >
              <option value="">Select Type</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>

            {errors.addressType && (
              <p className="text-red-500 text-[13px]">
                {errors.addressType.message}
              </p>
            )}
          </div>
          <div className="w-1/2 max-sm:w-full mt-6 mb-2 flex justify-start items-center gap-2">
            <input
              {...register("isDefault")}
              id="isDefault"
              type="checkbox"
              className="h-4 w-4"
            />
            <Label htmlFor="isDefault" title="Set as Primary Address" />
          </div>

          <div className="mt-4 flex gap-4 items-center">
            <div className="w-1/5 h-10">
              <ButtonWithSpinner loading={isPending}>Update</ButtonWithSpinner>
            </div>
            <div
              onClick={() => setOpenAddress(false)}
              className="cursor-pointer bg-white text-[#333] border border-gray-400 px-4 py-2 rounded-md transition"
            >
              Cancle
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;
