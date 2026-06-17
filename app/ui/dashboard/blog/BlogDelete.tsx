import { useState } from 'react'
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner'
import { toast } from 'sonner';
import { DeleteBlog } from '@/action/blog';

const BlogDelete = ({id}: {id: string}) => { 
  
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete=async(event: React.FormEvent<HTMLFormElement>)=>{
       if (!confirm("Delete this blog?")) return;
        event.preventDefault()
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        try {
          const data = await DeleteBlog(formData)
          if(data?.success) toast.success(data.success)
          if(data?.error) toast.error(data.error)
        } catch (error) {
          toast.error('Error submitting form 😢')
        } finally {
            setLoading(false)
        }
      }

  return (
    <form onSubmit={handleDelete}>
        <input type="hidden" defaultValue={id} name="id" className='hidden'/>
        <div className='w-20 h-7'>
        <ButtonWithSpinner loading={loading}>
            Delete
        </ButtonWithSpinner>
        </div>
    </form>
  )
}

export default BlogDelete