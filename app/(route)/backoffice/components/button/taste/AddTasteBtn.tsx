'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import FormAddTaste from '../../form/taste/FormAddTaste'

type FoodType = {
    id: string
    name: string
    remark: string | null
    status: string
    createdAt: Date
    updatedAt: Date
}

type AddTasteBtnProps = {
    foodType: FoodType[]
}

export default function AddTasteBtn({ foodType }: AddTasteBtnProps) {

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
                    <DialogTitle>รสชาติอาการ</DialogTitle>
                </DialogHeader>
                <FormAddTaste setOpen={setOpen} foodType={foodType} />
            </DialogContent>
        </Dialog>
    )
}