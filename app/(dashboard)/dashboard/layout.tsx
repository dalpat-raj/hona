import SideNav from "@/app/ui/dashboard/SideNav";
export const dynamic = "force-dynamic";
import TopNav from "@/app/ui/dashboard/TopNav";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <div>
      <Toaster position="top-right" />
      <div className="grid grid-cols-10 w-full h-[100vh] bg-blackOverlays">
        <div className="w-full col-span-2 rounded-br-[24px] rounded-tr-[24px] bg-[#111827] text-[#fff] max-md:hidden shadow-2xl">
          <SideNav />
        </div>
        <div className=" col-span-8 max-md:col-span-10 py-4 max-md:py-0 px-12 max-lg:px-8 max-md:px-4 max-sm:px-2">
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
  
    </div>
  );
}

