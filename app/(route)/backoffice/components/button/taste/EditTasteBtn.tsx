'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Pencil } from 'lucide-react'
import { FoodType, Taste } from '@prisma/client'
import FormEditTaste from '../../form/taste/FormEditTaste'

type EditTasteBtnProps = {
    tastes: Taste
    foodType: FoodType[]
}

export default function EditTasteBtn({ tastes, foodType }: EditTasteBtnProps) {

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

                <FormEditTaste setOpen={setOpen} tastes={tastes} foodType={foodType} />
            </DialogContent>
        </Dialog>
    )
}