'use client'

import { removeTaste } from '@/actions/food-action'
import { Button } from '@/components/ui/button'
import { AlertCircle, Trash } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'react-toastify'

type RemoveTasteBtnProps = {
    id: string
}

export default function RemoveTasteBtn({ id }: RemoveTasteBtnProps) {

    const [, startTransition] = useTransition()

    const handleRemove = async () => {
        toast(({ closeToast }) => (
            <div className='flex flex-col items-center justify-center gap-4 p-4'>
                <AlertCircle className='text-red-500' size={30} />
                <h1 className='text-xl'>ยืนยันการลบประเภทอาหาร</h1>
                <div className='flex items-center gap-2'>
                    <Button onClick={closeToast} variant={'secondary'}>ยกเลิก</Button>
                    <Button onClick={() => startTransition(async () => {
                        const response = await removeTaste(id)
                        if (response.status === true) {
                            toast.success(response.message, {
                                position: 'top-right',
                                autoClose: 1000,
                                pauseOnHover: true
                            })
                            closeToast()
                        } else if (response.status === false) {
                            toast.error(response.error, {
                                position: 'top-right',
                                autoClose: 3000,
                                pauseOnHover: true
                            })
                        }
                    })} variant={'destructive'}>ยืนยัน</Button>
                </div>
            </div>
        ), {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'dark'
        })
    }

    return (
        <Button onClick={handleRemove}>
            <Trash size={16} />
        </Button>
    )
}