import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { db } from "@/lib/db";
import { app } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  const expiresIn = 60 * 60 * 24 * 10 * 1000; // 10 days (ms)
  try {
    // Input validation
    const body = await req.json();
    if (!body?.token) {
      return NextResponse.json(
        { success: false, message: "Token is required" },
        { status: 400 }
      );
    }

    const { token } = body;

    // Verify Firebase token
    let decoded;
    try {
      decoded = await getAuth(app).verifyIdToken(token);
    } catch (error) {
      console.error("Firebase verify error:", error);
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const phone = decoded.phone_number;
    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Phone number not found" },
        { status: 400 }
      );
    }

    // DB operation with handling
    let user;
    try {
      user = await db.user.upsert({
        where: { phone },
        update: {},
        create: { phone },
      });
    } catch (error) {
      console.error("DB error:", error);
      return NextResponse.json(
        { success: false, message: "Database error" },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "User authenticated successfully",
      user: {
        id: user.id,
        phone: user.phone,
      },
    });


    // 🔥 CREATE SESSION COOKIE
    const sessionCookie = await getAuth(app).createSessionCookie(token, {
      expiresIn,
    });


    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      sameSite: "strict",
    });;

    return response;
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}