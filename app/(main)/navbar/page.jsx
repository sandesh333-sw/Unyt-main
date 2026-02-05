'use client'

import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import Link from 'next/link'
import { SignInButton, SignUpButton, SignedOut, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NavBar = () => {

  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()){
      router.push(`/listings?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/listings')
    }
  }

  return (
    <nav className='w-full border-b bg-white shadow-sm'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>

        {/* Left: Logo */}
        <div className='space-y-4'>
          <Link href='/'>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={48}
            height={48}
          />
          </Link>
        </div>

        {/* Middle: Search+Listing*/}
        <div className='hidden md:flex items-center gap-4'>
          <form onSubmit={handleSearch} className='flex items-center rounded-lg border border-gray-300 bg-gray-50 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all'>
            <input
              type='text'
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='bg-transparent px-4 py-2 text-sm outline-none w-64'
            />
            <button type='submit'className="bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
              Search
            </button>
          </form>

          <Link
            href='/listings'
            className='text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100'
          >
            Listings
          </Link>
        </div>

        {/*Right: Auth */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                Sign in
              </button>
            </SignInButton>

            <SignUpButton>
              <button className="rounded-md bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow-sm">
                Sign up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default NavBar