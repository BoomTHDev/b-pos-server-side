'use client'

import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import FormEditFoodSize from '../../form/foodsize/FormEditFoodSize'
import { FoodSize, FoodType } from '@prisma/client'

type EditFoodSizeBtnProps = {
    foodSize: FoodSize
    foodType: FoodType[]
}

export default function EditFoodTypeBtnEditFoodTypeBtn({ foodSize, foodType }: EditFoodSizeBtnProps) {

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

                <FormEditFoodSize setOpen={setOpen} foodSize={foodSize} foodType={foodType} />
            </DialogContent>
        </Dialog>
    )
}