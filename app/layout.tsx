import "./globals.css";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Navbar from "@/app/ui/homePage/navbar/Navbar";
import Footer from "@/app/ui/homePage/Footer";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import { poppins } from "@/app/ui/Fonts";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import Script from "next/script";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "My Website",
  description: "My Ecommerce Website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const role = user?.role;  
  
  return (
    <html
      lang="en"
      className={cn(poppins.className, "font-sans", geist.variable)}
    >
      <body>

        <StoreProvider>
          <Toaster position="top-right" />
          {role !== "ADMIN" && <Navbar />}
          {/* {isSlow && (
            <div className="fixed top-0 w-full bg-red-500 text-white text-center py-2 z-50">
              ⚠️ Your internet connection is slow
            </div>
          )} */}
          {children}
          {role !== "ADMIN" && <Footer />}
        </StoreProvider>
        {/* <Script 
        src="https://checkout.shiprocket.in/checkout.js" 
        strategy="lazyOnload"
        /> */}
      </body>
    </html>
  );
}