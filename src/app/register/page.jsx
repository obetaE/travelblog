import React from 'react'
import RegisterForm from '@/components/RegisterForm/RegisterForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route';


const Register = async () => {
  const session = await getServerSession(authOptions)
  
  if (session) redirect("/homepage")

  return (
    <div>
      <RegisterForm/>
    </div>
  )
}

export default Register
