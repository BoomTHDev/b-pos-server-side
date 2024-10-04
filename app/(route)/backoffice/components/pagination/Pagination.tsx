'use client'

import { Button } from '@/components/ui/button'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

type PaginationProps = {
    total: number
}

export default function Pagination({ total }: PaginationProps) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter() // อัพเดท url

    const page = searchParams?.get('page') || '1'

    const params = new URLSearchParams(searchParams)
    const ITEM_PER_PAGE = 5

    const hasPrev = ITEM_PER_PAGE * (Number(page) - 1) > 0
    const hasNext = ITEM_PER_PAGE * Number(page) < total

    const handleChangePage = (type: string) => {
        if (type === 'prev') {
            params.set('page', (Number(page) - 1).toString())
        } else {
            params.set('page', (Number(page) + 1).toString())
        }
        replace(`${pathname}?${params}`)
    }
    

    return (
        <div className='p-2.5 flex justify-between'>
            <Button onClick={() => handleChangePage('prev')} className='h-6 w-16 disabled:cursor-not-allowed bg-zinc-300 hover:bg-zinc-400 text-zinc-800' disabled={!hasPrev}>Previous</Button>
            <Button onClick={() => handleChangePage('next')} className='h-6 w-16 disabled:cursor-not-allowed bg-zinc-300 hover:bg-zinc-400 text-zinc-800' disabled={!hasNext}>Next</Button>
        </div>
    )
}