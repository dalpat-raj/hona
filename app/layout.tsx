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
  title: {
    default: "Contrive - Buy Refrigerators, Washing Machines & Mixers Online",
    template: "%s | Contrive",
  },

  description:
    "Shop refrigerators, washing machines, and mixers at best prices in India. Fast delivery, secure checkout, and trusted service at Contrive.",

  keywords: [
    "washing machine online",
    "buy refrigerator India",
    "mixer grinder online",
    "home appliances India",
    "electronics store India",
    "Contrive store",
  ],

  authors: [{ name: "Contrive" }],
  creator: "Contrive",
  publisher: "Contrive",

  metadataBase: new URL("https://www.thecontrive.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Contrive - Home Appliances Store",
    description:
      "Buy washing refrigerators, machines, and mixers online at the best prices.",
    url: "https://www.thecontrive.com",
    siteName: "Contrive",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Contrive Store",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contrive - Home Appliances Store",
    description: "Best deals on washing machines, refrigerators & mixers.",
    images: ["/bg.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  icons: {
    icon: "/favicon.ico",
  },
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

          {children}
          {role !== "ADMIN" && <Footer />}
        </StoreProvider>
        {/* <Script 
        src="https://checkout.shiprocket.in/checkout.js" 
        strategy="lazyOnload"
        /> */}
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Contrive",
              url: "https://www.thecontrive.com",
            }),
          }}
        />
      </body>
    </html>
  );
}
