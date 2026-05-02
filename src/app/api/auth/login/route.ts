import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    await dbConnect();
    
    let content = await Content.findOne();
    
    if (!content) {
      const { data: defaultData } = await import("@/data/content");
      content = await Content.create(defaultData);
    }

    const validUsername = content.adminCredentials?.username || "admin";
    const validPassword = content.adminCredentials?.password || "admin123";

    if (validUsername === username && validPassword === password) {
      // Set HttpOnly cookie
      cookies().set("adminToken", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function GET() {
  const token = cookies().get("adminToken");
  if (token?.value === "authenticated") {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false });
}
