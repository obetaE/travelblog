import BlogPage from '@/components/BlogPage/BlogPage'
import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route';


const blogSection = async () => {

   const session = await getServerSession(authOptions)
    
    if (!session) redirect("/")


  return (
    <div><BlogPage/></div>
  )
}

export default blogSection