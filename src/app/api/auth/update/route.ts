import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("adminToken");
    
    if (token?.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, password } = await req.json();
    await dbConnect();
    
    let content = await Content.findOne();
    if (content) {
      content.adminCredentials = { username, password };
      await content.save();
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
  }
}
