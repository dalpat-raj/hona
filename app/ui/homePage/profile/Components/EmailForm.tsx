"use client"
import React, { useState, useTransition, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSchema } from '@/schema';
import { toast } from 'sonner';
import { EmailUpdate } from '@/action/user';
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner';

interface UserEmail {
    email: string,
}

interface UserEmailData {
  userId: string,
  userEmail: string,
}

const EmailForm: React.FC<UserEmailData> = ({userId, userEmail}) => {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const { 
      register, 
      handleSubmit, 
      formState: {errors}, 
    } = useForm<UserEmail>({
      resolver: zodResolver(EmailSchema),
      defaultValues: {
        email: userEmail,
      }
    })
  
  
    async function handleAddressSubmit(data:UserEmail){
      startTransition(() => {
          EmailUpdate(data, userId)
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
      if (open && emailInputRef.current) {
        emailInputRef.current.focus(); // Focus the input element
      }
    }, [open]);

  return (
    <div className='w-2/5 max-lg:w-full'>
        <div className='mb-4 flex items-center gap-6'>
            <h2 className={`text-[16px] font-bold text-blue`}>Email Address</h2>
            <button onClick={()=>setOpen(!open)} className='text-[14px] border border-green px-4 py-1 rounded-md font-semibold text-blue'>Edit</button>
        </div>
        <form onSubmit={handleSubmit(handleAddressSubmit)}>
            <div className='flex items-end max-sm:flex-col max-sm:items-start gap-6'>
                <div className='w-4/5 max-sm:w-full'>
                    <label htmlFor="email" className='text-[13px] text-gray-400'>Email Address</label>
                   {
                    open ? (
                        <input
                            {...register("email")} 
                            id="email"
                            type="email"
                            name='email'
                            placeholder='Example@gmail.com'
                            className='w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-gray-500 text-sm text-gray-500'
                            ref={emailInputRef}
                        />
                    ) : (
                        <input
                            {...register("email")} 
                            id="email"
                            type="email"
                            name='email'
                            readOnly
                            placeholder='Example@gmail.com'
                            className='w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none text-sm text-gray-500'
                        />
                    )
                   }
                    {errors.email && (
                        <p className='text-red-500 text-[13px]'>{errors.email.message}</p>
                    )}
                </div>
                <div className='w-1/5 h-9'>
                {
                    open && (
                        <ButtonWithSpinner loading={isPending}>
                            SAVE
                        </ButtonWithSpinner>
                    )
                }
                </div>
            </div>
        </form>
    </div>
  )
}

export default EmailForm