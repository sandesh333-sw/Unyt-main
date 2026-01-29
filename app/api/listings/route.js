import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/dist/types/server";
import connectDB from "@/app/lib/mongodb";
import Listing from "@/app/models/Listing";

//Get all listings
export async function GET(request){
    try {
        await connectDB();

        const listings = await Listing.find({}).sort({createdAt: -1});

        return NextResponse.json({
            success: true,
            data: listings
        }, { status: 200});
    } catch (error) {
        console.error('Error fetching listings: ', error);
        return NextResponse.json(
            {success: false, error: 'Failed to fetch listings'},
            {status: 500}
        );
    }
}