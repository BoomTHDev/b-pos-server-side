'use client'

import { useRecoilValue } from 'recoil'
import { sideNavState } from '@/store/state/side-nav-state'
import Navbar from '@/app/(route)/backoffice/components/navbar/Navbar'
import Footer from '@/app/(route)/backoffice/components/footer/Footer'

type ContentWrapperProps = {
  children: React.ReactNode
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  const sidebarOpen = useRecoilValue(sideNavState)

  return (
    <div className={`w-full flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <Navbar />
      <div className='px-4 py-4 mt-16 flex-1 bg-gray-800'>
        {children}
      </div>
      <Footer />
    </div>
  )
}