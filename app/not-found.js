import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
     <Image src={'/notfound.svg'} alt='Not-Found' height={400} width={400} />
     <h1>Not Found</h1>
     <Link href={'/'} className='px-3 py-3 bg-blue-400 mt-5 rounded-lg text-white font-bold hover:bg-blue-600'>Home
     </Link>
    </div>
  )
}

export default NotFound
