import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { app } from "@/lib/firebaseAdmin";
import { db } from "@/lib/db";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) return null;

    const decoded = await getAuth(app).verifySessionCookie(token, true);
    const phone = decoded.phone_number;

    if (!phone) return null;

    const user = await db.user.findUnique({
      where: { phone },
    });

    return user;
  } catch (error: any) {
    if (error.code === "auth/id-token-expired") {
      console.log("Please Log-In")
  }

    console.error("Auth error:", error);
    return null;
  }
}


