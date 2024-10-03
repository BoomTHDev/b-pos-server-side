'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import FormAddFoodSize from '../../form/foodsize/FormAddFoodSize'
import { useState } from 'react'

type FoodType = {
    id: string
    name: string
    remark: string | null
    status: string
    createdAt: Date
    updatedAt: Date
}

type AddFoodSizeBtnProps = {
    foodType: FoodType[]
}

export default function AddFoodSizeBtn({ foodType }: AddFoodSizeBtnProps) {

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ขนาดอาหาร</DialogTitle>
                </DialogHeader>
                <FormAddFoodSize setOpen={setOpen} foodType={foodType} />
            </DialogContent>
        </Dialog>
    )
}