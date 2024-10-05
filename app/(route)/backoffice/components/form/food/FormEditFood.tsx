'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Food, FoodType } from "@prisma/client"
import SubmitFormBtn from "../../button/SubmitFormAddBtn"
import { editFood } from "@/actions/food-action"
import { useState } from "react"
import Image from "next/image"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

type FormEditFoodProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    food: Food
    foodType: FoodType[]
}

export default function FormEditFood({ setOpen, food, foodType }: FormEditFoodProps) {

    const [previewImage, setPreviewImage] = useState('')
    const router = useRouter()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreviewImage(imageUrl)
        } else {
            setPreviewImage('')
        }

    }

    const handleSubmit = async (formData: FormData) => {
        const response = await editFood(formData)
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
        <form className='flex flex-col gap-5 py-4' action={handleSubmit}>
            <Input
                type='hidden'
                name='id'
                defaultValue={food.id}
                className='focus:outline-none'
            />
            <div className="flex gap-5">
                <div>
                    
                    <div className='grid gap-3'>
                        <Label className='text-sm'>ชื่อ</Label>
                        <Input
                            type='text'
                            name='name'
                            defaultValue={food.name}
                            className='focus:outline-none'
                        />
                    </div>

                    <div className='grid gap-3'>
                        <Label className='text-sm'>ภาพ</Label>
                        <Input
                            type='file'
                            name='image'
                            className='focus:outline-none'
                            onChange={handleImageChange}
                        />
                        {previewImage ? (
                            <div className='flex items-center justify-center'>
                                <Image
                                    alt=''
                                    src={previewImage}
                                    width={450}
                                    height={200}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div className='grid gap-3'>
                        <Label className='text-sm'>ประเภท</Label>
                        <Select
                            name='food_type_id'
                            defaultValue={food.foodTypeId}
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
                        <Label className='text-sm'>ชนิด</Label>
                        <Select
                            name='type'
                            defaultValue={food.foodType}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='เลือกประเภท' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='food'>อาหาร</SelectItem>
                                <SelectItem value='water'>เครื่องดื่ม</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='grid gap-3'>
                        <Label className='text-sm'>หมายเหตุ</Label>
                        <Input
                            type='text'
                            name='remark'
                            defaultValue={food.remark}
                            className='focus:outline-none'
                        />
                    </div>

                    <div className='grid gap-3'>
                        <Label className='text-sm'>สถานะ</Label>
                        <Select
                            name='status'
                            defaultValue={food.status}
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

                    <div className='grid gap-3'>
                        <Label className='text-sm'>ราคา</Label>
                        <Input
                            type='number'
                            name='price'
                            defaultValue={food.price}
                            className='focus:outline-none'
                        />
                    </div>
                </div>
            </div>

            <SubmitFormBtn />

        </form>
    )
}