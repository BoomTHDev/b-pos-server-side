'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import FormAddFoodType from '@/app/(route)/backoffice/components/form/FormAddFoodType'
import { useState } from 'react'

export default function FoodTypeModal() {

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
                    <DialogTitle>ประเภทอาหาร/เครื่องดื่ม</DialogTitle>
                </DialogHeader>
                <FormAddFoodType setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}