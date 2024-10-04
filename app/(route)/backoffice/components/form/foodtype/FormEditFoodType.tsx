'use client'

import { editFoodType } from '@/actions/food-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Save } from 'lucide-react'
import { toast } from 'react-toastify'
import SubmitFormBtn from '../../button/SubmitFormAddBtn'

type FormEditFoodTypeProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    foodType: {
        id: string
        name: string
        remark: string | null
        status: string
        createdAt: Date
        updatedAt: Date
    }
}

export default function FormEditFoodType({ setOpen, foodType }: FormEditFoodTypeProps) {

    const handleSave = async (formData: FormData) => {
        const response = await editFoodType(formData)
        if (response.status === true) {
            toast.success(response.message, {
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: true,
                theme: 'dark'
            })
            setOpen(false)
        } else if (response.status === false) {
            toast.error(response.error, {
                position: 'top-right',
                autoClose: 3000,
                pauseOnHover: true,
                theme: 'dark'
            })
        }
    }
    return (
        <form className='grid gap-5 py-4' action={handleSave}>
            <div className='grid gap-3'>
                <Input
                    type='hidden'
                    name='id'
                    value={foodType.id}
                />
                <Label className='text-sm'>ชื่อ</Label>
                <Input
                    type='text'
                    name='name'
                    defaultValue={foodType.name}
                    className='focus:outline-none'
                />
            </div>
            <div className='grid gap-3'>
                <Label className='text-sm'>หมายเหตุ</Label>
                <Input
                    type='text'
                    name='remark'
                    defaultValue={foodType.remark || ''}
                    placeholder='(ไม่จำเป็น)'
                    className='focus:outline-none'
                />
            </div>
            <div className='grid gap-3'>
                <Label className='text-sm'>หมายเหตุ</Label>
                <Select
                    name='status'
                    defaultValue={foodType.status}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="สถานะ" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="not_active">Not active</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <SubmitFormBtn />
        </form>
    )
}