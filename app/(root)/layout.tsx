import React, { ReactNode } from 'react'
import Navbar from '../../components/Navbar'

const HomeLayout = ({children}: Readonly<{children: ReactNode}>) => {
  return (
    <main className='font-work-sans'>
      <Navbar />
      {children}
    </main>
  )
}

export default HomeLayout