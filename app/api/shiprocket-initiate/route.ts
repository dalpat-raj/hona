import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 🔹 STEP 1: Auth token lo
    const authRes = await fetch(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: process.env.SHIPROCKET_EMAIL,
          password: process.env.SHIPROCKET_PASSWORD,
        }),
      }
    );

    const authData = await authRes.json();

    if (!authData?.token) {
      return NextResponse.json(
        { error: "Auth token failed", details: authData },
        { status: 400 }
      );
    }

    const authToken = authData.token;

    // 🔹 STEP 2: Checkout initiate API call
    // ⚠️ IMPORTANT: yaha correct endpoint dalna padega (Shiprocket se milega)
    // const initiateRes = await fetch(
    //   "https://apiv2.shiprocket.in/v1/external/YOUR_INITIATE_ENDPOINT",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${authToken}`,
    //     },
    //     body: JSON.stringify({
    //       amount: 100,
    //       // 👉 yaha tum cart data bhej sakte ho
    //     }),
    //   }
    // );

    // const initiateData = await initiateRes.json();
    // console.log("initiateData", initiateData);
    

    // if (!initiateData?.token) {
    //   return NextResponse.json(
    //     { error: "Checkout token not received", details: initiateData },
    //     { status: 400 }
    //   );
    // }

    // 🔹 STEP 3: frontend ko checkout token bhejo
    return NextResponse.json({
      token: authToken, // 👈 ye IMPORTANT hai
    });

  } catch (err) {
    console.error("Shiprocket Error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}