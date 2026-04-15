"use client"
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneSchema } from '@/schema';
import { toast } from 'sonner';
import { PhoneUpdate } from '@/action/user';
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner';
import Link from 'next/link';

interface UserPhone {
    phone: string,
}

interface UserData {
    userId : string,
    userPhone : string,
}

const PhoneForm: React.FC<UserData> = ({userId, userPhone}) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

    const { 
      register, 
      handleSubmit, 
      formState: {errors}, 
    } = useForm<UserPhone>({
      resolver: zodResolver(PhoneSchema),
      defaultValues: {
        phone: userPhone
      }
    })
  
  
    async function handlePhoneSubmit(data:UserPhone){
      startTransition(() => {
          PhoneUpdate(data , userId)
        .then((res)=>{
          if (res?.success) toast.success(res.success)
          if(res?.error) toast.error(res.error)
        }).catch(()=>{
          toast.error('Error something wrong 😢');
        }).finally(()=>{
          setOpen(false)
        })
      });
    }

    useEffect(() => {
      if (open && phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
    }, [open]);

  return (
    <div className='w-2/5 max-lg:w-full'>
        <div className='mb-4 flex items-center gap-6'>
            <h2 className={`text-[16px] font-bold text-blue`}>Mobile Number</h2>
            <button onClick={()=>setOpen(!open)} className='text-[14px] border border-green px-4 py-1 rounded-md font-semibold text-blue'>Edit</button>
        </div>
        <form onSubmit={handleSubmit(handlePhoneSubmit)}>
            <div className='flex items-end max-sm:flex-col max-sm:items-start gap-6'>
                <div className='w-4/5 max-sm:w-full'>
                    <label htmlFor="phone" className='text-[13px] text-gray-400'>Mobile Number</label>
                    {
                      open ? (
                        <input
                          {...register("phone")} 
                          id="phone"
                          type="number"
                          name='phone'
                          placeholder='+91 00000 00000'
                          className='w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-gray-500 text-sm text-gray-500'
                          ref={phoneInputRef}
                      />
                      ) : (
                        <input
                          {...register("phone")} 
                          id="phone"
                          type="number"
                          name='phone'
                          readOnly
                          placeholder='+91 00000 00000'
                          className='w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none text-sm text-gray-500'
                      />
                      )
                    }
                    {errors?.phone && (
                        <p className='text-red-500 text-[13px]'>{errors?.phone?.message}</p>
                    )}
                </div>
                <div className='w-1/5 h-9'>
                {
                  open ? (
                    <ButtonWithSpinner loading={isPending}>
                        SAVE
                    </ButtonWithSpinner>
                  ) : (
                    <Link href={"/profile/address"} className='w-full text-sm bg-bgg text-white rounded-md font-bold py-2 px-3'>Update</Link>
                  )
                }
                </div>
            </div>
        </form>
    </div>
  )
}

export default PhoneForm