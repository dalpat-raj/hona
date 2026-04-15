import { NextResponse } from "next/server";
import {imagekit} from "@/lib/imageKit";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

  
    const response = await imagekit.upload({
      file: buffer, 
      fileName: file.name,
      folder: "/products",
      useUniqueFileName: true, 
    });
    
    return NextResponse.json({ response }, { status: 200 });

  } catch (error: any) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: error.message || "Image upload failed" },
      { status: 500 }
    );
  }
}