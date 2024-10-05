import { LucideIcon } from "lucide-react";
import Link from "next/link";

type CollapsibleItemProps = {
    path: string
    title: string
    Icon: LucideIcon
}

export function CollapsibleItem({ path, title, Icon }: CollapsibleItemProps) {
    return (
        <Link href={path} className="pl-14 py-3 flex items-center gap-2 hover:bg-gray-800 border-b border-gray-600 w-full">
            <Icon size={20} />
            <p className='text-sm font-normal'>{title}</p>
        </Link>
    )
}