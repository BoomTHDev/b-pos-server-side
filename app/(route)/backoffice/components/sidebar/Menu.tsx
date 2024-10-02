import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

type MenuProps = {
    title: string
    path: string
    Icon: LucideIcon
}

export default function Menu({ title, path, Icon }: MenuProps) {
    return (
        <Link href={path} className='flex items-center gap-4 px-8 py-4 hover:bg-gray-800'>
            <Icon size={28} />
            <p className='text-md'>{title}</p>
        </Link>
    )
}