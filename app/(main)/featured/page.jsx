import React from 'react'
import Link from 'next/link'
import { MapPin, DollarSign } from 'lucide-react'
import Image from 'next/image'

const Featured = async () => {
  // Future: Fetch from your database
  // const listings = await db.query('SELECT * FROM listings ORDER BY created_at DESC LIMIT 4')
  
  // For now: Hardcoded 4 listings
  const listings = [
    {
      id: 1,
      title: 'Modern Studio Apartment',
      description: 'Beautiful studio in the heart of downtown with modern amenities',
      location: 'Downtown',
      country: 'United States',
      price: '$1,200/month',
      imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
    },
    {
      id: 2,
      title: 'Cozy 2-Bedroom House',
      description: 'Spacious family home in a quiet suburban neighborhood',
      location: 'Suburban Area',
      country: 'United States',
      price: '$1,800/month',
      imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    },
    {
      id: 3,
      title: 'Luxury Penthouse',
      description: 'Stunning penthouse with panoramic city views',
      location: 'Uptown',
      country: 'United States',
      price: '$3,500/month',
      imageUrl: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
    },
    {
      id: 4,
      title: 'Student-Friendly Flat',
      description: 'Affordable apartment perfect for students',
      location: 'University District',
      country: 'United States',
      price: '$900/month',
      imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    }
  ]

  return (
    <div className='w-full bg-white py-16 sm:py-1'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        
        {/* Header */}
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900'>
            Listings Near You
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Discover amazing properties in your area
          </p>
        </div>

        {/* Cards Grid - Always shows exactly 4 listings */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          {listings.map((listing) => (
            <Link 
              key={listing.id}
              href={`/listings/${listing.id}`}
              className='border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer block'
            >
              {/* Image */}
              <div className='relative w-full h-48 bg-gray-100'>
                <Image
                  src={listing.imageUrl}
                  alt={listing.title}
                  fill
                  className='object-cover'
                />
              </div>
              
              {/* Content */}
              <div className='p-4 space-y-3'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {listing.title}
                </h3>
                
                <p className='text-sm text-gray-600 line-clamp-2'>
                  {listing.description}
                </p>
                
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <MapPin className='h-4 w-4' />
                  <span>{listing.location}, {listing.country}</span>
                </div>
                
                <div className='flex items-center gap-2 text-lg font-bold text-gray-900'>
                  <DollarSign className='h-5 w-5' />
                  <span>{listing.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className='text-center p-5'>
          <Link 
            href='/listings'
            className='inline-block px-8 py-3 border border-gray-300 text-gray-900 rounded-md font-semibold hover:bg-gray-50 transition-colors'
          >
            View All Listings
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Featured