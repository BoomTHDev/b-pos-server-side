'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react'

type CollapsibleMenuProps = {
    title: string
    Icon: LucideIcon
    children: React.ReactNode
}

export function CollapsibleMenu({ title, Icon, children }: CollapsibleMenuProps) {
    const [open, setOpen] = useState(false)

    const toggleMenu = () => setOpen((prev) => !prev)

    return (
        <div className="w-full">
            <Button
                onClick={toggleMenu}
                variant='ghost'
                className="hover:bg-gray-800 flex items-center justify-between w-full px-8 py-8"
            >
                <div className="flex items-center gap-4">
                    <Icon size={28} />
                    <p className='text-md font-medium'>{title}</p>
                </div>

                {open ? <ChevronDown size={28} /> : <ChevronRight size={28} />}
            </Button>

            {open && (
                <div className="w-full flex flex-col gap-4 items-center justify-center p-3">
                    {children}
                </div>
            )}
        </div>
    )
}
