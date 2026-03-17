import SideNav from "@/app/ui/dashboard/SideNav";
import TopNav from "@/app/ui/dashboard/TopNav";
// import { RoleGate } from "@/app/ui/homePage/auth/role-gate";
// import { UserRole } from "@prisma/client";
import { Toaster } from "@/components/ui/sonner";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Toaster position="top-right" />
      {/* <RoleGate allowedRole={UserRole?.ADMIN}> */}
      <div className="grid grid-cols-10 w-full h-[100vh]">
        <div className="w-full col-span-2 bg-[#a0e870] max-md:hidden shadow-2xl">
          <SideNav />
        </div>
        <div className="col-span-8 max-md:col-span-10 py-4 max-md:py-0 px-12 max-lg:px-8 max-md:px-4 max-sm:px-2">
          <div className="flex justify-between items-center py-4">
            <TopNav />
          </div>
          <div
            style={{ height: "calc(100vh - 2rem - 11vh - 1px)" }}
            className="overflow-scroll no-scrollbar"
          >
            {children}
          </div>
        </div>
      </div>
      {/* </RoleGate> */}
    </div>
  );
}

//   <SessionProvider session={session}>
// </SessionProvider>
