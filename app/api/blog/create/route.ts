import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      author,
      category,
      shortDescription,
      content,
      image,
      fileId,
    } = body;
    console.log(body);
    

    // ✅ Basic Validation
    if (
      !title ||
      !author ||
      !category ||
      !shortDescription ||
      !content ||
      !image ||
      !fileId
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Create Blog
    const blog = await db.blog.create({
      data: {
        title,
        author,
        category,
        shortDescription,
        content,
        image,
        fileId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}