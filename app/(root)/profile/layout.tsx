import SideNav from "@/app/ui/homePage/profile/SideNav"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
  <div className="w-full h-[82vh] max-md:h-full bg-bga overflow-hidden">
    <div className="max-md:my-4 px-12 py-8 max-md:px-4 max-sm:pt-0 max-sm:p-0 max-sm:m-0">
      <div className="grid grid-cols-10 gap-6 max-sm:gap-0"> 

        <div className="w-full h-[73vh] max-md:h-full col-span-2 max-md:col-span-10 max-sm:px-0">
          <SideNav/>
        </div>

        <div className="h-[73vh] max-md:h-full overflow-scroll no-scrollbar col-span-8 max-md:col-span-10 max-md:py-0 max-lg:px-8 max-md:px-4 bg-white shadow-custom-shadow max-sm:shadow-none max-sm:rounded-none rounded-md max-sm:p-0">
          {children}
        </div>

      </div>
     </div>
  </div>
  )
  }

