'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, Trash } from 'lucide-react'
import { removeFoodSize } from '@/actions/food-action'
import { toast } from 'react-toastify'

type RemoveFoodTypeBtnProps = {
    id: string
}

export default function RemoveFoodSizeBtn({ id }: RemoveFoodTypeBtnProps) {

    const [, startTransition] = useTransition()

    const handleRemove = async () => {
        toast(({ closeToast }) => (
            <div className='flex flex-col items-center justify-center gap-4 p-4'>
                <AlertCircle className='text-red-500' size={30} />
                <h1 className='text-xl'>ยืนยันการลบประเภทอาหาร</h1>
                <div className='flex items-center gap-2'>
                    <Button onClick={closeToast} variant={'secondary'}>ยกเลิก</Button>
                    <Button onClick={() => startTransition(async () => {
                        const response = await removeFoodSize(id)
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