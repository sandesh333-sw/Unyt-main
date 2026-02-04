import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    imagePublicId: {
        type: String, //For Cloudinary
    },
    owner: {
        type: String, //Clerk UserId
        required: true,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [Longitude, latitude]
            default: [0,0]
        }
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
},
    {
        timestamps: true,
    }
);

export default mongoose.models.Listing || mongoose.model('Listing', listingSchema);