import Label from '@/app/ui/label/Label';
import React, { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateAddressSchema } from '@/schema';
import { toast } from 'sonner';
import { Address } from '@/lib/definations';
import { updateAddress } from '@/action/address';
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner';

interface AddressProps {
  address: Address, 
  setOpenAddress: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateAddress: React.FC<AddressProps> = ({ address, setOpenAddress}) => {
  const [isPending, startTransition] = useTransition();
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: {errors}, 
  } = useForm<Address>({
    resolver: zodResolver(UpdateAddressSchema),
    defaultValues: address as Address,
  })


  async function handleAddressSubmit(data:Address){
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
    reset(address);  // Update form with the new address
  }, [address, reset]);

  return (
    <div className='bg-gray-50 p-4 max-sm:px-0'>
       <div className='w-[60%] max-md:w-full'>
        <h2 className='text-[16px] font-bold text-gray-800 mb-2'>Edit Address</h2>
       <form onSubmit={handleSubmit(handleAddressSubmit)}>
        
            <div className='mb-4'>
                <Label htmlFor="completeAddress" title="Colony / Area" />
                <textarea
                {...register("completeAddress")}
                id="completeAddress"
                rows={3}
                placeholder="Type code in capital"
                className='w-full py-2 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
                />
                {
                errors.completeAddress && (
                <p className='text-red-500 text-[13px]'>{errors.completeAddress.message}</p>
                )
                }
            </div>
            
            <div className='flex max-sm:block gap-4 mb-4'>
                <div className='w-1/2 max-sm:w-full'>
                    <Label htmlFor="phone" title="Phone Number" />
                    <input
                        {...register("phone")} 
                        id="phone"
                        type="number"
                        name='phone'
                        placeholder='+91 00000 00000'
                        className='w-full py-2 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
                    />
                    {errors.phone && (
                        <p className='text-red-500 text-[13px]'>{errors.phone.message}</p>
                    )}
                </div>
        

                <div className='w-1/2 max-sm:w-full'>
                <Label htmlFor="city" title="City" />
                <input
                    {...register("city")}
                    type="text"
                    id="city"
                    name="city"
                    placeholder="city"
                    className='w-full py-2 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
                />
                {
                errors.city && (
                    <p className='text-red-500 text-[13px]'>{errors.city.message}</p>
                )
                }
                </div>
            </div>

            <div className='flex max-sm:block gap-4 mb-4'>
                <div className='w-1/2 max-sm:w-full'>
                <Label htmlFor="state" title="State" />
                <input
                    {...register("state")}
                    type="text"
                    id="state"
                    name="state"
                    placeholder="state"
                    className='w-full py-2 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
                />
                {
                errors.state && (
                    <p className='text-red-500 text-[13px]'>{errors.state.message}</p>
                )
                }
                </div>
                <div className='w-1/2 max-sm:w-full'>
                <Label htmlFor="city" title="Pin Code" />
                <input
                    {...register("pinCode")}
                    type="number"
                    id="pinCode"
                    name="pinCode"
                    placeholder="000 000"
                    className='w-full py-2 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
                />
                {
                errors.pinCode && (
                    <p className='text-red-500 text-[13px]'>{errors.pinCode.message}</p>
                )
                }
                </div>
            </div>

            <div className='mb-4'>
            <Label htmlFor="disc" title="Nearby Landmark ( Optional ? )" />
            <input
                {...register("nearbyLandmark")}
                type="text"
                id="disc"
                name="nearbyLandmark"
                placeholder="Nearby Landmark"
                className='w-full py-2 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
            />
            {
            errors.nearbyLandmark && (
                <p className='text-red-500 text-[13px]'>{errors.nearbyLandmark.message}</p>
            )
            }
            </div>
       

        <div className='mt-4 flex gap-4 items-center'>
            <div className='w-1/5 h-10'>
            <ButtonWithSpinner loading={isPending}>
              Update
            </ButtonWithSpinner>
            </div>
            <div 
            onClick={()=>setOpenAddress(false)}
            className="cursor-pointer bg-white text-[#333] border border-gray-400 px-4 py-2 rounded-md transition">
            Cancle
            </div>
        </div>
        </form>
       </div>
    </div>
  );
};

export default UpdateAddress;