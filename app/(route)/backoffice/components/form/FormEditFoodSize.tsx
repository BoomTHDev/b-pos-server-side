'use client'

import { editFoodSize } from '@/actions/food-action'
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

type FormEditFoodTypeProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    foodSize: {
        id: string
        name: string
        remark: string
        moneyAdded: number
        status: string
        foodTypeId: string
        FoodType: FoodType
        createdAt: Date
        updatedAt: Date
    }
    foodType: FoodType[]
}


export default function FormEditFoodType({ setOpen, foodSize, foodType }: FormEditFoodTypeProps) {

    const handleSave = async (formData: FormData) => {
        const response = await editFoodSize(formData)
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
            <Input
                type='hidden'
                name='id'
                defaultValue={foodSize.id}
                className='focus:outline-none'
            />
            <div className='grid gap-3'>
                <Label className='text-sm'>ประเภท</Label>
                <Select
                    name='food_type_id'
                    defaultValue={foodSize.FoodType.id}
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
                    defaultValue={foodSize.name}
                    className='focus:outline-none'
                />
            </div>

            <div className='grid gap-3'>
                <Label className='text-sm'>คิดเงินเพิ่ม (บาท)</Label>
                <Input
                    type='number'
                    name='money_added'
                    defaultValue={foodSize.moneyAdded}
                    className='focus:outline-none'
                />
            </div>

            <div className='grid gap-3'>
                <Label className='text-sm'>หมายเหตุ</Label>
                <Input
                    type='text'
                    name='remark'
                    defaultValue={foodSize.remark}
                    className='focus:outline-none'
                />
            </div>
            <div className='grid gap-3'>
                <Label className='text-sm'>หมายเหตุ</Label>
                <Select
                    name='status'
                    defaultValue={foodSize.status}
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
            <Button type='submit' className='flex items-center gap-1'>
                <Save size={16} />
                บันทึก
            </Button>
        </form>
    )
}