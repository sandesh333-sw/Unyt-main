import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, PoundSterling, ArrowLeft } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import DeleteButton from './DeleteButton'

const ViewListingPage = async({params}) => {
  const { id } = await params;
  const  { userId } = await auth();

  let listing = null;
  let isOwner = false;
  
  try {
    const res = await fetch(`http://localhost:3000/api/listings/${id}`, {
      cache: 'no-store'
    });

    const data = await res.json();

    if (data.success){
      listing = data.data;
      isOwner = userId === listing.owner;
    }

    if (!listing){
      return (
        <div className='w-full bg-white py-20'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>
              Listing not found
            </h1>
            <Link href='/listings' className='text-blue-600 hover:underline'>
            Back to Listings
            </Link>
          </div>
        </div>
      );
    }
    
  } catch (error) {
    console.error('Error fetching listing:', error);
  }

  return (
    <div className='w-full bg-white py-8'>
      <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <Link
        href='/listings'
        className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors'
        >
          <ArrowLeft className='h-5 w-5'/>
        Back to listings
        </Link>

        {/* Main Content */}
        <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
          {/* Image */}
          <div className='relative w-full h-96 bg-gray-100'>
            <Image 
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className='object-cover'
            />
          </div>

          {/* Details */}
          <div>
            <div className='p-6 sm:p-8 space-y-6'> 
              <div className='flex flex-col sm:flex-row sm:items-start sm: justify-between gap-4'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  {listing.title}
                </h1>
                <div className='flex items-center gap-2 text-gray-600'>
                  <MapPin className='h-5 w-5'/>
                  <span>{listing.location}, {listing.country}</span>
                </div>
              </div>
              <div className='flex items-center gap-2 text-2xl font-bold text-gray-900'>
                <PoundSterling className='h-7 w-7'/>
                <span>{listing.price}/month</span>
              </div>
            </div>

            {/* Description */}
            <div className='mb-3 p-5'>
              <h2 className='text-xl font-semibold text-gray-900 mb-3'>Description</h2>
              <p className='text-gray-600'>{listing.description}</p>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className='pt-6 border-t border-gray-200 flex gap-4 p-4'>
                <Link
                href={`/listings/${listing._id}/edit`}
                className='px-6 py-2 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-800 transition-colors'
                >
                  Edit Listing
                </Link>
                <DeleteButton
                listingId={listing._id}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewListingPage
