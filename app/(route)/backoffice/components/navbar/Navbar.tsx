'use client'

import { Menu, X } from 'lucide-react'
import { useRecoilState } from 'recoil'
import { sideNavState } from '@/store/state/side-nav-state'
import { Button } from '@/components/ui/button'

export default function Navbar() {

    const [open, setOpen] = useRecoilState(sideNavState)

    const handleSidebar = () => {
        setOpen(!open)
    }

    return (
        <nav className={`bg-gray-950 h-16 flex items-center gap-4 px-4 fixed top-0 right-0 left-0 transition-all duration-300
            ${open ? 'ml-64' : 'ml-0'}`}>
            <Button variant={'outline'} className='border-none bg-inherit p-0 hover:bg-inherit' onClick={handleSidebar}>
                <Menu size={30} />
            </Button>
            <h1 className='text-2xl font-semibold text-gray-200'>Admin Management</h1>

            {/* wait add on future */}
        </nav>
    )
}