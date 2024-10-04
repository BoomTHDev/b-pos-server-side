'use client'

import { addFood } from '@/actions/food-action'
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
import { FoodType } from '@prisma/client'
import { Save } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type FormAddFoodProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    foodType: FoodType[]
}

export default function FormAddFood({ setOpen, foodType }: FormAddFoodProps) {

    const router = useRouter()

    const [previewImage, setPreviewImage] = useState('')

    const handlePreviewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreviewImage(imageUrl)
        } else {
            setPreviewImage('')
        }
    }

    const handleSubmit = async (formData: FormData) => {
        const response = await addFood(formData)
        if (response.status === true) {
            toast.success(response.message, {
                position: 'top-right',
                autoClose: 1000,
                pauseOnHover: true,
                theme: 'dark'
            })
            setOpen(false)
            router.refresh()
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
        <form className='grid gap-5 py-4' action={handleSubmit}>
                <div className='grid gap-3'>
                    <Label className='text-sm'>ประเภท</Label>
                    <Select name='food_type_id'>
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
                    <Label>ภาพ</Label>
                    <Input
                        type='file'
                        name='image'
                        className='focus:outline-none'
                        onChange={handlePreviewImage}
                    />
                    {previewImage ? (
                        <div className='flex items-center justify-center'>
                            <Image
                                alt=''
                                src={previewImage}
                                width={450}
                                height={450}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <div className='grid gap-3'>
                    <Label>ชื่อ</Label>
                    <Input
                        type='text'
                        name='name'
                        className='focus:outline-none'
                    />
                    
                </div>

                <div className='grid gap-3'>
                    <Label>หมายเหตุ</Label>
                    <Input
                        type='text'
                        name='remark'
                        className='focus:outline-none'
                    />
                </div>

                <div className='grid gap-3'>
                    <Label>ราคา</Label>
                    <Input
                        type='number'
                        name='price'
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