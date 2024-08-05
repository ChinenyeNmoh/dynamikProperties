'use client'
import React from 'react'
import { useRouter, useParams } from 'next/navigation'


// /properties route
const Propertiespage = () => {
    const router = useRouter();
    
  return (
    <div>
        <button 
        className='bg-green-500 rounded-md' 
        onClick={() => router.replace('/')}
        >Go home</button>
    </div>
  )
}

export default Propertiespage