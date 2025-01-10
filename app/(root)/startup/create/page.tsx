import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import TestForm from '@/components/TestForm';
import { redirect } from 'next/navigation';
import React from 'react'

const CreatePage = async () => {

  const session = await auth();

  if (!session) redirect("/")

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Submit Your Startup</h1>
      </section>

      <StartupForm />
      <TestForm />
    </>
  )
}

export default CreatePage