import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { app } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get("session")?.value;

    if (sessionCookie) {
      try {
        // ✅ verify + check revoked
        const decoded = await getAuth(app).verifySessionCookie(
          sessionCookie,
          true
        );

        // ✅ revoke all sessions (important for security)
        await getAuth(app).revokeRefreshTokens(decoded.uid);
      } catch (err: any) {
        // 🔥 expected cases: expired / already revoked
        console.log("Session already invalid:", err.code);
      }
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // ✅ Proper cookie deletion (clean & reliable)
    response.cookies.delete("session");

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    // 🔥 Even on error → force logout UX
    const response = NextResponse.json({
      success: true,
      message: "Logged out (fallback)",
    });

    response.cookies.delete("session");

    return response;
  }
}