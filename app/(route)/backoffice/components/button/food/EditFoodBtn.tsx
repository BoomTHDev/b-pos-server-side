'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import FormEditFood from '../../form/food/FormEditFood'
import { Food, FoodType } from '@prisma/client'

type EditFoodBtnProps = {
    food: Food
    foodType: FoodType[]
}

export default function EditFoodBtn({ food, foodType }: EditFoodBtnProps) {

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

                <FormEditFood setOpen={setOpen} food={food} foodType={foodType} />
            </DialogContent>
        </Dialog>
    )
}