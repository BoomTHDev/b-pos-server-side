'use client'

import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import FormEditFoodType from '@/app/(route)/backoffice/components/form/FormEditFoodType'

type EditFoodTypeBtnProps = {
    foodType: {
        id: string
        name: string
        remark: string | null
        status: string
        createdAt: Date
        updatedAt: Date
    }
}

export default function EditFoodTypeBtnEditFoodTypeBtn({ foodType }: EditFoodTypeBtnProps) {

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} className='opacity-90 hover:bg-gray-900'>
                    <Pencil size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>แก้ไขข้อมูล</DialogTitle>
                </DialogHeader>

                <FormEditFoodType setOpen={setOpen} foodType={foodType} />
            </DialogContent>
        </Dialog>
    )
}