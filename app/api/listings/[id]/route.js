import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import connectDB from "@/app/lib/mongodb";
import Listing from "@/app/models/Listing";
import { geocodeLocation } from "@/app/lib/geocoding";

// GET: Get single listing
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

// PUT: Update listing
export async function PUT(request, { params }){
  try {
    const { userId } = await auth();

    if(!userId){
      return NextResponse.json(
        { success: false, error :'Unauthorized'},
        { status : 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const listing = await Listing.findById(id);

    if (!listing){
      return NextResponse.json(
        { success: false, error: 'Listing not found'},
        { status: 404}
      );
    }

    // Checking if user owns the listing
    if (listing.owner != userId){
      return NextResponse.json(
        { success: false, error: 'Forbidden - You do not own the listing'},
        { status: 403}
      );
    }

    const body = await request.json();
    const { title, description, location, country, price, imageUrl, imagePublicId } = body;

    // Geocode location if it changed
    let geometry = listing.geometry;
    if (location !== listing.location){
      geometry = await geocodeLocation(location);
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        location,
        country,
        price,
        imageUrl,
        imagePublicId,
        geometry,
      },
      { new: true, runValidators: true}
    );

    return NextResponse.json(
      { success: true, data: updatedListing },
      { status: 200}
    ); 


  } catch (error) {
    console.error('Error updating listings', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update listing'},
      { status: 500 }
    );
  }
}

//DELETE: listing
export async function DELETE(request, { params }){
  try {
    const { userId } = await auth();

    if (!userId){
      return NextResponse.json(
        { success: false, error: 'Unauthorized'},
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const listing = await Listing.findById(id);;

    if (!listing){
      return NextResponse.json(
        { success: false, error: 'Listing not found'},
        { status: 404 }
      );
    }

    // Check if user owns the listing
    if (listing.owner != userId){
      return NextResponse.json(
        { success: false, error: 'Forbidden - You do not own the listing'},
        { status: 403 }
      );
    }

    await Listing.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: 'Listing deleted successfully'},
      { status: 200}
    );

  } catch (error) {
    console.error('Error deleting listings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete listing'},
      { status: 500 }
    );
  }
}
