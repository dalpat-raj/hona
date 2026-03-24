import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/app/ui/homePage/navbar/Navbar";
import Footer from "@/app/ui/homePage/Footer";
// import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./StoreProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
// import { currentRole } from '@/lib/data';
import { poppins } from "@/app/ui/Fonts";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "My Website",
  description: "My Ecommerce Website",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();
  // const role = await currentRole();

  return (
    // <SessionProvider session={session}>
    <html lang="en" className={cn(poppins.className, "font-sans", geist.variable)}>
      <body>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <StoreProvider>
          <Toaster position="top-right" />
          {/* {role === "ADMIN" ? "" : <Navbar />} */}
          <Navbar />
          {children}
          <Footer />
          {/* {role === "ADMIN" ? "" : <Footer />} */}
        </StoreProvider>
      </body>
    </html>
    // </SessionProvider>
  );
}
