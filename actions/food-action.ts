'use server'

import cloudinary from '@/lib/cloudinary'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

// food-type
export async function addFoodType(formData: FormData) {

    const name = formData.get('name') as string
    const remark = formData.get('remark') as string

    try {
        if (!name) {
            return { error: 'กรุณาใส่ชื่ออาหาร', status: false }
        }

        await db.foodType.create({
            data: {
                name,
                remark: remark || null
            }
        })

        revalidatePath('/backoffice/food-type')
        return { message: 'เพิ่มข้อมูลสําเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function getFoodType() {
    try {
        const foodType = await db.foodType.findMany({
            where: {
                status: 'active'
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return { foodType, status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function removeFoodType(id: string) {
    try {
        await db.foodType.update({
            where: {
                id
            },
            data: {
                status: 'not_active'
            }
        })

        revalidatePath('/backoffice/food-type')
        return { message: 'ลบข้อมูลสําเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function editFoodType(formData: FormData) {

    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const remark = formData.get('remark') as string
    const status = formData.get('status') as string

    try {
        await db.foodType.update({
            where: {
                id
            },
            data: {
                name,
                remark: remark || null,
                status
            }
        })

        revalidatePath('/backoffice/food-type')
        return { message: 'อัพเดทข้อมูลสำเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

// food-size
export async function getFoodSize() {
    try {
        const foodSize = await db.foodSize.findMany({
            where: {
                status: 'active'
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                FoodType: true
            }
        })
        return { foodSize, status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function addFoodSize(formData: FormData) {
    const name = formData.get('name') as string
    const remark = formData.get('remark') as string
    const foodTypeId = formData.get('food_type_id') as string
    const moneyAdded = formData.get('money_added') as string

    try {
        if (!name || !remark || !foodTypeId || !moneyAdded) {
            return { error: 'กรุณาใส่ข้อมูลให้ครบถ้วน', status: false }
        }

        await db.foodSize.create({
            data: {
                name,
                remark,
                foodTypeId,
                moneyAdded: Number(moneyAdded)
            }
        })

        revalidatePath('/backoffice/food-size')
        return { message: 'เพิ่มข้อมูลสำเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function removeFoodSize(id: string) {
    try {
        await db.foodSize.update({
            where: {
                id
            },
            data: {
                status: 'not_active'
            }
        })

        revalidatePath('/backoffice/food-size')
        return { message: 'ลบข้อมูลสําเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function editFoodSize(formData: FormData) {

    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const remark = formData.get('remark') as string
    const status = formData.get('status') as string
    const moneyAdded = formData.get('money_added') as string
    const foodTypeId = formData.get('food_type_id') as string

    console.log(id, name, remark, status, moneyAdded, foodTypeId)

    try {
        await db.foodSize.update({
            where: {
                id
            },
            data: {
                name,
                moneyAdded: Number(moneyAdded),
                remark,
                foodTypeId,
                status
            }
        })

        revalidatePath('/backoffice/food-size')
        return { message: 'อัพเดทข้อมูลสำเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

// taste
export async function getTastes() {
    try {
        const tastes = await db.taste.findMany({
            where: {
                status: 'active'
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                FoodType: true
            }
        })

        return { tastes, status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function addTaste(formData: FormData) {
    const name = formData.get('name') as string
    const remark = formData.get('remark') as string
    const foodTypeId = formData.get('food_type_id') as string

    try {
        if (!name || !remark || !foodTypeId) {
            return { error: 'กรุณาใส่ข้อมูลให้ครบถ้วน', status: false }
        }

        await db.taste.create({
            data: {
                name,
                remark,
                foodTypeId
            }
        })

        revalidatePath('/backoffice/taste')
        return { message: 'เพิ่มข้อมูลสารเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function editTaste(formData: FormData) {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const remark = formData.get('remark') as string
    const status = formData.get('status') as string
    const foodTypeId = formData.get('food_type_id') as string

    try {
        await db.taste.update({
            where: {
                id
            },
            data: {
                name,
                remark,
                foodTypeId,
                status
            }
        })

        revalidatePath('/backoffice/taste')
        return { message: 'อัพเดทข้อมูลสำเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function removeTaste(id: string) {
    try {
        await db.taste.update({
            where: {
                id
            },
            data: {
                status: 'not_active'
            }
        })

        revalidatePath('/backoffice/taste')
        return { message: 'ลบข้อมูลสําเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

// food
export async function addFood(formData: FormData) {
    const name = formData.get('name') as string
    const remark = formData.get('remark') as string
    const foodTypeId = formData.get('food_type_id') as string
    const image = formData.get('image') as File
    const price = formData.get('price') as string

    const { imageUrl } = await uploadImageFood(image)

    try {
        if (!name || !remark || !foodTypeId || !imageUrl) {
            return { error: 'กรุณาใส่ข้อมูลให้ครบถ้วน', status: false }
        }

        await db.food.create({
            data: {
                name,
                remark,
                foodTypeId,
                image: imageUrl,
                price: Number(price)
            }
        })

        return { message: 'เพิ่มข้อมูลสำเร็จ', status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}

export async function uploadImageFood(image: File) {
    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uploadImageResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'food_Image_b-pos' }, (error, result) => {
            if (error) {
                reject(error)
                return
            }
            resolve(result)
        }).end(buffer)
    })

    const imageUrl = (uploadImageResponse as any).secure_url
    return { imageUrl }

}

export async function getFoods() {
    try {
        const foods = await db.food.findMany({
            where: {
                status: 'active'
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                FoodType: true
            }
        })

        return { foods, status: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message, status: false }
    }
}