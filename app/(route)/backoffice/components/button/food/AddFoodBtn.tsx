'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import FormAddFood from '@/app/(route)/backoffice/components/form/food/FormAddFood'
import { FoodType } from '@prisma/client'

type AddFoodBtnProps = {
    foodType: FoodType[]
}

export default function AddFoodBtn({ foodType }: AddFoodBtnProps) {

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
                    <DialogTitle>เพิ่มอาหาร</DialogTitle>
                </DialogHeader>
                <FormAddFood setOpen={setOpen} foodType={foodType} />
            </DialogContent>
        </Dialog>
    )
}