'use client'

import { addFoodType } from '@/actions/food-action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save } from 'lucide-react'
import { toast } from 'react-toastify'

type FormAddFoodTypeProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormAddFoodType({ setOpen }: FormAddFoodTypeProps) {


    const handleSave = async (formData: FormData) => {
        const response = await addFoodType(formData)
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
                <Label className='text-sm'>ชื่อ</Label>
                <Input
                    type='text'
                    name='name'
                    className='focus:outline-none'
                />
            </div>
            <div className='grid gap-3'>
                <Label className='text-sm'>หมายเหตุ</Label>
                <Input
                    type='text'
                    name='remark'
                    placeholder='(ไม่จำเป็น)'
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