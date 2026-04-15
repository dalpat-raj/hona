"use client"
import React, { useState } from 'react'
import { deleteBrand } from '@/action/brand';
import ButtonWithSpinner from '../../button/ButtonWithSpinner';
import { toast } from 'sonner';

const BrandDelete = ({id}:{id: string}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault(); 
        setLoading(true);
        try {
            const res = await deleteBrand(id)
            if(res.success) toast.success(res.success)
            if(res.error) toast.error(res.error)
        } catch (error) {
            toast.error('Error delete collection ❌');
        } finally {
            setLoading(false)
        }
    }

  return (
    <form onSubmit={handleDelete}>
        <div className='w-20 h-8'>
            <ButtonWithSpinner loading={loading}>
                Delete
            </ButtonWithSpinner>
        </div>
    </form>
  )
}

export default BrandDelete