import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // ✅ FIX
      path: "/",            // ✅ Important
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error?.message },
      { status: 500 },"Not logout user"
    );
  }
}
