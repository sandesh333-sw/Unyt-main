import React from 'react'
import { MapPin, PoundSterling } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ListingsPage = async({ searchParams }) => {

  const params = await searchParams
  const search = params?.search || ''

  let listings = [];

  try {

    const url = search
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/listings?search=${encodeURIComponent(search)}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api/listings`

    const res = await fetch(url, {
      cache: 'no-store'
    });
    const data = await res.json();

    if (data.success){
      listings = data.data;
    }
  } catch (error) {
    console.error('Error fetching listings', error);
  }

  return (
    <div className='w-full bg-white py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl sm:text-4xl font-bold texxt-gray-900 mb-2'>
            All Listings
          </h1>
          <p className='text-gray-600'>
            Browse all available properties ({listings.length} listings)
          </p>
        </div>

        {/* Listings Grid */}
        {listings.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {listings.map((listing) => (
              <Link
              key={listing._id}
              href={`/listings/${listing._id}`}
              className='border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer block'
              >
             { /* Image */}
             
             <div className='relative w-full h-48 bg-gray-100'>
              <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              className='object-cover' 
              />
             </div>
             { /* Content */}
             <div className='p-4 space-y-3'>
              <h3 className='text-lg font-semibold text-gray-900'>
                {listing.title}
              </h3>
              <p className='text-sm text-gray-600 line-clamp-2'>
                {listing.description}
              </p>
              <div className='flex items-center gap-2 text-lg font-bold text-gray-900'>
                <PoundSterling  className='h-5 w-5'/>
                <span>£{listing.price}</span>
              </div>
             </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='text-center py-20'>
            <p className='text-gray-500 text-lg mb-4'>No listings available yet</p>
            <Link
            href='/post-listing'
            className='inline-block px-6 py-3 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-800 transition-colors'
            >
              Post Your First Listing
            </Link>
          </div>
)}
      </div>
    </div>
  )
}

export default ListingsPage
