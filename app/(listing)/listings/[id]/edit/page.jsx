'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Upload, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'

const EditListing = ({ params }) => {
  const { id } = use(params)
  const router = useRouter()
  const { userId } = useAuth()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [imagePreview, setImagePreview] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    country: '',
    price: '',
    imageUrl: '',
  })

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${id}`)
        const data = await res.json()

        if (data.success) {
          const listing = data.data
          
          // Check ownership
          if (listing.owner !== userId) {
            toast.error('You do not have permission to edit this listing')
            router.push(`/listings/${id}`)
            return
          }

          setFormData({
            title: listing.title,
            description: listing.description,
            location: listing.location,
            country: listing.country,
            price: listing.price.toString(),
            imageUrl: listing.imageUrl,
          })
          setImagePreview(listing.imageUrl)
        } else {
          toast.error('Listing not found')
          router.push('/listings')
        }
      } catch (error) {
        console.error('Error fetching listing:', error)
        toast.error('Failed to load listing')
      } finally {
        setFetching(false)
      }
    }

    if (userId) {
      fetchListing()
    }
  }, [id, userId, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    const uploadData = new FormData()
    uploadData.append('file', file)
    uploadData.append('upload_preset', 'your_upload_preset')
    
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: uploadData,
        }
      )
      
      const data = await res.json()
      setFormData(prev => ({
        ...prev,
        imageUrl: data.secure_url,
      }))
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Listing updated successfully')
        router.push(`/listings/${id}`)
        router.refresh()
      } else {
        toast.error(data.error || 'Failed to update listing')
      }
    } catch (error) {
      console.error('Error updating listing:', error)
      toast.error('Failed to update listing')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className='w-full bg-white py-20'>
        <div className='mx-auto max-w-3xl px-4 text-center'>
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-white py-12'>
      <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
        
        <Link 
          href={`/listings/${id}`}
          className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors'
        >
          <ArrowLeft className='h-5 w-5' />
          Back to listing
        </Link>

        <div className='mb-8'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-2'>
            Edit Listing
          </h1>
          <p className='text-gray-600'>
            Update your property details
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6 bg-white border border-gray-200 rounded-lg p-6 sm:p-8'>
          
          {/* Title */}
          <div>
            <label htmlFor='title' className='block text-sm font-semibold text-gray-900 mb-2'>
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900'
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor='description' className='block text-sm font-semibold text-gray-900 mb-2'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900'
            />
          </div>

          {/* Location & Country */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label htmlFor='location' className='block text-sm font-semibold text-gray-900 mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                value={formData.location}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900'
              />
            </div>

            <div>
              <label htmlFor='country' className='block text-sm font-semibold text-gray-900 mb-2'>
                Country
              </label>
              <input
                type='text'
                id='country'
                name='country'
                value={formData.country}
                onChange={handleChange}
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900'
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor='price' className='block text-sm font-semibold text-gray-900 mb-2'>
              Price (per month)
            </label>
            <input
              type='number'
              id='price'
              name='price'
              value={formData.price}
              onChange={handleChange}
              required
              min='0'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900'
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className='block text-sm font-semibold text-gray-900 mb-2'>
              Property Image
            </label>
            
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors'>
              {imagePreview && (
                <div className='space-y-4'>
                  <div className='relative w-full h-64'>
                    <Image
                      src={imagePreview}
                      alt='Preview'
                      fill
                      className='object-cover rounded-md'
                    />
                  </div>
                  <label className='cursor-pointer inline-block px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors'>
                    Change Image
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      className='hidden'
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full px-6 py-3 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Updating...' : 'Update Listing'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditListing