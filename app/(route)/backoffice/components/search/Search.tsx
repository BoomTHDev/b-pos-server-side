'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

type SearchProps = {
    placeholder: string
}

export default function Search({ placeholder }: SearchProps) {

    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            const params = new URLSearchParams(searchParams)
            params.set('page', '1')
            if (event.target.value) {
                params.set('q', event.target.value)
            } else {
                params.delete('q')
            }
            replace(`${pathname}/?${params}`)
        }, 400)
    }

    return (
        <div className='flex items-center gap-2.5 p-2.5 rounded-md w-max'>
            <SearchIcon />
            <Input type='text' placeholder={placeholder} className='bg-inherit border-b border-b-gray-400 focus:border-b-gray-200 text-white' onChange={handleSearch} />
        </div>
    )
}