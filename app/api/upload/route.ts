import { NextResponse } from "next/server";
import imagekit from "@/lib/imageKit";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    console.log("api", file);
    
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // ImageKit Upload
    const response = await imagekit.upload({
      file: buffer, // Buffer format sahi hai
      fileName: file.name, // Ensure file name includes extension (e.g., image.png)
      folder: "/products",
      useUniqueFileName: true, // Recommended
    });

    return NextResponse.json({ url: response.url }, { status: 200 });

  } catch (error: any) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: error.message || "Image upload failed" },
      { status: 500 }
    );
  }
}