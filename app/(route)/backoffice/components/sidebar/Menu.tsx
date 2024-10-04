'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MenuProps = {
    title: string
    path: string
    Icon: LucideIcon
}

export default function Menu({ title, path, Icon }: MenuProps) {

    const pathname = usePathname()

    return (
        <Link href={path} className={`flex items-center gap-4 px-8 py-4 hover:bg-gray-800
        ${pathname === path ? 'border-l-4 border-l-primary transition-all duration-150' : ''}`}>
            <Icon size={28} />
            <p className='text-md'>{title}</p>
        </Link>
    )
}