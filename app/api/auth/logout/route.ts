import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { app } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("session")?.value;

    if (sessionCookie) {
      try {
        // ✅ checkRevoked true (important)
        const decoded = await getAuth(app).verifySessionCookie(
          sessionCookie,
          true
        );

        // ✅ revoke tokens (logout from all devices)
        await getAuth(app).revokeRefreshTokens(decoded.uid);
      } catch (err) {
        console.log("Session already invalid or expired");
      }
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // ✅ Strong cookie delete
    response.cookies.set({
      name: "session",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // important
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    // ⚠️ even if error, still try to logout user (UX > strict failure)
    const response = NextResponse.json({
      success: true,
      message: "Logged out (with fallback)",
    });

    response.cookies.set({
      name: "session",
      value: "",
      path: "/",
      expires: new Date(0),
    });

    return response;
  }
}