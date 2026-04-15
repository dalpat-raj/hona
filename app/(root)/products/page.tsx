"use client"
import Products from "@/app/ui/product/Products";

const page = async() => {
  return (
    <div className='w-full py-8 max-md:py-4 px-12 max-md:px-4 max-sm:px-2 bg-bga'>
      <Products titles={""}/>
    </div>
  )
}

export default page