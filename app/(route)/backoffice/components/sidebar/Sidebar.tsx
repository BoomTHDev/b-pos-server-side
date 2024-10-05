'use client'

import Image from "next/image";
import { LayoutGrid, List, FilePlus, Utensils, FileMinus } from 'lucide-react'
import Menus from './Menus'
import Menu from './Menu'
import { useRecoilValue } from 'recoil'
import { sideNavState } from '@/store/state/side-nav-state'
import SignOutBtn from "./SignOutBtn";
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { CollapsibleMenu } from "./CollapsibleMenu";
import { CollapsibleItem } from "./CollapsibleItem"


type SidebarProps = {
    title: string
    username: string
    role: string
}

export default function Sidebar({ title, username, role }: SidebarProps) {

    const open = useRecoilValue(sideNavState)
    const pathname = usePathname()
    return (
        <div className={`bg-gray-900 flex flex-col justify-between w-64 fixed top-0 bottom-0 left-0 transition-transform duration-300 overflow-y-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}`}>

            {/* parse 1 */}
            <div>
                {/* Shop Name */}
                <div className='p-4 border-b border-b-gray-400 text-center'>
                    <Link href='/' className='text-2xl font-semibold'>{title}</Link>
                </div>

                {/* Profile */}
                <div className='flex items-center justify-center gap-2 p-4 border-b border-b-gray-400'>
                    <div>
                        <Image
                            alt='profile'
                            src='/no-avatar.png'
                            width={70}
                            height={70}
                        />
                    </div>
                    <div className='flex flex-col items-start gap-1'>
                        <h3 className='text-xl'>ชื่อ : {username}</h3>
                        <p className='text-sm'>ตำแหน่ง : {role}</p>
                    </div>
                </div>

                {/* Menu */}
                <Menus>
                    <Menu title='ประเภทอาหาร' path='/backoffice/food-type' Icon={LayoutGrid} />
                    <Menu title='ขนาด' path='/backoffice/food-size' Icon={List} />
                    <Menu title='รสชาติอาหาร' path='/backoffice/taste' Icon={FilePlus} />
                    <Menu title='อาหาร' path='/backoffice/food' Icon={Utensils} />
                    <CollapsibleMenu title='อาหาร' Icon={Utensils}>
                        <CollapsibleItem path='/backoffice' title='เพิ่มอาหาร' Icon={FilePlus} />
                        <CollapsibleItem path='/backoffice' title='ลบอาหาร' Icon={FileMinus} />
                    </CollapsibleMenu>
                    <CollapsibleMenu title='อาหาร' Icon={Utensils}>
                        <CollapsibleItem path='/backoffice' title='เพิ่มอาหาร' Icon={FilePlus} />
                        <CollapsibleItem path='/backoffice' title='ลบอาหาร' Icon={FileMinus} />
                    </CollapsibleMenu>
                </Menus>

            </div>

            <SignOutBtn />
        </div>
    )
}