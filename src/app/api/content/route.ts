import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";
import { data as defaultData } from "@/data/content";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await dbConnect();
    let content = await Content.findOne().select("-adminCredentials");
    
    // Seed database if empty
    if (!content) {
      content = await Content.create(defaultData);
      content = await Content.findOne().select("-adminCredentials");
    }
    
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("adminToken");
    
    if (token?.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();
    
    let content = await Content.findOne();
    if (content) {
      content = await Content.findByIdAndUpdate(content._id, body, { new: true }).select("-adminCredentials");
    } else {
      content = await Content.create(body);
    }
    
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
