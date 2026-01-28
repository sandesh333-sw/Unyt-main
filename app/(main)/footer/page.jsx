import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='w-full border-t bg-white mt-auto'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          
          {/* Logo & Description */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-bold text-gray-900'>Logo</h3>
            <p className='text-sm text-gray-600'>
              Your trusted platform for finding amazing listings and opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wider'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/listings' className='text-sm text-gray-600 hover:text-gray-900 transition-colors'>
                  Listings
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-sm text-gray-600 hover:text-gray-900 transition-colors'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-sm text-gray-600 hover:text-gray-900 transition-colors'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className='space-y-4'>
            <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wider'>Support</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/help' className='text-sm text-gray-600 hover:text-gray-900 transition-colors'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href='/faq' className='text-sm text-gray-600 hover:text-gray-900 transition-colors'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href='/terms' className='text-sm text-gray-600 hover:text-gray-900 transition-colors'>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className='space-y-4'>
            <h4 className='text-sm font-semibold text-gray-900 uppercase tracking-wider'>Follow Us</h4>
            <div className='flex gap-4'>
              <a href='#' className='text-gray-600 hover:text-gray-900 transition-colors'>
                <Facebook className='h-6 w-6' />
              </a>
              <a href='#' className='text-gray-600 hover:text-gray-900 transition-colors'>
                <Twitter className='h-6 w-6' />
              </a>
              <a href='#' className='text-gray-600 hover:text-gray-900 transition-colors'>
                <Instagram className='h-6 w-6' />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-8 pt-8 border-t border-gray-200'>
          <p className='text-center text-sm text-gray-600'>
            © {new Date().getFullYear()} Logo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer