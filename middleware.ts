import { NextResponse } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrifix,
  authRoutes,
  publicRoutes,
  privateRoutes
} from "@/routes"

// import { auth } from "./auth";
// import { currentUser } from "./lib/data";

// export default auth(async(req)=>{
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;
  
//   const user = await currentUser();
  
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrifix);
//   const isPublicRoute = nextUrl.pathname.startsWith(publicRoutes)
//   const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if(isApiAuthRoute){
//     return NextResponse.next();
//   }

//   if(isAuthRoute){
//     if(isLoggedIn && user?.role === "USER"){
//       return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)) // Response
//     }
//     return NextResponse.next(); 
//   }

//   if(!isLoggedIn && isPrivateRoute){
//     let callbackUrl = nextUrl.pathname;
//     if(nextUrl.search){
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     return NextResponse.redirect(new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)) // Response
//   }

//   if(isPublicRoute){
//     return NextResponse.next();
//   }

//   return NextResponse.next(); // return null;

  
// })


export function middleware() {
  return NextResponse.next();
}

  export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)','/(api|trpc)(.*)',
    ],
  };
