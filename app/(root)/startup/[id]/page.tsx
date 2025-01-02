import React from 'react'

const StartupPage = async ({params}: {params: Promise<{id: string}>}) => {

  const id = (await params).id;

  return (
    <>
      <h1 className='text-3xl'>This is a startup number {id}</h1>
    </>
  )
}

export default StartupPage