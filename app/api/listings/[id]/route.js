import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Listing from "@/app/models/Listing";

// GET single listing
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params; 

    const listing = await Listing.findById(id);

    if (!listing) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: listing },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}
