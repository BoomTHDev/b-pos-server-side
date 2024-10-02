'use client'

import { addFoodSize} from '@/actions/food-action'
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

type FoodType = {
    id: string
    name: string
    remark: string | null
    status: string
    createdAt: Date
    updatedAt: Date
}

type FormAddFoodSizeProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    foodType: FoodType[]
}

export default function FormAddFoodSize({ setOpen, foodType }: FormAddFoodSizeProps) {

    const handleSave = async (formData: FormData) => {
        const response = await addFoodSize(formData)
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
                <Label className='text-sm'>ประเภท</Label>
                <Select
                    name='food_type_id'
                >
                    <SelectTrigger>
                        <SelectValue placeholder='เลือกประเภท' />
                    </SelectTrigger>
                    <SelectContent>
                        {foodType?.map(item => (
                            <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='grid gap-3'>
                <Label className='text-sm'>ชื่อ</Label>
                <Input
                    type='text'
                    name='name'
                    className='focus:outline-none'
                />
            </div>

            <div className='grid gap-3'>
                <Label className='text-sm'>คิดเงินเพิ่ม (บาท)</Label>
                <Input
                    type='number'
                    name='money_added'
                    defaultValue={0}
                    className='focus:outline-none'
                />
            </div>

            <div className='grid gap-3'>
                <Label className='text-sm'>หมายเหตุ</Label>
                <Input
                    type='text'
                    name='remark'
                    className='focus:outline-none'
                />
            </div>
            <Button type='submit' className='flex items-center gap-1'>
                <Save size={16} />
                บันทึก
            </Button>
        </form>
    )
}