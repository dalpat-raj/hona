"use client"
import React, { useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NameSchema } from '@/schema';
import { toast } from 'sonner';
import { NameUpdate } from '@/action/user';
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner';


interface UserNames {
    firstName: string,
    lastName: string,
}

type UserNameData = {
    userId: string,
    userName: string | null,
}

const NameForm: React.FC<UserNameData> = ({ userId, userName}) => {
    const parts = userName?.split(" ");
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const { 
      register, 
      handleSubmit, 
      formState: {errors}, 
    } = useForm<UserNames>({
      resolver: zodResolver(NameSchema),
      defaultValues: {
        firstName: parts?.length ? parts[0] : "",
        lastName: parts?.length ? parts[1] ? parts[1] : parts[0] : "" ,
      }
    })
  
  
    async function handleAddressSubmit(data:UserNames){
        startTransition(() => {
            NameUpdate(data, userId)
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
        if (open && nameInputRef.current) {
            nameInputRef.current.focus(); // Focus the input element
        }
    }, [open]);

  return (
    <div className='w-3/5 max-lg:w-full'>
        <div className='mb-4 flex items-center gap-6'>
        <h2 className={`text-[16px] font-bold text-blue`}>Personal Information</h2>
        <button onClick={()=>setOpen(!open)} className='text-[14px] border border-green px-4 py-1 rounded-md font-semibold text-blue'>Edit</button>
        </div>
        <form onSubmit={handleSubmit(handleAddressSubmit)}>
        <div className='flex items-end gap-4 max-sm:flex-col max-sm:items-start mb-4'>
        <div className='w-2/5 max-sm:w-full'>
            <label htmlFor="name" className='text-[13px] text-gray-400'>First Name</label>
           {
            open ? (
                <input
                    {...register("firstName")} 
                    id="firstName"
                    type="text"
                    name='firstName'
                    placeholder='first name'
                    className='w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-gray-500 text-sm text-gray-500'
                    ref={nameInputRef}
                />
            ) : (
                <input
                    {...register("firstName")} 
                    id="name"
                    type="text"
                    name='firstName'
                    readOnly
                    placeholder='first name'
                    className='w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none text-sm text-gray-500'
                />
            )
           }            
            {errors.firstName && (
                <p className='text-red-500 text-[13px]'>{errors.firstName.message}</p>
            )}
        </div>
        <div className='w-2/5 max-sm:w-full'>
            <label htmlFor="lname" className='text-[13px] text-gray-400'>Last Name</label>
           {
            open ? (
                <input
                    {...register("lastName")} 
                    id="lname"
                    type="text"
                    name='lastName'
                    placeholder='Last Name'
                    className='w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
                />
            ) : (
                <input
                    {...register("lastName")} 
                    id="lname"
                    type="text"
                    name='lastName'
                    readOnly
                    placeholder='Last Name'
                    className='w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none text-sm text-gray-500'
                />
            )
           }            
            {errors?.lastName && (
                <p className='text-red-500 text-[13px]'>{errors.lastName.message}</p>
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

export default NameForm











//  <div className='w-3/5 max-lg:w-full'>
//         <div className='mb-4 flex items-center gap-6'>
//         <h2 className={`text-[18px] font-bold text-gray-800`}>Personal Information</h2>
//         <button onClick={()=>setOpen(!open)} className='text-[16px] font-semibold text-blue-500'>Edit</button>
//         </div>
//         <form onSubmit={handleSubmit(handleAddressSubmit)}>
//         <div className='flex items-end gap-4 mb-4'>
//         <div className='w-2/5'>
//             <label htmlFor="firstName" className='text-[13px] text-gray-400'>First Name</label>
//             {
//                 nameOpen ? (
//                     <input
//                         {...register("firstName")} 
//                         id="firstName"
//                         type="text"
//                         name='firstName'
//                         placeholder='First Name'
//                         className='w-full py-2 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
//                     />
//                 ) : (
//                     <input
//                         {...register("firstName")} 
//                         id="firstName"
//                         type="text"
//                         name='firstName'
//                         readOnly
//                         placeholder='First Name'
//                         className='w-full py-2 px-4 border border-gray-200 bg-gray-50 rounded-sm outline-none text-sm text-gray-500'
//                     />
//                 )
//             }
//             {errors.firstName && (
//                 <p className='text-red-500 text-[13px]'>{errors.firstName.message}</p>
//             )}
//         </div>
//         <div className='w-2/5'>
//             <label htmlFor="lastName" className='text-[13px] text-gray-400'>Last Name</label>
//             {
//                 nameOpen ? (
//                     <input
//                         {...register("lastName")} 
//                         id="lastName"
//                         type="text"
//                         name='lastName'
//                         placeholder='Last Name'
//                         className='w-full py-2 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
//                     />
//                 ) : (
//                     <input
//                         {...register("lastName")} 
//                         id="lastName"
//                         type="text"
//                         name='lastName'
//                         readOnly
//                         placeholder='Last Name'
//                         className='w-full py-2 px-4 border border-gray-200 bg-gray-50 rounded-sm outline-none text-sm text-gray-500'
//                     />
//                 )
//             }
//             {errors.lastName && (
//                 <p className='text-red-500 text-[13px]'>{errors.lastName.message}</p>
//             )}
//         </div>
//         <div className='w-1/5'>
//             {
//                 nameOpen && (
//                     <button 
//                     disabled={isPending}
//                     type='submit' 
//                     className='bg-[#333] text-white px-12 py-2 rounded-md'>
//                         {isPending ? "WAIT" : "SAVE"}
//                     </button>
//                 )
//             }
//         </div>
//         </div>
//         </form>
//     </div> 