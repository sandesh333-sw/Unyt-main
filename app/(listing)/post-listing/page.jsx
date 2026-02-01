'use client'

import {useState} from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import Image from 'next/image'



const PostListing = () => {
  const router = useRouter()
  const { userId } = useAuth()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    country: '',
    price: '',
    imageUrl: '',
  })

  const handleChange = (e) => {
    const { name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if(!file) return

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'unyt_main')

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await res.json()
      setFormData(prev => ({
        ...prev,
        imageUrl: data.secure.url,
      }))
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image: ', error)
      toast.error('Failed to upload image')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userId){
      toast.error('Please sign in to post a listing')
      return
    }

    if (!formData.imageUrl){
      toast.error('Please upload an image')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      })

      const data = await res.json()

      if (data.success){
        toast.success('Listing created successfully')
        router.push(`/listings/${data.data._id}`)
        router.refresh()
      } else {
        toast.error(data.error || 'Failed to create listing')
      }
    } catch (error) {
      console.error('Error creatin listing:', error)
      toast.error('Failed to create listing')
    } finally {
      setLoading(false)
    }

  }

  return (
    <div>
      CreateListingPage
      
    </div>
  )
}

export default PostListing
