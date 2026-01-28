import React from 'react'
import Link from 'next/link'

const HeroPage = () => {
  return (
    <div className='w-full bg-gradient-to-b from-gray-50 to-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32'>
        <div className='text-center space-y-8'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900'>
            Unity Platform for Housing
          </h1>
          <p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto'>
            Find your perfect home with ease. Browse thousands of listings, connect with landlords and students, and discover your next place to call home.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link 
              href='/listings'
              className='px-8 py-3 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto text-center'
            >
              Browse Listings
            </Link>
            <Link 
              href='/post-listing'
              className='px-8 py-3 border border-gray-300 text-gray-900 rounded-md font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto text-center'
            >
              Post a Listing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroPage