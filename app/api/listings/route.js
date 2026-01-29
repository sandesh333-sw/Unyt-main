import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/app/lib/mongodb";
import Listing from "@/app/models/Listing";

// GET -  All listings
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

// POST - Create new Listing
export async function POST(request){
    try {
        const { userId } = await auth();
        

        if(!userId){
            return NextResponse.json(
                { success: false, error: 'Unauthorized'},
                { status: 401 }
            );
        }
        console.log('User id is',userId);

        
        await connectDB();

        const body = await request.json();

        const { title, description, location, country, price, imageUrl, imagePublicId } = body;

        // Validate
        if (!title || !description || !location || !country || !price){
            return NextResponse.json(
                { status: false, error: 'Missing required files'},
                { status: 400 }
            );
        }

        const newListing = await Listing.create({
            title,
            description,
            location,
            country,
            price,
            imageUrl,
            imagePublicId,
            owner: 123,
        });

        return NextResponse.json(
            { success: true, data: newListing},
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating listing:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create listing'},
            { status: 500}
        );
    }
}


